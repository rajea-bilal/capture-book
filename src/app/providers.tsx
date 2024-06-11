'use client'


import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";

// to provide dark/light mode functionality across the app
import { ThemeProvider } from "@/components/theme-provider"

// setting up a convex object
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);


export function Providers({ children } : { children: React.ReactNode}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        { children }
      </ConvexProviderWithClerk>
    </ClerkProvider>
    </ThemeProvider>
    )
}