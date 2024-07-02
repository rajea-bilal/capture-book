import { BookText, NotepadText, Settings  } from "lucide-react";
import Link from "next/link";




export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="border border-red-500 flex container gap-12 pt-12">

    {/* side nav for the documents page */}
    <nav className="border w-[10rem]">
      <ul className="text-lg font-light flex flex-col gap-4">
        <li>
          <Link 
          className="hover:text-[#8FC4C9] flex items-center gap-3"
          href="/dashboard/documents">
            <BookText />
            Documents
            </Link>
        </li>

        <li>
          <Link 
          className="hover:text-[#8FC4C9] flex gap-3"
          href="/dashboard/notes">
            <NotepadText />
            Notes
            </Link>
        </li>

        <li> 
          <Link 
          className="hover:text-[#8FC4C9] flex gap-3"
          href="/dashboard/settings">
            <Settings />
            Settings
            </Link>
        </li>

      </ul>
    </nav>

    <div className="flex-1">{children}</div>
   </div>
  );
}
