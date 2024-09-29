// mediaFactory.js

// Classe pour les médias de type Image
class ImageMedia {
    constructor(media) {
        this.media = media;
    }

    // Méthode pour obtenir les informations du média
    getMediaInfo() {
        return {
            src: `assets/images/${this.media.photographerName}/${this.media.image}`,
            alt: this.media.title
        };
    }
}

// Classe pour les médias de type Vidéo
class VideoMedia {
    constructor(media) {
        this.media = media;
    }

    // Méthode pour obtenir les informations du média
    getMediaInfo() {
        return {
            src: `assets/images/${this.media.photographerName}/${this.media.video}`,
            type: 'video/mp4'
        };
    }
}

// Fonction Factory qui crée des instances de média
function mediaFactory(media) {
    if (media.image) {
        return new ImageMedia(media);
    } else if (media.video) {
        return new VideoMedia(media);
    } else {
        throw new Error('Type de média non supporté');
    }
}

// Exporter la factory pour pouvoir l'utiliser ailleurs
export default mediaFactory;
