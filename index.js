const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./DB/Connection.js');
const Room = require('./Schemas/Rooms.js');
const Customer = require('./Schemas/CustomerDetails.js')
connectDB();

app.use(express.json());

app.post('/room', async (req, res) => {  //Create Room
  try {
    

    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.send(savedRoom);
  } catch (error) {
    console.log(error);
  }
});

app.put('/customer/:id', async (req, res) => { // Customer Booking a room
    try {
      
      const roomId = req.params.id
      const newCust = new Customer({
        name: req.body.name,
        Date: Date.now(),
        start_time: req.body.start_time,
        end: req.body.end,
        RoomId: roomId


      });
      const savedCust = await newCust.save();
      res.send(savedCust);
      const bookedRoom = await Room.findByIdAndUpdate(roomId,{status: "Booked",CustomerDetails: savedCust._id})
      await bookedRoom.save();
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/Booked', async (req, res) => {   // Fetching details of all booked rooms
    try {
      const bookedRooms = await Room.find({ status: "Booked" })
        .populate({
          path: 'CustomerDetails',
          select: 'name start_time end Date'
        })
        .select('Room_name status CustomerDetails');
  
    
  
      res.json(bookedRooms);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  });


  app.get('/Customers',async(req,res)=> { // fetching all details of customers

    try{
    const customers = await Customer.find({})
    .populate({
        path: "RoomId",
        select: 'Room_name status CustomerDetails'
    }).select('name start_time end Date')

  res.json(customers)
}catch(error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
  

  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});