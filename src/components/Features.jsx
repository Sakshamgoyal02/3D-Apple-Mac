import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights.jsx";
import { features } from "../constants/index.js";
import clsx from "clsx";
import { Suspense, useRef } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook.jsx";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
    const groupRef = useRef(null);

    const isMobile = useMediaQuery({
        query: "(max-width: 1024px)",
    });

    useGSAP(() => {

        // =========================
        // MODEL ROTATION TIMELINE
        // =========================

        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
            },
        });

        // =========================
        // TEXT CONTENT TIMELINE
        // =========================

        const contentTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#f-canvas",
                start: "top center",
                end: "bottom top",
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });

        // =========================
        // 3D MODEL ROTATION
        // =========================

        if (groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, {
                y: Math.PI * 2,
                ease: "power1.inOut",
            });
        }

        // =========================
        // FEATURE BOX ANIMATIONS
        // =========================

        contentTimeline
            .to(".box1", { opacity: 1, y: 0, delay: 1 })
            .to(".box2", { opacity: 1, y: 0 })
            .to(".box3", { opacity: 1, y: 0 })
            .to(".box4", { opacity: 1, y: 0 })
            .to(".box5", { opacity: 1, y: 0 });

    }, []);

    return (
        <group ref={groupRef}>
            <Suspense
                fallback={
                    <Html>
                        <h1 className="text-white text-3xl uppercase">
                            Loading...
                        </h1>
                    </Html>
                }
            >
                <MacbookModel
                    scale={isMobile ? 0.03 : 0.08}
                    position={[0, -1, 0]}
                />
            </Suspense>
        </group>
    );
};

const Features = () => {

    const isMobile = useMediaQuery({
        query: "(max-width: 1024px)",
    });

    return (
        <section id="features">
            <h2>See it all in a new light.</h2>

            <Canvas
                id="f-canvas"

                // =========================
                // MOBILE PERFORMANCE BOOST
                // =========================

                dpr={[1, 1.5]}

                gl={{
                    antialias: !isMobile,
                    powerPreference: "high-performance",
                }}

                camera={{
                    position: [0, 0, 5],
                    fov: 45,
                    near: 0.1,
                    far: 100,
                }}
            >
                <StudioLights isMobile={isMobile} />

                <ambientLight intensity={0.5} />

                <ModelScroll />
            </Canvas>

            <div className="absolute inset-0 z-20 pointer-events-none">
                {features.map((feature, index) => (
                    <div
                        key={feature.id}
                        className={clsx(
                            "box",
                            `box${index + 1}`,
                            feature.styles
                        )}
                    >
                        <img
                            src={feature.icon}
                            alt={feature.highlight}
                        />

                        <p>
                            <span className="text-white">
                                {feature.highlight}
                            </span>

                            {feature.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;