import { useRef } from "react";
import gsap from "gsap";
import { dockApps } from "../data";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";

const Dock = () => {
  const dockRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll<HTMLButtonElement>(".dock-icon");

    const animateIn = (el: HTMLElement) => {
      gsap.to(el, {
        scale: 1.5,
        y: -15,
        rotate: 0,
        duration: 0.2,
        ease: "power3.out",
        transformOrigin: "bottom center",
      });
    };

    const animateOut = (el: HTMLElement) => {
      gsap.to(el, {
        scale: 1,
        y: 0,
        rotate: 0,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    icons.forEach((icon) => {
      icon.addEventListener("mouseenter", () => animateIn(icon));
      icon.addEventListener("mouseleave", () => animateOut(icon));
    });

    return () => {
      icons.forEach((icon) => {
        icon.removeEventListener("mouseenter", () => animateIn(icon));
        icon.removeEventListener("mouseleave", () => animateOut(icon));
      });
    };
  }, []);

  const toggleApp = (id: string, canOpen: boolean) => {
    //Can Open
  };

  return (
    <section id="dock">
      <div
        ref={dockRef}
        className="dock-container flex items-end justify-center gap-4 px-4 py-3"
      >
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon transition-transform"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              disabled={!canOpen}
              onClick={() => toggleApp(id, canOpen)}
              style={{
                transformOrigin: "bottom center",
              }}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-50"}
              />
            </button>
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
