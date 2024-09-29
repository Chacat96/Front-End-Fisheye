// Ouvrir la lightbox avec l'image ou la vidéo cliquée
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxVideo = document.getElementById("lightboxVideo");
const closeBtn = document.querySelector(".close");

function openLightbox(mediaPath, mediaType, title) {
    lightbox.style.display = "flex"; // Afficher la lightbox

    const titreLightbox = document.querySelector(".lightbox-title");
    titreLightbox.textContent = title;

    if (mediaType === 'image') {
        lightboxImage.style.display = "block";
        lightboxVideo.style.display = "none";
        lightboxImage.src = mediaPath; // Afficher l'image dans la lightbox
    } else if (mediaType === 'video') {
        lightboxImage.style.display = "none";
        lightboxVideo.style.display = "block";
        lightboxVideo.src = mediaPath; // Afficher la vidéo dans la lightbox
        lightboxVideo.play(); // Jouer la vidéo automatiquement
    }
}

// Fermer la lightbox
function closelightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";

    // Réinitialiser les sources des médias
    lightboxImage.src = "";
    lightboxVideo.pause(); // Mettre la vidéo en pause
    lightboxVideo.src = ""; // Réinitialiser la vidéo
}
