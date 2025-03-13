// Simple script to handle redirects if Netlify configuration fails
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on a 404 page but the URL suggests we should be on a specific page
  const path = window.location.pathname

  // Map of paths that should redirect to HTML files
  const redirectMap = {
    "/gallery": "/gallery.html",
    "/order": "/order.html",
    "/contact": "/contact.html",
    "/thank-you": "/thank-you.html",
  }

  // Check if we need to redirect
  if (redirectMap[path]) {
    console.log(`Redirecting from ${path} to ${redirectMap[path]}`)
    window.location.href = redirectMap[path]
  }
})

