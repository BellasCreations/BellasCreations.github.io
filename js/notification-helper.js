/**
 * Notification Helper
 *
 * This script provides enhanced notification functionality
 * that can be used across the site.
 */
;(() => {
  // Create notification container if it doesn't exist
  function ensureNotificationContainer() {
    let notification = document.getElementById("notification")

    if (!notification) {
      notification = document.createElement("div")
      notification.id = "notification"
      notification.className = "notification"

      const notificationContent = document.createElement("div")
      notificationContent.className = "notification-content"

      const icon = document.createElement("i")
      icon.className = "fas fa-info-circle"

      const message = document.createElement("p")
      message.textContent = ""

      const closeButton = document.createElement("button")
      closeButton.className = "close-notification"
      closeButton.innerHTML = "&times;"
      closeButton.addEventListener("click", () => {
        hideGlobalNotification()
      })

      notificationContent.appendChild(icon)
      notificationContent.appendChild(message)
      notification.appendChild(notificationContent)
      notification.appendChild(closeButton)

      document.body.appendChild(notification)
    }

    return notification
  }

  // Hide notification with animation
  window.hideGlobalNotification = (callback) => {
    const notification = document.getElementById("notification")
    if (!notification) return

    notification.classList.add("hiding")
    setTimeout(() => {
      notification.style.display = "none"
      notification.classList.remove("hiding")
      if (callback && typeof callback === "function") {
        callback()
      }
    }, 300)
  }

  // Show notification with animation
  window.showGlobalNotification = (message, type) => {
    const notification = ensureNotificationContainer()
    const notificationContent = notification.querySelector(".notification-content p")
    const notificationIcon = notification.querySelector(".notification-content i")

    if (notificationContent) notificationContent.textContent = message

    if (notificationIcon) {
      if (type === "success") {
        notificationIcon.className = "fas fa-check-circle"
        notificationIcon.style.color = "var(--success-color)"
        notification.style.borderLeftColor = "var(--success-color)"
        notification.style.backgroundColor = "rgba(40, 167, 69, 0.1)"
      } else if (type === "error") {
        notificationIcon.className = "fas fa-exclamation-circle"
        notificationIcon.style.color = "var(--error-color)"
        notification.style.borderLeftColor = "var(--error-color)"
        notification.style.backgroundColor = "rgba(220, 53, 69, 0.1)"
      } else {
        notificationIcon.className = "fas fa-info-circle"
        notificationIcon.style.color = "var(--primary-color)"
        notification.style.borderLeftColor = "var(--primary-color)"
        notification.style.backgroundColor = "rgba(255, 107, 107, 0.1)"
      }
    }

    // Remove any existing animation classes
    notification.classList.remove("hiding")

    // Reset animation
    notification.style.animation = "none"
    // Trigger reflow
    void notification.offsetWidth
    // Add animation back
    notification.style.animation = "notificationSlideIn 0.3s forwards"

    notification.style.display = "block"

    return notification
  }
})()

