import { redirect } from "next/navigation"


export default function DashboardPage() {


  return (
    <main className="border p-24 container">
      redirect('/dashboard/documents')
   
    </main>
  );
}
