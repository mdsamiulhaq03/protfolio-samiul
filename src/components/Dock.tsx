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

  const animateIn = (icons: HTMLButtonElement[], hoveredIndex: number) => {
    icons.forEach((icon, i) => {
      const distance = Math.abs(i - hoveredIndex);

      const config =
        distance === 0
          ? { scale: SCALE_PEAK, y: Y_PEAK }
          : distance === 1
            ? { scale: SCALE_NEAR, y: Y_NEAR }
            : distance === 2
              ? { scale: SCALE_FAR, y: Y_FAR }
              : { scale: 1, y: 0 };

      gsap.killTweensOf(icon);

      gsap.to(icon, {
        ...config,
        duration: 0.2,
        ease: "power3.out",
        transformOrigin: "bottom center",
      });
    });
  };

  const animateOut = (icons: HTMLButtonElement[]) => {
    icons.forEach((icon) => {
      gsap.killTweensOf(icon);

      gsap.to(icon, {
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: "power3.out",
      });
    });
  };

  useGSAP(
    () => {
      const dock = dockRef.current;
      if (!dock) return;

      const icons = Array.from(
        dock.querySelectorAll<HTMLButtonElement>(".dock-icon"),
      );

      const handleLeave = () => animateOut(icons);

      dock.addEventListener("mouseleave", handleLeave);

      return () => {
        dock.removeEventListener("mouseleave", handleLeave);
      };
    },
    { scope: dockRef },
  );

  const toggleApp = (app: DockApp) => {
    if (!app.canOpen) return;
    const win = windows[app.id];
    if (!win) return;

    win.isOpen ? closeWindow(app.id) : openWindow(app.id);
  };

  return (
    <section id="dock">
      <div
        ref={dockRef}
        className="dock-container flex items-end justify-center gap-4 px-4 py-3"
      >
        {dockApps.map((app, index) => (
          <div key={app.id} className="relative flex justify-center">
            <button
              className="dock-icon transition-transform"
              aria-label={app.name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={app.name}
              disabled={!app.canOpen}
              onMouseEnter={() =>
                animateIn(
                  Array.from(
                    dockRef.current?.querySelectorAll<HTMLButtonElement>(
                      ".dock-icon",
                    ) || [],
                  ),
                  index,
                )
              }
              onMouseLeave={() =>
                animateOut(
                  Array.from(
                    dockRef.current?.querySelectorAll<HTMLButtonElement>(
                      ".dock-icon",
                    ) || [],
                  ),
                )
              }
              onClick={() => toggleApp(app)}
              style={{ transformOrigin: "bottom center" }}
            >
              <img
                src={`/images/${app.icon}`}
                alt={app.name}
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
