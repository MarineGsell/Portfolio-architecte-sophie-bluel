// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()

console.log(works)


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

