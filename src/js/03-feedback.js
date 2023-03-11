import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form  input'),
    textarea: document.querySelector('.feedback-form  textarea'),
};
const formData = {};

refs.form.addEventListener('submit', handelFormSubmit);
refs.form.addEventListener('input', throttle(handelInput, 500));

function handelInput(event) {
    formData[event.target.name] = event.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

populateTextarea();

function handelFormSubmit(event) {
    event.preventDefault();

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
}

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    const savedMessageParse = JSON.parse(savedMessage);
    
    if (savedMessageParse) {
        refs.input.value = savedMessageParse.email;
        refs.textarea.value = savedMessageParse.message;
    }

}

