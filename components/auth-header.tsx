import { ModeToggle } from "./ui/mode-toggle";
import { BrandLogo } from "./brand";
export default function AuthPageHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background flex h-16 justify-between">
      <div>
        <BrandLogo />
      </div>
      <div className="flex flex-col items-center justify-center">
        <ModeToggle />
      </div>
    </header>
  );
}
