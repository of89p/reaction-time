const socket = io();

//Get query strings
const { username } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

let canClick = false;

socket.emit('joinRoom', { username });

socket.on("joinGame", (res) => {
    if(res == "Username is already taken. Choose another one."){
        alert("Username is already taken. Choose another one.");
    }
    console.log(res);
});

socket.on("status", (res) => {
    if(res){
        //Start game as there is more than one player
        console.log("Ready");
        document.getElementById("status").style.display = "none";
    } else {
        //can't start; not enough players
        document.getElementById("status").innerHTML = "Waiting for more players"
    }
});

socket.on("prepareGame", () => {
    console.log("prepare game");
    // document.getElementById("action_area").style.display = "block";
    // document.getElementById("action_area_green").style.display = "none";
    // document.getElementById("action_area").style.backgroundColor = "red";
    document.getElementsByTagName("BODY")[0].style.backgroundColor = "red";
    document.getElementById("status").innerHTML = "Wait for green color..."
    document.getElementById("status").style.color = "#fff";
    document.getElementById("status").style.display = "block";
});

socket.on("turnGreen", () => {
    console.log("turn green");
    canClick = true;
    // document.getElementById("action_area").style.display = "none";
    // document.getElementById("action_area_green").style.display = "block";    
    document.getElementsByTagName("BODY")[0].style.backgroundColor = "green";
    document.getElementById("status").innerHTML = "click"
    document.getElementById("status").style.color = "#fff";
    document.getElementById("status").style.display = "block";
});

function submitClick(){
    if(canClick){
        socket.emit('clickedGreen', username );
        canClick = false;
    }
}

socket.on("results", recordUserTimes => {
    console.log(recordUserTimes);
    document.getElementById("modal").style.display = "block";
    document.getElementById("status").style.display = "none";
    document.getElementsByTagName("BODY")[0].style.backgroundColor = "#75D8D6";
    

    let winner = recordUserTimes[0].username;
    let winner_timing = recordUserTimes[0].elapsedTime;

    document.getElementById("winner").innerHTML = winner;
    document.getElementById("winner_timing").innerHTML = winner_timing;
    


    for (i=0; i<=recordUserTimes.length;i++){
        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(`${recordUserTimes[i].username}, ${recordUserTimes[i].elapsedTime}ms`);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("other_timings").appendChild(node);     // Append <li> to <ul> with id="myList"  
    }


});

function replay(){
    location.reload();
}