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
          <Button variant="secondary">
            View
          </Button>
        </CardFooter>
    </Card>

  )
}

