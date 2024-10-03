import Link from 'next/link';
import {Chip} from '@nextui-org/react' //the chip is some element that's kind of styled kind of like a button
import {db} from '@/db';
import paths from '@/path';


export default async function TopicList(){
    const topic= await db.topic.findMany();
    const renderTopic= topic.map((topicist)=>{
        return(
            <div key={topicist.id}>
                <div>
                    {topicist.slug}
                </div>
                <div>
                   <p>{topicist.description}</p> 
                </div>
            </div>

        )
    })
}