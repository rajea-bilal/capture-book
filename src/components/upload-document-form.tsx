'use client'

//a hook for performing mutations (changes) to data from the Convex library.
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { z } from "zod"

//for integrating zod with react-hook-form.
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react";
import { useState } from 'react'
import LoadingButton from "./loading-button";


// Define a schema for the form using zod 
const formSchema = z.object({
  title: z.string().min(2).max(50, { 
    message: "Title must be at least 2 characters long"
  }),
})


export default function UploadDocumentForm({ onUpload } : { onUpload : () => void }) {

  const [ isSubmit, setIsSubmit ] = useState(false)

  // function to add data to db
  const createDocument = useMutation(api.documents.createDocument)

  //defining our form with type inference from the formSchema.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    }
  })
  

  //define a submit handler - what happens when we submit the form
  //the document is created in the db
  // onUpload() is executed which runs the setIsOpen setter function with false so the dialog closes as soon as the user submits the doc
  async function onSubmitForm(values: z.infer<typeof formSchema>) {
    setIsSubmit(true)
    await createDocument(values)
    onUpload()
    
    console.log(values)
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your title here" {...field} />
              </FormControl>
              <FormDescription>

              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton 
        isLoading={form.formState.isSubmitting}
        />
      </form>
    </Form>
);
}







