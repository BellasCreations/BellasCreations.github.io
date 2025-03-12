/**
 * Подобрител на аватари за отзивите
 *
 * Този скрипт добавя разнообразие към аватарите в отзивите чрез:
 * 1. Извличане на инициали от имената
 * 2. Добавяне на различни цветове
 * 3. Добавяне на анимации при посочване
 */
document.addEventListener("DOMContentLoaded", () => {
  // Масив от цветови класове
  const colorClasses = ["color1", "color2", "color3", "color4", "color5"]

  // Функция за извличане на инициали от име
  function getInitials(name) {
    const nameParts = name.split(" ")
    if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase()
    }
    return nameParts[0].substring(0, 2).toUpperCase()
  }

  // Намиране на всички аватари
  const avatars = document.querySelectorAll(".author-avatar")

  // Обработка на аватарите
  avatars.forEach((avatar, index) => {
    // Намиране на името от съседния елемент
    const authorNameElement = avatar.closest(".testimonial-author").querySelector(".author-name")
    if (authorNameElement) {
      const authorName = authorNameElement.textContent.trim()
      // Задаване на инициалите
      avatar.textContent = getInitials(authorName)

      // Добавяне на клас за инициали, ако няма такъв
      if (!avatar.classList.contains("initials")) {
        avatar.classList.add("initials")
      }

      // Добавяне на случаен цветови клас, ако няма такъв
      if (!Array.from(avatar.classList).some((cls) => cls.startsWith("color"))) {
        // Използваме индекса, за да имаме различни цветове за всеки аватар
        const colorIndex = index % colorClasses.length
        avatar.classList.add(colorClasses[colorIndex])
      }
    }
  })

  // Добавяне на ефект при посочване на всички аватари
  avatars.forEach((avatar) => {
    avatar.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)"
    })

    avatar.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })
})

