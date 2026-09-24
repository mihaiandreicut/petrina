/* Petrina Andreicuț · scripturi site */
(function () {
  "use strict";

  // Semnal pentru scriptul din <head>: dacă acest fișier nu se încarcă,
  // clasa „js” este scoasă și pagina rămâne complet utilizabilă fără JavaScript.
  window.siteReady = true;
  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Antet: umbră la derulare ---------- */
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Meniu mobil ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("meniu");
  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Închide meniul" : "Deschide meniul");
      menu.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".site-nav")) setOpen(false);
    });
  }

  /* ---------- Apariție la derulare ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Cuprins activ pe pagina Servicii ---------- */
  var tocLinks = document.querySelectorAll(".services-toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
        var link = byId[entry.target.id];
        if (link) link.classList.add("is-active");
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------- Anul curent în subsol ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Formular de contact ---------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.noValidate = true;
    var status = form.querySelector(".form-status");
    var submitBtn = form.querySelector("[type='submit']");
    var recipient = form.getAttribute("data-fallback-email");

    var setStatus = function (type, message) {
      status.className = "form-status" + (type ? " is-" + type : "");
      status.textContent = message;
    };

    var validateField = function (input) {
      var field = input.closest(".field");
      if (!field) return true;
      var valid = input.checkValidity();
      field.classList.toggle("has-error", !valid);
      input.setAttribute("aria-invalid", String(!valid));
      return valid;
    };

    // Validăm la trimitere, apoi corectăm live doar câmpurile deja marcate,
    // ca mesajele de eroare să nu mute formularul în timp ce este completat.
    form.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        if (input.closest(".has-error")) validateField(input);
      });
      input.addEventListener("change", function () {
        if (input.closest(".has-error")) validateField(input);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var firstInvalid = null;
      form.querySelectorAll("input[required], input[type='email'], textarea[required]").forEach(function (input) {
        if (!validateField(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        setStatus("error", "Te rog să verifici câmpurile marcate.");
        firstInvalid.focus();
        return;
      }

      // Câmp capcană pentru roboți
      var trap = form.querySelector("[name='_gotcha']");
      if (trap && trap.value) return;

      var data = new FormData(form);
      var endpoint = form.getAttribute("action") || "";
      var configured = /^https:\/\//.test(endpoint) && endpoint.indexOf("ID_FORMULAR") === -1;

      if (!configured) {
        // Până la configurarea unui serviciu de formulare, mesajul se trimite prin aplicația de e-mail.
        var name = (data.get("nume") || "").toString().trim();
        var lines = [
          "Nume: " + name,
          "Telefon: " + (data.get("telefon") || ""),
          "E-mail: " + (data.get("email") || "-"),
          "Preferință ședințe: " + (data.get("preferinta") || "-"),
          "",
          (data.get("mesaj") || "").toString()
        ];
        var href = "mailto:" + recipient +
          "?subject=" + encodeURIComponent("Solicitare programare – " + name) +
          "&body=" + encodeURIComponent(lines.join("\n"));
        window.location.href = href;
        setStatus("success", "Se deschide aplicația ta de e-mail cu mesajul completat. Dacă nu se deschide, îmi poți scrie direct la " + recipient + " sau mă poți suna.");
        return;
      }

      submitBtn.disabled = true;
      setStatus("", "Se trimite…");

      fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          form.reset();
          setStatus("success", "Mulțumesc! Mesajul tău a ajuns la mine. Îți răspund personal, în cel mai scurt timp posibil.");
        })
        .catch(function () {
          setStatus("error", "Mesajul nu a putut fi trimis. Te rog să încerci din nou sau să mă contactezi telefonic ori pe e-mail.");
        })
        .then(function () {
          submitBtn.disabled = false;
        });
    });
  }
})();
