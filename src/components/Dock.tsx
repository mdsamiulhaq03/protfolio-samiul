import { useRef } from "react";
import gsap from "gsap";
import { dockApps } from "../data";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import useWindowStore from "../store/windows";

type DockApp = {
  id: string;
  name: string;
  icon: string;
  canOpen: boolean;
};

const SCALE_PEAK = 1.5;
const SCALE_NEAR = 1.25;
const SCALE_FAR = 1.1;
const Y_PEAK = -15;
const Y_NEAR = -8;
const Y_FAR = -3;

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef<HTMLDivElement | null>(null);

  /* ----------------------------- ANIMATION ----------------------------- */

  useGSAP(
    () => {
      const dock = dockRef.current;
      if (!dock) return;

      const icons = Array.from(
        dock.querySelectorAll<HTMLButtonElement>(".dock-icon"),
      );

      const animateIn = (hoveredIndex: number) => {
        icons.forEach((icon, i) => {
          const distance = Math.abs(i - hoveredIndex);

          let scale = 1;
          let y = 0;

          if (distance === 0) {
            scale = SCALE_PEAK;
            y = Y_PEAK;
          } else if (distance === 1) {
            scale = SCALE_NEAR;
            y = Y_NEAR;
          } else if (distance === 2) {
            scale = SCALE_FAR;
            y = Y_FAR;
          }

          gsap.to(icon, {
            scale,
            y,
            duration: 0.2,
            ease: "power3.out",
            transformOrigin: "bottom center",
            overwrite: true,
          });
        });
      };

      const animateOut = () => {
        icons.forEach((icon) => {
          gsap.to(icon, {
            scale: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
            overwrite: true,
          });
        });
      };

      const handlers: { el: Element; enter: () => void; leave: () => void }[] =
        [];

      icons.forEach((icon, index) => {
        const enter = () => animateIn(index);
        const leave = () => animateOut();

        icon.addEventListener("mouseenter", enter);
        icon.addEventListener("mouseleave", leave);

        handlers.push({ el: icon, enter, leave });
      });

      // Extra fix — reset when mouse fully exits dock
      dock.addEventListener("mouseleave", animateOut);

      return () => {
        handlers.forEach(({ el, enter, leave }) => {
          el.removeEventListener("mouseenter", enter);
          el.removeEventListener("mouseleave", leave);
        });

        dock.removeEventListener("mouseleave", animateOut);
      };
    },
    { scope: dockRef },
  );

  /* ----------------------------- LOGIC ----------------------------- */

  const toggleApp = (app: DockApp) => {
    if (!app.canOpen) return;
    const win = windows[app.id];
    if (!win) return;

    win.isOpen ? closeWindow(app.id) : openWindow(app.id);
  };

  /* ----------------------------- UI ----------------------------- */

  return (
    <section id="dock">
      <div
        ref={dockRef}
        className="dock-container flex items-end justify-center gap-4 px-4 py-3"
      >
        {dockApps.map((app) => (
          <div key={app.id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon transition-transform"
              aria-label={app.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              disabled={!app.canOpen}
              onClick={() => toggleApp(app)}
              style={{ transformOrigin: "bottom center" }}
            >
              <img
                src={`/images/${app.icon}`}
                alt={app.name}
                loading="lazy"
                className={app.canOpen ? "" : "opacity-50"}
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
