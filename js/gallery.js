/**
 * Gallery Page JavaScript
 *
 * This script handles the gallery functionality:
 * - Populating gallery items
 * - Tab switching
 * - Modal interactions
 * - Animations
 */
document.addEventListener("DOMContentLoaded", () => {
  // Gallery data
  const caricatures = [
    {
      id: 1,
      title: "Рибар Ентусиаст",
      description: "Персонализирана карикатура на рибар край езеро",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20241223_122425.jpg-OQzqYpG7SgmjzFVhS9aR5jBRijBy1w.jpeg",
      price: "60 лв.",
      alt: "Карикатура на рибар край езеро с въдица и риба",
    },
    {
      id: 2,
      title: "Професионалист по Шлайфане",
      description: "Карикатура на професионалист по шлайфане на подове",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000000078.png-uxA7EN9xJfDP9led779mpU7bpx71EM.jpeg",
      price: "60 лв.",
      alt: "Карикатура на мъж с професионално оборудване за шлайфане на подове",
    },
    {
      id: 3,
      title: "Гейминг Двойка",
      description: "Персонализирана карикатура на двойка в тяхната гейминг стая",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20241219_180202.jpg-LkVgc6rXWXxcgsEw99WGIKYZvXeS5q.jpeg",
      price: "60 лв.",
      alt: "Карикатура на двойка, играеща видео игри заедно в гейминг стая",
    },
    {
      id: 4,
      title: "Приключенска Сцена",
      description: "Карикатура с множество герои - танк, китарист и парашутист",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250214_114247.jpg-hTCtmiRRLgulTfIxnYV46jsWzageVJ.jpeg",
      price: "75 лв.",
      alt: "Карикатура с множество герои включващи танк, китарист и парашутист в приключенска сцена",
    },
    {
      id: 5,
      title: "Рибар с Надпис 'FISH'",
      description: "Риболовна тематична карикатура с персонализиран текст",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20241223_122402_%281%29.jpg-LiSPOeuKAuWyQicm71hEtZZrovSVqI.jpeg",
      price: "60 лв.",
      alt: "Карикатура на рибар с надпис 'FISH' и риболовни принадлежности",
    },
    {
      id: 6,
      title: "Традиционна Носия",
      description: "Карикатура в традиционна българска народна носия",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250227_142805_%281%29.jpg-oHr1IJfq9ynmn0Ba5DfrvB36RWgkBB.jpeg",
      price: "65 лв.",
      alt: "Карикатура на човек в традиционна българска народна носия",
    },
    {
      id: 8,
      title: "Van Driver with Fish",
      description: "Caricature of a van driver with fishing hobby",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/snapedit_1733334421607.jpeg-5GQVDsJjg0BbTkZPKsIOhRrnjbZBNf.png",
      price: "60 лв.",
      alt: "Карикатура на шофьор на ван с хоби риболов, държащ риба",
    },
  ]

  // Only show the white figure in the 3D Printed Figures section
  const figures = [
    {
      id: 1,
      title: "Женска Фигура",
      description: "3D принтирана женска фигура в бяло",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250228_153822_%281%29.jpg-bZME26h971GEM9zZLV9XiDVIr88yL7.jpeg",
      price: "80 лв.",
      alt: "3D принтирана бяла женска фигура в изящна поза",
    },
  ]

  // Populate gallery grids
  const caricaturesGrid = document.querySelector("#caricatures .gallery-grid")
  const figuresGrid = document.querySelector("#figures .gallery-grid")

  /**
   * Create gallery item with animation
   * @param {Object} item - Gallery item data
   * @param {string} type - 'caricature' or 'figure'
   * @param {number} index - Item index for staggered animation
   * @returns {HTMLElement} Gallery item element
   */
  function createGalleryItem(item, type, index) {
    const galleryItem = document.createElement("div")
    galleryItem.className = "gallery-item fade-in-up"
    galleryItem.style.animationDelay = `${0.1 + index * 0.1}s`

    galleryItem.innerHTML = `
    <div class="gallery-image">
      <img src="${item.image}" alt="${item.alt || item.title}" loading="lazy">
      <div class="gallery-overlay">
        <button class="view-btn" data-id="${item.id}" data-type="${type}">Преглед</button>
      </div>
    </div>
    <div class="gallery-info">
      <div>
        <h3>${item.title}</h3>
        <p class="price">${item.price}</p>
      </div>
      <a href="order.html?type=${type}&item=${item.id}&title=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.description)}&price=${encodeURIComponent(item.price)}&image=${encodeURIComponent(item.image)}" class="btn secondary">Поръчай</a>
    </div>
  `

    // Add hover animations
    const image = galleryItem.querySelector("img")
    const overlay = galleryItem.querySelector(".gallery-overlay")

    galleryItem.addEventListener("mouseenter", () => {
      image.style.transform = "scale(1.05)"
      overlay.style.opacity = "1"
    })

    galleryItem.addEventListener("mouseleave", () => {
      image.style.transform = ""
      overlay.style.opacity = "0"
    })

    return galleryItem
  }

  // Populate caricatures grid with staggered animations
  if (caricaturesGrid) {
    caricatures.forEach((item, index) => {
      const galleryItem = createGalleryItem(item, "caricature", index)
      caricaturesGrid.appendChild(galleryItem)
    })
  }

  // Populate figures grid with staggered animations
  if (figuresGrid) {
    figures.forEach((item, index) => {
      const galleryItem = createGalleryItem(item, "figure", index)
      figuresGrid.appendChild(galleryItem)
    })
  }

  // Tab functionality with smooth transitions
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabValue = this.getAttribute("data-tab")

      // Update active tab button with smooth transition
      tabButtons.forEach((btn) => {
        btn.classList.remove("active")
        btn.style.transform = ""
      })

      this.classList.add("active")
      this.style.transform = "translateY(-5px)"

      // Show corresponding tab content with fade transition
      tabContents.forEach((content) => {
        if (content.id === tabValue) {
          // Fade in new content
          content.style.opacity = "0"
          content.style.display = "block"

          setTimeout(() => {
            content.style.opacity = "1"
            content.classList.add("active")
          }, 50)
        } else {
          // Fade out old content
          content.style.opacity = "0"

          setTimeout(() => {
            content.style.display = "none"
            content.classList.remove("active")
          }, 300)
        }
      })
    })
  })

  // Check URL parameters for default tab
  const urlParams = new URLSearchParams(window.location.search)
  const typeParam = urlParams.get("type")

  if (typeParam === "figures") {
    document.querySelector('[data-tab="figures"]').click()
  }

  // Modal functionality with enhanced animations
  const modal = document.getElementById("galleryModal")
  const modalImage = document.getElementById("modalImage")
  const modalTitle = document.getElementById("modalTitle")
  const modalDescription = document.getElementById("modalDescription")
  const modalPrice = document.getElementById("modalPrice")
  const modalOrderBtn = document.getElementById("modalOrderBtn")
  const modalContent = modal ? modal.querySelector(".modal-content") : null

  // Add event listeners to view buttons
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("view-btn")) {
      const itemId = Number.parseInt(e.target.getAttribute("data-id"))
      const itemType = e.target.getAttribute("data-type")

      let item
      if (itemType === "caricature") {
        item = caricatures.find((c) => c.id === itemId)
      } else {
        item = figures.find((f) => f.id === itemId)
      }

      if (item && modal && modalContent) {
        // Reset modal animation
        modalContent.style.animation = "none"
        void modalContent.offsetWidth // Trigger reflow
        modalContent.style.animation = "modalFadeIn 0.3s forwards"

        // Preload image before showing modal
        const img = new Image()
        img.onload = () => {
          // Set modal content after image preload
          modalImage.src = item.image
          modalImage.alt = item.alt || item.title
          modalTitle.textContent = item.title
          modalDescription.textContent = item.description
          modalPrice.textContent = item.price
          modalOrderBtn.href = `order.html?type=${itemType}&item=${itemId}&title=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.description)}&price=${encodeURIComponent(item.price)}&image=${encodeURIComponent(item.image)}`

          // Show modal with fade animation
          modal.style.display = "block"

          // Add zoom animation to image
          setTimeout(() => {
            modalImage.classList.add("zoom-in")
          }, 300)
        }
        img.src = item.image
      }
    }
  })

  // Add image zoom animation class
  if (modalImage) {
    modalImage.addEventListener("load", function () {
      this.classList.add("loaded")
    })
  }

  // Add structured data for gallery items
  const structuredDataScript = document.createElement("script")
  structuredDataScript.type = "application/ld+json"

  // Create structured data for all gallery items
  const galleryItems = []

  // Add caricatures to structured data
  caricatures.forEach((item) => {
    galleryItems.push({
      "@type": "Product",
      name: item.title,
      description: item.description,
      image: item.image,
      offers: {
        "@type": "Offer",
        price: item.price.replace(/[^\d.]/g, ""),
        priceCurrency: "BGN",
        availability: "https://schema.org/InStock",
      },
    })
  })

  // Add figures to structured data
  figures.forEach((item) => {
    galleryItems.push({
      "@type": "Product",
      name: item.title,
      description: item.description,
      image: item.image,
      offers: {
        "@type": "Offer",
        price: item.price.replace(/[^\d.]/g, ""),
        priceCurrency: "BGN",
        availability: "https://schema.org/InStock",
      },
    })
  })

  // Create the structured data object
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: galleryItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: item,
    })),
  }

  structuredDataScript.textContent = JSON.stringify(structuredData)
  document.head.appendChild(structuredDataScript)
})

// Add CSS for smooth zoom animations
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style")
  style.textContent = `
   .gallery-item {
     transition: transform 0.3s ease, box-shadow 0.3s ease;
   }
   
   .gallery-item:hover {
     transform: translateY(-5px);
     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
   }
   
   .gallery-image img {
     transition: transform 0.5s ease;
   }
   
   .gallery-overlay {
     transition: opacity 0.3s ease;
   }
   
   .modal-content img {
     transition: transform 0.5s ease;
   }
   
   .modal-content img.zoom-in {
     transform: scale(1.02);
   }
   
   .modal-content img.loaded {
     animation: fadeIn 0.3s ease forwards;
   }
   
   .tab-content {
     transition: opacity 0.3s ease;
   }
   
   .tab-btn {
     transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
   }
 `
  document.head.appendChild(style)
})

