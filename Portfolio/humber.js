// ===== HAMBURGER MENU FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuToggle || !navLinks) {
    console.error("Menu toggle or navigation links not found in the HTML.");
    return;
  }

  // When the hamburger icon is clicked
  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation(); // prevents closing immediately if event bubbles
    navLinks.classList.toggle("active"); // toggle visibility
    menuToggle.classList.toggle("open"); // optional animation class
  });

  // Close menu if user clicks outside of it (on mobile)
  document.addEventListener("click", function (e) {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("open");
    }
  });
});
