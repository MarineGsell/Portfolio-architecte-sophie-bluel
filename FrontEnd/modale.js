import { getWorks } from "./script.js"
import { galerieIndex } from "./index.js"

let works = await getWorks()
const token = window.localStorage.getItem("token")

//Fonction apparition du formulaire
export function formulaireModale () {
    let galerie = document.getElementById("modale-galerie")
    galerie.classList.add("cache")
    const formModale = document.getElementById("modale-form")
    formModale.classList.remove("cache")
    const btnRetour = document.getElementById("btn-retour")
    btnRetour.classList.remove("cache")
}

//Fonction retour à la galerie
export function retourGalerie () {
    let galerie = document.getElementById("modale-galerie")
    galerie.classList.remove("cache")
    const formModale = document.getElementById("modale-form")
    formModale.classList.add("cache")
    const btnRetour = document.getElementById("btn-retour")
    btnRetour.classList.add("cache")
}

// Messages d'erreurs formulaire
export function erreurPhotoForm () {
    let messageErreur = document.createElement("p")
    const div = document.querySelector(".ajout-photo-form")
    div.appendChild(messageErreur)
    messageErreur.style.color = "red"
    messageErreur.innerText = "Vous devez rajouter une photo"
}

export function erreurTitreForm () {
    let messageErreur = document.createElement("p")
    const div = document.querySelector(".champs-form-titre")
    div.appendChild(messageErreur)
    messageErreur.style.color = "red"
    messageErreur.innerText = "Vous devez rajouter un titre"
}

export function erreurCategorieForm() {
    let messageErreur = document.createElement("p")
    const div = document.querySelector(".champs-form-categorie")
    div.appendChild(messageErreur)
    messageErreur.style.color = "red"
    messageErreur.innerText = "Vous devez rajouter une catégorie"
}

// Message validation formulaire
export function validationMessageForm() {
    let messageValidation = document.createElement("p")
    const div = document.querySelector(".form-modale")
    div.appendChild(messageValidation)
    messageValidation.style.color = "green"
    messageValidation.style.textAlign = "center"
    messageValidation.innerText = "Votre projet à bien été ajouté à votre galerie"

}

// Ajouter des projets à la galerie
export async function ajoutPhotoGalerie() {
    // Récupération des infos du formulaire
    const titre = document.getElementById("titre").value
    const categorie = document.getElementById("categorie").value
    let photo = document.getElementById("ajout-photo").files[0]     
    console.log('photo', photo)       
    console.log(categorie)       
    
    // Requête post
    const formData = new FormData()
    formData.append("title", titre)
    formData.append("category", categorie)
    formData.append("image", photo)
    const token = window.localStorage.getItem("token")              
    const reponse = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
        },
        body: formData
    })
    console.log(reponse)
    if (reponse.ok) {
        // Actualisation de la galerie
        works = await getWorks()
        galerieIndex()
        // return works

        //Message de validation
        validationMessageForm()

    }
}

export function openModale() {
    // Ouverture de la modale
    const btnModifier = document.getElementById("btn-modifier")
    const modale = document.querySelector(".modale")
    btnModifier.addEventListener("click", () => {
        modale.classList.remove("cache")
        galerieModale()
    })
}

//Fonction apparition de la galerie
export function galerieModale () {
    let galerie = document.querySelector(".galerie-photo-modale")
    galerie.innerHTML=""
    for (let i = 0; i < works.length; i++) {
        // Création de mon DOM
        let item = document.createElement("div")
        item.classList.add("item")
        galerie.appendChild(item)
        let itemPhoto = document.createElement("img")
        let itemBtn = document.createElement("button")
        itemBtn.classList.add("btn-supprimer")
        let itemBtnImg = document.createElement("img")
        itemBtnImg.src = "/assets/icons/supprimer.png"
        item.appendChild(itemPhoto)
        item.appendChild(itemBtn)
        itemBtn.appendChild(itemBtnImg)
    
        // Récupération de mes données 
        itemPhoto.src = works[i].imageUrl

        // Event pour suppression d'un projet
        itemBtn.addEventListener("click", async () => {
            let reponse = await fetch(`http://localhost:5678/api/works/${works[i].id}`, {
                method: 'DELETE',
                headers: { 
                    // "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                 },
            })
            if (reponse.ok) {
                reponse = await fetch("http://localhost:5678/api/works")
                works = await reponse.json()
                console.log(works)
                galerieModale()
                
            }
       })
    }
}

//Fermeture de la modale
export function closeModale() {
    const modale = document.querySelector(".modale")
    const modaleBg = document.querySelector(".background-modale")
    const btnEchap = document.getElementById("btn-echap")
    modaleBg.addEventListener("click", () => {
        modale.classList.add("cache")
    })
    btnEchap.addEventListener("click", () => {
        modale.classList.add("cache")
    })
}


