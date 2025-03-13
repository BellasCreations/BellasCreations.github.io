/**
 * File Upload Fix
 *
 * This script provides a direct solution for the file upload issue
 * without changing other functionalities.
 */
document.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("orderForm")

  if (orderForm) {
    // Override the form submission
    orderForm.addEventListener("submit", (event) => {
      // Prevent the default form submission
      event.preventDefault()

      // Get the file input
      const fileInput = document.getElementById("fileUpload")

      // Check if there's a file to upload
      if (fileInput && fileInput.files.length > 0) {
        // Show loading state
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

        // Create a simple FormData object
        const formData = new FormData()

        // Add all form fields to FormData
        const formElements = orderForm.elements
        for (let i = 0; i < formElements.length; i++) {
          const element = formElements[i]

          // Skip submit buttons and hidden FormSubmit fields
          if (element.type !== "submit" && !element.name.startsWith("_")) {
            if (element.type === "file") {
              // Only add file if it exists
              if (element.files.length > 0) {
                formData.append(element.name, element.files[0])
              }
            } else if (element.type === "radio" || element.type === "checkbox") {
              // Only add checked radio/checkbox values
              if (element.checked) {
                formData.append(element.name, element.value)
              }
            } else {
              // Add all other field types
              formData.append(element.name, element.value)
            }
          }
        }

        // Add FormSubmit required fields
        formData.append("_subject", "Нова Поръчка от Уебсайта")
        formData.append("_template", "table")
        formData.append("_captcha", "false")
        formData.append("_next", "thank-you.html")

        // Get the email for reply-to
        const emailInput = document.getElementById("email")
        if (emailInput && emailInput.value) {
          formData.append("_replyto", emailInput.value)
        }

        // Use a direct approach with XMLHttpRequest instead of fetch
        const xhr = new XMLHttpRequest()

        // Set up event handlers
        xhr.onreadystatechange = () => {
          // Reset button state
          if (submitButton) {
            submitButton.disabled = false
            if (buttonText) buttonText.textContent = "Изпрати Заявка за Поръчка"
            if (buttonIcon) buttonIcon.style.display = "inline-block"
            if (loadingIndicator) loadingIndicator.style.display = "none"
          }

          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              // Success - redirect to thank you page
              window.location.href = "thank-you.html"
            } else {
              // Error - try alternative approach
              useAlternativeSubmission()
            }
          }
        }

        // Handle network errors
        xhr.onerror = () => {
          // Reset button state
          if (submitButton) {
            submitButton.disabled = false
            if (buttonText) buttonText.textContent = "Изпрати Заявка за Поръчка"
            if (buttonIcon) buttonIcon.style.display = "inline-block"
            if (loadingIndicator) loadingIndicator.style.display = "none"
          }

          // Try alternative approach
          useAlternativeSubmission()
        }

        // Open and send the request
        xhr.open("POST", "https://formsubmit.co/bella.creations.bg@gmail.com", true)
        xhr.send(formData)
      } else {
        // No file to upload, use the original form submission
        orderForm.submit()
      }
    })

    // Alternative submission method
    function useAlternativeSubmission() {
      // Show notification
      const notification = document.getElementById("notification")
      if (notification) {
        const notificationContent = notification.querySelector(".notification-content p")
        const notificationIcon = notification.querySelector(".notification-content i")

        if (notificationContent) {
          notificationContent.textContent = "Изпращаме вашата заявка чрез алтернативен метод..."
        }

        if (notificationIcon) {
          notificationIcon.className = "fas fa-info-circle"
          notificationIcon.style.color = "#3498db"
        }

        notification.style.borderLeftColor = "#3498db"
        notification.style.display = "block"
      }

      // Create a simple form without file input
      const tempForm = document.createElement("form")
      tempForm.method = "POST"
      tempForm.action = "https://formsubmit.co/bella.creations.bg@gmail.com"
      tempForm.style.display = "none"

      // Add all form fields except file
      const formElements = orderForm.elements
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i]

        // Skip file inputs, submit buttons, and hidden FormSubmit fields
        if (element.type !== "file" && element.type !== "submit" && !element.name.startsWith("_")) {
          if (element.type === "radio" || element.type === "checkbox") {
            // Only add checked radio/checkbox values
            if (element.checked) {
              const input = document.createElement("input")
              input.type = "hidden"
              input.name = element.name
              input.value = element.value
              tempForm.appendChild(input)
            }
          } else {
            // Add all other field types
            const input = document.createElement("input")
            input.type = "hidden"
            input.name = element.name
            input.value = element.value
            tempForm.appendChild(input)
          }
        }
      }

      // Add FormSubmit required fields
      const subjectField = document.createElement("input")
      subjectField.type = "hidden"
      subjectField.name = "_subject"
      subjectField.value = "Нова Поръчка от Уебсайта (без прикачен файл)"
      tempForm.appendChild(subjectField)

      const templateField = document.createElement("input")
      templateField.type = "hidden"
      templateField.name = "_template"
      templateField.value = "table"
      tempForm.appendChild(templateField)

      const captchaField = document.createElement("input")
      captchaField.type = "hidden"
      captchaField.name = "_captcha"
      captchaField.value = "false"
      tempForm.appendChild(captchaField)

      const nextField = document.createElement("input")
      nextField.type = "hidden"
      nextField.name = "_next"
      nextField.value = "thank-you.html"
      tempForm.appendChild(nextField)

      // Get the email for reply-to
      const emailInput = document.getElementById("email")
      if (emailInput && emailInput.value) {
        const replyToField = document.createElement("input")
        replyToField.type = "hidden"
        replyToField.name = "_replyto"
        replyToField.value = emailInput.value
        tempForm.appendChild(replyToField)
      }

      // Add a note about the file
      const fileNote = document.createElement("input")
      fileNote.type = "hidden"
      fileNote.name = "file_note"
      fileNote.value =
        "Клиентът се опита да прикачи файл, но възникна проблем. Моля, свържете се с него за получаване на файла."
      tempForm.appendChild(fileNote)

      // Add the form to the document and submit it
      document.body.appendChild(tempForm)
      tempForm.submit()
    }
  }
})

