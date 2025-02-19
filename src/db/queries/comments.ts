import type { Comment } from "@prisma/client";
import { db } from "@/db";
import { select } from "@nextui-org/react";
export type CommentWithAuthor = (
    Comment & {
        user: { name: string | null, image: string | null }
    }
)
export function fetchCommentByPost(postId: string): Promise<CommentWithAuthor[]> {
   console.log('making a query');
    return db.comment.findMany({
        where: { postId: postId},

        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        }


    })

}