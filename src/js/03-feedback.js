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
let formData = {};

//добавляем слушателей
refs.form.addEventListener('submit', handelFormSubmit);
refs.form.addEventListener('input', throttle(handelInput, 500));

// получаем данные для хранилища
function handelInput(event) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

//создаем "автосохранение"
populateTextarea();
function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    const savedMessageParse = JSON.parse(savedMessage);
try {
    if (savedMessageParse.email) {
        refs.input.value = savedMessageParse.email;
        formData.email = savedMessageParse.email;
    }; } catch (error) {}
try {
    if (savedMessageParse.message) {
        refs.textarea.value = savedMessageParse.message;
        formData.message = savedMessageParse.message;
    };
} catch (error) {}
}

//обнуляемся при сабмите
function handelFormSubmit(event) {

    event.preventDefault();

    if (!formData.email || !formData.message) {
        return
    } else {
        event.currentTarget.reset();
        localStorage.removeItem(STORAGE_KEY);
        console.log(formData);
        formData = {};
    }
}

