(() => {
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (header) {
    const setScrolled = () => {
      if (window.scrollY > 24) {
        header.setAttribute("data-scrolled", "");
      } else {
        header.removeAttribute("data-scrolled");
      }
    };
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.hasAttribute("data-open");
      if (open) {
        nav.removeAttribute("data-open");
        navToggle.setAttribute("aria-expanded", "false");
      } else {
        nav.setAttribute("data-open", "");
        navToggle.setAttribute("aria-expanded", "true");
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.removeAttribute("data-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (nav) {
    const path = window.location.pathname;
    const section = path.includes("/gobierno/") ? "gobierno" : path.includes("/empresas/") ? "empresas" : null;
    if (section) {
      nav.querySelectorAll("a").forEach((link) => {
        if (link.pathname.endsWith(`/${section}/index.html`)) {
          link.setAttribute("aria-current", "page");
        }
      });
    }
  }

  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const track = root.querySelector("[data-carousel-track]");
    const dotsHost = root.querySelector("[data-carousel-dots]");
    const prevBtn = root.querySelector("[data-carousel-prev]");
    const nextBtn = root.querySelector("[data-carousel-next]");
    if (!track) return;

    const slides = Array.from(track.children);
    if (slides.length <= 1) {
      if (prevBtn) prevBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
      return;
    }

    let index = 0;
    const dots = slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("aria-label", `Ir al servicio ${i + 1} de ${slides.length}`);
      dot.addEventListener("click", () => goTo(i));
      dotsHost?.appendChild(dot);
      return dot;
    });

    const update = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide, i) => {
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
      dots.forEach((dot, i) => {
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
    };

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      update();
    };

    prevBtn?.addEventListener("click", () => goTo(index - 1));
    nextBtn?.addEventListener("click", () => goTo(index + 1));

    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { goTo(index - 1); }
      else if (e.key === "ArrowRight") { goTo(index + 1); }
    });

    update();
  });
})();
