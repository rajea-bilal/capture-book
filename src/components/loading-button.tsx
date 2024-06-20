import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode } from "react";



export default function LoadingButton({ 
  isLoading, 
  children,
  loadingText
} : { 
  isLoading : boolean,
  children: ReactNode,
  loadingText: string
}) {


  return (
      <Button 
          className=""
          disabled ={isLoading}
          type="submit"
          >
          {isLoading && <Loader2 className="animate-spin" /> }
          {isLoading ? loadingText : children}
      </Button>
  )
}