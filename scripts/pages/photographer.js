import mediaFactory from "../utils/Factory.js";

// Fonction pour obtenir un profil par son ID
function getProfilById(data, photographerId) {
    return data.photographers.find(photographer => photographer.id == photographerId);
}

// Fonction pour obtenir les médias par l'ID du photographe
function getMediaByPhotographerId(data, photographerId) {
    return data.media.filter(mediaItem => mediaItem.photographerId == photographerId);
}

// Fonction pour initialiser les données du photographe et des médias
async function init() {
    try {
        const data = await getPhotographers();
        
        // Récupérer l'ID du photographe depuis l'URL
        const urlParams = window.location.search;
        const photographerId = new URLSearchParams(urlParams).get("id");

        // Obtenir le profil du photographe
        const profil = getProfilById(data, photographerId);
        if (profil) {
            // Extraire le nom du photographe
            const photographerName = profil.name;
            const photographerPrice = profil.price;
            console.log('Nom du photographe:', photographerName);
            
            // Afficher les informations du photographe
            const photographerSection = document.querySelector('.photograph-header');
            const photographerTemplateInstance = photographerTemplate(profil);
            photographerTemplateInstance.PhotographerProfile(profil);
        

            // Obtenir les médias pour ce photographe
            const photographerMedia = getMediaByPhotographerId(data, photographerId);
            console.table(photographerMedia);
            
            // Passer les médias et le nom du photographe à la fonction mediaTemplate
            photographerMedia.forEach(mediaItem => {
                mediaTemplate(mediaItem, photographerName);
            });

            // encartMedia(photographerMedia, photographerPrice);

      
        } else {
            console.error("Aucun profil trouvé avec cet ID.");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
    }      
}

// Appeler la fonction pour initialiser les données
init();

//Fonction pour afficher le nom du photographe dans le formulaire de contact
async function initContact() {
    try {
        const data = await getPhotographers();
        
        // Récupérer l'ID du photographe depuis l'URL
        const urlParams = window.location.search;
        const photographerId = new URLSearchParams(urlParams).get("id");

        // Obtenir le profil du photographe
        const profil = getProfilById(data, photographerId);
        if (profil) {
            // Extraire le nom du photographe
            const photographerName = profil.name;
            console.log('Nom du photographe:', photographerName);
            
            
            //Appeleer la fonction de contact pour le nom
            contactForm(profil);

            // Obtenir les médias pour ce photographe
            const photographerMedia = getMediaByPhotographerId(data, photographerId);
            console.table(photographerMedia);
            
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
    }      
}

// Appeler la fonction pour initialiser les données
initContact();

// Fonction pour afficher les médias d'un photographe
async function displayMedia(media) {
    const mediaSection = document.querySelector('.photograph-media');
    media.forEach((mediaPhotograh) => {
        const mediaPhotograhTemplate = mediaFactory(mediaPhotograh);
        // const mediaCardDOM = mediaPhotograhTemplate.getMediaCardDOM();
        // mediaSection.appendChild(mediaCardDOM);
    });
}

// Fonction pour récupérer et afficher les médias d'un photographe par son ID
async function initMedia() {
    try {
        const { media } = await getPhotographers();
        const urlParams = window.location.search;
        const photographerId = new URLSearchParams(urlParams).get("id");

        const photographerMedia = media.filter(mediaItem => mediaItem.photographerId == photographerId);
        console.table(photographerMedia);
        displayMedia(photographerMedia);
        encartMedia(photographerMedia);

    } catch (error) {
        console.error("Erreur lors de la récupération des médias:", error);
    }
}

// Appeler la fonction pour initialiser les médias
initMedia();

//Récupéré les valeurs du formulaire de contact
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {

//Empeche le rechargement de la page après soumission du formulaire
  event.preventDefault();

//Recupère les valeurs des champs du formulaire
  const prenom = document.querySelector("#prenom").value;
  const nom = document.querySelector("#nom").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;
  console.log("Votre prénom :",prenom);
  console.log("Votre nom :",nom);
  console.log("Votre email :",email);
  console.log("Votre message :",message);
})


