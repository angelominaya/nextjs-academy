// Import SweetAlert2 (asignado luego al cargar)
let Swal
const bootstrap = window.bootstrap

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle")
  const body = document.body
  const icon = darkModeToggle.querySelector("i")

  const currentTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", currentTheme)
  updateDarkModeIcon(currentTheme, icon)

  darkModeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    updateDarkModeIcon(newTheme, icon)

    // showNotification(`Modo ${newTheme === "dark" ? "oscuro" : "claro"} activado`, "info")
  })
})

function updateDarkModeIcon(theme, icon) {
  icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill"
}

// Welcome Alert Function
function showWelcomeAlert() {
  if (typeof Swal === "undefined") {
    showNotification("La alerta aún se está cargando. Intenta en un momento.", "warning")
    return
  }

  Swal.fire({
    title: "¡Bienvenido a NextJS Academy!",
    text: "¿Estás listo para comenzar tu journey con Next.js?",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "¡Sí, empecemos!",
    cancelButtonText: "Más tarde",
    confirmButtonColor: "#0070f3",
    cancelButtonColor: "#6c757d",
  }).then((result) => {
    if (result.isConfirmed) {
      showNotification("¡Excelente! Te contactaremos pronto con más información.", "success")
    }
  })
}

// Article Alert Function
function showArticleAlert(articleTitle) {
  if (typeof Swal === "undefined") {
    showNotification("La alerta aún se está cargando. Intenta en un momento.", "warning")
    return
  }

  Swal.fire({
    title: `Artículo: ${articleTitle}`,
    text: "Este artículo se abrirá en una nueva ventana. ¿Continuar?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Leer artículo",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#0070f3",
  }).then((result) => {
    if (result.isConfirmed) {
      showNotification("Redirigiendo al artículo...", "info")
      setTimeout(() => {
        showNotification("¡Artículo cargado exitosamente!", "success")
      }, 1500)
    }
  })
}

// Contact Form Handler
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(contactForm)
      const firstName = formData.get("firstName") || ""
      const lastName = formData.get("lastName") || ""
      const email = formData.get("email") || ""
      const subject = formData.get("subject") || ""
      const message = formData.get("message") || ""

      if (!firstName || !lastName || !email || !subject || !message) {
        showNotification("Por favor, completa todos los campos requeridos.", "error")
        return
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<span class="loading"></span> Enviando...'
      submitBtn.disabled = true

      setTimeout(() => {
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false

        if (typeof Swal !== "undefined") {
          Swal.fire({
            title: "¡Mensaje Enviado!",
            html: `Gracias <strong>${firstName}</strong>, hemos recibido tu mensaje y te contactaremos pronto.`,
            icon: "success",
            confirmButtonText: "De acuerdo",
            confirmButtonColor: "#28a745",
          }).then(() => {
            contactForm.reset()
          })
        }
      }, 2000)
    })
  }
})

// Notifications
function showNotification(message, type = "info") {
  const toast = document.createElement("div")
  toast.className = `alert alert-${type === "error" ? "danger" : type} alert-dismissible fade show position-fixed`
  toast.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"

  const iconMap = {
    success: "bi-check-circle",
    error: "bi-exclamation-triangle",
    info: "bi-info-circle",
    warning: "bi-exclamation-triangle",
  }

  toast.innerHTML = `
    <i class="bi ${iconMap[type]} me-2"></i>
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `

  document.body.appendChild(toast)
  setTimeout(() => { toast.remove() }, 5000)
}

// Smooth Scrolling
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    })
  })
})

// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  navbar.classList.toggle("navbar-scrolled", window.scrollY > 50)
})

// Dynamic Year in Footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("currentYear")
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear()
  }
})

// Tooltip and Popover Init
document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map(el => new bootstrap.Tooltip(el))

  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  popoverTriggerList.map(el => new bootstrap.Popover(el))
})

// Lazy Load Images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })
  images.forEach(img => imageObserver.observe(img))
})

// Add SweetAlert2 Script
const sweetAlertScript = document.createElement("script")
sweetAlertScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11"
sweetAlertScript.onload = () => {
  Swal = window.Swal
}
document.head.appendChild(sweetAlertScript)

// Navbar Styles
const style = document.createElement("style")
style.textContent = `
  .navbar-scrolled {
    background-color: rgba(33, 37, 41, 0.95) !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`
document.head.appendChild(style)

// Error Handling
window.addEventListener("error", (e) => {
  console.error("Error detectado:", e.error)
  showNotification("Se produjo un error inesperado. Por favor, recarga la página.", "error")
})