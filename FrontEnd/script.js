// Récupération des travaux depuis le fichier JSON
const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()


// Utilisez JavaScript pour ajouter à la galerie les travaux de l’architecte que vous avez récupéré.
for (let i = 0; i < works.length; i++) {
    // Création de mon DOM
    let projets = document.querySelector(".gallery")
    let projet = document.createElement("figure")
    projets.appendChild(projet)
    let photoProjet = document.createElement("img")
    let legendeProjet = document.createElement("figcaption")
    projet.appendChild(photoProjet)
    projet.appendChild(legendeProjet)

    // Récupération de mes données 
    photoProjet.src = works[i].imageUrl
    legendeProjet.innerHTML = works[i].title
}

// Réalisation du filtre objet
const btnObjets = document.getElementById("objets")
btnObjets.addEventListener("click", () => {
    let projets = document.querySelector(".gallery")
    let worksObjets = works.filter(function(works) {
        return works.category.name === "Objets"
    })
    // Vider le HTML pour éviter les doublons
    projets.innerHTML = ""

    for (let i = 0; i < worksObjets.length; i++) {
        // Création de mon DOM
        let projets = document.querySelector(".gallery")
        let projet = document.createElement("figure")
        projets.appendChild(projet)
        let photoProjet = document.createElement("img")
        let legendeProjet = document.createElement("figcaption")
        projet.appendChild(photoProjet)
        projet.appendChild(legendeProjet)
    
        // Récupération de mes données 
        photoProjet.src = worksObjets[i].imageUrl
        legendeProjet.innerHTML = worksObjets[i].title
    }
})

// Réalisation du filtre appartements
const btnAppartements = document.getElementById("appartements")
btnAppartements.addEventListener("click", () => {
    let projets = document.querySelector(".gallery")
    let worksAppartements = works.filter(function(works) {
        return works.category.name === "Appartements"
    })
    // Vider le HTML pour éviter les doublons
    projets.innerHTML = ""

    for (let i = 0; i < worksAppartements.length; i++) {
        // Création de mon DOM
        let projets = document.querySelector(".gallery")
        let projet = document.createElement("figure")
        projets.appendChild(projet)
        let photoProjet = document.createElement("img")
        let legendeProjet = document.createElement("figcaption")
        projet.appendChild(photoProjet)
        projet.appendChild(legendeProjet)
    
        // Récupération de mes données 
        photoProjet.src = worksAppartements[i].imageUrl
        legendeProjet.innerHTML = worksAppartements[i].title
    }
})

// Réalisation du filtre hotels & restaurants
const btnHotelsResto = document.getElementById("hotel-resto")
btnHotelsResto.addEventListener("click", () => {
    let projets = document.querySelector(".gallery")
    let worksHotelsResto = works.filter(function(works) {
        return works.category.name === "Hotels & restaurants"
    })
    // Vider le HTML pour éviter les doublons
    projets.innerHTML = ""

    for (let i = 0; i < worksHotelsResto.length; i++) {
        // Création de mon DOM
        let projets = document.querySelector(".gallery")
        let projet = document.createElement("figure")
        projets.appendChild(projet)
        let photoProjet = document.createElement("img")
        let legendeProjet = document.createElement("figcaption")
        projet.appendChild(photoProjet)
        projet.appendChild(legendeProjet)
    
        // Récupération de mes données 
        photoProjet.src = worksHotelsResto[i].imageUrl
        legendeProjet.innerHTML = worksHotelsResto[i].title
    }
})

// Réalisation du filtre tous
const btnTous = document.getElementById("tous")
btnTous.addEventListener("click", () => {
    // Vider le HTML pour éviter les doublons
    let projets = document.querySelector(".gallery")
    projets.innerHTML = ""

    for (let i = 0; i < works.length; i++) {
        // Création de mon DOM
        let projet = document.createElement("figure")
        projets.appendChild(projet)
        let photoProjet = document.createElement("img")
        let legendeProjet = document.createElement("figcaption")
        projet.appendChild(photoProjet)
        projet.appendChild(legendeProjet)
    
        // Récupération de mes données 
        photoProjet.src = works[i].imageUrl
        legendeProjet.innerHTML = works[i].title
    }
})

// Création du switch login/logout
const token = window.localStorage.getItem("token")

// Récupération du DOM
const btnLogout = document.getElementById("logout")
const btnLogin = document.getElementById("login")
const banner = document.getElementById("banner")
const btnModifier = document.getElementById("btn-modifier")

// Création d'une fonction pour la page utilisateur
function pageAdmin() {
    // Ajout de la bannière
    banner.classList.remove("banner-cachee")
    banner.classList.add("banner")

    // Ajout du bouton modifier
    btnModifier.classList.remove("modification-projet-cache")
    btnModifier.classList.add("modification-projet")

    // Switch logout
    btnLogout.classList.remove("login-logout")
    btnLogin.classList.add("login-logout")
}

// Création d'une fonction pour la page d'accueil coté client
function pageClient() {
    // Suppression de la bannière
    banner.classList.remove("banner")
    banner.classList.add("banner-cachee")

    // Suppression du bouton modifier
    btnModifier.classList.remove("modification-projet")
    btnModifier.classList.add("modification-projet-cache")

    // Switch login
    btnLogout.classList.add("login-logout")
    btnLogin.classList.remove("login-logout")
}

// Changement de la page d'accueil en page admin
try {
    if (token !== null) {
        pageAdmin()
    }
} catch (error) {
    console.log(error)
}

// Déconnexion page admin
btnLogout.addEventListener("click", (Event) => {
    Event.preventDefault()
    window.localStorage.removeItem("token")
    pageClient()
})







