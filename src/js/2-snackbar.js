// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();

  const delay = event.target.elements.delay.value;

  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(resolve => {
      iziToast.success({
        message: `${resolve}`,
        messageSize: '20',
        position: 'topCenter',
        color: 'green',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `${error}`,
        messageSize: '20',
        position: 'topCenter',
        color: 'red',
      });
    });
}
