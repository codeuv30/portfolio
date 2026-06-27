"use client"

import { forwardRef, useImperativeHandle, useRef } from "react";
import { useGSAP, ScrollTrigger, SplitText } from "@/libs/gsap";
import gsap from "@/libs/gsap";

const TextReveal = forwardRef(
  (
    {
      children,
      className = "",
      trigger = "mount",
      scrollStart = "top 75%",
      splitBy = "lines",
      duration = 0.67,
      stagger = 0.085,
      delay = 0,
      ease = "power3.out",
    },
    ref,
  ) => {
    const wrapperRef = useRef(null);
    const tlRef = useRef(null);
    // We no longer store splitRef at setup time — we split lazily on first play()
    const splitRef = useRef(null);
    const hasPlayedRef = useRef(false);

    // Build (or rebuild) the split + timeline fresh against current layout
    const buildTimeline = () => {
      // Kill any running tween and revert the previous split
      tlRef.current?.kill();
      splitRef.current?.revert();

      splitRef.current = new SplitText(wrapperRef.current, {
        type: splitBy,
        lineThreshold: 0.3,
      });

      const elements = splitRef.current[splitBy];

      gsap.set(elements, { yPercent: 300 });

      tlRef.current = gsap.timeline({ defaults: { delay }, paused: true });

      tlRef.current.to(elements, {
        yPercent: 0,
        duration,
        ease,
        stagger: { each: stagger, from: "start" },
      });
    };

    useImperativeHandle(ref, () => ({
      play: () => {
        // Make wrapper visible first so SplitText measures real dimensions
        gsap.set(wrapperRef.current, { opacity: 1 });

        // (Re)build the split every time we play from hidden state
        // so line-breaks are always measured against true layout width
        if (!hasPlayedRef.current) {
          buildTimeline();
          hasPlayedRef.current = true;
        }

        tlRef.current?.play();
      },
      reverse: () => {
        tlRef.current?.reverse();
        tlRef.current?.eventCallback("onReverseComplete", () => {
          gsap.set(wrapperRef.current, { opacity: 0 });
          // Reset so next play() rebuilds the split cleanly
          hasPlayedRef.current = false;
        });
      },
      reset: () => {
        tlRef.current?.pause(0);
        gsap.set(wrapperRef.current, { opacity: 0 });
        hasPlayedRef.current = false;
      },
    }));

    useGSAP(() => {
      // For mount/scroll triggers the element is visible, so split immediately
      if (trigger === "mount" || trigger === "scroll") {
        buildTimeline();
      }
      // For manual trigger we do nothing here — split happens in play()

      if (trigger === "mount") {
        gsap.set(wrapperRef.current, { opacity: 1 });
        tlRef.current?.play();
      }

      if (trigger === "scroll") {
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: scrollStart,
          once: true,
          onEnter: () => {
            gsap.set(wrapperRef.current, { opacity: 1 });
            tlRef.current?.play();
          },
        });
      }

      return () => {
        tlRef.current?.kill();
        splitRef.current?.revert();
      };
    }, { scope: wrapperRef });

    return (
      <div
        ref={wrapperRef}
        className={`overflow-hidden leading-[0.9] ${className}`}
      >
        {children}
      </div>
    );
  },
);

TextReveal.displayName = "TextReveal";

export default TextReveal;