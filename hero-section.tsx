"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import LatticePreview from "@/components/lattice-preview"

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleScrollToSimulator = () => {
    const simulator = document.getElementById("simulator")
    if (simulator) {
      simulator.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={ref} className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10 z-0"
        style={{ y, opacity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center z-10 max-w-4xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-block p-2 px-4 bg-gradient-to-r from-[#0F4C81]/20 to-[#00B4D8]/20 rounded-full mb-4 backdrop-blur-sm border border-[#00B4D8]/30">
            <span className="text-[#00B4D8] font-medium">Interactive Learning Experience</span>
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0F4C81] to-[#00B4D8] mb-4">
          Error Correction with Surface Codes
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-8">An interactive journey into quantum error correction</p>

        <div className="relative w-full max-w-md mx-auto h-64 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <LatticePreview />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button
            onClick={handleScrollToSimulator}
            size="lg"
            className="bg-gradient-to-r from-[#0F4C81] to-[#00B4D8] hover:from-[#0F4C81] hover:to-[#00B4D8] hover:opacity-90 text-white shadow-lg shadow-[#00B4D8]/20"
          >
            Try the Simulator <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex justify-center space-x-8"
        >
          {[
            { label: "Interactive", value: "Simulation" },
            { label: "Educational", value: "Content" },
            { label: "Quantum", value: "Concepts" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-slate-400">{item.label}</div>
              <div className="text-lg font-medium text-white">{item.value}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <div className="animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-slate-400"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
