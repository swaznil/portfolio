window.addEventListener("DOMContentLoaded", () => {
  try {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  } catch (e) {
    console.error("Lucide icons failed to load:", e);
  }

  // Smooth scroll handlers
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      if (window.lenis) {
        window.lenis.scrollTo(target, {
          offset: -40,
          duration: 1.4,
        });
      } else {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Clock initialization with timezone safety
  const clockEl = document.getElementById("localClock");
  function updateClock() {
    if (!clockEl) return;
    try {
      const str = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      clockEl.textContent = str + " NPT";
    } catch (e) {
      const str = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      clockEl.textContent = str;
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Theme toggle
  const btn = document.getElementById("themeBtn");
  if (btn) {
    const saved = localStorage.getItem("theme");
    function updateIcon() {
      btn.innerHTML = document.body.classList.contains("dark")
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';
      try {
        if (typeof lucide !== "undefined") {
          lucide.createIcons();
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (saved === "dark") {
      document.body.classList.add("dark");
    }
    updateIcon();

    btn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light",
      );
      updateIcon();
    });
  }

  // Accordion entries
  const entries = document.querySelectorAll(
    ".entry[data-live='true'] .entry-head",
  );
  entries.forEach((head) => {
    head.addEventListener("click", () => {
      const entry = head.closest(".entry");
      const body = entry.querySelector(".entry-body");
      const isOpen = entry.classList.contains("is-open");

      if (isOpen) {
        entry.classList.remove("is-open");
        head.setAttribute("aria-expanded", "false");
        body.style.maxHeight = null;
      } else {
        entry.classList.add("is-open");
        head.setAttribute("aria-expanded", "true");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  // Expand all toggle
  const expandAll = document.getElementById("expandAll");
  if (expandAll) {
    expandAll.addEventListener("change", () => {
      document.querySelectorAll(".entry[data-live='true']").forEach((entry) => {
        const head = entry.querySelector(".entry-head");
        const body = entry.querySelector(".entry-body");

        if (expandAll.checked) {
          entry.classList.add("is-open");
          head.setAttribute("aria-expanded", "true");
          body.style.maxHeight = body.scrollHeight + "px";
        } else {
          entry.classList.remove("is-open");
          head.setAttribute("aria-expanded", "false");
          body.style.maxHeight = null;
        }
      });
    });
  }

  window.addEventListener("resize", () => {
    document.querySelectorAll(".entry.is-open .entry-body").forEach((body) => {
      body.style.maxHeight = body.scrollHeight + "px";
    });
  });

  // Lenis smooth scroll initialization
  try {
    if (typeof Lenis !== "undefined") {
      window.lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 0.82,
      });

      function raf(time) {
        if (window.lenis) {
          window.lenis.raf(time);
          requestAnimationFrame(raf);
        }
      }
      requestAnimationFrame(raf);
    }
  } catch (e) {
    console.error("Lenis failed to initialize:", e);
  }
});
