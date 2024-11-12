"use client"
import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import * as actions from '@/actions'
import FormButton from "../common/form-button";
import { Textarea, Button } from "@nextui-org/react";

interface CommentCreateFormProps {
  postId: string,
  parentId?: string,
  startOpen?: boolean,
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen }: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen); //this means initially form is open
  const ref = useRef<HTMLFormElement | null>(null); //this one will clear the form after submission
  const [formState, action] = useFormState(actions.createComment.bind(null, { postId, parentId }), { errors: {} });

  useEffect(() => {
    if (formState.success) {  //it means if form submission is success than reset the form
      ref.current?.reset();
    }
    if (!startOpen) {
      setOpen(false)
    }

  }, [formState, startOpen])
  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 py-2">
        <Textarea
          name="content"
          placeholder="reply your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(', ')}
        />
        {formState.errors._form ? (<div className="p-2 bg-red-100 border rounded border-red-100">
          {formState.errors._form}
        </div>) : null}
        <FormButton>create comment</FormButton>
      </div>
    </form>
  );
  return (
    <div className="">
      <Button size="sm" variant="solid" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  )
}

