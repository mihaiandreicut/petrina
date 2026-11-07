/* Petrina Andreicuț · scripturi site */
(function () {
  "use strict";

  // Semnal pentru scriptul din <head>: dacă acest fișier nu se încarcă,
  // clasa „js” este scoasă și pagina rămâne complet utilizabilă fără JavaScript.
  window.siteReady = true;
  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ARROW = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- Antet, bara de progres și butonul „sus” ---------- */
  var header = document.querySelector("[data-header]");
  var toTop = document.querySelector(".to-top");
  var ticking = false;
  var onScroll = function () {
    ticking = false;
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) {
      header.classList.toggle("is-scrolled", y > 8);
      header.style.setProperty("--progress", max > 0 ? Math.min(y / max, 1).toFixed(4) : "0");
    }
    if (toTop) toTop.classList.toggle("is-visible", y > window.innerHeight * 0.9);
  };
  onScroll();
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  /* ---------- Meniu pe telefon și tabletă: fereastră în mijlocul ecranului ---------- */
  // Fereastra se construiește din linkurile meniului, deci rămâne la fel pe toate paginile.
  // Fără JavaScript, meniul obișnuit rămâne vizibil în antet.
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("meniu");
  var SVG = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">';
  // Ilustrații unDraw (undraw.co), recolorate în culorile site-ului, în assets/img/meniu/
  var MENU_ART = { despre: 1, servicii: 1, cabinet: 1, resurse: 1, intrebari: 1, contact: 1 };
  var script = document.currentScript || document.querySelector("script[src*='main.js']");
  var artBase = new URL("../img/meniu/", script ? script.src : location.href).href;
  var CALENDAR = '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>';

  if (toggle && menu) {
    var menuDialog = document.createElement("dialog");
    menuDialog.className = "modal menu-dialog";
    menuDialog.id = "dlg-meniu";
    menuDialog.setAttribute("aria-labelledby", "dlg-meniu-titlu");
    var tiles = "";
    var cta = "";
    menu.querySelectorAll("a").forEach(function (a) {
      var href = a.getAttribute("href");
      var label = a.textContent.trim();
      if (a.classList.contains("btn")) {
        cta = '<a class="btn menu-cta" href="' + href + '">' + SVG + CALENDAR + "</svg>" + label + "</a>";
        return;
      }
      var key = href.split("#")[1] || "";
      tiles += '<li><a class="menu-tile" href="' + href + '" data-key="' + key + '">' +
        '<span class="menu-tile-label">' + label + "</span>" +
        (MENU_ART[key] ? '<img class="menu-tile-art" src="' + artBase + key + '.svg" alt="" width="160" height="130" loading="lazy" decoding="async">' : "") +
        "</a></li>";
    });
    menuDialog.innerHTML =
      '<div class="menu-dialog-head">' +
      '<p class="menu-dialog-title" id="dlg-meniu-titlu">Meniu</p>' +
      '<form method="dialog"><button class="modal-close" type="submit" aria-label="Închide meniul">' +
      SVG + '<path d="M18 6 6 18M6 6l12 12"/></svg></button></form>' +
      "</div>" +
      '<ul class="menu-grid">' + tiles + "</ul>" + cta;
    document.body.appendChild(menuDialog);

    toggle.setAttribute("aria-controls", "dlg-meniu");
    toggle.setAttribute("aria-haspopup", "dialog");

    toggle.addEventListener("click", function () {
      if (typeof menuDialog.showModal !== "function") {
        menu.classList.toggle("is-open");
        return;
      }
      // Secțiunea curentă apare marcată și în fereastră.
      menuDialog.querySelectorAll(".menu-tile").forEach(function (tile) {
        var original = menu.querySelector("a[href='" + tile.getAttribute("href") + "']");
        if (original && original.hasAttribute("aria-current")) tile.setAttribute("aria-current", "location");
        else tile.removeAttribute("aria-current");
      });
      menuDialog.showModal();
      toggle.setAttribute("aria-expanded", "true");
    });
    menuDialog.addEventListener("close", function () {
      toggle.setAttribute("aria-expanded", "false");
    });
    menuDialog.addEventListener("click", function (e) {
      if (e.target === menuDialog || e.target.closest("a")) menuDialog.close();
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) menu.classList.remove("is-open");
    });
  }

  /* ---------- Secțiunea curentă în meniu și în punctele laterale ---------- */
  var sections = document.querySelectorAll("main > section[id]:not([hidden])");
  var navLinks = document.querySelectorAll(".nav-list a[href^='#']:not(.btn), .side-dots a[href^='#']");
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var markCurrent = function (id) {
      navLinks.forEach(function (a) {
        if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    };
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markCurrent(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -54% 0px" });
    sections.forEach(function (section) { spy.observe(section); });
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

  /* ---------- Slidere cu puncte de navigare ---------- */
  document.querySelectorAll("[data-slider]").forEach(function (slider) {
    var track = slider.querySelector(".slider-track");
    var slides = track ? track.children : [];
    if (!track || !slides.length) return;

    var label = slider.getAttribute("data-slider") || "Slide";
    var controls = document.createElement("div");
    controls.className = "slider-controls";
    controls.innerHTML =
      '<div class="slider-dots"></div>' +
      '<div class="slider-arrows">' +
      '<button type="button" class="slider-arrow slider-arrow--prev" aria-label="Înapoi">' + ARROW + "</button>" +
      '<button type="button" class="slider-arrow slider-arrow--next" aria-label="Înainte">' + ARROW + "</button>" +
      "</div>";
    slider.appendChild(controls);

    var dotsWrap = controls.querySelector(".slider-dots");
    var prev = controls.querySelector(".slider-arrow--prev");
    var next = controls.querySelector(".slider-arrow--next");
    var step = 1;
    var pages = 1;
    var current = 0;

    var maxScroll = function () {
      return track.scrollWidth - track.clientWidth;
    };

    var goTo = function (index) {
      index = Math.max(0, Math.min(pages - 1, index));
      track.scrollTo({
        left: index === pages - 1 ? maxScroll() : index * step,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    };

    var update = function () {
      var x = track.scrollLeft;
      current = maxScroll() - x < 4 ? pages - 1 : Math.round(x / step);
      dotsWrap.querySelectorAll(".slider-dot").forEach(function (dot, i) {
        dot.setAttribute("aria-current", String(i === current));
      });
      prev.disabled = current <= 0;
      next.disabled = current >= pages - 1;
    };

    var build = function () {
      step = slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
      if (step <= 0) step = track.clientWidth || 1;
      pages = Math.round(maxScroll() / step) + 1;
      if (maxScroll() <= 4) pages = 1;
      slider.classList.toggle("is-static", pages < 2);
      dotsWrap.innerHTML = "";
      for (var i = 0; i < pages; i++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "slider-dot";
        dot.setAttribute("aria-label", label + ": " + (i + 1) + " din " + pages);
        dot.addEventListener("click", goTo.bind(null, i));
        dotsWrap.appendChild(dot);
      }
      update();
    };

    prev.addEventListener("click", function () { goTo(current - 1); });
    next.addEventListener("click", function () { goTo(current + 1); });

    var frame = null;
    track.addEventListener("scroll", function () {
      if (frame) return;
      frame = window.requestAnimationFrame(function () {
        frame = null;
        update();
      });
    }, { passive: true });

    build();
    if ("ResizeObserver" in window) {
      var lastWidth = track.clientWidth;
      new ResizeObserver(function () {
        if (track.clientWidth !== lastWidth) {
          lastWidth = track.clientWidth;
          build();
        }
      }).observe(track);
    } else {
      window.addEventListener("resize", build);
    }
  });

  /* ---------- Ferestre cu detaliile serviciilor ---------- */
  var openDialog = function (id) {
    var dialog = document.getElementById(id);
    if (!dialog || typeof dialog.showModal !== "function") return false;
    if (!dialog.open) dialog.showModal();
    return true;
  };

  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-dialog-open]");
    if (opener) {
      if (openDialog(opener.getAttribute("data-dialog-open"))) e.preventDefault();
      return;
    }
    // Un link din fereastră (ex. „Programează”) închide fereastra și continuă navigarea.
    var link = e.target.closest("dialog[open] a[href^='#']");
    if (link) link.closest("dialog").close();
  });

  document.querySelectorAll("dialog.modal").forEach(function (dialog) {
    // Clic pe fundalul din jurul ferestrei o închide.
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  });

  /* ---------- Taburi (secțiunea Despre mine) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (wrap) {
    var tabs = Array.prototype.slice.call(wrap.querySelectorAll("[role='tab']"));
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab); });
      tab.addEventListener("keydown", function (e) {
        var target = null;
        if (e.key === "ArrowRight") target = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") target = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") target = tabs[0];
        else if (e.key === "End") target = tabs[tabs.length - 1];
        if (target) {
          e.preventDefault();
          select(target, true);
        }
      });
    });
    select(tabs[0]);
  });

  // Linkuri care deschid direct un anumit tab (ex. „Citește mai multe despre parcursul meu”)
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-tab-open]");
    if (!link) return;
    var tab = document.getElementById(link.getAttribute("data-tab-open"));
    if (!tab || tab.getAttribute("role") !== "tab") return;
    e.preventDefault();
    tab.click();
    var list = tab.closest("[role='tablist']");
    var top = list.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) {
      list.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
    tab.focus({ preventScroll: true });
  });

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
      form.querySelectorAll("input[required], textarea[required]").forEach(function (input) {
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
