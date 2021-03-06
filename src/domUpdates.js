import Hotel from './classes/Hotel'
import Guest from './classes/Guest'
import Booking from './classes/Booking'
import Room from './classes/Room'

let dayjs = require('dayjs');
const today = dayjs(Date.now()).format('YYYY-MM-DD');
document.getElementById('arrivalDate').setAttribute("min", today);
document.getElementById('arrivalDate').setAttribute("value", today);



const greeting = document.getElementById('greeting');
const guestPage = document.getElementById('guestPage');
const availableCards = document.getElementById('availableCards');
const roomAvailability = document.getElementById('roomAvailability')
const arrivalDate = document.getElementById('arrivalDate');
const selectedRoom = document.getElementById('selectedRoom');
const searchOptions = document.getElementById('searchOptions');



const domUpdates = {

  hideElement(element){
    element.classList.add('hidden');
  },

  showElement(element){
    element.classList.remove('hidden')
  },

  displayGuestDashboard(guest, bookings, rooms, hotel) {
    const bookingCards = document.getElementById('bookingCards');
    const totalGuestCosts = document.getElementById('totalGuestCosts');
    let bookingType;

    greeting.innerText = `Welcome, ${guest.name}!`
      bookingCards.innerHTML = ''

      const amnt = hotel.calculateGuestAmntSpent(guest)
      totalGuestCosts.innerHTML = `  <section class="trip-costs" id="totalGuestCosts">
          <h4>Total spent at Overlook to date: $${amnt}</h4>
        </section>`

    hotel.getGuestBookings(guest).forEach(booking => {
      let room = hotel.getRoomInformation(booking);
      bookingType = 'Past Trip'
      const bookDate = dayjs(booking.date)
      if(bookDate.isBefore(today)){
        bookingType = 'Past Trip'
      }
      if(bookDate.isSame(today) ||
        bookDate.isAfter(today)) {
          bookingType = 'Upcoming Trips'
        }

      bookingCards.innerHTML += `
          <article class="cards">
            <h3>${bookingType}</h3>
            <img src="./images/room.jpg" alt="breezy room with king bed overlooking the sea">
            <p class="date">${booking.date}</p>
            <p class="room-type">${room.roomType}</p>
            <p class="cost">$${room.costPerNight}</p>
          </article>
      `
    })
  },

  goHome(){
    this.hideElement(roomAvailability);
    this.showElement(guestPage);
  },

  renderBookingForm() {
    this.hideElement(guestPage);
    this.showElement(roomAvailability);
  },

  renderAvailableRooms(guest, bookings, rooms, hotel) {
    const noRooms = document.getElementById('noRoomsError');
    noRooms.innerText = ''

    availableCards.innerHTML = ''
    let date = dayjs(arrivalDate.value).format('YYYY/MM/DD');
    if(searchOptions.value === 'empty') {
      hotel.getAvailableRooms(date);
    }
    if(searchOptions.value !== 'empty') {
      let type = searchOptions.value.toLowerCase();
      hotel.getRoomsAvailableByType(date, type);
    }

    if(hotel.availableRooms.length === 0) {
      this.displayNoRoomsError();
    } else {
      hotel.availableRooms.forEach(room => {
        availableCards.innerHTML += `
          <article class="cards">
            <h3>${room.roomType}</h3>
            <img src="./images/room.jpg" alt="breezy room with king bed overlooking the sea">
            <p class="date">Available for ${date}</p>
            <p class="room-type">${room.bedSize} bed</p>
            <p class="cost">$${room.costPerNight} per night</p>
            <button id="${room.number}" class="select-room">View</button>
          </article>
        `
      })
    }
  },

  renderSelectedRoom(currentRoom) {
    selectedRoom.innerHTML = ''
    let date = dayjs(arrivalDate.value).format('YYYY/MM/DD');
    this.showElement(selectedRoom);
    selectedRoom.classList.remove('hide');
    let hasBidet;
    if(currentRoom.bidet) {
      hasBidet = 'Yes'
    } else {
      hasBidet = 'No'
    }

    selectedRoom.innerHTML += `
    <section class="selected-room" id="selectedRoom">
      <article class="room-select">
      <button class="close-selection" id="closeSelection">&times;</button>
        <h3>${currentRoom.roomType}</h3>
        <img class="img-select" src="./images/room.jpg" alt="breezy room with king bed overlooking the sea">
        <p class="date">Available for ${date}</p>
        <p class="room-type">${currentRoom.bedSize}</p>
        <p class="room-type"> Bidet: ${hasBidet}</p>
        <p class="cost">$${currentRoom.costPerNight}</p>
        <section class="booked-room" id="bookedRoom">
          <button id="${currentRoom.number}" class="book-room-btn">Book Room!</button>
          <p class="success-msg" id="successMsg"></p>
        </section>
      </article>
    </section>
    `
  },

  displayNoRoomsError(){
    const noRooms = document.getElementById('noRoomsError');
    noRooms.innerText = 'Sorry there are no rooms available for your search requirements, please try again!'
  },

  displaySignInError(){
    const signInError = document.getElementById('signInError');
    signInError.innerHTML = 'Sorry, the username or password does not match'
  },

  displaySuccess(){
    const successMsg = document.getElementById('successMsg');
    successMsg.innerText = 'Your booking was added successfully!'
  },

  displayBookingError(){
    const successMsg = document.getElementById('successMsg');
    successMsg.innerText = 'Something went wrong. Please try again later!'
  },

  displayLoginCatchError(){
    const signInError = document.getElementById('signInError');
    signInError.innerText = 'Sorry, something went wrong with the server. Please try again later!'
  }

}

export default domUpdates;
