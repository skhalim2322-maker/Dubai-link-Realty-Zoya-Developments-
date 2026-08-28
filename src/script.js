---
permalink: /script.js
---

document.addEventListener("DOMContentLoaded", function () {


  /* =========================================
     HEADER SCROLL EFFECT
  ========================================== */

  const header =
    document.getElementById("siteHeader");


  function updateHeader() {

    if (!header) {
      return;
    }


    if (window.scrollY > 30) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }


  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );



  /* =========================================
     MOBILE MENU
  ========================================== */

  const menuToggle =
    document.getElementById("menuToggle");

  const mainNav =
    document.getElementById("mainNav");


  if (menuToggle && mainNav) {


    menuToggle.addEventListener(
      "click",
      function () {

        const isOpen =
          mainNav.classList.toggle("open");


        menuToggle.classList.toggle(
          "active",
          isOpen
        );


        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );


        document.body.classList.toggle(
          "menu-open",
          isOpen
        );

      }
    );


    mainNav
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            mainNav.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

            document.body.classList.remove(
              "menu-open"
            );

          }
        );

      });

  }



  /* =========================================
     SCROLL REVEAL
  ========================================== */

  const revealItems =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {


    const observer =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );


              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealItems.forEach(function (item) {

      observer.observe(item);

    });


  } else {


    revealItems.forEach(function (item) {

      item.classList.add("visible");

    });

  }



  /* =========================================
     SMOOTH ANCHOR OFFSET
  ========================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {


      link.addEventListener(
        "click",
        function (event) {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(targetId);


          if (!target) {
            return;
          }


          event.preventDefault();


          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;


          window.scrollTo({

            top:
              targetPosition,

            behavior:
              "smooth"

          });

        }
      );

    });



  /* =========================================
     IMAGE FALLBACK
  ========================================== */

  document
    .querySelectorAll("img")
    .forEach(function (image) {


      image.addEventListener(
        "error",
        function () {

          image.classList.add(
            "image-error"
          );

        }
      );

    });



  /* =========================================
     CONTACT FORM
  ========================================== */

  const contactForm =
    document.querySelector(
      'form[name="property-enquiry"]'
    );


  if (contactForm) {


    contactForm.addEventListener(
      "submit",
      function () {

        const button =
          contactForm.querySelector(
            'button[type="submit"]'
          );


        if (!button) {
          return;
        }


        button.dataset.originalText =
          button.innerHTML;


        button.innerHTML =
          "Sending...";


        button.disabled =
          true;


        /*
         * Netlify handles the actual submission.
         * We only change the button state here.
         */

        setTimeout(
          function () {

            button.disabled =
              false;

          },
          5000
        );

      }
    );

  }



  /* =========================================
     CURRENT YEAR
  ========================================== */

  document
    .querySelectorAll("[data-current-year]")
    .forEach(function (element) {

      element.textContent =
        new Date().getFullYear();

    });


});
