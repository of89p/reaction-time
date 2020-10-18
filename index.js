const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const utils = require("./utils/utils");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(
  express.static(path.join(__dirname, "public"), { extensions: ["html"] })
);


let recordUserTimes = [];
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username }) => {
    // if(utils.addUser(socket.id, username)){
    //   socket.emit("joinGame", "BYe");
    // } else {
    //   //Waiting for more people
    //   io.emit('joinGame', "Hello");
    // }
    let response = utils.addUser(socket.id, username);
    if(response.bool){
      if(response.enoughPeople){
        io.emit('status', true);
        prepareGame();
      } else {
        io.emit('status', false);
      }
    } else {
      io.emit('joinGame', response.reason);
    }
  });

  const prepareGame = () => {
    if(utils.prepareGame){
      io.emit("prepareGame");

      doTheRandom()
        function doTheRandom() {
            random = randomizator(60000,200000);
            setTimeout(startGame, randomizator(2000, 6000)); // 2-6 seconds
        }

        function randomizator(a,b){
            return Math.floor(Math.random()*b) + a;
        } 

        function startGame(){
            console.log("Game started");
            
            utils.startTimerForPlayers();
            io.emit("turnGreen");

            setTimeout(() => {
              io.emit("results", recordUserTimes);
              utils.deleteUsers();
              recordUserTimes = [];
            }, 1500);
        }
    }
  }

  socket.on("clickedGreen", (username) => {
    let res = utils.recordTime(username);
    
    let obj = {
        username,
        elapsedTime: res.elapsedTime
    }
    recordUserTimes.push(obj);
    console.log(recordUserTimes);
  }); 

  // socket.on("disconnect", () => {
  //   if(utils.disconnect(socket.id)){
  //     io.emit('status', true);
  //   } else {
  //     io.emit('status', false);
  //   }
  // });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, (err) => {
  console.log(`Server running on port ${PORT}...`);
});
