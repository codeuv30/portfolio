"use client";

import { useEffect, useRef } from "react";
import CarouselCard from "./CarouselCard";
import gsap from "@/libs/gsap";

const CARD_W = 200;
const CARD_H = 280;
const SCALE = 1.35;
const CARD_GAP = 1.35;

const DURATION = 15;

const TRACK_H = CARD_H * SCALE;

const InfiniteCarousel = ({ projects }) => {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  const doubled = [...projects, ...projects];

  useEffect(() => {
    const singleWidth = projects.length * (CARD_W + CARD_GAP);

    tweenRef.current = gsap.to(trackRef.current, {
      x: -singleWidth,
      ease: "none",
      duration: DURATION,
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [projects]);

  return (
    <div
      className="overflow-hidden"
      style={{
        padding: `${TRACK_H * 0.2}px 0 24px`,
      }}
    >
      <div
        className="track flex items-center"
        ref={trackRef}
        style={{
          gap: `${CARD_GAP}px`,
          width: "max-content",
          height: `${TRACK_H}px`,
        }}
      >
        {doubled.map((project, idx) => {
          return (
            <CarouselCard
              key={idx}
              project={project}
              onHoverStart={() => tweenRef.current?.pause()}
              onHoverEnd={() => tweenRef.current?.play()}
            ></CarouselCard>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
