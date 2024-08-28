import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputData = document.querySelector('.input-section input');
const startButton = document.querySelector('.input-section button');
const daysElement = document.querySelector('span[data-days]');
const hoursElement = document.querySelector('span[data-hours]');
const minutesElement = document.querySelector('span[data-minutes]');
const secondsElement = document.querySelector('span[data-seconds]');

let countdownInterval;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startButton.disabled = false;
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() <= Date.now()) {
      startButton.disabled = true;
      iziToast.warning({
        message: 'Please choose a date in the future',
        position: 'topCenter',
        color: 'red',
      });
    } else {
      startButton.addEventListener('click', startButtonClick);
      function startButtonClick() {
        iziToast.info({
          message: 'Timer is started',
          position: 'topCenter',
        });
        inputData.disabled = true;
        startButton.disabled = true;
        if (countdownInterval) {
          clearInterval(countdownInterval);
        }
        countdownInterval = setInterval(() => {
          updateTimer(selectedDate);
        }, 1000);
        startButton.removeEventListener('click', startButtonClick);
      }
    }
  },
};

flatpickr(inputData, options);

function updateTimer(targetDate) {
  const now = new Date().getTime();
  const timeRemaining = targetDate.getTime() - now;
  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    daysElement.textContent = '00';
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    inputData.disabled = false;
    iziToast.info({
      message: 'Time is over!',
      position: 'topCenter',
    });
    return;
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  daysElement.textContent = String(days).padStart(2, '0');
  hoursElement.textContent = String(hours).padStart(2, '0');
  minutesElement.textContent = String(minutes).padStart(2, '0');
  secondsElement.textContent = String(seconds).padStart(2, '0');
}
