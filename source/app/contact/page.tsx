"use client"

import { useEffect, useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { useAuth } from "@/context/AuthContext"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

type FAQItem = {
  question: string
  answer: string
}

const initialFaqs: FAQItem[] = [
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

const LOCAL_FAQ_KEY = "faqs"

export default function Contact() {
  const { isLoggedIn } = useAuth()
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // On mount, load from localStorage if available
  useEffect(() => {
    setIsMounted(true)
    const stored = localStorage.getItem(LOCAL_FAQ_KEY)
    if (stored) {
      setFaqs(JSON.parse(stored))
    }
  }, [])

  // Save to localStorage whenever faqs change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(LOCAL_FAQ_KEY, JSON.stringify(faqs))
    }
  }, [faqs, isMounted])

  const handleAddFAQ = (e: React.FormEvent) => {
    e.preventDefault()
    setFaqs(prev => [...prev, { question, answer }])
    setSubmitted(true)
    setQuestion("")
    setAnswer("")
    setTimeout(() => setSubmitted(false), 2000)
  }

  // Delete FAQ by index
  const handleDeleteFAQ = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow container mx-auto px-6 py-8">
        {isLoggedIn && (
          <div className="mb-4 text-green-600 font-semibold text-lg text-center">
            Logged in as Admin!
          </div>
        )}
        <h1 className="text-4xl font-bold mb-8 text-center">Contact</h1>
        <div className="max-w-3xl w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <strong>Address:</strong><br />
                  Pasike 14, Tugare<br />
                  21252 Split, Croatia
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong><br />
                  info@airbi.com
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong><br />
                  +385 (0)21 123 456
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Office Hours</h2>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
        {/* FAQ Accordion with arrow and delete */}
        {isMounted && (
          <div className="max-w-3xl w-full mx-auto mb-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <div className="flex items-center justify-between">
                    <AccordionTrigger className="text-left flex-1">
                      {faq.question}
                    </AccordionTrigger>
                    {isLoggedIn && (
                      <button
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        onClick={() => handleDeleteFAQ(idx)}
                        type="button"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
        {isLoggedIn && isMounted && (
          <div className="mt-12 max-w-3xl w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add FAQ</h2>
            <form onSubmit={handleAddFAQ} className="space-y-4 bg-gray-50 p-6 rounded shadow">
              <div>
                <label className="block font-semibold mb-1" htmlFor="faq-question">Question</label>
                <input
                  id="faq-question"
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1" htmlFor="faq-answer">Answer</label>
                <textarea
                  id="faq-answer"
                  className="w-full border px-3 py-2 rounded"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                disabled={submitted}
              >
                {submitted ? "Added!" : "Add FAQ"}
              </button>
            </form>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

