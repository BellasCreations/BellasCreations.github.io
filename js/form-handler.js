/**
 * Form Handler for Bella's Creations
 *
 * This script handles form submissions for both order and contact forms
 * using the FormSubmit service.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Order Form
  const orderForm = document.getElementById("orderForm")
  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault() // Prevent default form submission

      // Basic validation
      if (!validateOrderForm()) {
        return false
      }

      // Set the reply-to field to the user's email
      const emailInput = document.getElementById("email")
      const replyToField = orderForm.querySelector('input[name="_replyto"]')
      if (replyToField && emailInput && emailInput.value) {
        replyToField.value = emailInput.value
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

      // Create FormData object
      const formData = new FormData(orderForm)

      // Send form data via POST
      fetch(orderForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Show success notification
            const notification = document.getElementById("notification")
            if (notification) {
              const notificationContent = notification.querySelector(".notification-content p")
              if (notificationContent) {
                notificationContent.textContent =
                  "Вашата заявка за поръчка е изпратена успешно! Ще се свържем с вас скоро."
              }
              notification.style.display = "block"

              // Hide notification after 5 seconds
              setTimeout(() => {
                notification.style.display = "none"
              }, 5000)
            }

            // Reset form
            orderForm.reset()

            // Reset file info if exists
            const fileInfo = document.getElementById("fileInfo")
            if (fileInfo) {
              fileInfo.textContent = ""
              fileInfo.style.backgroundColor = ""
              fileInfo.style.borderLeft = ""
            }

            // Redirect to thank you page
            window.location.href = "thank-you.html"
          } else {
            throw new Error("Network response was not ok")
          }
        })
        .catch((error) => {
          console.error("Error:", error)

          // Show error notification
          const notification = document.getElementById("notification")
          if (notification) {
            const notificationContent = notification.querySelector(".notification-content p")
            if (notificationContent) {
              notificationContent.textContent = "Възникна грешка при изпращането. Моля, опитайте отново по-късно."
            }
            const notificationIcon = notification.querySelector(".notification-content i")
            if (notificationIcon) {
              notificationIcon.className = "fas fa-exclamation-circle"
              notificationIcon.style.color = "var(--error-color)"
            }
            notification.style.borderLeftColor = "var(--error-color)"
            notification.style.display = "block"
          }
        })
        .finally(() => {
          // Reset button state
          if (submitButton) {
            const buttonText = submitButton.querySelector(".btn-text")
            const buttonIcon = submitButton.querySelector(".btn-icon")
            const loadingIndicator = submitButton.querySelector(".loading-indicator")

            submitButton.disabled = false
            if (buttonText) buttonText.textContent = "Изпрати Заявка за Поръчка"
            if (buttonIcon) buttonIcon.style.display = "inline-block"
            if (loadingIndicator) loadingIndicator.style.display = "none"
          }
        })
    })
  }

  // Contact Form
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault() // Prevent default form submission

      // Basic validation
      if (!validateContactForm()) {
        return false
      }

      // Set the reply-to field to the user's email
      const emailInput = document.getElementById("contactEmail")
      const replyToField = contactForm.querySelector('input[name="_replyto"]')
      if (replyToField && emailInput && emailInput.value) {
        replyToField.value = emailInput.value
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

      // Create FormData object
      const formData = new FormData(contactForm)

      // Send form data via POST
      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Show success notification
            const notification = document.getElementById("notification")
            if (notification) {
              const notificationContent = notification.querySelector(".notification-content p")
              if (notificationContent) {
                notificationContent.textContent = "Вашето съобщение е изпратено успешно! Ще се свържем с вас скоро."
              }
              notification.style.display = "block"

              // Hide notification after 5 seconds
              setTimeout(() => {
                notification.style.display = "none"
              }, 5000)
            }

            // Reset form
            contactForm.reset()

            // Redirect to thank you page
            window.location.href = "thank-you.html"
          } else {
            throw new Error("Network response was not ok")
          }
        })
        .catch((error) => {
          console.error("Error:", error)

          // Show error notification
          const notification = document.getElementById("notification")
          if (notification) {
            const notificationContent = notification.querySelector(".notification-content p")
            if (notificationContent) {
              notificationContent.textContent = "Възникна грешка при изпращането. Моля, опитайте отново по-късно."
            }
            const notificationIcon = notification.querySelector(".notification-content i")
            if (notificationIcon) {
              notificationIcon.className = "fas fa-exclamation-circle"
              notificationIcon.style.color = "var(--error-color)"
            }
            notification.style.borderLeftColor = "var(--error-color)"
            notification.style.display = "block"
          }
        })
        .finally(() => {
          // Reset button state
          if (submitButton) {
            const buttonText = submitButton.querySelector(".btn-text")
            const buttonIcon = submitButton.querySelector(".btn-icon")
            const loadingIndicator = submitButton.querySelector(".loading-indicator")

            submitButton.disabled = false
            if (buttonText) buttonText.textContent = "Изпрати Съобщение"
            if (buttonIcon) buttonIcon.style.display = "inline-block"
            if (loadingIndicator) loadingIndicator.style.display = "none"
          }
        })
    })
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
})

