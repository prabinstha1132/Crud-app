import Link from 'next/link';
import { Chip } from '@nextui-org/react' //the chip is some element that's kind of styled kind of like a button
import { db } from '@/db';
import paths from '@/path';


export default async function TopicList() {
    const topic = await db.topic.findMany();
    const renderTopic = topic.map((topicist) => {
        return (
            <div key={topicist.id}>

                <Link href={paths.topicShow(topicist.slug)}><Chip color="warning" variant="shadow">{topicist.slug}</Chip></Link>
            </div>


        )
    })
    return ( 
        <div className='flex flex-row flex-wrap gap-2'>{renderTopic}</div>
    )
}
