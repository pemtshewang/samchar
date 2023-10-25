import { Icons } from "@/components/icons";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Icons.spinner2 className="w-5 h-5 animate-spin" />
      <p className="text-center">Loading Page</p>
    </div>
  )
}
