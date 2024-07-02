import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Doc } from "../../../../convex/_generated/dataModel"
import { Button } from "../../../components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"
import { Loader2 } from "lucide-react";



export function PageCard({ document }: {document: Doc<"documents"> }) {

  console.log(document?.title)
  return (
      <Card>
        <CardHeader>
          <CardTitle>{document?.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
         <p>{!document.description ? (<div className="flex justify-center"><Loader2 className="animate-spin"/></div>) : 
         (document.description)}</p>
          
         
        </CardContent>

        <CardFooter>
           <Link href={`/documents/${document._id}`}>
            <Button variant="secondary" className="flex items-center gap-2 ">
              <Eye className="w-4 h-4" /> View
            </Button>
           </Link>
        </CardFooter>
    </Card>

  )
}


