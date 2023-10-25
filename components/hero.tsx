import Image from "next/image";
import HeroImage from "../public/hero.png";
import HandIcon from "../public/hand.svg";
import { buttonVariants } from "./ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col lg:flex-row min-h-screen mt-5 pt-10 lg:space-x-10 justify-center ">
      <div className="flex flex-col space-y-2 pt-10 words">
        <h1 className="scroll-m-20 text-3xl font-extrabold lg:text-5xl tracking-normal">
          Raise your voices
        </h1>
        <h1 className="scroll-m-20 text-3xl font-extrabold  lg:text-5xl tracking-normal">
          Be Heard
        </h1>
        <h1 className="scroll-m-20 text-3xl font-extrabold  lg:text-5xl tracking-normal">
          Make a Change
        </h1>
        <div className="mt-3 space-y-2">
          <h4 className="scroll-m-20 text-2xl tracking-wider text-muted-foreground mt-3">
            ཁྱོད་རའི་བསམ་འཆར་འདི་མཐུན་རྐྱེན་གྱི་ཐོབ་དབང་སྦེ་འགྱུར་བཅོས་མཛད་དགོ།
          </h4>
          <h4 className="scroll-m-20 text-xl  tracking-wider">
            Your Voice, Our Catalyst for progress
          </h4>
        </div>
        <div className="p-10 flex gap-5">
          <Image
            width={40}
            height={40}
            src={HandIcon}
            alt="Hand Icon"
          />
          <a href="/login" className={buttonVariants({ variant: "default" })}>
            Voice your grievance
          </a>
        </div>
      </div>
      <div>
        <Image
          className="rounded-xl cursor-not-allowed"
          src={HeroImage}
          alt="Hero Image"
        />
      </div>
    </section>
  );
}
