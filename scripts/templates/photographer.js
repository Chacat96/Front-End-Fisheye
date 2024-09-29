let totalLikesSum = 0;


//Fonction principal qui appel les data des photographes
function photographerTemplate(data) {
    const { name, portrait, tagline, price, city, country, id } = data;

    // console.log(data)

    //Créé le chemin pour récupérer le portrait et le stock dans picture
    const picture = `assets/photographers/${portrait}`;

    //Fonction qui ajoute tous les éléments d'un photographe dans la page index
    function getUserCardDOM() {

        const article = document.createElement( 'article' );

        const a = document.createElement( 'a' );
        a.setAttribute("href", `photographer.html?id=${id}`);

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const from = document.createElement( 'p' );
        from.textContent = city + ", " + country;
        from.classList.add("from");

        const tag = document.createElement( 'p' );
        tag.textContent = tagline;
        tag.classList.add("tagline");

        const priceTag = document.createElement( 'p' );
        priceTag.classList.add("price");
        priceTag.textContent = price + "€/jour";

        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(from);
        article.appendChild(tag);
        article.appendChild(priceTag);

        return (article);
    }

// Fonction pour créer le template profil d'un photographe
function PhotographerProfile(data) {

    const photographHeader = document.querySelector( '.photograph-header' );

    const divPhotographHeader = document.createElement( 'div' );
    divPhotographHeader.classList.add("Tagline");
    photographHeader.appendChild(divPhotographHeader);

    const h1Name = document.createElement( 'h1' );
    h1Name.textContent = data.name;
    // console.log(data)

    const pVille = document.createElement( 'p' );
    pVille.classList.add("fromProfil");
    pVille.textContent = data.city + ", " + data.country;

    const pTagline = document.createElement( 'p' );
    pTagline.textContent = data.tagline;

    const imgProfil = document.createElement( 'img' );
    imgProfil.setAttribute("src", `assets/photographers/${data.portrait}`);

    divPhotographHeader.appendChild(h1Name);
    divPhotographHeader.appendChild(pVille);
    divPhotographHeader.appendChild(pTagline);
    photographHeader.insertBefore(divPhotographHeader, photographHeader.firstChild);
    photographHeader.appendChild(imgProfil);

    return photographHeader;
}

// Exporter la fonction pour pouvoir l'utiliser dans d'autres fichiers
    return { name, picture, getUserCardDOM, PhotographerProfile };
}

let mediaArray = []; 
let currentIndex = 0; 

