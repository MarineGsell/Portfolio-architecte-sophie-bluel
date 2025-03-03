// Récupération de mon formulaire
const form = document.querySelector(".form-connexion")
form.addEventListener("submit", (Event) => {
    Event.preventDefault()
    // Récupération de la valeur de mes champs de fomulaire
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const admin = {
        "email": email,
        "password": password
    }
    recupUser(admin)
})

// Création d'une fonction pour récupérer ma route API et mon token
async function recupUser(admin) {
    try {
    // Connexion à mon API
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin)
    })
    if (reponse.ok){
        // Récupération de mon token
        const data = await reponse.json();
        const token = data.token;
        // Stockage de mon token dans le localStorage
        window.localStorage.setItem("token", token)
        // Redirection vers lapage d'accueil
        window.location.href = "http://127.0.0.1:5500/index.html"
    } else {
        // Affichage de mon message d'erreur
        const erreur = document.querySelector(".erreur")
        erreur.innerHTML = "La connexion a échouée"
    }
    } catch {
        console.log("y'a une erreur")
    }
}




