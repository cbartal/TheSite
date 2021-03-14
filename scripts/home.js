var profilePics;
var currentData = "";
$(document).ready(function() {
    profilePics = document.getElementsByClassName("thumbnail");
    addListeners();
});



var navigate_profile = function() {
    let user = ($(this)[0].innerHTML);
    if (user.includes("Cameron")) {
        localStorage.setItem("currentUser", "cameron");
    }
    else if (user.includes("Connor")) {
        localStorage.setItem("currentUser", "connor") = "connor";
    }
    else if (user.includes("Jax")) {
        localStorage.setItem("currentUser", "jax");
    }
}

var addListeners = function() {
    for (var i = 0; i < profilePics.length; i++) {
        profilePics[i].addEventListener('click', navigate_profile, false);
    }
    updateData();
}


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                currentData = allText;
            }
        }
    }
    rawFile.send(null);
}
var sanitize = function(input) {
    return input.split("=")[1];
}

var updateData = function() {
    var users = ["cameron", "connor", "jax"];
    for (var i = 0; i < users.length; i++) {
        updateUser(users[i]);
    }
    
}

var updateUser = function(user) {
    readTextFile("../data/" + user + ".txt");
    if (currentData == null) {
        console.log("Error");
        return;
    }
    var splitData = currentData.split("\n");
    var bodyCount = sanitize(splitData[0]);
    var sexCount = sanitize(splitData[1]);
    var lastNut = new Date(sanitize(splitData[2]));
    var horniness = sanitize(splitData[4]);
    document.getElementById(user + "BC").innerHTML = localStorage.getItem(user + "_bodyCount");
    document.getElementById(user + "SC").innerHTML = localStorage.getItem(user + "_sexCount");
    var lastNut = new Date(localStorage.getItem(user + "_lastNut"));
    document.getElementById(user + "LN").innerHTML = (lastNut.getMonth() + 1) + "/" + lastNut.getDate() + "/" + lastNut.getFullYear();
    var horniness = localStorage.getItem(user + "_horniness");
    document.getElementById(user + "HL").innerHTML =  horniness + "%";
    document.getElementById(user + "HL").style = "width:" + horniness + "%";
    if (horniness < 30) {
        document.getElementById(user + "HL").className = "progress-bar progress-bar-success";
        
    }
    else if (horniness < 70) {
        document.getElementById(user + "HL").className = "progress-bar progress-bar-warning";
    }
    else {
        document.getElementById(user + "HL").className = "progress-bar progress-bar-danger";
    }
}

var connorData = function() {
    readTextFile("/data/connor.txt");
    if (currentData == null) {
        console.log("Error");
        return;
    }
    var splitData = currentData.split("\n");
    var bodyCount = sanitize(splitData[0]);
    var sexCount = sanitize(splitData[1]);
    var lastNut = new Date(sanitize(splitData[2]));
    var horniness = sanitize(splitData[4]);
    document.getElementById("connorBC").innerHTML = bodyCount;
    document.getElementById("connorSC").innerHTML = sexCount;
    document.getElementById("connorLN").innerHTML = (lastNut.getMonth() + 1) + "/" + lastNut.getDate() + "/" + lastNut.getFullYear();
    document.getElementById("connorHL").innerHTML =  horniness+ "%";
    document.getElementById("connoHL").style = "width:" + horniness + "%";
    if (horniness < 30) {
        document.getElementById("camHL").className = "progress-bar progress-bar-success";
        
    }
    else if (horniness < 70) {
        document.getElementById("camHL").className = "progress-bar progress-bar-warning";
    }
    else {
        document.getElementById("camHL").className = "progress-bar progress-bar-danger";
    }
}