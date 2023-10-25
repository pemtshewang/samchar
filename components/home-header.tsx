import { AuthNav } from "./auth-nav";
import { MainNav } from "./main-nav";
import { BrandLogo } from "./brand";
import { mainNavConfig } from "@/config/main-nav";
import { authNavConfig } from "@/config/auth-nav";
import { ModeToggle } from "./ui/mode-toggle";

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background flex h-16 justify-between">
      <div>
        <BrandLogo />
      </div>
      <MainNav items={mainNavConfig.mainNav} />
      <AuthNav items={authNavConfig.authNav} />
      <div className="flex flex-col items-center justify-center">
        <ModeToggle />
      </div>
    </header>
  );
}
