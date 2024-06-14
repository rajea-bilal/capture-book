import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Doc } from "../../convex/_generated/dataModel"
import { Button } from "./ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"



export function PageCard({ document }: {document: Doc<"documents"> }) {

  console.log(document?.title)
  return (
      <Card>
        <CardHeader>
          <CardTitle>{document?.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <p>Card Content</p>
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


