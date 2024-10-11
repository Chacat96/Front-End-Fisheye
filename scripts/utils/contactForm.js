function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";

    document.getElementById('prenom').focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    const contactButton = document.querySelector('.contact_button');
    contactButton.focus();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Écouteur pour gérer le focus dans le modal
document.addEventListener('keydown', (event) => {
    const modal = document.getElementById('contact_modal');
    if (modal.style.display === 'block') {
        const focusableElements = modal.querySelectorAll('input, textarea, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.key === 'Tab') {
            if (event.shiftKey) { // Shift + Tab
                // Si le premier élément est focusé, revenir au dernier
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else { // Tab
                // Si le dernier élément est focusé, aller au premier
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        } else if (event.key === 'Escape') {
            closeModal();
        }
    }
});

