/**
 * Direct Email Solution
 *
 * This script provides a direct email solution for the form submission
 * when files are attached, bypassing FormSubmit entirely.
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

        // Create a text summary of the form data
        let formSummary = "=== ПОРЪЧКА ОТ УЕБСАЙТА ===\n\n"

        // Add all form fields to the summary
        const formElements = orderForm.elements
        for (let i = 0; i < formElements.length; i++) {
          const element = formElements[i]

          // Skip submit buttons, file inputs, and hidden FormSubmit fields
          if (
            element.type !== "submit" &&
            element.type !== "file" &&
            !element.name.startsWith("_") &&
            element.name !== "_honey"
          ) {
            if (element.type === "radio" || element.type === "checkbox") {
              // Only add checked radio/checkbox values
              if (element.checked) {
                formSummary += `${element.name}: ${element.value}\n`
              }
            } else if (element.value) {
              // Add all other field types with values
              formSummary += `${element.name}: ${element.value}\n`
            }
          }
        }

        // Add a note about the file
        const file = fileInput.files[0]
        formSummary += `\n=== ИНФОРМАЦИЯ ЗА ФАЙЛА ===\n`
        formSummary += `Име на файла: ${file.name}\n`
        formSummary += `Размер: ${(file.size / 1024 / 1024).toFixed(2)} MB\n`
        formSummary += `Тип: ${file.type}\n\n`
        formSummary += `Моля, отговорете на този имейл, за да получите снимката като прикачен файл.\n`
        formSummary += `Клиентът ще бъде уведомен да ви изпрати снимката директно.`

        // Get the email for reply-to
        const emailInput = document.getElementById("email")
        const userEmail = emailInput ? emailInput.value : ""

        // Create a mailto link with the form data
        const subject = encodeURIComponent("Нова Поръчка от Уебсайта")
        const body = encodeURIComponent(formSummary)
        const mailtoLink = `mailto:bella.creations.bg@gmail.com?subject=${subject}&body=${body}`

        // Show notification to the user
        const notification = document.getElementById("notification")
        if (notification) {
          const notificationContent = notification.querySelector(".notification-content p")
          const notificationIcon = notification.querySelector(".notification-content i")

          if (notificationContent) {
            notificationContent.innerHTML = `
              Поради технически причини, ще ви пренасочим към вашия имейл клиент.<br>
              Моля, изпратете имейла, който ще се отвори, и след това изпратете снимката като отговор.
            `
          }

          if (notificationIcon) {
            notificationIcon.className = "fas fa-info-circle"
            notificationIcon.style.color = "#3498db"
          }

          notification.style.borderLeftColor = "#3498db"
          notification.style.display = "block"
        }

        // Reset button state
        if (submitButton) {
          submitButton.disabled = false
          if (buttonText) buttonText.textContent = "Изпрати Заявка за Поръчка"
          if (buttonIcon) buttonIcon.style.display = "inline-block"
          if (loadingIndicator) loadingIndicator.style.display = "none"
        }

        // Wait a moment to show the notification, then open the mailto link
        setTimeout(() => {
          window.location.href = mailtoLink

          // After opening the mailto link, show a confirmation dialog
          setTimeout(() => {
            alert(
              "Моля, изпратете имейла, който се отвори. След това ще можете да отговорите на имейла и да прикачите снимката.",
            )

            // Redirect to thank you page
            window.location.href = "thank-you.html"
          }, 1000)
        }, 2000)
      } else {
        // No file to upload, use the original form submission with FormSubmit
        orderForm.submit()
      }
    })
  }

  // Also handle the contact form
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    // Override the form submission
    contactForm.addEventListener("submit", (event) => {
      // Let the original form submission work
      // This is just here for completeness
    })
  }
})

