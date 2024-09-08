let listButtons = document.querySelectorAll('.buttons button');
let lastReturn = document.querySelector('.screen .last');
let newReturn = document.querySelector('.screen .new');  

let firstNumber = null;
let newNumber = null;
let calculator = '+';

listButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        let value = button.innerText;
        switch (value) {
            case ((value.match(/[0-9]/) || {}).input):
                // add number in lastNumber
                newNumber = newNumber !== null ? newNumber + value : value;
                break;
            case '.':
                newNumber = newNumber !== null ? newNumber + value : '0.';
                break;
            case '±':
                newNumber = -1 * newNumber;
                break;
            case '%':
                newNumber = 0.01 * newNumber;
                break;
            case ((value.match(/[\+|\-|\x|\÷]/) || {}).input):
                if(newNumber){
                    if(firstNumber){
                        applyCalculator();
                    }
                    calculator = value;
                    firstNumber = newNumber;
                    newNumber = null;
                }
                break;    
            case '=':
                applyCalculator();
                firstNumber = null;
                break;  
            case 'AC':
                firstNumber = null;
                newNumber = null;
                calculator = '+';
                break;      
        }
        reloadScreen();
    })
})
const applyCalculator = () => {
   switch (calculator) {
    case '+':
        newNumber = Number(firstNumber) + Number(newNumber);
        break;
    case '-':
        newNumber = Number(firstNumber) - Number(newNumber);
        break;
    case 'x':
        newNumber = Number(firstNumber) * Number(newNumber);
        break;
    case '÷':
        newNumber = (Number(firstNumber) / Number(newNumber)).toFixed(5);
        break;
   }
}
const reloadScreen = () => {


    lastReturn.innerText = firstNumber !== null ? firstNumber + '' + calculator : '';

    newReturn.innerText = newNumber !== null ? newNumber : '';
    
}


// ============================================pomodoro==========================
// variables

let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00"

// display
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');
}

// start timer
function start() {
    // change button
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // change the time
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    breakCount = 0;

    // countdown
    let timerFunction = () => {
        //change the display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // start
        seconds = seconds - 1;

        if(seconds === 0) {
            workMinutes = workMinutes - 1;
            if(workMinutes === -1 ){
                if(breakCount % 2 === 0) {
                    // start break
                    workMinutes = breakMinutes;
                    breakCount++

                    // change the painel
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                }else {
                    // continue work
                    workMinutes = workTime;
                    breakCount++

                    // change the painel
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }
    }

    // start countdown
    setInterval(timerFunction, 1000); // 1000 = 1s
}


// ====================================qr
const wrapper = document.querySelector(".qr-wrapper"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");
let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});

qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});


// calendar
const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  let calendar = document.querySelector('.calendar');
  const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let month_picker = document.querySelector('#month-picker');
  const dayTextFormate = document.querySelector('.day-text-formate');
  const timeFormate = document.querySelector('.time-formate');
  const dateFormate = document.querySelector('.date-formate');
  
  month_picker.onclick = () => {
    month_list.classList.remove('hideonce');
    month_list.classList.remove('hide');
    month_list.classList.add('show');
    dayTextFormate.classList.remove('showtime');
    dayTextFormate.classList.add('hidetime');
    timeFormate.classList.remove('showtime');
    timeFormate.classList.add('hideTime');
    dateFormate.classList.remove('showtime');
    dateFormate.classList.add('hideTime');
  };
  
  const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector('.calendar-days');
    calendar_days.innerHTML = '';
    let calendar_header_year = document.querySelector('#year');
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    
    let currentDate = new Date();
    
    month_picker.innerHTML = month_names[month];
    
    calendar_header_year.innerHTML = year;
    
    let first_day = new Date(year, month);
  
  
  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
  
      let day = document.createElement('div');
  
      if (i >= first_day.getDay()) {
        day.innerHTML = i - first_day.getDay() + 1;

        if (i - first_day.getDay() + 1 === currentDate.getDate() &&
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth()
        ) {
          day.classList.add('current-date');
        }
      }
      calendar_days.appendChild(day);
    }
  };
  
  let month_list = calendar.querySelector('.month-list');
  month_names.forEach((e, index) => {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
  
    month_list.append(month);
    month.onclick = () => {
      currentMonth.value = index;
      generateCalendar(currentMonth.value, currentYear.value);
      month_list.classList.replace('show', 'hide');
      dayTextFormate.classList.remove('hideTime');
      dayTextFormate.classList.add('showtime');
      timeFormate.classList.remove('hideTime');
      timeFormate.classList.add('showtime');
      dateFormate.classList.remove('hideTime');
      dateFormate.classList.add('showtime');
    };
  });
  
  (function () {
    month_list.classList.add('hideonce');
  })();
  document.querySelector('#pre-year').onclick = () => {
    --currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  document.querySelector('#next-year').onclick = () => {
    ++currentYear.value;
    generateCalendar(currentMonth.value, currentYear.value);
  };
  
  let currentDate = new Date();
  let currentMonth = { value: currentDate.getMonth() };
  let currentYear = { value: currentDate.getFullYear() };
  generateCalendar(currentMonth.value, currentYear.value);

  const todayShowTime = document.querySelector('.time-formate');
  const todayShowDate = document.querySelector('.date-formate');
  
  const currshowDate = new Date();
  const showCurrentDateOption = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const currentDateFormate = new Intl.DateTimeFormat(
    'en-US',
    showCurrentDateOption
  ).format(currshowDate);
  todayShowDate.textContent = currentDateFormate;
  setInterval(() => {
    const timer = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formateTimer = new Intl.DateTimeFormat('en-us', option).format(timer);
    let time = `${`${timer.getHours()}`.padStart(
      2,
      '0'
    )}:${`${timer.getMinutes()}`.padStart(
      2,
      '0'
    )}: ${`${timer.getSeconds()}`.padStart(2, '0')}`;
    todayShowTime.textContent = formateTimer;
  }, 1000);
  