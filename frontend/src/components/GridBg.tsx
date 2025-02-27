"use client";

import { Grid, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Scene() {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid
        renderOrder={-1}
        position={[0, 0, 0]}
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#16ba86"
        cellColor="#21d8a7"
        fadeDistance={50}
      />
    </>
  );
}
const GridBg = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [30, 30, 30], fov: 50 }}
      className="absolute inset-0"
    >
      <Scene />
    </Canvas>
  );
};

export default GridBg;
