"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, Play } from "lucide-react"
import SurfaceCodeGrid from "@/components/surface-code-grid"
import { encodeMessage, injectNoise, detectSyndromes, correctErrors } from "@/lib/surface-code"

export default function InteractiveSimulator() {
  const [message, setMessage] = useState("Hello")
  const [noiseLevel, setNoiseLevel] = useState(10)
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [binaryData, setBinaryData] = useState<string>("")
  const [encodedGrid, setEncodedGrid] = useState<boolean[][]>([])
  const [noisyGrid, setNoisyGrid] = useState<boolean[][]>([])
  const [syndromes, setSyndromes] = useState<boolean[][]>([])
  const [correctedGrid, setCorrectedGrid] = useState<boolean[][]>([])
  const [metrics, setMetrics] = useState({ errorsIntroduced: 0, accuracy: 100 })

  const simulatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Make sure the ID is set for scrolling from the hero section
    if (simulatorRef.current) {
      simulatorRef.current.id = "simulator"
    }
  }, [])

  const runSimulation = async () => {
    setIsSimulating(true)
    setCurrentStep(0)

    // Step 1: Convert to binary
    const binary = encodeMessage(message)
    setBinaryData(binary)
    setCurrentStep(1)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 2: Generate lattice
    const grid = generateGrid(binary)
    setEncodedGrid(grid)
    setCurrentStep(2)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 3: Inject noise
    const { noisyGrid, errorCount } = injectNoise(grid, noiseLevel / 100)
    setNoisyGrid(noisyGrid)
    setCurrentStep(3)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 4: Detect syndromes
    const detectedSyndromes = detectSyndromes(noisyGrid)
    setSyndromes(detectedSyndromes)
    setCurrentStep(4)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 5: Correct errors
    const corrected = correctErrors(noisyGrid, detectedSyndromes)
    setCorrectedGrid(corrected)

    // Calculate metrics
    const totalBits = grid.length * grid[0].length
    const accuracy = calculateAccuracy(grid, corrected)
    setMetrics({
      errorsIntroduced: errorCount,
      accuracy,
    })

    setCurrentStep(5)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSimulating(false)
  }

  const generateGrid = (binary: string): boolean[][] => {
    // Simple implementation - in a real app, this would use actual Surface Code encoding
    const grid = Array(5)
      .fill(0)
      .map(() => Array(5).fill(false))

    // Fill the grid with binary data (simplified)
    let index = 0
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (index < binary.length) {
          grid[i][j] = binary[index] === "1"
          index++
        }
      }
    }

    return grid
  }

  const calculateAccuracy = (original: boolean[][], corrected: boolean[][]): number => {
    let correct = 0
    let total = 0

    for (let i = 0; i < original.length; i++) {
      for (let j = 0; j < original[i].length; j++) {
        total++
        if (original[i][j] === corrected[i][j]) {
          correct++
        }
      }
    }

    return Math.round((correct / total) * 100)
  }

  const stepTitles = [
    "Ready to simulate",
    "Converting to binary",
    "Generating lattice",
    "Injecting noise",
    "Detecting syndromes",
    "Correcting errors",
  ]

  return (
    <section ref={simulatorRef} className="py-24 px-4">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(15, 76, 129, 0.1) 0%, rgba(0, 180, 216, 0.05) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            Interactive Simulator
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Try it yourself! Enter a message, adjust the noise level, and see how Surface Codes protect your data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold mb-6">Controls</h3>

            <div className="space-y-6">
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your message
                </label>
                <Input
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message (e.g., 'Quantum computing')"
                  className="bg-slate-700 border-slate-600"
                  maxLength={25}
                  disabled={isSimulating}
                />
                <p className="text-xs text-slate-400 mt-1">Enter a word or short sentence (max 25 chars)</p>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <label htmlFor="noise-level" className="block text-sm font-medium">
                    Noise level: {noiseLevel}%
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                          <HelpCircle className="h-4 w-4" />
                          <span className="sr-only">Noise level info</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Higher values = more errors</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Slider
                  id="noise-level"
                  value={[noiseLevel]}
                  onValueChange={(value) => setNoiseLevel(value[0])}
                  min={1}
                  max={50}
                  step={1}
                  disabled={isSimulating}
                />
              </div>

              <Button
                onClick={runSimulation}
                disabled={isSimulating || !message.trim()}
                className="w-full bg-gradient-to-r from-[#0F4C81] to-[#00B4D8] hover:opacity-90 shadow-md shadow-[#00B4D8]/20"
              >
                <Play className="mr-2 h-4 w-4" />
                Run Simulation
              </Button>

              {currentStep > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Current step:</h4>
                  <div className="bg-slate-700 p-3 rounded text-center">{stepTitles[currentStep]}</div>

                  {currentStep === 1 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Binary representation:</h4>
                      <div className="bg-slate-700 p-3 rounded overflow-x-auto">
                        <code className="text-[#00B4D8]">{binaryData}</code>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="mt-4 space-y-2">
                      <div className="bg-slate-700 p-3 rounded flex justify-between">
                        <span>Errors introduced:</span>
                        <span className="font-bold text-[#FF6B6B]">
                          {metrics.errorsIntroduced}/{encodedGrid.length * encodedGrid[0].length} bits
                        </span>
                      </div>
                      <div className="bg-slate-700 p-3 rounded flex justify-between">
                        <span>Accuracy:</span>
                        <span className="font-bold text-[#2ECC71]">{metrics.accuracy}%</span>
                      </div>
                      <div className="bg-slate-700 p-3 rounded mt-2">
                        <span className="block mb-1">Original message:</span>
                        <span className="font-bold text-[#00B4D8]">{message}</span>
                      </div>
                      <div className="bg-slate-700 p-3 rounded">
                        <span className="block mb-1">Decoded message:</span>
                        <span className="font-bold text-[#2ECC71]">
                          {metrics.accuracy > 90 ? message : "Error: Message corrupted"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-bold mb-6">Visualization</h3>

            <div className="aspect-square relative">
              <AnimatePresence mode="wait">
                {currentStep < 2 ? (
                  <motion.div
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <p className="text-slate-400 text-lg">
                      {currentStep === 0
                        ? "Set parameters and run the simulation to see error correction in action."
                        : "Converting to binary..."}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <SurfaceCodeGrid
                      grid={
                        currentStep === 2
                          ? encodedGrid
                          : currentStep === 3
                            ? noisyGrid
                            : currentStep >= 4
                              ? correctedGrid
                              : []
                      }
                      syndromes={currentStep >= 4 ? syndromes : []}
                      step={currentStep}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <h4 className="font-medium mb-2 text-[#00B4D8]">What's happening:</h4>
              <p className="text-slate-300">
                {currentStep === 0 &&
                  "Set your message and noise level, then run the simulation to see error correction in action."}
                {currentStep === 1 && "Converting your message to binary code (0s and 1s) that computers understand."}
                {currentStep === 2 &&
                  "Spreading your data across a grid. This redundancy is like having multiple copies of your message."}
                {currentStep === 3 &&
                  "Adding random errors based on your noise level. In real quantum computers, these errors happen naturally."}
                {currentStep === 4 &&
                  "Detecting where errors might be using 'syndromes' (yellow pulses). These are like alarm bells that ring when data is corrupted."}
                {currentStep === 5 &&
                  "Correcting the errors by flipping bits back to their original state. Green ripples show the correction process."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
