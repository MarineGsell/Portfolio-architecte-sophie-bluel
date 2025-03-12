//Récupération du token
const token = window.localStorage.getItem("token")

// Récupération du DOM
    const btnLogout = document.getElementById("logout")
    const btnLogin = document.getElementById("login")
    const banner = document.getElementById("banner")
    const btnModifier = document.getElementById("btn-modifier")

// Création d'une fonction pour la page utilisateur
export function pageAdmin() {
    // Ajout de la bannière
    banner.classList.remove("cache")
    banner.classList.add("banner")

    // Ajout du bouton modifier
    btnModifier.classList.remove("cache")
    btnModifier.classList.add("modification-projet")

    // Switch logout
    btnLogout.classList.remove("cache")
    btnLogin.classList.add("cache")
}

// Création d'une fonction pour la page d'accueil coté client
export function pageClient() {

    // Suppression de la bannière
    banner.classList.remove("banner")
    banner.classList.add("cache")

    // Suppression du bouton modifier
    btnModifier.classList.remove("modification-projet")
    btnModifier.classList.add("cache")

    // Switch login
    btnLogout.classList.add("cache")
    btnLogin.classList.remove("cache")
}

// Changement de la page d'accueil en page admin
export function loginAdmin() {
    try {
        if (token !== null) {
            pageAdmin()
        }
    } catch (error) {
        console.log(error)
    }
}

// Déconnexion page admin
export function logoutAdmin() {
    const btnLogout = document.getElementById("logout")
    btnLogout.addEventListener("click", (Event) => {
        Event.preventDefault()
        window.localStorage.removeItem("token")
        pageClient()
    })
}

