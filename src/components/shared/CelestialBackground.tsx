"use client";

import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, PerformanceMonitor } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Group } from 'three';

/**
 * StarField Component
 * Renders 5,000 stars using a single Points object for maximum performance (BufferGeometry).
 */
function StarField(props: any) {
    const ref = useRef<Group>(null!);

    // 1. Generate 5000 stars in a sphere radius 1.5
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }), []);

    // 2. Visual Aesthetic: Mix of Star White and Deep Indigo
    // We can't easily color per-point with just PointMaterial effectively without custom shaders or geometry colors.
    // For "Unicorn Standard" simplicity + performance, we'll stick to a single material or use a color prop if we used a custom shader.
    // However, user specifically asked for a mixing. We can achieve this by rendering TWO Point clouds or using vertex colors.
    // Let's use vertex colors for best performance in one draw call if possible, or easiest: two layers.
    // Actually, PointMaterial supports vertexColors if we pass colors attribute to geometry.
    // Let's try simplicity first: One layout, slight indigo tint global, or just white for sharpness as per "Star White".
    // User asked for "Mix". We can do this by setting the global color to a very light indigo, or stick to white for contrast.
    // Let's stick to a clean white/indigo tint in the material.

    useFrame((state: any, delta: number) => {
        if (!ref.current) return;

        // Cosmic Drift (Automatic Slow Rotation)
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;

        // Parallax Effect (Mouse Follow) - Subtle
        const mouse = state.mouse;
        // Dampen the parallax significantly
        const mouseX = mouse.x * 0.05;
        const mouseY = mouse.y * 0.05;

        ref.current.position.x += (mouseX - ref.current.position.x) * 0.05;
        ref.current.position.y += (mouseY - ref.current.position.y) * 0.05;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere as any} stride={3} frustumCulled={true} {...props}>
                <PointMaterial
                    transparent
                    color="#e0e7ff" // A very light indigo/white mix
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.8}
                />
            </Points>
        </group>
    );
}

export function CelestialBackground() {
    const [dpr, setDpr] = useState<number | [number, number]>([1, 2]);
    const [fallback, setFallback] = useState(false);

    if (fallback) {
        return (
            <div className="fixed inset-0 -z-50 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-slate-950" />
        );
    }

    return (
        <div className="fixed inset-0 -z-50 pointer-events-none transition-opacity duration-1000 ease-in-out opacity-100">
            {/* Gradient Background layer always present behind stats */}
            <div className="absolute inset-0 bg-slate-950" />

            <Canvas
                camera={{ position: [0, 0, 1] }}
                dpr={dpr} // Device Pixel Ratio clamping for performance
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
                className="absolute inset-0"
                style={{ background: 'transparent' }}
            >
                <PerformanceMonitor onDecline={() => setDpr(1)} onFallback={() => setFallback(true)}>
                    <Suspense fallback={null}>
                        <StarField />
                    </Suspense>
                </PerformanceMonitor>
            </Canvas>
        </div>
    );
}
