import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const pictureContainer = document.querySelector('.gallery');

// картинка маленькая 
const pictureMarkup = createColorCardsMarkup(galleryItems);

// заливаем разметку
pictureContainer.insertAdjacentHTML('beforeend', pictureMarkup);

// функция для разметки 
// div("gallery") => a("gallery__link") => img("gallery__image")

function createColorCardsMarkup(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `
                    <a class="gallery__item" href="${original}">
                        <img class="gallery__image"
                            style="display: block"
                            src="${preview}" 
                            alt="${description}" />
                    </a>
            `;
        })
        .join('');
}

// галерея с подпись внизу и задержкой 250 мс

var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionPosition: "buttom",
    captionDelay: "250"
});

