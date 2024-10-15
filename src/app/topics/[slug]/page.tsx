import CreatePostForm from "../../../components/post/post-create-form";
import PostList from "@/components/post/post-list";
import{fetchPostByTopicSlug} from'@/db/queries/post';
interface TopicShowProps {
    params: {
        slug: string;
    }
}
export default function TopicShowPage(props: TopicShowProps) {
    const { slug } = props.params;
    return <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
            <h1 className="2xl font-bold mb-2">
                {slug}
            </h1>
            <PostList fetchData={()=>fetchPostByTopicSlug(slug)}/>
        </div>
        <div>
<CreatePostForm slug={slug}/>
        </div>
    </div>
}