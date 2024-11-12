'use client'
import { Input, Popover, Button, PopoverContent, PopoverTrigger,Textarea} from '@nextui-org/react';
import FormButton from '../common/form-button';
import { createPost } from '@/actions';
import { useFormState } from 'react-dom';
interface PostCreateFormProps{
    slug: string;
}



export default function CreatePostForm({slug}: PostCreateFormProps) {
const[formState, action]= useFormState(createPost.bind(null,slug), {errors:{}})
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="secondary">Create Post</Button>
            </PopoverTrigger>


            <PopoverContent>
                <form action={action}>
                    
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        <h3 className='text-center'>Create a post</h3>
                        <Input
                        isInvalid={!!formState.errors.title}
                        errorMessage={formState.errors.title?.join(', ')}
                            label="Title"
                            placeholder='Title'
                            labelPlacement='outside'
                            name= "title"
                        />
                            <Textarea
                            isInvalid={!!formState.errors.content}
                            errorMessage={formState.errors.content?.join(', ')}
                            label="Content"
                            labelPlacement='outside'
                            name= "content"
                            placeholder='Content'
                        />
                        {
                        formState.errors._forms?<div className='rounded p-2 bg-red-100 border border-red-400 '>{formState.errors._forms.join(', ')}</div>: null    
                        }
                        <FormButton>Create</FormButton>
                    </div>
                </form>
            </PopoverContent>


        </Popover>
    )
}