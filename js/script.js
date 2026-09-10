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

  // Parallax: the background layer drifts slower/faster than the page as
  // the section scrolls past, for a sense of depth. Driven by scroll
  // position (not IntersectionObserver) so the drift is continuous rather
  // than stepped, using transform only (GPU-composited, no layout cost),
  // throttled to one recalculation per animation frame. Skipped entirely
  // under prefers-reduced-motion.
  const parallaxSections = Array.from(document.querySelectorAll("[data-parallax]"));
  if (parallaxSections.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const layers = parallaxSections
      .map((section) => ({
        section,
        layer: section.querySelector("[data-parallax-layer]"),
        speed: parseFloat(section.dataset.parallax) || 0.15,
      }))
      .filter((entry) => entry.layer);

    let ticking = false;
    const updateParallax = () => {
      const vh = window.innerHeight;
      layers.forEach(({ section, layer, speed }) => {
        const rect = section.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - vh / 2;
        layer.style.transform = `translateY(${(centerOffset * speed).toFixed(1)}px)`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateParallax();
  }

  // Scroll-reveal: fade + rise elements into view the first time they cross
  // the viewport. The hidden starting state lives in CSS behind a
  // prefers-reduced-motion guard, so this only ever adds a class.
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  if (nav) {
    const path = window.location.pathname;
    const isServicios = path.includes("/gobierno/") || path.includes("/empresas/") || path.includes("/servicios/");
    if (isServicios) {
      nav.querySelector('[data-nav-link="servicios"]')?.setAttribute("aria-current", "page");
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

    // Auto-advance: pauses on hover/keyboard focus (so reading the slide's
    // text never gets interrupted), on a manual prev/next/dot click (resets
    // the wait rather than fighting the visitor), while the tab is hidden,
    // and entirely under prefers-reduced-motion.
    const autoplayMs = parseInt(root.dataset.carouselInterval, 10) || 7000;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let autoplayTimer = null;

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    const startAutoplay = () => {
      stopAutoplay();
      if (reduceMotion.matches || document.hidden) return;
      autoplayTimer = setInterval(() => goTo(index + 1), autoplayMs);
    };

    const restartAutoplay = () => { stopAutoplay(); startAutoplay(); };

    prevBtn?.addEventListener("click", () => { goTo(index - 1); restartAutoplay(); });
    nextBtn?.addEventListener("click", () => { goTo(index + 1); restartAutoplay(); });
    dots.forEach((dot) => dot.addEventListener("click", restartAutoplay));

    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { goTo(index - 1); restartAutoplay(); }
      else if (e.key === "ArrowRight") { goTo(index + 1); restartAutoplay(); }
    });

    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", (e) => {
      if (!root.contains(e.relatedTarget)) startAutoplay();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    update();
    startAutoplay();
  });

  // Transparent video: the source file stacks a color frame on top and its
  // black/white alpha mask below. WebGL reads both halves and composites
  // real transparency onto a <canvas>, which works even on Safari/iOS
  // (unlike alpha-channel WebM, which only Chrome/Firefox understand).
  // Falls back silently to the static <img> already in the markup when
  // WebGL is unavailable or the visitor prefers reduced motion.
  //
  // The video is never fetched, decoded, or drawn until its holder is
  // actually visible (either it has no carousel ancestor, or its slide's
  // aria-hidden flips to "false"), and playback + the draw loop both pause
  // again the moment the slide is swiped away — otherwise this would burn
  // bandwidth and GPU forever on a slide nobody is looking at.
  document.querySelectorAll("[data-transparent-video]").forEach((holder) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fallbackImg = holder.querySelector("img");
    const src = holder.dataset.transparentVideo;
    const slide = holder.closest(".carousel__slide");

    const canvas = document.createElement("canvas");
    if (fallbackImg) {
      canvas.setAttribute("role", "img");
      canvas.setAttribute("aria-label", fallbackImg.alt);
    }

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false })
      || canvas.getContext("experimental-webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vsSource = `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main() {
        vUv = aPos * 0.5 + 0.5;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }`;
    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform sampler2D uTex;
      void main() {
        float y = 1.0 - vUv.y;
        vec2 colorUv = vec2(vUv.x, y * 0.5);
        vec2 alphaUv = vec2(vUv.x, y * 0.5 + 0.5);
        vec3 color = texture2D(uTex, colorUv).rgb;
        float a = texture2D(uTex, alphaUv).r;
        gl_FragColor = vec4(color, a);
      }`;

    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    let video = null;
    let rafId = null;

    const draw = () => {
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        resize();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      rafId = requestAnimationFrame(draw);
    };

    const pause = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      video?.pause();
    };

    const resume = () => {
      if (!video) return;
      video.play().catch(() => {});
      if (rafId === null) rafId = requestAnimationFrame(draw);
    };

    const isVisible = () => !slide || slide.getAttribute("aria-hidden") !== "true";

    const activate = () => {
      if (video) { resume(); return; }
      video = document.createElement("video");
      video.src = src;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.style.cssText = "position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;";
      document.body.appendChild(video);
      video.addEventListener("loadeddata", () => {
        // Only swap in the canvas once the video can actually play — the
        // static image stays up (and nothing shifts) if playback ever fails.
        holder.replaceChildren(canvas);
        resume();
      });
      video.load();
    };

    if (slide) {
      new MutationObserver(() => {
        if (isVisible()) activate();
        else pause();
      }).observe(slide, { attributes: true, attributeFilter: ["aria-hidden"] });
    }

    if (isVisible()) activate();
  });
})();
