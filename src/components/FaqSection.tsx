import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is kayaking suitable for absolute beginners?",
    answer: "Yes, all our guided kayaking tours are beginner-friendly. No prior kayaking or swimming experience is required. Our certified instructors provide a full safety briefing and paddling instruction before every launch."
  },
  {
    question: "What is the best time of the day for kayaking?",
    answer: "Early mornings (6:00 AM - 8:30 AM) and late afternoons (3:30 PM - 6:30 PM) are the best times. These slots offer pleasant weather, calm waters, and beautiful sunrise or sunset views along the Kadambrayar."
  },
  {
    question: "What safety equipment is provided, and is it safe?",
    answer: "Safety is our number one priority. Every paddler is equipped with high-buoyancy, certified life jackets. All tours are accompanied by local expert rescue guides who are certified first responders."
  },
  {
    question: "What is the minimum age for kids to participate?",
    answer: "Children above 5 years can participate when accompanied by a parent or guardian. We have special kid-sized life jackets to ensure a safe and comfortable fit."
  },
  {
    question: "Can we dine at the restaurant without booking a kayak tour?",
    answer: "Absolutely! Our Hooked & Cooked – River Dine restaurant is open to everyone. You can enjoy traditional Kerala seafood and fresh local delicacies right beside the waterfront."
  },
  {
    question: "What should I wear and bring for the kayaking session?",
    answer: "We recommend comfortable sportswear, quick-dry t-shirts, and shorts. Avoid heavy cotton or denim. Bring a change of clothes, sunscreen, sunglasses, and waterproof pouches for your phones."
  },
  {
    question: "Where is the boat club located and how do we reach?",
    answer: "We are located on the serene Kadambrayar River near Kakkanad, Kochi (Latitude 10.036456, Longitude 76.386922). It is just a 10-minute drive from Kakkanad Infopark and SmartCity Kochi."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq-section" className="py-24 bg-abyss-black text-white relative overflow-hidden select-none">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-radial from-glacier-cyan/5 to-transparent blur-3xl opacity-60 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-glacier-cyan/20 bg-glacier-cyan/5 text-glacier-cyan text-[10px] font-mono tracking-[0.25em] uppercase mb-4 shadow-sm">
            <HelpCircle size={12} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 font-sans">
            Frequently Asked <span className="text-glacier-cyan">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto font-sans font-light leading-relaxed">
            Everything you need to know about our kayaking adventures, safety rules, and waterfront dining experience.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.04 }}
                className="border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 bg-[#091F27]/40 backdrop-blur-md hover:border-glacier-cyan/30"
                style={{
                  boxShadow: isOpen ? '0 10px 30px rgba(115, 230, 216, 0.04)' : 'none'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none transition-colors"
                  style={{
                    color: isOpen ? '#73E6D8' : '#E8E3D8'
                  }}
                >
                  <span className="text-sm sm:text-base font-bold tracking-wide font-sans">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="shrink-0 text-gray-400"
                    style={{
                      color: isOpen ? '#73E6D8' : 'currentColor'
                    }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-white/5 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans font-light">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
