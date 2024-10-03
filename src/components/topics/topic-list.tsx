import Link from 'next/link';
import {Chip} from '@nextui-org/react' //the chip is some element that's kind of styled kind of like a button
import {db} from '@/db';
import paths from '@/path';


export default async function TopicList(){
 const topics= await db.topic.findMany(); 
 const renderTopics= topics.map((Topicist)=>{
return <div key={Topicist.id}>
    <Link href={paths.topicShow(Topicist.slug)}>
    <Chip>
        {Topicist.slug}
    </Chip>
    </Link>

</div>
 })
 return(
    <div>{renderTopics}</div>
 )
}
