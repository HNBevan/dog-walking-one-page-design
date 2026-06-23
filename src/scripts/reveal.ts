const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

  items.forEach((el, i) => {
    el.classList.add("reveal-pending");
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
  );

  items.forEach((el) => observer.observe(el));
}
