import { Icons } from "@/components/icons"
export default function LoadingPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <Icons.spinner2 className="mr-2 h-15 w-15 animate-spin" />
      <span>Fetching data</span>
    </div >
  )
}
