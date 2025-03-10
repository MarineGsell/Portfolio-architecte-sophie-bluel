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

