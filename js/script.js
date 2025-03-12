document.addEventListener("DOMContentLoaded", () => {
  // Мобилно меню
  const menuToggle = document.getElementById("menuToggle")
  const menu = document.querySelector(".menu")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active")
    })
  }

  // Табове в галерията
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  if (tabBtns.length > 0) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const tabId = this.dataset.tab

        // Премахване на активния клас от всички табове
        tabBtns.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))

        // Добавяне на активен клас към избрания таб
        this.classList.add("active")
        document.getElementById(tabId).classList.add("active")
      })
    })

    // Проверка за параметър в URL-а
    const urlParams = new URLSearchParams(window.location.search)
    const typeParam = urlParams.get("type")

    if (typeParam) {
      const tabToActivate = document.querySelector(`.tab-btn[data-tab="${typeParam}"]`)
      if (tabToActivate) {
        tabToActivate.click()
      }
    }
  }

  // Модално прозорче в галерията
  const modal = document.getElementById("galleryModal")
  const viewBtns = document.querySelectorAll(".view-btn")
  const closeModal = document.querySelector(".close-modal")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("modalTitle")
  const modalDescription = document.getElementById("modalDescription")
  const modalPrice = document.getElementById("modalPrice")
  const modalOrderBtn = document.getElementById("modalOrderBtn")

  if (viewBtns.length > 0 && modal) {
    // Данни за карикатурите
    const caricatureData = [
      {
        id: 1,
        title: "Рибар Ентусиаст",
        description: "Персонализирана карикатура на рибар край езеро",
        price: "60 лв.",
      },
      {
        id: 2,
        title: "Професионалист по Шлайфане",
        description: "Карикатура на професионалист по шлайфане на подове",
        price: "60 лв.",
      },
      {
        id: 3,
        title: "Гейминг Двойка",
        description: "Персонализирана карикатура на двойка в тяхната гейминг стая",
        price: "60 лв.",
      },
      {
        id: 4,
        title: "Приключенска Сцена",
        description: "Карикатура с множество герои - танк, китарист и парашутист",
        price: "75 лв.",
      },
      {
        id: 5,
        title: "Рибар с Надпис 'FISH'",
        description: "Риболовна тематична карикатура с персонализиран текст",
        price: "60 лв.",
      },
      {
        id: 6,
        title: "Традиционна Носия",
        description: "Карикатура в традиционна българска народна носия",
        price: "65 лв.",
      },
      // Removed Digital Fishing Caricature entry
      {
        id: 8,
        title: "Van Driver with Fish",
        description: "Caricature of a van driver with fishing hobby",
        price: "60 лв.",
      },
    ]

    // Данни за 3D фигурите
    const figureData = [
      {
        id: 1,
        title: "Женска Фигура",
        description: "3D принтирана женска фигура в бяло",
        price: "80 лв.",
      },
    ]

    viewBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const itemId = Number.parseInt(this.dataset.id)
        const itemType = this.dataset.type
        let itemData

        if (itemType === "caricature") {
          itemData = caricatureData.find((item) => item.id === itemId)
        } else {
          itemData = figureData.find((item) => item.id === itemId)
        }

        if (itemData) {
          modalImage.src = itemData.image
          modalImage.alt = itemData.title
          modalTitle.textContent = itemData.title
          modalDescription.textContent = itemData.description
          modalPrice.textContent = itemData.price
          modalOrderBtn.href = `order.html?type=${itemType}&item=${itemId}&title=${encodeURIComponent(itemData.title)}&description=${encodeURIComponent(itemData.description)}&price=${encodeURIComponent(itemData.price)}`

          modal.style.display = "block"
        }
      })
    })

    if (closeModal) {
      closeModal.addEventListener("click", () => {
        modal.style.display = "none"
      })
    }

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  }

  // Обновяване на линковете за поръчка в галерията
  const orderButtons = document.querySelectorAll(".gallery-info a.btn")
  if (orderButtons.length > 0) {
    // Данни за карикатурите
    const caricatureData = [
      {
        id: 1,
        title: "Рибар Ентусиаст",
        description: "Персонализирана карикатура на рибар край езеро",
        price: "60 лв.",
      },
      {
        id: 2,
        title: "Професионалист по Шлайфане",
        description: "Карикатура на професионалист по шлайфане на подове",
        price: "60 лв.",
      },
      {
        id: 3,
        title: "Гейминг Двойка",
        description: "Персонализирана карикатура на двойка в тяхната гейминг стая",
        price: "60 лв.",
      },
      {
        id: 4,
        title: "Приключенска Сцена",
        description: "Карикатура с множество герои - танк, китарист и парашутист",
        price: "75 лв.",
      },
      {
        id: 5,
        title: "Рибар с Надпис 'FISH'",
        description: "Риболовна тематична карикатура с персонализиран текст",
        price: "60 лв.",
      },
      {
        id: 6,
        title: "Традиционна Носия",
        description: "Карикатура в традиционна българска народна носия",
        price: "65 лв.",
      },
      // Removed Digital Fishing Caricature entry
      {
        id: 8,
        title: "Van Driver with Fish",
        description: "Caricature of a van driver with fishing hobby",
        price: "60 лв.",
      },
    ]

    // Данни за 3D фигурите
    const figureData = [
      {
        id: 1,
        title: "Женска Фигура",
        description: "3D принтирана женска фигура в бяло",
        price: "80 лв.",
      },
    ]

    orderButtons.forEach((button) => {
      const href = button.getAttribute("href")
      if (href && href.includes("order.html")) {
        const urlParams = new URLSearchParams(href.split("?")[1])
        const type = urlParams.get("type")
        const itemId = Number.parseInt(urlParams.get("item"))

        let itemData
        if (type === "caricature") {
          itemData = caricatureData.find((item) => item.id === itemId)
        } else if (type === "figure") {
          itemData = figureData.find((item) => item.id === itemId)
        }

        if (itemData) {
          const newHref = `order.html?type=${type}&item=${itemId}&title=${encodeURIComponent(itemData.title)}&description=${encodeURIComponent(itemData.description)}&price=${encodeURIComponent(itemData.price)}`
          button.setAttribute("href", newHref)
        }
      }
    })
  }

  // Табове в страницата за поръчка
  const orderTypeTabs = document.querySelectorAll('input[name="orderType"]')
  const caricatureOptions = document.getElementById("caricatureOptions")
  const figureOptions = document.getElementById("figureOptions")

  if (orderTypeTabs.length > 0) {
    orderTypeTabs.forEach((tab) => {
      tab.addEventListener("change", function () {
        if (this.value === "caricature") {
          caricatureOptions.style.display = "block"
          figureOptions.style.display = "none"
        } else {
          caricatureOptions.style.display = "none"
          figureOptions.style.display = "block"
        }
      })
    })

    // Проверка за параметър в URL-а
    const urlParams = new URLSearchParams(window.location.search)
    const typeParam = urlParams.get("type")
    const itemParam = urlParams.get("item")
    const titleParam = urlParams.get("title")
    const descriptionParam = urlParams.get("description")
    const priceParam = urlParams.get("price")

    if (typeParam) {
      const tabToActivate = document.getElementById(typeParam)
      if (tabToActivate) {
        tabToActivate.checked = true

        // Симулиране на събитие change
        const event = new Event("change")
        tabToActivate.dispatchEvent(event)
      }
    }

    // Показване на информация за избрания продукт
    if (titleParam) {
      const selectedProductInfo = document.getElementById("selectedProductInfo")
      if (selectedProductInfo) {
        selectedProductInfo.style.display = "block"

        const productTitle = document.getElementById("productTitle")
        const productDescription = document.getElementById("productDescription")
        const productPrice = document.getElementById("productPrice")

        if (productTitle) productTitle.textContent = decodeURIComponent(titleParam)
        if (productDescription) productDescription.textContent = decodeURIComponent(descriptionParam)
        if (productPrice) productPrice.textContent = decodeURIComponent(priceParam)

        // Попълване на описанието с информация за избрания продукт
        const descriptionField = document.getElementById("description")
        if (descriptionField) {
          descriptionField.value = `Искам да поръчам "${decodeURIComponent(titleParam)}". ${descriptionField.value}`
        }

        // Направи качването на снимка опционално, ако има избран продукт
        const fileUpload = document.getElementById("fileUpload")
        const fileUploadRequired = document.getElementById("fileUploadRequired")
        const fileUploadNote = document.getElementById("fileUploadNote")

        if (fileUpload && fileUploadRequired && fileUploadNote) {
          fileUpload.removeAttribute("required")
          fileUploadRequired.style.display = "none"
          fileUploadNote.style.display = "block"
        }
      }
    }
  }

  // Качване на файл
  const fileUpload = document.getElementById("fileUpload")
  const fileInfo = document.getElementById("fileInfo")

  if (fileUpload && fileInfo) {
    fileUpload.addEventListener("change", function () {
      if (this.files.length > 0) {
        const file = this.files[0]
        const fileSize = (file.size / 1024 / 1024).toFixed(2) // в MB

        fileInfo.textContent = `Избран файл: ${file.name} (${fileSize} MB)`
        fileInfo.style.color = "var(--text-light)" // Възстановяване на нормалния цвят
      } else {
        fileInfo.textContent = ""
      }
    })
  }

  // Форма за поръчка
  const orderForm = document.getElementById("orderForm")
  const notification = document.getElementById("notification")
  const closeNotification = document.querySelector(".close-notification")

  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault()

      // Проверка дали файлът е задължителен
      const fileUpload = document.getElementById("fileUpload")
      const titleParam = new URLSearchParams(window.location.search).get("title")

      let isValid = true

      // Ако няма избран продукт и няма качен файл, покажи грешка
      if (!titleParam && fileUpload && fileUpload.files.length === 0) {
        // Покажи съобщение за грешка
        const fileInfo = document.getElementById("fileInfo")
        if (fileInfo) {
          fileInfo.textContent = "Моля, качете референтна снимка или изберете продукт от галерията."
          fileInfo.style.color = "var(--error-color)"
        }
        isValid = false
      }

      if (!isValid) {
        return // Спри изпращането на формата, ако има грешки
      }

      // Тук бихте добавили код за изпращане на формата чрез AJAX или fetch
      // За демонстрация просто показваме нотификация

      if (notification) {
        notification.style.display = "block"

        // Скриване на нотификацията след 5 секунди
        setTimeout(() => {
          notification.style.display = "none"
        }, 5000)
      }

      // Изчистване на формата
      this.reset()
      if (fileInfo) {
        fileInfo.textContent = ""
        fileInfo.style.color = "var(--text-light)"
      }

      // Скриване на информацията за избрания продукт
      const selectedProductInfo = document.getElementById("selectedProductInfo")
      if (selectedProductInfo) {
        selectedProductInfo.style.display = "none"
      }

      // Възстановяване на задължителното качване на файл
      if (fileUpload) {
        fileUpload.setAttribute("required", "")
        const fileUploadRequired = document.getElementById("fileUploadRequired")
        const fileUploadNote = document.getElementById("fileUploadNote")

        if (fileUploadRequired) fileUploadRequired.style.display = "inline"
        if (fileUploadNote) fileUploadNote.style.display = "none"
      }
    })
  }

  // Форма за контакт
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault()

      // Тук бихте добавили код за изпращане на формата чрез AJAX или fetch
      // За демонстрация просто показваме нотификация

      if (notification) {
        notification.style.display = "block"

        // Скриване на нотификацията след 5 секунди
        setTimeout(() => {
          notification.style.display = "none"
        }, 5000)
      }

      // Изчистване на формата
      this.reset()
    })
  }

  if (closeNotification) {
    closeNotification.addEventListener("click", () => {
      notification.style.display = "none"
    })
  }
})

