import Image from "next/image";
import GovLogo from "../public/correct.svg";
import PersonLogo from "../public/person.svg";
import CorrectLogo from "../public/correctlast.svg";
import { TypographyH3 } from "./typography/typography";

export default function FeatureSection() {
  return (
    <section className="space-y-10">
      <TypographyH3 className="text-center tracking-wide">Features of Samchar</TypographyH3>
      <div className="flex flex-col sm:flex-row justify-evenly items-center sm:space-x-5 lg:space-x-10 mt-5 pt-5">
        <div className="flex flex-col items-center space-y-5">
          <Image
            className="rounded-xl"
            src={PersonLogo}
            alt="Hero Image"
            width={100}
            height={100}
          />
          <h3 className="scroll-m-20 font-extralight tracking-normal">
            Grievance Confidentiality at its best
          </h3>
        </div>
        <div className="flex flex-col items-center space-y-5">
          <Image
            className="rounded-xl"
            src={GovLogo}
            alt="Hero Image"
            width={100}
            height={100}
          />
          <h3 className="scroll-m-20 font-extralight tracking-normal">
            From voices to Management actions
          </h3>
        </div>
        <div className="flex flex-col items-center space-y-5">
          <Image
            className="rounded-xl"
            src={CorrectLogo}
            alt="Hero Image"
            width={100}
            height={100}
          />
          <h3 className="scroll-m-20 font-extralight tracking-normal">
            Empowering Validated Grievances
          </h3>
        </div>
      </div>
    </section>
  );
}

