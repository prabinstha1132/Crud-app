import PostList from "@/components/post/post-list"
import PostShow from "@/components/post/post-show";
import Link from "next/link";
import paths from "@/path";
import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import { fetchCommentByPost } from "@/db/queries/comments";
interface PostShowProps {
   params: {
      slug: string;
      postId: string;
   }
}
export default function PostShowPage(props: PostShowProps) {
   const { slug, postId } = props.params;
   return <div className="space-y-3">
      <h1>we are here in postShowPage</h1>
      
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
     {'<'} Back to {slug}
      </Link>

      <PostShow postId={postId} />
      <CommentCreateForm postId={postId} startOpen/>
      <CommentList fetchData={()=>fetchCommentByPost(postId)}/>

   </div>
}
