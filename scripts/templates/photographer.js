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
    console.log(data)

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



//Fonction pour creer le template des medias
function mediaTemplate(dataMedia, photographerName) {
    const { image, video, title, likes, date, price } = dataMedia;

let mediaArray = []; 
let currentIndex = 0; 


    // Extraire le prénom du nom complet du photographe
    const photographerFirstName = photographerName.split(' ')[0];

    // Chemin d'accès au média
    let mediaPath = "";
    if (image) {
        mediaPath = `assets/images/${photographerFirstName}/${image}`;
        mediaType = 'image';
    } else if (video) {
        mediaPath = `assets/images/${photographerFirstName}/${video}`;
        mediaType = 'video';
    }

    // console.log('mediaPath', mediaPath);

    mediaArray.push({ mediaPath, mediaType, title });

    const divMedia = document.querySelector('.photograph-media');

    // Création de l'élément média (image ou vidéo)
    let media;
    if (image) {
        media = document.createElement("img");
        media.setAttribute("src", mediaPath);
        media.setAttribute("alt", title);
        media.classList.add("media");

        media.addEventListener('click', () => openLightbox(mediaPath, 'image', title));
    } else if (video) {
        media = document.createElement("video");
        media.removeAttribute("controls");
        const source = document.createElement("source");
        source.setAttribute("src", mediaPath);
        source.setAttribute("type", "video/mp4");
        media.classList.add("media");
        media.appendChild(source);

        media.addEventListener('click', () => {
            currentIndex = mediaArray.length - 1; 
            openLightbox(mediaPath, 'video', title);
        });
    }

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
        if (!hasLiked) {  // Vérifie si un like a déjà été donné pour ce média
            let like = parseInt(divLikes.textContent);
            like++;
            divLikes.textContent = like;

            // Incrémente le total global des likes et met à jour l'encart
            totalLikesSum++;
            document.querySelector('.total-likes').textContent = totalLikesSum;

            divLikes.setAttribute('data-has-liked', 'true');  // Marque que l'utilisateur a déjà liké ce média
            divLikes.appendChild(heartLikes);
        }
    }

    const heartLikes = document.createElement("i");
    heartLikes.classList.add("fa-solid");
    heartLikes.classList.add("fa-heart");
    heartLikes.addEventListener("click", incrementLikes);

    divLikes.appendChild(heartLikes);

    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");

    divMedia.appendChild(articleMedia); 

    articleMedia.appendChild(media);
    articleMedia.appendChild(titreMedia);
    articleMedia.appendChild(divLikes);
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + mediaArray.length) % mediaArray.length; // Précédent
        const { mediaPath, mediaType, title } = mediaArray[currentIndex];
        openLightbox(mediaPath, mediaType, title);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % mediaArray.length; // Suivant
        const { mediaPath, mediaType, title } = mediaArray[currentIndex];
        openLightbox(mediaPath, mediaType, title);
    });

    // console.log('media', media);
    return divMedia;
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
