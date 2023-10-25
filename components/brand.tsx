import LogoLight from "@/public/logolight.png";
import Image from "next/image";
import Link from "next/link";

export function BrandLogo() {
  return (
    <Link href="/" >

      <Image
        //zoom the logo using tailwind
        className="transform lg:scale-150 lg:ml-8 h-20 w-20"
        src={LogoLight}
        alt="logo"
      />
    </Link>
  )
}
