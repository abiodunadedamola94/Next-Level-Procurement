// Motion: one sequenced hero, scroll reveals, and a scrubbed process rail.
// Everything is skipped under prefers-reduced-motion; content is visible without JS.
(() => {
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    // Hero: copy rises in, then the sample order advances through its steps.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from("[data-hero]", { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.08 })
      .from("[data-hero-card]", { y: 32, autoAlpha: 0, duration: 0.8 }, "-=0.45")
      .from("[data-route]", { scaleX: 0, duration: 1.1, ease: "power2.inOut" }, "-=0.2")
      .from(".steps li", { x: -12, autoAlpha: 0, duration: 0.4, stagger: 0.12 }, "-=0.8");

    // Section reveals.
    gsap.utils.toArray("[data-reveal]").forEach((el) => {
      gsap.from(el, { y: 28, autoAlpha: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%" } });
    });
    gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
      gsap.from(group.querySelectorAll("[data-item]"), {
        y: 28, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: group, start: "top 80%" },
      });
    });

    // Process: the rail fills as you scroll and each step lights up in order.
    const rail = document.querySelector("[data-rail]");
    if (rail) {
      gsap.from("[data-rail-fill]", { scaleX: 0, ease: "none", scrollTrigger: { trigger: rail, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
      gsap.from("[data-step]", { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: rail, start: "top 78%" } });
    }
  });
})();
