import { gsap } from "gsap";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const headings = Array.from(document.querySelectorAll<HTMLElement>("[data-split-reveal]"));

if (!reduceMotion) {
  headings.forEach((heading) => {
    const accessibleName = (heading.textContent ?? "").replace(/\s+/g, " ").trim();
    if (!accessibleName) return;

    // Split on any manual <br> first so forced line breaks (e.g. a 2-line
    // headline) survive the rebuild instead of collapsing to one line.
    // Matches <br>, <br/>, <br /> and dev-mode <br data-astro-source-*="...">.
    const lines = heading.innerHTML.split(/<br[^>]*>/i);
    heading.setAttribute("aria-label", accessibleName);
    heading.textContent = "";

    const wordEls: HTMLElement[] = [];

    lines.forEach((lineHtml, lineIndex) => {
      const words = lineHtml
        .replace(/<[^>]+>/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

      words.forEach((word, i) => {
        const mask = document.createElement("span");
        mask.style.display = "inline-block";
        mask.style.overflow = "hidden";
        mask.style.verticalAlign = "top";

        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.style.transform = "translateY(110%)";
        inner.setAttribute("aria-hidden", "true");
        inner.textContent = word;

        mask.appendChild(inner);
        heading.appendChild(mask);
        wordEls.push(inner);

        if (i < words.length - 1) {
          heading.appendChild(document.createTextNode(" "));
        }
      });

      if (lineIndex < lines.length - 1) {
        heading.appendChild(document.createElement("br"));
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.to(wordEls, {
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.045,
          });
          observer.unobserve(heading);
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(heading);
  });
}
