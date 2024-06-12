import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form"
import { useState } from 'react'


export default function LoadingButton({ isLoading } : { isLoading : boolean }) {

  console.log(isLoading)
  return (
      <Button 
          className="flex items-center gap-2"
          disabled ={isLoading}
          type="submit"
          >
          {isLoading && <Loader2 className="animate-spin" /> }
          {isLoading ? 'Uploading...' : 'Upload'}
      </Button>
  )
}