function openLightbox(mediaPath, mediaType, title, index) {
    currentIndex = index;
    updateLightbox(mediaPath, mediaType, title);
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function updateLightbox(mediaPath, mediaType, title) {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxTitle = document.querySelector('.lightbox-title');

    lightboxImage.style.display = 'none';
    lightboxVideo.style.display = 'none';

    if (mediaType === 'image') {
        lightboxImage.src = mediaPath;
        lightboxImage.alt = title;
        lightboxImage.style.display = 'block';
    } else if (mediaType === 'video') {
        lightboxVideo.src = mediaPath;
        lightboxVideo.style.display = 'block';
    }

    lightboxTitle.textContent = title;
}
function mediaTemplate(dataMedia, photographerName, index) {
    const { image, video, title, likes, date, price } = dataMedia;

    const photographerFirstName = photographerName.split(' ')[0];

    let mediaPath = "";
    let mediaType = "";
    if (image) {
        mediaPath = `assets/images/${photographerFirstName}/${image}`;
        mediaType = 'image';
    } else if (video) {
        mediaPath = `assets/images/${photographerFirstName}/${video}`;
        mediaType = 'video';
    }

    mediaArray[index] = { mediaPath, mediaType, title };

    let media;
    if (image) {
        media = document.createElement("img");
        media.setAttribute("src", mediaPath);
        media.setAttribute("alt", title);
    } else if (video) {
        media = document.createElement("video");
        media.removeAttribute("controls");
        const source = document.createElement("source");
        source.setAttribute("src", mediaPath);
        source.setAttribute("type", "video/mp4");
        media.appendChild(source);
    }

    media.classList.add("media");
    media.dataset.index = index;
    media.addEventListener('click', () => openLightbox(mediaPath, mediaType, title, index));

    const articleMedia = document.createElement("article");
    articleMedia.classList.add("article-media");

    const titreMedia = document.createElement("h2");
    titreMedia.textContent = title;
    titreMedia.classList.add("media-title");

    const divLikes = document.createElement("div");
    divLikes.classList.add("likes");
    divLikes.textContent = likes;

    function incrementLikes() {
        const hasLiked = divLikes.getAttribute('data-has-liked') === 'true';
        if (!hasLiked) {
            let like = parseInt(divLikes.textContent);
            like++;
            divLikes.textContent = like;

            totalLikesSum++;
            document.querySelector('.total-likes').textContent = totalLikesSum;

            divLikes.setAttribute('data-has-liked', 'true');
            divLikes.appendChild(heartLikes);
        }
    }

    const heartLikes = document.createElement("i");
    heartLikes.classList.add("fa-solid", "fa-heart");
    heartLikes.addEventListener("click", incrementLikes);

    divLikes.appendChild(heartLikes);

    articleMedia.appendChild(media);
    articleMedia.appendChild(titreMedia);
    articleMedia.appendChild(divLikes);

    return articleMedia;  // Retourne l'élément créé au lieu de l'ajouter au DOM
}

function initializeLightboxNavigation() {
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");
    const closeBtn = document.querySelector(".close");

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + mediaArray.length) % mediaArray.length;
        const { mediaPath, mediaType, title } = mediaArray[currentIndex];
        updateLightbox(mediaPath, mediaType, title);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % mediaArray.length;
        const { mediaPath, mediaType, title } = mediaArray[currentIndex];
        updateLightbox(mediaPath, mediaType, title);
    });

    closeBtn.addEventListener('click', closeLightbox);
}

function initializeGallery(photographerData) {
    const { name, media } = photographerData;
    const divMedia = document.querySelector('.photograph-media');
    divMedia.innerHTML = ''; // Nettoyer le contenu existant
    mediaArray = new Array(media.length); // Initialiser mediaArray avec la bonne longueur
    
    media.forEach((mediaItem, index) => {
        const mediaElement = mediaTemplate(mediaItem, name, index);
        divMedia.appendChild(mediaElement);
    });
    
    initializeLightboxNavigation();
}
//Fonction pour creer le template de l'encart des medias
function encartMedia(data, photographerPrice) {
    
    if (totalLikesSum === 0) { 
        totalLikesSum = data.reduce((accumulator, media) => {
            return accumulator + media.likes;
        }, 0);
    }

    const encartMediaDiv = document.querySelector(".encart-media");

    const likeEncart = document.createElement("div");
    likeEncart.classList.add("like-encart");
    encartMediaDiv.appendChild(likeEncart);

    const totalLikes = document.createElement("p");
    totalLikes.classList.add("total-likes");
    totalLikes.textContent = totalLikesSum;
    likeEncart.appendChild(totalLikes);

    const heartLikes = document.createElement("i");
    heartLikes.classList.add("fa-solid");
    heartLikes.classList.add("fa-heart");
    likeEncart.appendChild(heartLikes);

    const priceMedia = document.createElement("p");
    priceMedia.classList.add("price-media");
    priceMedia.textContent = photographerPrice + `€ / jour`;
    encartMediaDiv.appendChild(priceMedia);
    
    return encartMedia;
}


//Formulaire de contact 
function contactForm(data) {
    const nameContact = document.querySelector('.name-contact');
    nameContact.textContent = data.name;
}

//Filtre de trie

function filterMedia(data) {
    document.addEventListener("DOMContentLoaded", function() {
        const selectElement = document.getElementById("filtre-select");
        selectElement.addEventListener("change", handleFilterChange);
        console.log("Écouteur d'événement ajouté au select");
    });
    return data;
}

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
// document.addEventListener("DOMContentLoaded", function() {
//     const selectElement = document.getElementById("filtre-select");
//     selectElement.addEventListener("change", handleFilterChange);
//     console.log("Écouteur d'événement ajouté au select");
// });