import { Button, buttonVariants } from "./ui/button";
import Link from "next/link"

export default function ButtonLink() {
  return (
    <Link href="/dashboard/my-grievances/report" className={
      buttonVariants({ variant: "default" })
    }>
      <Button className={buttonVariants({ variant: "default" })}>Report</Button>
    </Link>
  )
}
