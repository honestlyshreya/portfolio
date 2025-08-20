// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// Typing Animation
const typedTextSpan = document.querySelector("#typed-text")
const textArray = [
  "Computer Science Student",
  "Web Developer",
  "Python Programmer",
  "Problem Solver",
  "Tech Enthusiast",
]
const typingDelay = 100
const erasingDelay = 50
const newTextDelay = 2000
let textArrayIndex = 0
let charIndex = 0

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
    charIndex++
    setTimeout(type, typingDelay)
  } else {
    setTimeout(erase, newTextDelay)
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
    charIndex--
    setTimeout(erase, erasingDelay)
  } else {
    textArrayIndex++
    if (textArrayIndex >= textArray.length) textArrayIndex = 0
    setTimeout(type, typingDelay + 1100)
  }
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, newTextDelay + 250)
})

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")

      // Animate skill bars when skills section is visible
      if (entry.target.classList.contains("skills")) {
        animateSkillBars()
      }
    }
  })
}, observerOptions)

// Observe all sections for fade-in animation
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("fade-in")
  observer.observe(section)
})

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    setTimeout(() => {
      bar.style.width = width
    }, 200)
  })
}

// Contact form handling with backend
const contactForm = document.getElementById("contactForm")
const submitBtn = document.getElementById("submitBtn")
const btnText = submitBtn.querySelector(".btn-text")
const btnLoading = submitBtn.querySelector(".btn-loading")
const formMessage = document.getElementById("form-message")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  }

  // Show loading state
  submitBtn.disabled = true
  btnText.style.display = "none"
  btnLoading.style.display = "inline-block"
  formMessage.style.display = "none"

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (result.success) {
      // Success message
      formMessage.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle"></i>
          ${result.message}
        </div>
      `
      formMessage.className = "form-message success"
      contactForm.reset()
    } else {
      // Error message
      formMessage.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          ${result.error || "Something went wrong. Please try again."}
        </div>
      `
      formMessage.className = "form-message error"
    }
  } catch (error) {
    console.error("Form submission error:", error)
    formMessage.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        Network error. Please check your connection and try again.
      </div>
    `
    formMessage.className = "form-message error"
  } finally {
    // Reset button state
    submitBtn.disabled = false
    btnText.style.display = "inline-block"
    btnLoading.style.display = "none"
    formMessage.style.display = "block"
  }
})

// Add active class to current navigation item
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Add hover effects to cards
document.querySelectorAll(".experience-card, .cert-card, .timeline-content").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add floating animation to hero cards
const floatingCards = document.querySelectorAll(".floating-card")
floatingCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.5}s`
})

// Dynamic year in footer
const currentYear = new Date().getFullYear()
document.querySelector(".footer p").innerHTML = `&copy; ${currentYear} Shreya Ranjan. All rights reserved.`
