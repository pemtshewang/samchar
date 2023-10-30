import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import localFont from 'next/font/local'
import { Toaster } from "@/components/ui/toaster"

const myFont = localFont({
  src: '../assets/fonts/static/Inter-Regular.ttf',
  display: 'swap',
})

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <html lang="en" className={cn(myFont.className)}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="container mx-auto">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html >
  )
}
