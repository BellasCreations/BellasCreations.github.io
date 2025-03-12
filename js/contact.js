/**
 * Contact Form Handling Script
 *
 * This script provides functionality for the contact form including:
 * - Form validation
 * - Smooth animations
 * - Form submission handling
 */
document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const contactForm = document.getElementById("contactForm")
  const notification = document.getElementById("notification")
  const closeNotification = document.querySelector(".close-notification")
  const submitButton = contactForm ? contactForm.querySelector("button[type='submit']") : null

  // Add event listener to close notification
  if (closeNotification && notification) {
    closeNotification.addEventListener("click", () => {
      notification.style.display = "none"
    })
  }

  // Add focus/blur animations to form inputs
  const formInputs = contactForm ? contactForm.querySelectorAll("input, textarea, select") : []
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("input-focused")
      this.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("input-focused")
      this.classList.remove("focused")

      // Remove error class if field is valid
      if (
        (this.type === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) ||
        (this.tagName === "TEXTAREA" && this.value.length >= 10) ||
        (this.type !== "email" && this.value.trim() !== "")
      ) {
        this.classList.remove("error")
      }
    })
  })
})

