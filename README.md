# Error Correction Using Surface Codes

A visual simulator demonstrating quantum-inspired error correction techniques

![Demo Gif](https://via.placeholder.com/800x400.png?text=Surface+Code+Simulation+Demo) *(Replace with actual demo GIF)*

## Overview

This project implements a classical simulation of surface code error correction, visualizing how quantum computers protect information from noise. The interactive demo allows users to:

- Encode arbitrary messages into a 2D lattice
- Introduce controlled noise (bit-flip errors)
- Observe syndrome detection and error correction
- Compare original and recovered messages

## Key Features

### Interactive Simulation
- Custom message input with real-time encoding
- Adjustable noise level (1-50% error probability)
- Step-by-step visualization of the correction process
- Detailed metrics on error rates and correction accuracy

### Educational Components
- Visual explanations of surface code fundamentals
- Animated demonstrations of:
  - Parity check measurements
  - Syndrome pattern detection
  - Error correction paths
- Technical deep dive (toggleable) explaining:
  - Stabilizer formalism
  - Logical vs physical qubits
  - Error thresholds

### Technical Implementation
- Vanilla JavaScript canvas rendering
- Responsive design for desktop/mobile
- Modular architecture:
  - Core error correction algorithms
  - Visualization engine
  - UI controller

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/surface-code-error-correction.git

# Open in browser
cd surface-code-error-correction
open index.html
