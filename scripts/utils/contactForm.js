//! Fonction pour afficher la modale de contact
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    
    //* Place le focus sur le champ 'prenom' lorsque la modale s'ouvre
    document.getElementById('prenom').focus();
}

//! Fonction pour fermer la modale de contact
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    
    //* Replace le focus sur le bouton de contact après la fermeture de la modale
    const contactButton = document.querySelector('.contact_button');
    contactButton.focus();
}

//* Écouteur d'événement global pour fermer la modale avec la touche Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

//! Écouteur pour gérer le focus dans la modale
document.addEventListener('keydown', (event) => {
    const modal = document.getElementById('contact_modal');

    //* Vérifie si la modale est actuellement affichée
    if (modal.style.display === 'block') {

        //* Sélectionne tous les éléments focusables dans la modale
        const focusableElements = modal.querySelectorAll('input, textarea, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                //* Si Shift+Tab est pressé sur le premier élément, déplacer le focus au dernier élément
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                //* Si Tab est pressé sur le dernier élément, déplacer le focus au premier élément
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        } else if (event.key === 'Escape') {
            //* Ferme la modale si la touche Escape est pressée
            closeModal();
        }
    }
});