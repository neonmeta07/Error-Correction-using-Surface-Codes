"use client"

import { motion } from "framer-motion"

interface SurfaceCodeGridProps {
  grid: boolean[][]
  syndromes: boolean[][]
  step: number
}

export default function SurfaceCodeGrid({ grid, syndromes, step }: SurfaceCodeGridProps) {
  if (!grid.length) return null

  return (
    <div className="w-full h-full grid grid-cols-5 gap-2 p-4">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          // Determine if this cell has an error (for step 3)
          const hasError = step === 3 && Math.random() < 0.3

          // Determine if this cell is near a syndrome (for step 4)
          const isNearSyndrome =
            step >= 4 &&
            syndromes.length > 0 &&
            syndromes.some(
              (s, i) =>
                Math.abs(i - rowIndex) <= 1 &&
                Math.abs(s.findIndex((val, j) => val && Math.abs(j - colIndex) <= 1) !== -1),
            )

          return (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: 1,
                opacity: 1,
                backgroundColor:
                  step === 3 && hasError
                    ? "#FF6B6B"
                    : step >= 4 && isNearSyndrome
                      ? "#2ECC71"
                      : cell
                        ? "#00B4D8"
                        : "#0F4C81",
              }}
              transition={{
                duration: 0.4,
                delay: (rowIndex * 5 + colIndex) * 0.02,
              }}
              className="rounded-md flex items-center justify-center relative"
            >
              {cell ? "1" : "0"}

              {/* Syndrome indicator */}
              {step >= 4 && syndromes[rowIndex]?.[colIndex] && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.4, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                  className="absolute inset-0 bg-yellow-400 rounded-md -z-10"
                />
              )}

              {/* Correction ripple effect */}
              {step === 5 && isNearSyndrome && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1.5],
                    opacity: [0.8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: 2,
                    repeatType: "loop",
                  }}
                  className="absolute inset-0 bg-green-400 rounded-full -z-10"
                />
              )}
            </motion.div>
          )
        }),
      )}
    </div>
  )
}
