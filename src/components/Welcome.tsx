import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, base: 100 },
  title: { min: 400, max: 900, base: 400 },
} as const;

type FontType = keyof typeof FONT_WEIGHT;

const renderText = (text: string, className: string) => {
  return [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{
        display: "inline-block",
        willChange: "transform, font-variation-settings",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

/* ----------------------------- ENGINE ----------------------------- */

const setupLiquidTypography = (
  container: HTMLElement | null,
  type: FontType,
) => {
  if (!container) return;

  const letters = Array.from(
    container.querySelectorAll<HTMLSpanElement>("span"),
  );

  const { min, max, base } = FONT_WEIGHT[type];

  const animateIn = (hoveredIndex: number) => {
    letters.forEach((letter, i) => {
      const distance = Math.abs(i - hoveredIndex);
      const influence = Math.max(0, 1 - distance * 0.3);

      const weight = base + (max - min) * influence;
      const y = -12 * influence;
      const scale = 1 + 0.15 * influence;

      gsap.killTweensOf(letter);

      gsap.to(letter, {
        y,
        scale,
        fontVariationSettings: `"wght" ${weight}`,
        duration: 0.25,
        ease: "power3.out",
      });
    });
  };

  const animateOut = () => {
    letters.forEach((letter) => {
      gsap.killTweensOf(letter);

      gsap.to(letter, {
        y: 0,
        scale: 1,
        fontVariationSettings: `"wght" ${base}`,
        duration: 0.5,
        ease: "power4.out",
      });
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const index = Math.floor((x / rect.width) * letters.length);
    animateIn(Math.max(0, Math.min(index, letters.length - 1)));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", animateOut);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", animateOut);
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
    <section id="welcome" className="overflow-hidden select-none">
      <p ref={titleRef}>
        {renderText("Hey I'm Samiul Haque", "text-4xl font-georama")}
      </p>

      <h1 ref={subtitleRef} className="mt-10">
        {renderText("portfolio", "text-9xl font-georama")}
      </h1>

      <div className="small-screen">
        <p>This Portfolio is Designed for Desktop/Tablet Screens Only</p>
      </div>
    </section>
  );
};

export default Welcome;
