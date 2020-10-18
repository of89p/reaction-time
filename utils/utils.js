const fs = require("fs");

users = [];

const addUser = (id, username) => {
    obj = {id, username}

    function userExist(username){
        return users.filter((user) => user.username === username).length == 0
        ? true
        : false
    }

    if(userExist(username)){
        users.push(obj);
        console.log(users);
        let enoughPeople = users.length > 1 ? true : false;
        return {bool: true, enoughPeople }
    } else {
        //Username taken
        return {bool: false, reason: "Username is already taken. Choose another one."}
    }
}

const prepareGame = () => {
    if(users.length < 2) {
        return false
    } else {
        // var startTime = Date.now();

        // var interval = setInterval(function() {
        //     var elapsedTime = Date.now() - startTime;
        //     // console.log(elapsedTime / 1000);
        // }, 100);

        return true;
    }
}

var startTime;
function startTimerForPlayers(){
    startTime = Date.now();
}

const recordTime = (username) => {
    let elapsedTime = Date.now() - startTime;
    let number_users = users.length;
    return {elapsedTime, number_users}
}

// const disconnect = id => {
//     index = users.findIndex((user) => user.id === id);
//     users.splice(index, 1);
//     let enoughPeople = users.length > 1 ? true : false;
//     console.log(id);
//     console.log(users);
//     return enoughPeople;
// }

const deleteUsers = () => {
    users = [];
}

module.exports = {
    addUser,
    // disconnect,
    prepareGame,
    startTimerForPlayers,
    recordTime,
    deleteUsers
};
  