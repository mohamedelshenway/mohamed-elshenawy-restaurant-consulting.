const header = document.querySelector("#site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
const year = document.querySelector("#year");

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 24);

const closeMenu = () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "فتح القائمة");
  document.body.classList.remove("menu-open");
};

menuButton.addEventListener("click", () => {
  const open = !nav.classList.contains("open");
  nav.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
  document.body.classList.toggle("menu-open", open);
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => window.innerWidth > 760 && closeMenu());
updateHeader();

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
year.textContent = new Date().getFullYear();
