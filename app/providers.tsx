"use client";

import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";
import { useRef } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const layer = useRef<HTMLDivElement | null>(null);

  return (
    <TransitionRouter
      auto={true}
      leave={(next) => {
        const tl = gsap
          .timeline({
            onComplete: next,
          })
          .fromTo(
            layer.current,
            {
              y: "100%",
            },
            {
              y: 0,
              duration: 0.65,
              ease: "circ.inOut",
            },
            "<50%"
          );

        return () => {
          tl.kill();
        };
      }}
      enter={(next) => {
        const tl = gsap
          .timeline()
          .fromTo(
            layer.current,
            { y: 0 },
            {
              y: "-100%",
              duration: 0.65,
              ease: "circ.inOut",
            }
          )

          .call(next, undefined, "<50%");

        return () => {
          tl.kill();
        };
      }}
    >
      <main>{children}</main>

      <div
        ref={layer}
        className="fixed inset-0 z-50 translate-y-full bg-foreground"
      />
    </TransitionRouter>
  );
}
