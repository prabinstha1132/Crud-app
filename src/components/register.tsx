"ues client"
import { Button, Popover, Input, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import * as actions from "@/actions"

export default function RegisterUser(){
return(
    <Popover>
        <PopoverTrigger><Button color="secondary">Sign Up</Button></PopoverTrigger>
        
            <PopoverContent>
            <form action={actions.RegisterAction}>
                <div className='flex flex-col gap-4 w-80 p-4'>
                    <Input
                    id='firstname'
                    label="firstname"
                    placeholder='firstname'
                    name="firstname"
                    labelPlacement='outside'/>
                       <Input
                       id="lastname"
                    label="lastname"
                    placeholder='lastname'
                    name="lastname"
                    labelPlacement='outside'/>
                       <Input
                       id="email"
                    label="email"
                    placeholder='email'
                    name="email"
                    labelPlacement='outside'/>
                       <Input
                       id="password"
                    label="password"
                    placeholder='password'
                    name="password"
                    labelPlacement='outside'/>
                    <Button type="submit" color='primary'>Register</Button>
                   
                    

                </div>

            </form>
            </PopoverContent>
        
    </Popover>
)
}