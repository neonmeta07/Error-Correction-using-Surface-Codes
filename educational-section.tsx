"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function EducationalSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={ref} className="relative py-24 px-4">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 180, 216, 0.1) 0%, rgba(15, 76, 129, 0.05) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            What is a Surface Code?
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-lg text-slate-300 mb-4">
                  Think of a Surface Code like a crossword puzzle where errors reveal themselves through mismatched
                  clues.
                </p>
                <p className="text-lg text-slate-300 mb-4">
                  It's a powerful quantum error correction technique that spreads information across a grid of qubits,
                  making it resilient against noise and errors.
                </p>
                <p className="text-lg text-slate-300">
                  <span className="text-[#00B4D8] font-medium">In simple terms:</span> Surface codes help protect
                  quantum information from errors, just like how backup copies protect your important files.
                </p>
              </motion.div>
            </div>

            <div className="md:w-1/2 h-64 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-full h-full bg-slate-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center border border-slate-700"
              >
                <div className="grid grid-cols-5 gap-1 w-4/5 h-4/5">
                  {Array(25)
                    .fill(0)
                    .map((_, i) => {
                      // Randomly assign colors for demonstration
                      const colors = ["#2ECC71", "#FF6B6B", "#00B4D8"]
                      const colorIndex = Math.floor(Math.random() * 3)

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.5 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: i * 0.02 }}
                          className="rounded-md"
                          style={{ backgroundColor: colors[colorIndex] }}
                        />
                      )
                    })}
                </div>
              </motion.div>
              <div className="absolute bottom-2 right-2 text-xs text-slate-400">
                Green = correct, Red = error, Blue = correction
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div style={{ y }} className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Encode",
                description:
                  "Data is spread across a grid of qubits, creating redundancy that protects against errors.",
                icon: "📊",
                color: "from-[#0F4C81] to-[#0F4C81]/70",
              },
              {
                title: "2. Detect",
                description: "Parity checks (syndromes) flag errors by identifying inconsistencies in the grid.",
                icon: "🔍",
                color: "from-[#00B4D8] to-[#00B4D8]/70",
              },
              {
                title: "3. Correct",
                description: "Identified errors are fixed by flipping bits back using syndrome patterns.",
                icon: "🔧",
                color: "from-[#2ECC71] to-[#2ECC71]/70",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 hover:border-[#00B4D8]/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                  {step.title}
                </h3>
                <p className="text-slate-300">{step.description}</p>
                <div className={`h-1 w-16 mt-4 rounded bg-gradient-to-r ${step.color}`}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
