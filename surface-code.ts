// Encode a message to binary
export function encodeMessage(message: string): string {
  return message
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("")
}

// Inject noise into the grid
export function injectNoise(grid: boolean[][], noiseLevel: number): { noisyGrid: boolean[][]; errorCount: number } {
  const noisyGrid = grid.map((row) => [...row])
  let errorCount = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // Randomly flip bits based on noise level
      if (Math.random() < noiseLevel) {
        noisyGrid[i][j] = !noisyGrid[i][j]
        errorCount++
      }
    }
  }

  return { noisyGrid, errorCount }
}

// Detect syndromes (error indicators)
export function detectSyndromes(grid: boolean[][]): boolean[][] {
  const syndromes = Array(grid.length)
    .fill(0)
    .map(() => Array(grid[0].length).fill(false))

  // Simplified syndrome detection - in a real surface code, this would use parity checks
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[i].length - 1; j++) {
      // Check if this bit is different from its neighbors
      const neighbors = [grid[i - 1][j], grid[i + 1][j], grid[i][j - 1], grid[i][j + 1]]

      const parityViolation = neighbors.filter((n) => n).length % 2 !== 0
      syndromes[i][j] = parityViolation
    }
  }

  return syndromes
}

// Correct errors based on syndromes
export function correctErrors(grid: boolean[][], syndromes: boolean[][]): boolean[][] {
  const correctedGrid = grid.map((row) => [...row])

  // Simplified error correction algorithm
  for (let i = 0; i < syndromes.length; i++) {
    for (let j = 0; j < syndromes[i].length; j++) {
      if (syndromes[i][j]) {
        // Find the most likely error location (simplified)
        // In a real decoder, this would use more sophisticated algorithms
        const neighbors = [
          { i: i - 1, j },
          { i: i + 1, j },
          { i, j: j - 1 },
          { i, j: j + 1 },
        ].filter(({ i, j }) => i >= 0 && i < grid.length && j >= 0 && j < grid[0].length)

        // Flip the bit that's most likely to be an error
        // (simplified - just pick the first valid neighbor)
        if (neighbors.length > 0) {
          const { i: ni, j: nj } = neighbors[0]
          correctedGrid[ni][nj] = !correctedGrid[ni][nj]
        }
      }
    }
  }

  return correctedGrid
}
