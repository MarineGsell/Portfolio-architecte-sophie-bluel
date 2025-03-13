// Connexion de l'administrateur
const form = document.querySelector(".form-connexion")
form.addEventListener("submit", (Event) => {
    Event.preventDefault()

    // Récupération des données de connexion
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const admin = {
        "email": email,
        "password": password
    }
    recupUser(admin)
})

// Récupération de la route API et du token
async function recupUser(admin) {
    try {

        // Connexion à l'API
        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin)
        })
        if (reponse.ok){

            // Récupération du token
            const data = await reponse.json();
            const token = data.token;

            // Stockage du token dans le localStorage
            window.localStorage.setItem("token", token)

            // Redirection vers la page d'accueil
            window.location.href = "http://127.0.0.1:5500/index.html"
        } else {

            // Affichage du message d'erreur
            const erreur = document.querySelector(".erreur")
            erreur.innerHTML = "La connexion a échouée"
        }
    } catch(error) {
        console.log("Erreur : " + error)
    }
}






