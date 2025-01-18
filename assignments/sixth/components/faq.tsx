import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is your cancellation policy?",
    answer: "Our standard cancellation policy allows for full refunds if cancelled 48 hours before check-in. Different properties may have varying policies, please check the specific property details."
  },
  {
    question: "How do I make a reservation?",
    answer: "You can make a reservation by selecting your desired property, choosing your dates, and clicking the 'Book Now' button. Follow the prompts to complete your booking."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard), debit cards, and PayPal. Payment is secured and encrypted."
  },
  {
    question: "Is there a security deposit?",
    answer: "Yes, most properties require a security deposit which is fully refundable within 7 days after check-out, provided no damages occur during your stay."
  },
  {
    question: "What time is check-in and check-out?",
    answer: "Standard check-in time is 3:00 PM and check-out is 11:00 AM. Early check-in or late check-out may be available upon request."
  }
]

export function FAQ() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

