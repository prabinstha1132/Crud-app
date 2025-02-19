
import { db } from "@/db"
import paths from "@/path";
import { Link } from "@nextui-org/react";
import type { PostForListDisplay } from '@/db/queries/post'
interface PostListProps {
    fetchData: () => Promise<PostForListDisplay[]>
}
export default async function PostList({ fetchData }: PostListProps) {
    const posts = await fetchData();
    const renderPosts = posts.map((post) => {
        const topicslug = post.topic.slug;
        if (!topicslug) {
            throw new Error('Need a slug to link to a post');
        }
        return (
            <div key={post.id} className="border rounded p-2 ">
                <Link href={paths.PostShow(topicslug, post.id)}>
                    <h3 className="text-lg font-bold p-3 text-cyan-700">{post.title}</h3>
                    <div className="flex gap-8">
                        <p className="text-xs text-gray-400"> By {post.user.name}</p>
                        <p className="text-xs text-gray-400">
                            {post._count.comments} comments
                        </p>
                    </div>

                </Link>

            </div>
        )
    })
    return <div className="space-y-2">{renderPosts}</div>;



}
