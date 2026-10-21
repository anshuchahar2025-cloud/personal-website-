// Anshu Chahar — Portfolio Interactions
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
const backTop = document.querySelector("#backTop");
const year = document.querySelector("#year");
const scrollProgress = document.querySelector("#scrollProgress");

year.textContent = new Date().getFullYear();

// Mobile navigation with animated hamburger
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Reveal elements with staggered animation
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Scroll handler: progress bar + back-to-top
window.addEventListener(
  "scroll",
  () => {
    // Back to top visibility
    backTop.classList.toggle("visible", window.scrollY > 400);

    // Scroll progress bar
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
  },
  { passive: true }
);

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Smooth active nav highlight
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a[href^='#']");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.style.color =
              link.getAttribute("href") === `#${id}` ? "var(--accent)" : "";
          });
        }
      });
    },
    { threshold: 0.3 }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

// IMPORTANT: Replace your.email@example.com in index.html with your real email.
