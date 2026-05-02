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

  let mouseX = 0;
  let mouseY = 0;

  let smoothX = 0;
  let smoothY = 0;

  let raf: number | null = null;

  const animate = () => {
    const rect = container.getBoundingClientRect();

    // smooth inertia cursor
    smoothX += (mouseX - smoothX) * 0.08;
    smoothY += (mouseY - smoothY) * 0.08;

    letters.forEach((letter) => {
      const lRect = letter.getBoundingClientRect();

      const x = lRect.left - rect.left + lRect.width / 2;
      const y = lRect.top - rect.top + lRect.height / 2;

      const dx = smoothX - x;
      const dy = smoothY - y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      const influence = Math.exp(-dist / 160);

      const weight = base + (max - min) * influence;

      const wave = Math.sin(dist * 0.04) * 6;

      gsap.to(letter, {
        x: dx * influence * 0.35,
        y: dy * influence * 0.35 + wave,
        rotateX: dy * 0.15 * influence,
        rotateY: dx * 0.15 * influence,
        z: influence * 120,
        fontVariationSettings: `"wght" ${weight}`,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    });

    raf = requestAnimationFrame(animate);
  };

  const onMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

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
        duration: 0.7,
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
