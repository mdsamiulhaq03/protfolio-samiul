import React, { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import useWindowStore from "../store/windows";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component: React.FC, windowKey: string) => {
  const Wrapped: React.FC = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, isMinimized, isMaximized, zIndex } = windows[windowKey];

    const ref = useRef<HTMLDivElement | null>(null);
    const draggableRef = useRef<Draggable | null>(null);

    const isVisible = isOpen || isMinimized;

    /* ---------------- DRAG (NO AUTO FOCUS HERE) ---------------- */
    useGSAP(
      () => {
        const el = ref.current;
        if (!el || !isOpen) return;

        gsap.set(el, {
          position: "absolute",
          willChange: "transform",
        });

        draggableRef.current?.kill();

        draggableRef.current = Draggable.create(el, {
          type: "x,y",
          inertia: true,
          bounds: el.parentElement || undefined,

          dragClickables: false,

          // ❌ IMPORTANT: DO NOT AUTO FOCUS ON DRAG
          onDragStart: () => {},
        })[0];

        return () => {
          draggableRef.current?.kill();
          draggableRef.current = null;
        };
      },
      { dependencies: [isOpen] },
    );

    /* ---------------- OPEN ---------------- */
    useGSAP(
      () => {
        const el = ref.current;
        if (!el) return;

        if (isOpen && !isMinimized) {
          gsap.fromTo(
            el,
            { scale: 0.85, opacity: 0, y: 40 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power3.out",
            },
          );
        }
      },
      { dependencies: [isOpen, isMinimized] },
    );

    /* ---------------- MINIMIZE ---------------- */
    useGSAP(
      () => {
        const el = ref.current;
        if (!el) return;

        if (isMinimized) {
          gsap.to(el, {
            scale: 0.85,
            opacity: 0,
            y: 40,
            duration: 0.3,
            ease: "power3.in",
            onComplete: () => gsap.set(el, { display: "none" }),
          });
        } else if (isOpen) {
          gsap.set(el, { display: "block" });
        }
      },
      { dependencies: [isMinimized, isOpen] },
    );

    /* ---------------- MAXIMIZE ---------------- */
    useGSAP(
      () => {
        const el = ref.current;
        if (!el || !isOpen) return;

        if (isMaximized) {
          draggableRef.current?.disable();

          gsap.set(el, {
            position: "fixed",
            top: 0,
            left: 0,
          });

          gsap.to(el, {
            x: 0,
            y: 0,
            width: "100vw",
            height: "100vh",
            duration: 0.35,
            ease: "power3.inOut",
          });
        } else {
          draggableRef.current?.enable();

          gsap.set(el, { position: "absolute" });

          gsap.to(el, {
            clearProps: "width,height",
            duration: 0.3,
            ease: "power3.inOut",
          });
        }
      },
      { dependencies: [isMaximized, isOpen] },
    );

    /* ---------------- ONLY SAFE FOCUS (NO LOOP) ---------------- */
    const handleMouseDown = (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;

      // 🚨 BLOCK control clicks completely
      if (target.closest("#window-controls")) return;

      // ONLY focus when clicking empty window area
      focusWindow(windowKey);
    };

    if (!isVisible) return null;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="window-wrapper absolute select-none"
        onMouseDown={handleMouseDown}
      >
        <Component {...props} />
      </section>
    );
  };

  return Wrapped;
};

export default WindowWrapper;
