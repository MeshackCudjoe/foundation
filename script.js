document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navList.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Close menu when clicking on links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navList.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Header Scroll Effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Hero Slider
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  let currentIndex = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    let newIndex = (currentIndex + 1) % slides.length;
    showSlide(newIndex);
  }

  function prevSlide() {
    let newIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(newIndex);
  }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetSlider() {
    clearInterval(slideInterval);
    startSlider();
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetSlider();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetSlider();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      resetSlider();
    });
  });

  // Start the slider
  startSlider();

  // Clients Slider
  const clientTrack = document.querySelector(".clients-track");
  const clientSlides = document.querySelectorAll(".client-slide");
  const clientPrev = document.querySelector(".client-prev");
  const clientNext = document.querySelector(".client-next");
  let clientIndex = 0;
  let clientInterval;
  let slidesToShow = 4;

  function updateSlidesToShow() {
    if (window.innerWidth <= 768) {
      slidesToShow = 2;
    } else if (window.innerWidth <= 992) {
      slidesToShow = 3;
    } else {
      slidesToShow = 4;
    }
  }

  function updateClientPosition() {
    updateSlidesToShow();
    const slideWidth = clientSlides[0].offsetWidth;
    clientTrack.style.transform = `translateX(-${clientIndex * slideWidth}px)`;
  }

  function nextClient() {
    updateSlidesToShow();
    if (clientIndex < clientSlides.length - slidesToShow) {
      clientIndex++;
    } else {
      clientIndex = 0;
    }
    updateClientPosition();
  }

  function prevClient() {
    updateSlidesToShow();
    if (clientIndex > 0) {
      clientIndex--;
    } else {
      clientIndex = clientSlides.length - slidesToShow;
    }
    updateClientPosition();
  }

  function startClientSlider() {
    clientInterval = setInterval(nextClient, 3000);
  }

  function resetClientSlider() {
    clearInterval(clientInterval);
    startClientSlider();
  }

  clientNext.addEventListener("click", () => {
    nextClient();
    resetClientSlider();
  });

  clientPrev.addEventListener("click", () => {
    prevClient();
    resetClientSlider();
  });

  // Pause on hover
  clientTrack.addEventListener("mouseenter", () =>
    clearInterval(clientInterval)
  );
  clientTrack.addEventListener("mouseleave", startClientSlider);

  // Initialize
  updateClientPosition();
  startClientSlider();

  // Animate Stats
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const duration = 2000;
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
        }
        stat.textContent = Math.floor(current);
      }, 16);
    });
  }

  // Intersection Observer for stats animation
  const statsSection = document.querySelector(".about-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(statsSection);

  // Form Submission
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    const whatsappMessage =
      `New Contact Form Submission:%0A%0A` +
      `Name: ${name}%0A` +
      `Email: ${email}%0A` +
      `Phone: ${phone}%0A` +
      `Message: ${message}`;

    window.open(`https://wa.me/233541487536?text=${whatsappMessage}`, "_blank");
    this.reset();

    // Optional: Show success message
    alert(
      "Thank you! You will be redirected to WhatsApp to send your message."
    );
  });

  // Window resize handler
  window.addEventListener("resize", updateClientPosition);
});
