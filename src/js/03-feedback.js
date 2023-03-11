import throttle from 'lodash.throttle';

// переменная для ключа хранилища
const STORAGE_KEY = 'feedback-form-state';

// получаем доступ
const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form  input'),
    textarea: document.querySelector('.feedback-form  textarea'),
};

// создаем объкт {email: ...., message: .... }
const formData = {};

//добавляем слушателей
refs.form.addEventListener('submit', handelFormSubmit);
refs.form.addEventListener('input', throttle(handelInput, 500));

// получаем данные для хранилища
function handelInput(event) {
    formData[event.target.name] = event.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//обнуляемся при сабмите
populateTextarea();

function handelFormSubmit(event) {
    event.preventDefault();

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
}

//заполняем поля "автосохранение"
function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    const savedMessageParse = JSON.parse(savedMessage);
    
    if (savedMessageParse) {
        refs.input.value = savedMessageParse.email;
        refs.textarea.value = savedMessageParse.message;
    }

}

