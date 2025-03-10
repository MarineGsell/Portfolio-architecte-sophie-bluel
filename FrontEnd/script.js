import { pageAdmin, pageClient,} from "./admin.js"
import { galerieIndex, filtreObjets, filtreAppartements, filtreHotelsResto, filtreTous } from "./index.js"
import { formulaireModale, retourGalerie, erreurPhotoForm, erreurTitreForm, erreurCategorieForm } from "./modale.js"

// Récupération des travaux depuis le fichier JSON
export async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works")
    let works = await reponse.json()
    return works
}

let works = await getWorks()

// Récupération de la galerie les travaux de l’architecte
galerieIndex()

// Réalisation du filtre objet
filtreObjets()

// Réalisation du filtre appartements
filtreAppartements()

// Réalisation du filtre hotels & restaurants
filtreHotelsResto()

// Réalisation du filtre tous
filtreTous()

// Récupération du DOM
const btnLogin = document.getElementById("login")
const banner = document.getElementById("banner")
const btnModifier = document.getElementById("btn-modifier")

// Changement de la page d'accueil en page admin
const token = window.localStorage.getItem("token")
try {
    if (token !== null) {
        pageAdmin()
    }
} catch (error) {
    console.log(error)
}

// Déconnexion page admin
const btnLogout = document.getElementById("logout")
btnLogout.addEventListener("click", (Event) => {
    Event.preventDefault()
    window.localStorage.removeItem("token")
    pageClient()
})

//Apparition de la modale
const modale = document.querySelector(".modale")
btnModifier.addEventListener("click", () => {
    modale.classList.remove("cache")
})

//Disparition de la modale
const modaleBg = document.querySelector(".background-modale")
const btnEchap = document.getElementById("btn-echap")
modaleBg.addEventListener("click", () => {
    modale.classList.add("cache")
})
btnEchap.addEventListener("click", () => {
    modale.classList.add("cache")
})

//Changement de page de la modale
const btnAjoutPhoto = document.getElementById("btn-ajout-photo")
const btnRetour = document.getElementById("btn-retour")

btnAjoutPhoto.addEventListener("click", () => {
    formulaireModale ()

    //Charger une photo dans l'input
    let photoAjoutee = document.querySelector(".photo-ajoutee")
    let inputPhoto = document.getElementById("ajout-photo")
    inputPhoto.onchange = function() {
        photoAjoutee.innerHTML =""
        let photoProjetAjoutee = document.createElement("img")
        photoAjoutee.appendChild(photoProjetAjoutee)
        photoProjetAjoutee.classList.add("photo-projet-ajoutee") 
        photoProjetAjoutee.src = URL.createObjectURL(inputPhoto.files[0])    
    }  




    // //Changement d'apparence du bouton de validation
    // 
    // console.log(btnValidationForm)
    // btnValidationForm.addEventListener("change", () => {
    //     if (titre.value !== "" && categorie.value !== "") {
    //         btnValidationForm.style.backgroundColor = "#1D6154"
    //     }
    // })
    
    //Ajout d'un projet à la galerie 
    try { 
        const formModale = document.querySelector(".form-modale")
        formModale.addEventListener("submit", (Event) => {
            Event.preventDefault()

            // Récupération des infos du formulaire
            const titre = document.getElementById("titre").value
            const categorie = document.getElementById("categorie").value
            let photo = document.getElementById("ajout-photo").value
            console.log(photo)       
            
            // Règles de validation du formulaire
            if (titre !== "" && categorie !== "" && photo !== "") {


                ajoutPhotoGalerie()
                // getWorks()
                // galerieIndex()
            } else {
                
                // Messages d'erreurs en cas de formulaire incomplet
                if (photo === "") {
                    erreurPhotoForm()
                }
                if (titre === "") {
                    erreurTitreForm()
                }
                if (titre === "") {
                    erreurCategorieForm()
                }
            }

        })
    } catch (error) {
        console.log("erreur : " + error)
    }

})

async function ajoutPhotoGalerie() {
    // Récupération des infos du formulaire
    const titre = document.getElementById("titre").value
    const categorie = document.getElementById("categorie").value
    let photo = document.getElementById("ajout-photo").files[0]    
    // let photo = document.querySelector(".photo-projet-ajoutee").src
 
    console.log('photo')       
    console.log(categorie)       
    
    // Requête post
    // const formModale = document.querySelector(".form-modale")

    const formData = new FormData()
    formData.append("title", titre)
    formData.append("category", 1)
//    formData.append("category", parseInt(categorie))
    formData.append("image", photo)
    //const data = Object.fromEntries(formData)
    //console.log(data)

    // const requete = new XMLHttpRequest()
    // requete.open("POST", "http://localhost:5678/api/works")
    // requete.send(formData)

//     const request = new XMLHttpRequest();
// request.open("POST", "https://example.com/submitform.php");
// request.send(formData);
                    
    const reponse = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData)
    })
    console.log(reponse)
    if (reponse.ok) {
        works = await getWorks()
        await galerieIndex()
    }
}

btnRetour.addEventListener("click", () => {
    retourGalerie ()
})



//Fonction apparition de la galerie
function galerieModale () {
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
                galerieIndex()
                galerieModale()
            }
       })
    }
}




galerieModale()


















