/**
 * Main Site JavaScript
 *
 * This script handles global functionality that applies across all pages:
 * - Mobile menu
 * - Notification handling
 * - Current year in footer
 * - Animation helpers
 */
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const currentYearElements = document.querySelectorAll("#current-year")
  currentYearElements.forEach((el) => {
    el.textContent = new Date().getFullYear()
  })

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle")
  const menu = document.querySelector(".menu")

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active")

      // Change icon based on menu state
      menuToggle.innerHTML = menu.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>'

      // Add animation to menu items when opening
      if (menu.classList.contains("active")) {
        const menuItems = menu.querySelectorAll("li")
        menuItems.forEach((item, index) => {
          item.style.animation = "none"
          void item.offsetWidth // Trigger reflow
          item.style.animation = `fadeInDown 0.3s ease forwards ${0.1 + index * 0.1}s`
        })
      }
    })
  }

  // Close modal when clicking outside
  const modals = document.querySelectorAll(".modal")
  window.addEventListener("click", (event) => {
    modals.forEach((modal) => {
      if (event.target === modal) {
        // Add fade out animation
        const modalContent = modal.querySelector(".modal-content")
        if (modalContent) {
          modalContent.style.animation = "fadeOut 0.3s ease forwards"
          setTimeout(() => {
            modal.style.display = "none"
            // Reset animation for next time
            modalContent.style.animation = "modalFadeIn 0.3s forwards"
          }, 300)
        } else {
          modal.style.display = "none"
        }
      }
    })
  })

  // Close modal with X button
  const closeModalButtons = document.querySelectorAll(".close-modal")
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal")
      if (modal) {
        // Add fade out animation
        const modalContent = modal.querySelector(".modal-content")
        if (modalContent) {
          modalContent.style.animation = "fadeOut 0.3s ease forwards"
          setTimeout(() => {
            modal.style.display = "none"
            // Reset animation for next time
            modalContent.style.animation = "modalFadeIn 0.3s forwards"
          }, 300)
        } else {
          modal.style.display = "none"
        }
      }
    })
  })

  // Global notification handling
  const notification = document.getElementById("notification")
  const closeNotification = document.querySelector(".close-notification")

  if (notification && closeNotification) {
    closeNotification.addEventListener("click", () => {
      notification.classList.add("hiding")
      setTimeout(() => {
        notification.style.display = "none"
        notification.classList.remove("hiding")
      }, 300)
    })
  }

  // Add animation classes to elements on page load
  const animatedElements = document.querySelectorAll("[data-animation]")
  animatedElements.forEach((element) => {
    const animationType = element.getAttribute("data-animation")
    const delay = element.getAttribute("data-delay") || 0

    setTimeout(() => {
      element.classList.add(animationType)
    }, delay)
  })

  // Add scroll animations
  const scrollAnimationElements = document.querySelectorAll("[data-scroll-animation]")

  function checkScrollAnimation() {
    scrollAnimationElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const viewportHeight = window.innerHeight

      if (elementPosition < viewportHeight * 0.8) {
        const animationType = element.getAttribute("data-scroll-animation")
        element.classList.add(animationType)
      }
    })
  }

  // Check on load and scroll
  checkScrollAnimation()
  window.addEventListener("scroll", checkScrollAnimation)

  // Add hover effects to gallery items
  const galleryItems = document.querySelectorAll(".gallery-item")
  galleryItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("hover-active")
    })

    item.addEventListener("mouseleave", () => {
      item.classList.remove("hover-active")
    })
  })

  // Add smooth scrolling to all internal links
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
})

