"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TechnicalDeepDive() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="py-16 px-4 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <div className="border border-slate-800 rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <h2 className="text-2xl font-bold">Technical Deep Dive</h2>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">Why 5x5 Grid?</h3>
                    <p className="text-slate-300">
                      Larger grids can handle higher noise levels. A 5x5 grid provides a good balance between error
                      correction capability and visual simplicity for educational purposes. In real quantum computers,
                      much larger surface codes are used.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">The Mathematics Behind Surface Codes</h3>
                    <p className="text-slate-300 mb-4">
                      Surface codes use topological properties to protect quantum information. The code distance (d)
                      determines how many errors can be corrected, with a 5x5 code having d=3, meaning it can correct at
                      least one error.
                    </p>
                    <p className="text-slate-300">
                      The theoretical threshold for surface codes is around 1%, meaning that if the physical error rate
                      is below 1%, the logical error rate can be made arbitrarily small by increasing the code size.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">Data Flow Diagram</h3>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <div className="flex flex-col md:flex-row items-center justify-between text-center">
                        {["Encoding", "Noise Injection", "Syndrome Detection", "Error Correction"].map(
                          (step, index) => (
                            <div key={index} className="flex flex-col items-center p-2">
                              <div className="w-16 h-16 rounded-full bg-[#0F4C81] flex items-center justify-center mb-2">
                                {index + 1}
                              </div>
                              <div className="text-sm">{step}</div>
                              {index < 3 && <div className="hidden md:block text-2xl mx-4">→</div>}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-[#00B4D8]">Decoding Algorithms</h3>
                    <p className="text-slate-300">
                      Real surface code decoders use sophisticated algorithms like Minimum-Weight Perfect Matching or
                      Union-Find to identify the most likely error pattern given a syndrome measurement. Our simulator
                      uses a simplified version for educational purposes.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
