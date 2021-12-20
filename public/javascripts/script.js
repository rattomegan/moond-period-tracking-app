

// keep track of which month we're on
let nav = 0;
// whichever day we've clicked on
let clicked = null;
// array of event objects
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
// let events = Period.find({}, function(err, periods) {
//   return console.log('Periods', periods);
// })

// constants - available globally and will not change
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal')
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput')
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked)

  if (eventForDay) {
    console.log('event already exists')
  } else {
    // this is because css styling
    newEventModal.style.display = 'block';
  }
  backDrop.style.display = 'block';
}

function closeModal() {
  newEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  // we don't want to keep click equal to the day, so we need to clear it out.
  clicked = null;
  loadCalendar();
}



function loadCalendar() {
  // create a date object for current date
  const dt = new Date();
  // account for scrolling through months
  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  console.log(dt)
  console.log(day, month, year)
  const firstDayOfMonth = new Date(year, month, 1)
  console.log(firstDayOfMonth)
  // number that will represent days in current month.  "0" = the last day of the previous month. The month starts at 1.
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  //create a date string
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long', // The comma and the space provided here will be used later to split the date
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric'
  })
  // This is splitting our date string at the comma after the weekday, which creates an array - then we're calling that day since it's at index 0 of the split array.
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
  // Display month and year in calendar header
  document.getElementById('month-display').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`

  // empties calendar so it can reload
  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    // sets current day string
    const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    if (i > paddingDays) {
      // this sets our starting day logic at 1
      daySquare.innerText = i - paddingDays;
      //check if there's a day we're already on
      const eventForDay = events.find(e => e.date === dayString)
      // 
      if(eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }


      // for now we're just logging the click. we will later write a function for this click.
      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }
    calendar.appendChild(daySquare);
  }
}


function initButtons() {
  document.getElementById('next-button').addEventListener('click', () => {
    // variable defined to keep track of month will increase by one each click
    nav++;
    loadCalendar();
  })
  document.getElementById('back-button').addEventListener('click', () => {
    // variable defined to keep track of month will increase by one each click
    nav--;
    loadCalendar();
  })
  // document.getElementById('saveButton').addEventListener('click', periodsCtrl.create);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
}


initButtons();
loadCalendar();

