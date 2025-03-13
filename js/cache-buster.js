/**
 * Cache Buster Script
 *
 * This script adds a cache-busting parameter to image URLs
 * to ensure fresh content loads after deployment
 */
document.addEventListener("DOMContentLoaded", () => {
  // Add timestamp to force cache refresh
  const timestamp = new Date().getTime()

  // Function to add cache-busting parameter to image URLs
  function addCacheBuster(selector) {
    const elements = document.querySelectorAll(selector)
    elements.forEach((element) => {
      const currentSrc = element.getAttribute("src")
      if (currentSrc && !currentSrc.includes("?v=") && !currentSrc.startsWith("data:")) {
        // Only add to URLs that don't already have a version parameter
        element.setAttribute("src", `${currentSrc}?v=${timestamp}`)
      }
    })
  }

  // Apply to all images
  addCacheBuster("img")

  // Log message to console for debugging
  console.log("Cache buster applied to images with timestamp:", timestamp)
})

