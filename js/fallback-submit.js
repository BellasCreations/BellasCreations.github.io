/**
 * Fallback submission handler for when FormSubmit has issues with file uploads
 * This script provides an alternative way to submit the form
 */
document.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("orderForm")

  if (orderForm) {
    // Add a hidden field to track submission attempts
    const attemptField = document.createElement("input")
    attemptField.type = "hidden"
    attemptField.name = "submission_attempt"
    attemptField.value = "1"
    orderForm.appendChild(attemptField)

    // Add event listener for form submission errors
    window.addEventListener(
      "error",
      (e) => {
        // Check if the error is related to form submission
        if (e.target && (e.target.tagName === "FORM" || e.target.tagName === "INPUT")) {
          console.log("Form submission error detected, trying fallback method")
          tryFallbackSubmission()
        }
      },
      true,
    )

    // Function to try fallback submission
    function tryFallbackSubmission() {
      // Show a notification that we're trying an alternative method
      const notification = document.getElementById("notification")
      if (notification) {
        const notificationContent = notification.querySelector(".notification-content p")
        if (notificationContent) {
          notificationContent.textContent = "Изпращане чрез алтернативен метод..."
        }
        notification.style.display = "block"
      }

      // Check if we have a file
      const fileUpload = document.getElementById("fileUpload")
      if (fileUpload && fileUpload.files.length > 0) {
        // For files, we'll use a different approach
        // First, collect all form data except the file
        const formData = new FormData(orderForm)

        // Create a text summary of the form data
        let formSummary = "=== FORM DATA ===\n\n"
        for (const [key, value] of formData.entries()) {
          // Skip the file
          if (key !== "attachment") {
            formSummary += `${key}: ${value}\n`
          }
        }

        // Create a mailto link with the form data
        const subject = encodeURIComponent("Нова Поръчка от Уебсайта")
        const body = encodeURIComponent(
          formSummary + "\n\nМоля, отговорете на този имейл, за да изпратя снимката като прикачен файл.",
        )
        const mailtoLink = `mailto:bella.creations.bg@gmail.com?subject=${subject}&body=${body}`

        // Open the mailto link
        window.location.href = mailtoLink

        // Show instructions to the user
        setTimeout(() => {
          alert(
            "Моля, изпратете имейла, който се отвори. След това ще можете да отговорите на имейла и да прикачите снимката.",
          )

          // Redirect to thank you page
          window.location.href = "thank-you.html"
        }, 1000)
      } else {
        // No file, we can use a simple mailto link
        const formData = new FormData(orderForm)

        // Create a text summary of the form data
        let formSummary = "=== FORM DATA ===\n\n"
        for (const [key, value] of formData.entries()) {
          formSummary += `${key}: ${value}\n`
        }

        // Create a mailto link with the form data
        const subject = encodeURIComponent("Нова Поръчка от Уебсайта")
        const body = encodeURIComponent(formSummary)
        const mailtoLink = `mailto:bella.creations.bg@gmail.com?subject=${subject}&body=${body}`

        // Open the mailto link
        window.location.href = mailtoLink

        // Redirect to thank you page
        setTimeout(() => {
          window.location.href = "thank-you.html"
        }, 1000)
      }
    }
  }
})

