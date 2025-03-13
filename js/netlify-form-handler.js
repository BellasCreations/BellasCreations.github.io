/**
 * Netlify Form Handler
 *
 * This script handles form submissions for both order and contact forms
 * using Netlify Forms.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Order Form
  const orderForm = document.getElementById("orderForm")
  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      // Don't prevent default - let Netlify handle the submission

      // But we can still show loading state and validate
      if (!validateOrderForm()) {
        event.preventDefault()
        return false
      }

      // Set loading state
      const submitButton = orderForm.querySelector("button[type='submit']")
      if (submitButton) {
        const buttonText = submitButton.querySelector(".btn-text")
        const buttonIcon = submitButton.querySelector(".btn-icon")
        const loadingIndicator = submitButton.querySelector(".loading-indicator")

        submitButton.disabled = true
        if (buttonText) buttonText.textContent = "Изпращане..."
        if (buttonIcon) buttonIcon.style.display = "none"
        if (loadingIndicator) loadingIndicator.style.display = "inline-block"
      }

      // Show notification
      showNotification("Формата се изпраща...", "info")

      // Netlify will handle the redirect to thank-you.html
    })
  }

  // Contact Form
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      // Don't prevent default - let Netlify handle the submission

      // But we can still show loading state and validate
      if (!validateContactForm()) {
        event.preventDefault()
        return false
      }

      // Set loading state
      const submitButton = contactForm.querySelector("button[type='submit']")
      if (submitButton) {
        const buttonText = submitButton.querySelector(".btn-text")
        const buttonIcon = submitButton.querySelector(".btn-icon")
        const loadingIndicator = submitButton.querySelector(".loading-indicator")

        submitButton.disabled = true
        if (buttonText) buttonText.textContent = "Изпращане..."
        if (buttonIcon) buttonIcon.style.display = "none"
        if (loadingIndicator) loadingIndicator.style.display = "inline-block"
      }

      // Show notification
      showNotification("Формата се изпраща...", "info")

      // Netlify will handle the redirect to thank-you.html
    })
  }

  // Helper functions
  function showNotification(message, type = "success") {
    const notification = document.getElementById("notification")
    if (notification) {
      const notificationContent = notification.querySelector(".notification-content p")
      const notificationIcon = notification.querySelector(".notification-content i")

      if (notificationContent) {
        notificationContent.textContent = message
      }

      if (notificationIcon) {
        if (type === "success") {
          notificationIcon.className = "fas fa-check-circle"
          notificationIcon.style.color = "var(--success-color)"
          notification.style.borderLeftColor = "var(--success-color)"
        } else if (type === "error") {
          notificationIcon.className = "fas fa-exclamation-circle"
          notificationIcon.style.color = "var(--error-color)"
          notification.style.borderLeftColor = "var(--error-color)"
        } else if (type === "info") {
          notificationIcon.className = "fas fa-info-circle"
          notificationIcon.style.color = "#3498db"
          notification.style.borderLeftColor = "#3498db"
        }
      }

      notification.style.display = "block"
    }
  }

  // Form validation functions
  function validateOrderForm() {
    let isValid = true

    // Clear previous error messages
    const errorMessages = document.querySelectorAll(".error-message")
    errorMessages.forEach((msg) => {
      msg.style.display = "none"
    })

    // Name validation
    const nameInput = document.getElementById("name")
    if (nameInput && !nameInput.value.trim()) {
      const errorEl = document.getElementById("name-error")
      if (errorEl) {
        errorEl.textContent = "Моля, въведете вашето име"
        errorEl.style.display = "block"
        isValid = false
      }
    }

    // Email validation
    const emailInput = document.getElementById("email")
    if (emailInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        const errorEl = document.getElementById("email-error")
        if (errorEl) {
          errorEl.textContent = "Моля, въведете валиден имейл адрес"
          errorEl.style.display = "block"
          isValid = false
        }
      }
    }

    // Description validation
    const descriptionInput = document.getElementById("description")
    if (descriptionInput && (!descriptionInput.value.trim() || descriptionInput.value.length < 10)) {
      const errorEl = document.getElementById("description-error")
      if (errorEl) {
        errorEl.textContent = "Моля, въведете описание (минимум 10 символа)"
        errorEl.style.display = "block"
        isValid = false
      }
    }

    // File validation - check file size if a file is selected
    const fileUpload = document.getElementById("fileUpload")
    if (fileUpload && fileUpload.files.length > 0) {
      const file = fileUpload.files[0]
      const maxSize = 10 * 1024 * 1024 // 10MB

      if (file.size > maxSize) {
        const errorEl = document.getElementById("file-error")
        if (errorEl) {
          errorEl.textContent = "Файлът е твърде голям. Максималният размер е 10MB."
          errorEl.style.display = "block"
          isValid = false
        }
      }
    }

    return isValid
  }

  function validateContactForm() {
    let isValid = true

    // Clear previous error messages
    const errorMessages = document.querySelectorAll(".error-message")
    errorMessages.forEach((msg) => {
      msg.style.display = "none"
    })

    // Name validation
    const nameInput = document.getElementById("contactName")
    if (nameInput && !nameInput.value.trim()) {
      const errorEl = document.getElementById("contact-name-error")
      if (errorEl) {
        errorEl.textContent = "Моля, въведете вашето име"
        errorEl.style.display = "block"
        isValid = false
      }
    }

    // Email validation
    const emailInput = document.getElementById("contactEmail")
    if (emailInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        const errorEl = document.getElementById("contact-email-error")
        if (errorEl) {
          errorEl.textContent = "Моля, въведете валиден имейл адрес"
          errorEl.style.display = "block"
          isValid = false
        }
      }
    }

    // Subject validation
    const subjectInput = document.getElementById("contactSubject")
    if (subjectInput && !subjectInput.value.trim()) {
      const errorEl = document.getElementById("contact-subject-error")
      if (errorEl) {
        errorEl.textContent = "Моля, въведете тема на съобщението"
        errorEl.style.display = "block"
        isValid = false
      }
    }

    // Message validation
    const messageInput = document.getElementById("contactMessage")
    if (messageInput && (!messageInput.value.trim() || messageInput.value.length < 10)) {
      const errorEl = document.getElementById("contact-message-error")
      if (errorEl) {
        errorEl.textContent = "Моля, въведете съобщение (минимум 10 символа)"
        errorEl.style.display = "block"
        isValid = false
      }
    }

    return isValid
  }

  // File upload preview
  const fileUpload = document.getElementById("fileUpload")
  const fileInfo = document.getElementById("fileInfo")

  if (fileUpload && fileInfo) {
    fileUpload.addEventListener("change", function () {
      if (this.files.length > 0) {
        const file = this.files[0]
        const fileSize = (file.size / 1024 / 1024).toFixed(2) // в MB

        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          fileInfo.textContent = `Файлът е твърде голям: ${fileSize} MB (максимум 10MB)`
          fileInfo.style.color = "var(--error-color)"
          fileInfo.style.backgroundColor = "rgba(220, 53, 69, 0.1)"
          fileInfo.style.borderLeft = "3px solid var(--error-color)"
          fileInfo.style.padding = "0.5rem"
          fileInfo.style.borderRadius = "4px"

          // Clear the file input
          this.value = ""
          return
        }

        fileInfo.textContent = `Избран файл: ${file.name} (${fileSize} MB)`
        fileInfo.style.color = "var(--text-light)"
        fileInfo.style.animation = "fadeInUp 0.3s ease forwards"

        // Add success indicator
        fileInfo.style.backgroundColor = "rgba(40, 167, 69, 0.1)"
        fileInfo.style.borderLeft = "3px solid var(--success-color)"
        fileInfo.style.padding = "0.5rem"
        fileInfo.style.borderRadius = "4px"
      } else {
        fileInfo.textContent = ""
        fileInfo.style.backgroundColor = ""
        fileInfo.style.borderLeft = ""
      }
    })
  }
})

