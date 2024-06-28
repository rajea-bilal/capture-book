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
import { z } from "zod"

//for integrating zod with react-hook-form.
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import LoadingButton from "./loading-button";
import { Id } from "../../convex/_generated/dataModel";


// Define a schema for the form using zod 
const formSchema = z.object({
  title: z.string().min(2).max(250, { 
    message: "Title must be at least 2 characters long"
  }),
  file: z.instanceof(File)
})


export default function UploadDocumentForm({ onUpload } : { onUpload : () => void }) {

  // function to add data to db
  const createDocument = useMutation(api.documents.createDocument)
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl)

  //defining our form with type inference from the formSchema.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    }
  })
  

  // define a submit handler - what happens when we submit the form
  // the document is created in the db
  // onUpload() is executed which runs the setIsOpen setter function with false so the dialog closes as soon as the user submits the doc
  async function onSubmitForm(values: z.infer<typeof formSchema>) {
    const url = await generateUploadUrl()
    console.log(url)

    // uploading the file to the url generated above - sending the file to the db
     const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": values.file.type },
        body: values.file,
    });

    // The ID returned from the server after uploading the file. It's assumed to be a unique identifier for the uploaded file.
    const response = await result.json();
    const storageId = response.storageId;

    // Adds a new document record in the database with the title and file ID.
    //a type indicating that the fileId should be an ID referencing a storage object 
    await createDocument({
      title: values.title,
      fileId: storageId as Id<"_storage">,
    })
    // Calls the onUpload function to possibly close the form or update the UI.
    onUpload()
    // console.log(values)
    
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="space-y-8">

      {/* enter title field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your title here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* upload file field */}
        <FormField
          control={form.control}
          name="file"
          //defines how this field should be rendered.
          render={({ field : { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input 
                type="file" 
                {...fieldProps} 
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  onChange(file)
                }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton 
        isLoading={form.formState.isSubmitting}
        loadingText="Uploading"
        >Upload</LoadingButton>
      </form>
    </Form>
);
}







