"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function LatticePreview() {
  const [grid, setGrid] = useState<boolean[][]>(
    Array(5)
      .fill(0)
      .map(() => Array(5).fill(false)),
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid.map((row) => [...row])]
        // Randomly toggle 1-3 bits
        const numToggles = Math.floor(Math.random() * 3) + 1
        for (let i = 0; i < numToggles; i++) {
          const row = Math.floor(Math.random() * 5)
          const col = Math.floor(Math.random() * 5)
          newGrid[row][col] = !newGrid[row][col]
        }
        return newGrid
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-5 gap-1 w-full h-full">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <motion.div
            key={`${rowIndex}-${colIndex}`}
            initial={{ scale: 0.8 }}
            animate={{
              scale: 1,
              backgroundColor: cell ? "#00B4D8" : "#0F4C81",
            }}
            transition={{ duration: 0.3 }}
            className="rounded-md flex items-center justify-center"
          >
            {cell ? "1" : "0"}
          </motion.div>
        )),
      )}
    </div>
  )
}
