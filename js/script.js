/* =========================================================
   TELIER — INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     LOADER
  ------------------------------------------------------- */

  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.classList.add("loaded");
  }, 1700);


  /* -------------------------------------------------------
     CUSTOM CURSOR
  ------------------------------------------------------- */

  const cursor = document.querySelector(".cursor");
  const cursorLabel = document.querySelector(".cursor-label");

  if (window.innerWidth > 800) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    function animateCursor() {

      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      cursor.style.left = currentX + "px";
      cursor.style.top = currentY + "px";

      requestAnimationFrame(animateCursor);
    }

    animateCursor();


    const interactiveElements = document.querySelectorAll(
      "a, .service, .project"
    );

    interactiveElements.forEach(element => {

      element.addEventListener("mouseenter", () => {

        cursor.classList.add("active");

        let label = element.dataset.cursor;

        if (element.classList.contains("project")) {
          label = "VIEW";
        }

        if (element.tagName === "A" && !label) {
          label = "OPEN";
        }

        cursorLabel.textContent = label || "";

      });

      element.addEventListener("mouseleave", () => {

        cursor.classList.remove("active");
        cursorLabel.textContent = "";

      });

    });

  }


  /* -------------------------------------------------------
     HEADER — HIDE ON SCROLL DOWN / SHOW ON UP
  ------------------------------------------------------- */

  const header = document.querySelector(".header");

  let lastScroll = 0;

  window.addEventListener("scroll", () => {

    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 150) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    lastScroll = currentScroll;

  }, { passive: true });


  /* -------------------------------------------------------
     SCROLL REVEAL
  ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".section-title, .intro-content, .service, .project, .about-layout, .experience-item, .process-grid > div, .manifesto-content p"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach(element => {
    observer.observe(element);
  });


  /* -------------------------------------------------------
     MAGNETIC BUTTON
  ------------------------------------------------------- */

  const magneticElements = document.querySelectorAll(
    ".contact-button, .header-contact"
  );

  magneticElements.forEach(element => {

    element.addEventListener("mousemove", (event) => {

      const rect = element.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      element.style.transform =
        `translate(${x * 0.15}px, ${y * 0.15}px)`;

    });

    element.addEventListener("mouseleave", () => {

      element.style.transform = "";

    });

  });


  /* -------------------------------------------------------
     PARALLAX PROJECTS
  ------------------------------------------------------- */

  const projectImages = document.querySelectorAll(
    ".project-image"
  );

  window.addEventListener("scroll", () => {

    if (window.innerWidth <= 800) return;

    projectImages.forEach(image => {

      const rect = image.getBoundingClientRect();

      const viewportCenter = window.innerHeight / 2;

      const distance =
        (rect.top + rect.height / 2) -
        viewportCenter;

      const movement = distance * -0.015;

      const placeholder =
        image.querySelector(".image-placeholder");

      if (placeholder) {
        placeholder.style.transform =
          `translateY(${movement}px) scale(1.02)`;
      }

    });

  }, { passive: true });


  /* -------------------------------------------------------
     SMOOTH ANCHOR NAVIGATION
  ------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* -------------------------------------------------------
     SERVICE HOVER IMAGE EFFECT
  ------------------------------------------------------- */

  const services =
    document.querySelectorAll(".service");

  services.forEach((service, index) => {

    service.addEventListener("mouseenter", () => {

      document.body.dataset.service =
        index + 1;

    });

    service.addEventListener("mouseleave", () => {

      delete document.body.dataset.service;

    });

  });


  /* -------------------------------------------------------
     PAGE VISIBILITY
  ------------------------------------------------------- */

  document.addEventListener("visibilitychange", () => {

    if (document.hidden) {
      document.title = "Come back — Telier";
    } else {
      document.title = "Telier — by Elisa Durán";
    }

  });

});
