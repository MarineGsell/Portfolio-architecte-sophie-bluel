import { loginAdmin, logoutAdmin } from "./admin.js"
import { galerieIndex, filtreObjets, filtreAppartements, filtreHotelsResto, filtreTous } from "./index.js"
import { formulaireModale, retourGalerie, erreurPhotoForm, erreurTitreForm, erreurCategorieForm, ajoutPhotoGalerie, openModale, closeModale, } from "./modale.js"

// Récupération des travaux depuis le fichier JSON
export async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works")
    let works = await reponse.json()
    return works
}
let works = await getWorks()

//Récupération du token
const token = window.localStorage.getItem("token")

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

// Changement de la page d'accueil en page admin
loginAdmin()

// Déconnexion page admin
logoutAdmin()

//Ouverture de la modale
openModale()

//Fermeture de la modale
closeModale()

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

                // Ajout des photos à la galerie
                ajoutPhotoGalerie()
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



// Activation du bouton de retour
btnRetour.addEventListener("click", () => {
    retourGalerie ()
})







// rechargementGalerieIndex()

















