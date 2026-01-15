// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")

      // Animate hamburger icon
      const spans = menuToggle.querySelectorAll("span")
      if (navMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translateY(10px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translateY(-10px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      const isClickInsideNav = navMenu.contains(event.target)
      const isClickOnToggle = menuToggle.contains(event.target)

      if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        const spans = menuToggle.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  const lightbox = document.getElementById("lightbox")
  const lightboxImage = document.getElementById("lightboxImage")
  const lightboxTitle = document.getElementById("lightboxTitle")
  const lightboxClose = document.getElementById("lightboxClose")
  const galleryItems = document.querySelectorAll(".gallery-preview-item")

  // Open lightbox when clicking on gallery items
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imageUrl = item.getAttribute("data-image")
      const title = item.getAttribute("data-title")

      lightboxImage.src = imageUrl
      lightboxImage.alt = title
      lightboxTitle.textContent = title

      lightbox.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling
    })
  })

  // Close lightbox
  const closeLightbox = () => {
    lightbox.classList.remove("active")
    document.body.style.overflow = "" // Restore scrolling
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox)
  }

  // Close lightbox when clicking on background
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })
  }

  // Close lightbox with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox()
    }
  })

  // Gallery Page Lightbox Functionality with Navigation
  const galleryLightbox = document.getElementById("galleryLightbox")
  const galleryLightboxImage = document.getElementById("galleryLightboxImage")
  const galleryLightboxTitle = document.getElementById("galleryLightboxTitle")
  const galleryLightboxClose = document.getElementById("galleryLightboxClose")
  const galleryPrev = document.getElementById("galleryPrev")
  const galleryNext = document.getElementById("galleryNext")
  const galleryPageItems = document.querySelectorAll(".gallery-section .gallery-item")

  let currentGalleryIndex = 0
  const galleryImages = []

  // Collect all gallery images
  if (galleryPageItems.length > 0) {
    galleryPageItems.forEach((item, index) => {
      const img = item.querySelector("img")
      const title = item.querySelector("h3")?.textContent || ""

      galleryImages.push({
        url: img.src,
        alt: img.alt,
        title: title,
      })

      item.addEventListener("click", () => {
        currentGalleryIndex = index
        openGalleryLightbox()
      })
    })
  }

  function openGalleryLightbox() {
    if (galleryImages.length === 0) return

    const current = galleryImages[currentGalleryIndex]
    galleryLightboxImage.src = current.url
    galleryLightboxImage.alt = current.alt
    galleryLightboxTitle.textContent = current.title

    galleryLightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeGalleryLightbox() {
    galleryLightbox.classList.remove("active")
    document.body.style.overflow = ""
  }

  function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length
    openGalleryLightbox()
  }

  function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length
    openGalleryLightbox()
  }

  if (galleryLightboxClose) {
    galleryLightboxClose.addEventListener("click", closeGalleryLightbox)
  }

  if (galleryNext) {
    galleryNext.addEventListener("click", showNextImage)
  }

  if (galleryPrev) {
    galleryPrev.addEventListener("click", showPrevImage)
  }

  if (galleryLightbox) {
    galleryLightbox.addEventListener("click", (e) => {
      if (e.target === galleryLightbox) {
        closeGalleryLightbox()
      }
    })
  }

  // Keyboard navigation for gallery
  document.addEventListener("keydown", (e) => {
    if (galleryLightbox && galleryLightbox.classList.contains("active")) {
      if (e.key === "Escape") {
        closeGalleryLightbox()
      } else if (e.key === "ArrowRight") {
        showNextImage()
      } else if (e.key === "ArrowLeft") {
        showPrevImage()
      }
    }
  })

  // Contact Form Handler
  const contactForm = document.getElementById("contactForm")
  const formMessage = document.getElementById("formMessage")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = {}
      formData.forEach((value, key) => {
        data[key] = value
      })

      // Basic validation
      if (!data.name || !data.email || !data.message) {
        showMessage("Lütfen tüm zorunlu alanları doldurun.", "error")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        showMessage("Lütfen geçerli bir e-posta adresi girin.", "error")
        return
      }

      // Simulate form submission
      // In a real application, you would send this data to a server
      console.log("Form Data:", data)

      // Show success message
      showMessage("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.", "success")

      // Reset form
      contactForm.reset()
    })
  }

  function showMessage(message, type) {
    formMessage.textContent = message
    formMessage.className = "form-message " + type
    formMessage.style.display = "block"

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none"
    }, 5000)
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add scroll effect to header
  let lastScroll = 0
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
    }

    lastScroll = currentScroll
  })

  // Add fade-in animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements with fade-in animation
  const fadeElements = document.querySelectorAll(".project-card, .service-item, .gallery-item")
  fadeElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
