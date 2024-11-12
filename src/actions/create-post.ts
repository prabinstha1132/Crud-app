'use server'
import { auth } from '@/auth';
import { string, z } from 'zod';
import { db } from '@/db';
import type { Post } from '@prisma/client';
import paths from '@/path';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';





const CreatePostSchema = z.object({
    title: z
        .string()
        .min(3)
        .regex(/[a-z-]/, { message: 'must be lowercase' })
    ,
    content: z
        .string()
        .min(7)
})
interface CreatePosts {
    errors: {
        title?: string[],// array of string
        content?: string[],
        _forms?: string[],
    }
}


export async function createPost(slug: string, formState: CreatePosts, FormData: FormData): Promise<CreatePosts> {
    const result = CreatePostSchema.safeParse({
        title: FormData.get('title'),
        content: FormData.get('content')
    })
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors

        }

    }
    const session = await auth();
    if (!session || !session?.user) {
        return {
            errors: {
                _forms: ['you must logged in first']
            }
        }
    }
    const TopicFind = await db.topic.findFirst({
        where: { slug: slug }
    })
    if (!TopicFind) {
        return {
            errors: {
                _forms: ['cannot find topic']
            }
        }
    }
    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id!,
                topicId: TopicFind.id,
            }
        })
    }
    catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _forms: [err.message]
                }
            }
        }
        else {
            return {
                errors: {
                    _forms: ['something went wrong']
                }
            }
        }
    }
    revalidatePath(paths.topicShow(slug))
    redirect(paths.PostShow(slug,post.id));  

}







