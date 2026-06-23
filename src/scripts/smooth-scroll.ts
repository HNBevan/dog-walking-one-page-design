import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis } from "./lenis-instance";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
  });

  setLenis(lenis);
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // .js-open-booking links open the booking dialog instead (see
  // BookingModal.astro) and must not also trigger an anchor scroll here.
  document
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not(.js-open-booking)')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector<HTMLElement>(id);
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: -72 });
      });
    });
}

