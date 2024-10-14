//! Classe pour les médias de type Image
class ImageMedia {
    constructor(media) {
        this.media = media;
    }

    getMediaInfo() {
        return {
            //* Construit le chemin de l'image en utilisant le nom du photographe et le nom de l'image
            src: `assets/images/${this.media.photographerName}/${this.media.image}`,
            //* Utilise le titre de l'image comme texte alternatif pour l'accessibilité
            alt: this.media.title
        };
    }
}

//! Classe pour les médias de type Vidéo
class VideoMedia {
    constructor(media) {
        //* Stocke l'objet media complet pour un accès ultérieur
        this.media = media;
    }

    getMediaInfo() {
        return {
            //* Construit le chemin de la vidéo de manière similaire à celui des images
            src: `assets/images/${this.media.photographerName}/${this.media.video}`,
            //* Spécifie le type MIME pour les vidéos (actuellement limité à MP4)
            type: 'video/mp4'
        };
    }
}

/**
 * @param {Object} media - Objet contenant les informations du média
 * @returns {ImageMedia|VideoMedia} Instance de la classe média appropriée
 * @throws {Error} Si le type de média n'est pas supporté
 */
function mediaFactory(media) {
    //* Vérifie si le média est une image
    if (media.image) {
        return new ImageMedia(media);
    } 
    //* Vérifie si le média est une vidéo
    else if (media.video) {
        return new VideoMedia(media);
    } 
    //* Si le type de média n'est ni une image ni une vidéo, lance une erreur
    else {
        throw new Error('Type de média non supporté');
    }
}

export default mediaFactory;