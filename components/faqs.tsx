import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqConfig } from "@/config/faq";
import { TypographyH3 } from "./typography/typography";

export default function FAQPage() {

  return (
    <Accordion type="single" collapsible className="py-5 mt-20">
      <TypographyH3 className="text-center mb-5 pb-5 tracking-wide">
        Frequently Asked Questions
      </TypographyH3>
      {
        faqConfig.map((item, index) => {
          return (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          )
        })
      }
    </Accordion>
  )
}
