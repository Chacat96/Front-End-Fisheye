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
            // const photographerName = profil.name;
            const photographerPrice = profil.price;
            
            // Afficher les informations du photographe
            const photographerSection = document.querySelector('.photograph-header');
            const photographerTemplateInstance = photographerTemplate(profil);
            photographerTemplateInstance.PhotographerProfile(profil);
        
            // Obtenir les médias pour ce photographe
            currentPhotographerMedia = getMediaByPhotographerId(data, photographerId);
            currentPhotographerName = profil.name; // Stocker le nom du photographe
            console.log('Médias du photographe:', currentPhotographerMedia);

            // Initialiser le filtre
            initializeFilter();

            // Tri initial par popularité
            const initialSortedMedia = sortByPopularity([...currentPhotographerMedia]);
            displaySortedMedia(initialSortedMedia);
            
            // Passer les médias et le nom du photographe à la fonction mediaTemplate
            const photographerData = {
                ...profil,
                media: currentPhotographerMedia
            };
            console.log('Calling initializeGallery with:', photographerData);
            initializeGallery(photographerData);

            encartMedia(currentPhotographerMedia, photographerPrice);
            
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
            // console.log('Nom du photographe:', photographerName);
            
            
            //Appeleer la fonction de contact pour le nom
            contactForm(profil);

            // Obtenir les médias pour ce photographe
            const photographerMedia = getMediaByPhotographerId(data, photographerId);
            // console.table(photographerMedia);
            
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
        // console.table(photographerMedia);
        displayMedia(photographerMedia);
        // encartMedia(photographerMedia);

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


// document.addEventListener("DOMContentLoaded", function() {
//     const selectElement = document.getElementById("filtre-select");
//     selectElement.addEventListener("change", handleFilterChange);
//     console.log("Écouteur d'événement ajouté au select");
// });
// function handleFilterChange(event) {
//     console.log('Changement de filtre détecté:', event.target.value);
//     const filterValue = event.target.value;
    
//     // Récupérer les médias actuels
//     let sortedMedia;
//     if (filterValue === 'popularite') {
//         likes.sort(function(a, b) {
//             return b.likes - a.likes;
//         })
//         console.log(likes);
//     } else if (filterValue === 'date') {
//         sortedMedia = sortByDate(photographerMedia);
//     } else if (filterValue === 'titre') {
//         sortedMedia = sortByTitle(photographerMedia);
//     }

//     // Réafficher les médias triés
//     displayMedia(sortedMedia);
// }

// function sortByPopularity(mediaArray) {
//     return mediaArray.sort((a, b) => b.likes - a.likes);
// }
// function sortByDate(mediaArray) {
//     return mediaArray.sort((a, b) => new Date(b.date) - new Date(a.date));
// }
// function sortByTitle(mediaArray) {
//     return mediaArray.sort((a, b) => a.title.localeCompare(b.title));
// }
// function displayMediaFilter(sortedMedia) {
   
//     const mediaSection = document.querySelector('.photograph-media');
//     mediaSection.innerHTML = '';  

   
//     sortedMedia.forEach(mediaItem => {
//         mediaTemplate(mediaItem, photographerName);
//     });
// }







