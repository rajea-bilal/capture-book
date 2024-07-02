'use client'

//a hook for performing mutations (changes) to data from the Convex library.
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
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
import { z } from "zod"

//for integrating zod with react-hook-form.
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import LoadingButton from "../../../components/loading-button";
import { Id } from "../../../../convex/_generated/dataModel";
import { Textarea } from "@/components/ui/textarea";


// Define a schema for the form using zod 
const formSchema = z.object({
  text: z.string().min(2).max(2500, { 
    message: "Title must be at least 2 characters long"
  }),
 
})


export default function CreateNoteForm({ onNoteCreated } : { onNoteCreated : () => void }) {

  // function to add data to db
  const createNote = useMutation(api.notes.createNote)

  //defining our form with type inference from the formSchema.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: ""
    }
  })
  

  // define a submit handler - what happens when we submit the form
  // the document is created in the db
  // onUpload() is executed which runs the setIsOpen setter function with false so the dialog closes as soon as the user submits the doc
  async function onSubmitForm(values: z.infer<typeof formSchema>) {

    // Adds a new note record in the database with the text

    await createNote({
      text: values.text,
    })
    // Calls the onUpload function to possibly close the form or update the UI.
    onNoteCreated()
    // console.log(values)
    
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">

      {/* enter title field */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea 
                rows={8} 
                placeholder="Enter your title here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton 
        isLoading={form.formState.isSubmitting}
        loadingText="Creating..."
        >Create</LoadingButton>
      </form>
    </Form>
);
}







