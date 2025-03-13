/**
 * Order Form Handling Script
 *
 * This script provides functionality for the order form including:
 * - Form validation
 * - Smooth animations
 * - Form submission handling
 */
document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const orderForm = document.getElementById("orderForm")
  const caricatureRadio = document.getElementById("caricature")
  const figureRadio = document.getElementById("figure")
  const caricatureOptions = document.getElementById("caricatureOptions")
  const figureOptions = document.getElementById("figureOptions")
  const orderTypeTabs = document.querySelector(".order-type-tabs")
  const fileUpload = document.getElementById("fileUpload")
  const fileInfo = document.getElementById("fileInfo")
  const fileUploadBox = document.querySelector(".file-upload-box")
  const notification = document.getElementById("notification")
  const closeNotification = document.querySelector(".close-notification")
  const submitButton = orderForm ? orderForm.querySelector("button[type='submit']") : null

  /**
   * Toggle between caricature and figure options with smooth transition
   */
  function toggleOrderTypeContent() {
    // Create a smooth transition between options
    if (caricatureRadio && figureRadio && caricatureOptions && figureOptions) {
      if (caricatureRadio.checked) {
        if (figureOptions.style.display !== "none") {
          // Fade out figure options first
          figureOptions.style.opacity = "0"
          figureOptions.style.transform = "translateY(10px)"
          setTimeout(() => {
            figureOptions.style.display = "none"
            // Then fade in caricature options
            caricatureOptions.style.display = "block"
            setTimeout(() => {
              caricatureOptions.style.opacity = "1"
              caricatureOptions.style.transform = "translateY(0)"
            }, 50)
          }, 300)
        } else {
          caricatureOptions.style.display = "block"
          setTimeout(() => {
            caricatureOptions.style.opacity = "1"
            caricatureOptions.style.transform = "translateY(0)"
          }, 50)
        }
      } else {
        if (caricatureOptions.style.display !== "none") {
          // Fade out caricature options first
          caricatureOptions.style.opacity = "0"
          caricatureOptions.style.transform = "translateY(10px)"
          setTimeout(() => {
            caricatureOptions.style.display = "none"
            // Then fade in figure options
            figureOptions.style.display = "block"
            setTimeout(() => {
              figureOptions.style.opacity = "1"
              figureOptions.style.transform = "translateY(0)"
            }, 50)
          }, 300)
        } else {
          figureOptions.style.display = "block"
          setTimeout(() => {
            figureOptions.style.opacity = "1"
            figureOptions.style.transform = "translateY(0)"
          }, 50)
        }
      }
    }
  }

  // Add initial opacity and transform styles
  if (caricatureOptions) {
    caricatureOptions.style.opacity = "1"
    caricatureOptions.style.transform = "translateY(0)"
    caricatureOptions.style.transition = "opacity 0.3s ease, transform 0.3s ease"
  }
  if (figureOptions) {
    figureOptions.style.opacity = "0"
    figureOptions.style.transform = "translateY(10px)"
    figureOptions.style.transition = "opacity 0.3s ease, transform 0.3s ease"
  }

  // Apply event listeners for order type radio buttons
  if (caricatureRadio && figureRadio) {
    caricatureRadio.addEventListener("change", toggleOrderTypeContent)
    figureRadio.addEventListener("change", toggleOrderTypeContent)
    toggleOrderTypeContent() // Initialize with correct display
  }

  /**
   * Handle file upload interactions including drag and drop
   */
  if (fileUpload && fileInfo && fileUploadBox) {
    // Click the hidden file input when the box is clicked
    fileUploadBox.addEventListener("click", () => {
      fileUpload.click()
    })

    // Display file info when a file is selected
    fileUpload.addEventListener("change", function () {
      if (this.files.length > 0) {
        const file = this.files[0]
        const fileSize = (file.size / 1024 / 1024).toFixed(2) // in MB

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

    // Enhance with drag and drop capability
    fileUploadBox.addEventListener("dragover", (e) => {
      e.preventDefault()
      fileUploadBox.style.borderColor = "var(--primary-color)"
      fileUploadBox.style.backgroundColor = "rgba(255, 107, 107, 0.05)"
      fileUploadBox.style.transform = "translateY(-3px)"
      fileUploadBox.style.boxShadow = "0 8px 15px rgba(255, 107, 107, 0.2)"
    })

    fileUploadBox.addEventListener("dragleave", () => {
      fileUploadBox.style.borderColor = "var(--primary-light)"
      fileUploadBox.style.backgroundColor = ""
      fileUploadBox.style.transform = ""
      fileUploadBox.style.boxShadow = ""
    })

    fileUploadBox.addEventListener("drop", (e) => {
      e.preventDefault()
      fileUploadBox.style.borderColor = "var(--primary-light)"
      fileUploadBox.style.backgroundColor = ""
      fileUploadBox.style.transform = ""
      fileUploadBox.style.boxShadow = ""

      if (e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0]
        const fileSize = (file.size / 1024 / 1024).toFixed(2) // in MB

        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          fileInfo.textContent = `Файлът е твърде голям: ${fileSize} MB (максимум 10MB)`
          fileInfo.style.color = "var(--error-color)"
          fileInfo.style.backgroundColor = "rgba(220, 53, 69, 0.1)"
          fileInfo.style.borderLeft = "3px solid var(--error-color)"
          fileInfo.style.padding = "0.5rem"
          fileInfo.style.borderRadius = "4px"
          return
        }

        fileUpload.files = e.dataTransfer.files
        fileInfo.textContent = `Избран файл: ${file.name} (${fileSize} MB)`
        fileInfo.style.color = "var(--text-light)"
        fileInfo.style.animation = "fadeInUp 0.3s ease forwards"

        // Add success indicator
        fileInfo.style.backgroundColor = "rgba(40, 167, 69, 0.1)"
        fileInfo.style.borderLeft = "3px solid var(--success-color)"
        fileInfo.style.padding = "0.5rem"
        fileInfo.style.borderRadius = "4px"
      }
    })
  }

  /**
   * Process URL parameters for pre-filled form values
   */
  function processUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search)
    const typeParam = urlParams.get("type")
    const itemParam = urlParams.get("item")
    const titleParam = urlParams.get("title")
    const descriptionParam = urlParams.get("description")
    const priceParam = urlParams.get("price")
    const imageParam = urlParams.get("image")

    if (!typeParam) return

    // Set order type based on URL parameter
    if (typeParam === "figure" && figureRadio) {
      figureRadio.checked = true
      toggleOrderTypeContent()

      handleProductSelection(
        typeParam,
        itemParam,
        titleParam,
        descriptionParam,
        priceParam,
        imageParam,
        "3D Принтирана Фигура",
      )
    } else if (typeParam === "caricature" && caricatureRadio) {
      caricatureRadio.checked = true
      toggleOrderTypeContent()

      handleProductSelection(typeParam, itemParam, titleParam, descriptionParam, priceParam, imageParam, "Карикатура")
    }
  }

  /**
   * Handle product selection from URL parameters
   */
  function handleProductSelection(type, itemId, title, description, price, image, typeName) {
    if (!itemId || !title) return

    // Hide the order type selection with animation
    if (orderTypeTabs) {
      orderTypeTabs.style.opacity = "0"
      orderTypeTabs.style.transform = "translateY(10px)"
      setTimeout(() => {
        orderTypeTabs.style.display = "none"

        // Add a note about the selected product type with animation
        const typeNote = document.createElement("p")
        typeNote.className = "selected-type-note fade-in-up"
        typeNote.innerHTML = `<strong>Избран тип:</strong> ${typeName} <span class="change-type-link">(промени)</span>`
        orderTypeTabs.parentNode.insertBefore(typeNote, orderTypeTabs)

        // Add event listener to the change link
        const changeTypeLink = typeNote.querySelector(".change-type-link")
        if (changeTypeLink) {
          changeTypeLink.addEventListener("click", () => {
            // Hide the note with animation
            typeNote.style.opacity = "0"
            typeNote.style.transform = "translateY(-10px)"

            setTimeout(() => {
              // Show the order type tabs again with animation
              orderTypeTabs.style.display = "flex"
              orderTypeTabs.style.opacity = "0"
              orderTypeTabs.style.transform = "translateY(10px)"
              setTimeout(() => {
                orderTypeTabs.style.opacity = "1"
                orderTypeTabs.style.transform = "translateY(0)"
              }, 50)

              // Remove the note
              typeNote.remove()
            }, 300)
          })
        }
      }, 300)
    }

    // Show selected product info with animation
    if (title && description && price) {
      const selectedProductInfo = document.getElementById("selectedProductInfo")
      const productTitle = document.getElementById("productTitle")
      const productDescription = document.getElementById("productDescription")
      const productPrice = document.getElementById("productPrice")
      const productImage = document.getElementById("productImage")
      const productImageContainer = document.getElementById("productImageContainer")

      if (selectedProductInfo && productTitle && productDescription && productPrice) {
        // Start with opacity 0 and fade in
        selectedProductInfo.style.opacity = "0"
        selectedProductInfo.style.transform = "translateY(10px)"
        selectedProductInfo.style.display = "block"

        productTitle.textContent = decodeURIComponent(title)
        productDescription.textContent = decodeURIComponent(description)
        productPrice.textContent = decodeURIComponent(price)

        // Handle image if provided
        if (image && productImage && productImageContainer) {
          productImage.src = decodeURIComponent(image)
          productImageContainer.style.opacity = "0"
          productImageContainer.style.transform = "scale(0.95)"
          productImageContainer.style.display = "block"

          // Ensure image is properly sized before showing
          productImage.onload = () => {
            // Ensure image doesn't exceed container
            productImage.style.maxWidth = "100%"
            productImage.style.height = "auto"

            setTimeout(() => {
              productImageContainer.style.opacity = "1"
              productImageContainer.style.transform = "scale(1)"
            }, 300)
          }
        }

        // Pre-fill description with animation
        const descriptionField = document.getElementById("description")
        if (descriptionField) {
          descriptionField.value = `Бих искал/а да поръчам "${decodeURIComponent(title)}". `

          // Trigger focus and blur to show the animation
          setTimeout(() => {
            descriptionField.focus()
            setTimeout(() => {
              descriptionField.blur()
            }, 500)
          }, 800)
        }

        // Animate the appearance of the product info
        setTimeout(() => {
          selectedProductInfo.style.opacity = "1"
          selectedProductInfo.style.transform = "translateY(0)"
        }, 300)
      }
    }
  }

  // Process URL parameters when page loads
  processUrlParameters()

  // Add event listener to close notification
  if (closeNotification && notification) {
    closeNotification.addEventListener("click", () => {
      notification.style.display = "none"
    })
  }

  // Add focus/blur animations to form inputs
  const formInputs = orderForm ? orderForm.querySelectorAll("input, textarea, select") : []
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
        (this.type === "number" && Number.parseInt(this.value) >= 1) ||
        (this.tagName === "TEXTAREA" && this.value.length >= 10) ||
        (this.type !== "email" && this.type !== "number" && this.value.trim() !== "")
      ) {
        this.classList.remove("error")
      }
    })
  })
})

