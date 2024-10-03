'use client'
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import FormButton from "../common/form-button";
import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@nextui-org/react";
export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopics, { errors: {} });
    return (
        <Popover placement="left">
            <PopoverTrigger>
                <Button color="secondary">Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className="flex flex-col gap-4 p-4 w-80">
                        <h3 className="text-lg"> Create a Topic</h3>
                        <Input
                            name="name"
                            label="Name"
                            labelPlacement="outside"
                            placeholder="Name"
                            isInvalid={!!formState.errors.name}
                            errorMessage={formState.errors.name?.join(', ')} />

                        <Textarea
                            name="description"
                            label="Description"
                            labelPlacement="outside"
                            placeholder="Describe your Topic"
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(', ')} />
                        {formState.errors._form ? (<div className="rounded p-2 bg-red200 border border-red400">{formState.errors._form?.join(', ')}</div>) : null}
                      <FormButton>save</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}