/* =========================================================
   PREETI CAREERS — JOB PORTAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ================= ELEMENTS ================= */

  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");

  const searchBtn = document.getElementById("searchBtn");
  const keywordInput = document.getElementById("keywordInput");
  const locationInput = document.getElementById("locationInput");

  const jobCards = document.querySelectorAll(".job-card");
  const noResults = document.getElementById("noResults");

  const viewAllBtn = document.getElementById("viewAllBtn");

  const modal = document.getElementById("applicationModal");
  const closeModal = document.getElementById("closeModal");

  const selectedJob = document.getElementById("selectedJob");
  const applicationForm = document.getElementById("applicationForm");

  const toast = document.getElementById("toast");

  const currentYear = document.getElementById("currentYear");

  /* ================= CURRENT YEAR ================= */

  currentYear.textContent = new Date().getFullYear();

  /* ================= MOBILE MENU ================= */

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("open")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  /* Close mobile menu after clicking link */

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      const icon = menuBtn.querySelector("i");

      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });

  /* ================= ACTIVE NAV ================= */

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  });

  /* ================= JOB SEARCH ================= */

  // function searchJobs() {
  //   const keyword = keywordInput.value.trim().toLowerCase();

  //   const location = locationInput.value.trim().toLowerCase();

  //   let visibleJobs = 0;

  //   jobCards.forEach((card) => {
  //     const title = card.dataset.title.toLowerCase();

  //     const cardLocation = card.dataset.location.toLowerCase();

  //     const company = card
  //       .querySelector(".company-name")
  //       .textContent.toLowerCase();

  //     const category = card.dataset.category.toLowerCase();

  //     const keywordMatch =
  //       !keyword ||
  //       title.includes(keyword) ||
  //       company.includes(keyword) ||
  //       category.includes(keyword);

  //     const locationMatch = !location || cardLocation.includes(location);

  //     if (keywordMatch && locationMatch) {
  //       card.style.display = "block";

  //       visibleJobs++;
  //     } else {
  //       card.style.display = "none";
  //     }
  //   });

  //   if (visibleJobs === 0) {
  //     noResults.style.display = "block";
  //   } else {
  //     noResults.style.display = "none";
  //   }

  //   document.getElementById("jobs").scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }

  // searchBtn.addEventListener("click", searchJobs);

  // /* Search on Enter */

  // [keywordInput, locationInput].forEach((input) => {
  //   input.addEventListener("keydown", (event) => {
  //     if (event.key === "Enter") {
  //       searchJobs();
  //     }
  //   });
  // });

  /* ================= POPULAR SEARCH ================= */

  // document.querySelectorAll(".popular-searches button").forEach((button) => {
  //   button.addEventListener("click", () => {
  //     const search = button.dataset.search;

  //     keywordInput.value = search;

  //     locationInput.value = "";

  //     searchJobs();
  //   });
  // });

  /* ================= VIEW ALL JOBS ================= */

  viewAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".extra-job").forEach((job) => {
      job.classList.add("show");
    });

    viewAllBtn.style.display = "none";
  });

  /* ================= CATEGORY FILTER ================= */

  document.querySelectorAll(".category-card").forEach((category) => {
    category.addEventListener("click", () => {
      const selectedCategory = category.dataset.category;

      keywordInput.value = selectedCategory;

      locationInput.value = "";

      searchJobs();
    });
  });

  /* ================= BOOKMARKS ================= */

  document.querySelectorAll(".bookmark-btn").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("saved");

      const icon = button.querySelector("i");

      if (button.classList.contains("saved")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

        showToast("Job saved to your bookmarks.");
      } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

        showToast("Job removed from bookmarks.");
      }
    });
  });

  /* ================= APPLY BUTTON ================= */

  // document.querySelectorAll(".apply-btn").forEach((button) => {
  //   button.addEventListener("click", () => {
  //     const jobName = button.dataset.job;

  //     selectedJob.textContent = jobName;

  //     modal.classList.add("show");

  //     document.body.style.overflow = "hidden";
  //   });
  // });

  /* ================= CLOSE MODAL ================= */

  function closeApplicationModal() {
    modal.classList.remove("show");

    document.body.style.overflow = "";
  }

  closeModal.addEventListener("click", closeApplicationModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeApplicationModal();
    }
  });

  /* Escape key */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeApplicationModal();
    }
  });

  /* ================= APPLICATION FORM ================= */

  applicationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    closeApplicationModal();

    applicationForm.reset();

    showToast("Application submitted successfully!");
  });

  /* ================= TOAST ================= */

  let toastTimer;

  function showToast(message) {
    toast.querySelector("span").textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  /* ================= SCROLL REVEAL ================= */

  const revealElements = document.querySelectorAll(
    ".job-card, .category-card, .stat-item, .manager-content, .manager-image, .contact-card",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";

    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);
  });

  /* ================= INITIAL JOB STATE ================= */

  /*
       Initially show the first four jobs.
       "View All Jobs" reveals the remaining jobs.
    */

  document.querySelectorAll(".extra-job").forEach((job) => {
    job.style.display = "none";
  });

  /* ================= SMOOTH ANCHOR ================= */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (targetId === "#" || targetId === "#home") {
        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const navbarHeight = 76;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
});
