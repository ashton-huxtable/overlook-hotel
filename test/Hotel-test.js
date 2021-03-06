import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/classes/Hotel'
import Guest from '../src/classes/Guest'
import Room from '../src/classes/Room'
import Booking from '../src/classes/Booking'
import testBookings from './test-data/test-bookings'
import testRooms from './test-data/test-rooms'
import testUsers from './test-data/test-users'



describe('Hotel', () => {
  let hotel, room1, room2, room3, booking, guest;

  beforeEach(() => {
    room1 = testRooms[0];
    room2 = testRooms[1];
    room3 = testRooms[2];
    guest = new Guest(testUsers[0]);
    hotel = new Hotel(testRooms, testBookings);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should instantiate an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should store all rooms data', () => {
    expect(hotel.rooms).to.deep.equal(testRooms);
  });

  it('should store all booking data', () => {
    expect(hotel.bookings).to.deep.equal(testBookings);
  });

  it('should have a way to store all available rooms', () => {
    expect(hotel.availableRooms).to.deep.equal([]);
  });

  it('should display all of a guests bookings', () => {
    let guestBookings = hotel.getGuestBookings(guest);
    guest.bookings = [
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 1,
        "date": "2020/04/22",
        "roomNumber": 1,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 1,
        "date": "2020/02/05",
        "roomNumber": 3,
        "roomServiceCharges": []
      },
    ]
    expect(guestBookings).to.deep.equal(guest.bookings);
  });


  it('should get room information for each booking', () => {
    let booking =  testBookings[0];
    let room = hotel.getRoomInformation(booking)
    expect(booking.roomNumber).to.equal(room.number);
    expect(room).to.equal(testRooms[0])
  })

  it('should be able to calculate a users total amount spent at the hotel', () => {
    let guestTotal = hotel.calculateGuestAmntSpent(guest);
    expect(guestTotal).to.equal(849.54);
  });

  it('should be able to find available rooms for specific dates', () => {
    let availableRooms = hotel.getAvailableRooms('2020/04/22');
    expect(availableRooms).to.deep.equal([room2, room3])
  })

  it('should not get any rooms if they are all booked on a date', () => {
    let noRoom = hotel.getAvailableRooms('2020/01/24');
    expect(noRoom).to.equal('Sorry, there are no rooms available for this date!');
  })

  it('should be able to filter available rooms by type', () => {
    let availableRooms = hotel.getRoomsAvailableByType('2020/04/22', 'suite');
    expect(availableRooms).to.deep.equal([room2]);
  })
})
