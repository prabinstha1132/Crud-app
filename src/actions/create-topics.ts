'use server';
import { z } from 'zod';
import { auth } from "@/auth";
import { db } from '@/db'
import type { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import paths from '@/path'
import { revalidatePath } from 'next/cache';
revalidatePath

const createTopicSchema = z.object({
    name: z
        .string()
        .min(3)
        .regex(/[a-z-]/,{
            message: 'must be lowercase letter or dashes without spaces'
        }),
    description: z
        .string()
        .min(10)
});
interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        _form?: string[];
    };
}
export async function createTopics(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {

    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')

    });
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        };
    }
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['you must be signed in to continue']
            },
        };
    }
    let topic: Topic;
    try{
        topic=await db.topic.create({
data:{
    slug: result.data.name,
    description: result.data.description,
}
        })
    }
    catch(err:unknown){
if(err instanceof Error){
    return {
errors:{
    _form:[err.message]
}}}
else{
    return {
        errors:{
            _form:['something went wrong']
        }
    }
}
    }
    revalidatePath('/')
    redirect(paths.topicShow(topic.slug))

}