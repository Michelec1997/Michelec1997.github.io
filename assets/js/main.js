// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Dark / light toggle (remembers the choice; defaults to the OS setting)
document.querySelector(".theme-toggle").addEventListener("click", function () {
  var root = document.documentElement;
  var current = root.dataset.theme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  var next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// "Copy" button on each BibTeX block
document.querySelectorAll(".bib pre").forEach(function (pre) {
  var b = document.createElement("button");
  b.type = "button";
  b.className = "btn copy";
  b.textContent = "Copy";
  b.addEventListener("click", function () {
    var text = pre.firstChild.textContent;
    navigator.clipboard.writeText(text).then(function () {
      b.textContent = "Copied";
      setTimeout(function () { b.textContent = "Copy"; }, 1500);
    });
  });
  pre.appendChild(b);
});

// Highlight the nav link of the section in view
var links = document.querySelectorAll(".topnav ul a");
var byId = {};
links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
if ("IntersectionObserver" in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && byId[e.target.id]) {
        links.forEach(function (a) { a.classList.remove("active"); });
        byId[e.target.id].classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section").forEach(function (s) { observer.observe(s); });
}
