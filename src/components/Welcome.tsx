import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
} as const;

type FontType = keyof typeof FONT_WEIGHT;

const renderTest = (
  text: string,
  className: string,
  baseWeight: number = 500,
): JSX.Element[] => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{
        display: "inline-block",
        fontVariationSettings: `"wght" ${baseWeight}`,
        willChange: "transform, font-variation-settings",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

/* ----------------------------- LIQUID ENGINE ----------------------------- */

const setupLiquidTypography = (
  container: HTMLElement | null,
  type: FontType,
) => {
  if (!container) return;

  const letters = Array.from(
    container.querySelectorAll<HTMLSpanElement>("span"),
  );

  const { min, max, default: base } = FONT_WEIGHT[type];

  // 🧲 inertia cursor (lagged pointer)
  let mouse = { x: 0, y: 0 };
  let smooth = { x: 0, y: 0 };

  let raf: number | null = null;

  const rect = () => container.getBoundingClientRect();

  const animate = () => {
    const r = rect();

    // 🌊 inertia smoothing (liquid feel)
    smooth.x += (mouse.x - smooth.x) * 0.08;
    smooth.y += (mouse.y - smooth.y) * 0.08;

    letters.forEach((letter, i) => {
      const lRect = letter.getBoundingClientRect();

      const x = lRect.left - r.left + lRect.width / 2;
      const y = lRect.top - r.top + lRect.height / 2;

      const dx = smooth.x - x;
      const dy = smooth.y - y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      // 🌊 wave distortion (liquid feel)
      const wave = Math.sin(dist * 0.04 - i * 0.2) * 8;

      // 🧲 magnetic falloff
      const influence = Math.exp(-dist / 160);

      const weight = base + (max - min) * influence;

      const moveX = dx * influence * 0.35;
      const moveY = dy * influence * 0.35 + wave;

      const rotateX = dy * 0.15 * influence;
      const rotateY = dx * 0.15 * influence;

      const depth = influence * 120;

      gsap.to(letter, {
        x: moveX,
        y: moveY,
        rotateX,
        rotateY,
        z: depth,
        fontVariationSettings: `"wght" ${weight}`,
        duration: 0.6,
        ease: "power3.out",
      });
    });

    raf = requestAnimationFrame(animate);
  };

  const onMove = (e: MouseEvent) => {
    const r = rect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;

    if (!raf) raf = requestAnimationFrame(animate);
  };

  const reset = () => {
    letters.forEach((letter) => {
      gsap.to(letter, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        fontVariationSettings: `"wght" ${base}`,
        duration: 0.8,
        ease: "power4.out",
      });
    });

    if (raf) cancelAnimationFrame(raf);
    raf = null;
  };

  container.addEventListener("mousemove", onMove);
  container.addEventListener("mouseleave", reset);

  return () => {
    container.removeEventListener("mousemove", onMove);
    container.removeEventListener("mouseleave", reset);
    if (raf) cancelAnimationFrame(raf);
  };
};

/* ----------------------------- COMPONENT ----------------------------- */

const Welcome = () => {
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    const clean1 = setupLiquidTypography(titleRef.current, "title");
    const clean2 = setupLiquidTypography(subtitleRef.current, "subtitle");

    return () => {
      clean1?.();
      clean2?.();
    };
  }, []);

  return (
    <section
      id="welcome"
      className="perspective-[1200px] overflow-hidden select-none"
    >
      <p ref={titleRef}>
        {renderTest("Hey I'm Samiul Haque", "text-4xl font-georama", 100)}
      </p>

      <h1 ref={subtitleRef} className="mt-10">
        {renderTest("Portfolio", "text-9xl font-georama")}
      </h1>

      <div className="small-screen">
        <p>This Portfolio is Designed for Desktop/Tablet Screens Only</p>
      </div>
    </section>
  );
};

export default Welcome;
