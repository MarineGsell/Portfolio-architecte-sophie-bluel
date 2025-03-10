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


