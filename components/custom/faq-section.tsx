"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <motion.section
      className="py-20 bg-gray-950"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-100 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-300">Everything you need to know about blood donation and our platform.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-gray-800">
              <AccordionTrigger className="text-gray-100 hover:text-red-500 py-4">
                Who can donate blood?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Generally, you can donate blood if you are in good health, at least 17 years old (16 with parental
                consent in some states), weigh at least 110 pounds, and meet other eligibility criteria. Specific
                requirements may vary by location and blood center.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-gray-800">
              <AccordionTrigger className="text-gray-100 hover:text-red-500 py-4">
                How often can I donate blood?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Whole blood donors can typically donate every 56 days (8 weeks). Platelet donors may donate more
                frequently, up to 24 times per year. Double red cell donors can donate every 112 days (16 weeks).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-gray-800">
              <AccordionTrigger className="text-gray-100 hover:text-red-500 py-4">
                How long does the donation process take?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                The entire blood donation process takes about one hour, though the actual blood collection usually takes
                only 8-10 minutes. This includes registration, a mini-physical, the donation, and refreshments
                afterward.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-gray-800">
              <AccordionTrigger className="text-gray-100 hover:text-red-500 py-4">
                Is blood donation safe?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Yes, blood donation is very safe. All equipment used is sterile and disposed of after a single use. The
                process is conducted by trained professionals who follow strict safety protocols to ensure donor safety.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-gray-800">
              <AccordionTrigger className="text-gray-100 hover:text-red-500 py-4">
                How does BloodLink protect my personal information?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                BloodLink takes data privacy seriously. We use industry-standard encryption and security measures to
                protect your personal information. Your data is only shared with authorized medical facilities when
                necessary for blood donation purposes, and we never sell your information to third parties.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </motion.section>
  )
}

