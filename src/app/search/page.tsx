import { redirect } from "next/navigation";
import PostList from "@/components/post/post-list";
import { fetchPostsBySearch } from "@/db/queries/post";
interface SearchPageProps{
searchParams:{
    term: string;
}
}

export default async function SearchPage(Props: SearchPageProps){
   const {term} = Props.searchParams;
   if(!term){
    redirect('/')
   }
   return <div>
<PostList fetchData={()=>fetchPostsBySearch(term)}/>
   </div>
   
}