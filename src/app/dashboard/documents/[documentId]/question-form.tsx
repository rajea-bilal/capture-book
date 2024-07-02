import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAction } from "convex/react"
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { z } from "zod"

//for integrating zod with react-hook-form.
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import LoadingButton from "@/components/loading-button";

// Define a schema for the form using zod 
const formSchema = z.object({
  text: z.string().min(2).max(250, { 
    message: "Question must be at least 2 characters long"
  }),
 
})

export function QuestionForm({ documentId }: { documentId : Id<"documents"> }) {

  

    const askQuestion = useAction(api.documents.askQuestion)


    // useForm is a hook from the react-hook-form library, used to manage form state and validation.
     //defining our form with type inference from the formSchema.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
        defaultValues: {
          text: ""
        }
      })
    
      // onSubmitForm takes one parameter values, which is typed as z.infer<typeof formSchema>. This means that values must conform to the shape defined by formSchema.
    async function onSubmitForm(values: z.infer<typeof formSchema>) {
        await askQuestion({ question: values.text, documentId }).then(console.log)
        form.reset()
      }
    


    return (
  
      <Form {...form} >
        <form 
        onSubmit={form.handleSubmit(onSubmitForm)} 
        className="flex gap-4"
        >

        {/* enter title field */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex-1">
                {/* <FormLabel>Question</FormLabel> */}
                <FormControl>
                  <Input placeholder="Enter your question here" {...field} className=""/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton 
          isLoading={form.formState.isSubmitting} 
          loadingText="Submitting..."
          
          >
            Ask
          </LoadingButton>
      </form>
    </Form>
  )
}