var data;

var bodyCount = 0;
var sexCount = 0;
var lastNut = new Date();
var averageTime = "00:00";
horniness = 0;

var user= "";

var sexyTimeDiv;

$(document).ready(function () { 
  user = localStorage.getItem("currentUser");
  updateBio();
 
  sexyTimeDiv = document
    .getElementById("iJustHadSex")
    .addEventListener("click", confettiTime, false);
  if (isNaN(parseInt(localStorage.getItem(user + "_sexCount")))) {
      console.log("here");
    readTextFile("../data/" + user + ".txt");
    if (data != null) {
      console.log("error loading data");
      loadData();
    }
  }
  populateFields();
});

var confettiTime = function () {
  for (var i = 0; i < 30; i++) {
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2,
      },
    });
  }
  updateDate();
  increaseSexCount();
  
};

var increaseSexCount = function () {
  var currCount = parseInt(localStorage.getItem(user + "_sexCount"));
  localStorage.setItem(user  + "_sexCount", currCount + 1);
  document.getElementById("sexCount").innerHTML = localStorage.getItem(user + "_sexCount");
  
  styleStats();
};

var increaseBodyCount = function () {
  var currCount = parseInt(localStorage.getItem(user + "_bodyCount"));
  localStorage.setItem(user + "_bodyCount", currCount + 1);
  document.getElementById("bodyCount").innerHTML = localStorage.getItem(user + "_bodyCount");
  confettiTime();
};

var updateDate = function () {
  var lastNut = new Date();
  var dateString = lastNut.getMonth() + 1 + "/" + lastNut.getDate() + "/" + lastNut.getFullYear();
  document.getElementById("lastNut").innerHTML = dateString;
  localStorage.setItem(user + "_lastNut", lastNut);
};

var updateHorny = function (value) {
  localStorage.setItem(user + "_horniness", value);
  document.getElementById("hornyLevelReading").innerHTML =
    "Horniness Level: " + value + "%";
};

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        data = allText;
      }
    }
  };
  //rawFile.send(null);
  data = null;
}

var loadData = function () {
  var splitData = data.split("\n");
  bodyCount = sanitize(splitData[0]);
  localStorage.setItem(user + "_bodyCount", bodyCount);
  sexCount = sanitize(splitData[1]);
  localStorage.setItem(user + "_sexCount", sexCount);
  lastNut = new Date(sanitize(splitData[2]));
  localStorage.setItem(user + "_lastNut", lastNut);
  averageTime = sanitize(splitData[3]);
  localStorage.setItem(user + "_averageTime", averageTime);
  var horniness = sanitize(splitData[4]);
  localStorage.setItem(user + "_horniness", horniness);
};
var sanitize = function (input) {
  return input.split("=")[1];
};

var populateFields = function () {
  document.getElementById("bodyCount").innerHTML = localStorage.getItem(user + "_bodyCount");
  document.getElementById("sexCount").innerHTML = localStorage.getItem(user + "_sexCount");
  var lastNut = new Date(localStorage.getItem(user + "_lastNut"));
  document.getElementById("lastNut").innerHTML =
    lastNut.getMonth() +
    1 +
    "/" +
    lastNut.getDate() +
    "/" +
    lastNut.getFullYear();
  document.getElementById("averageTime").innerHTML = localStorage.getItem(user + "_averageTime");
  document.getElementById("hornyLevel").value = localStorage.getItem(user + "_horniness");
  document.getElementById("hornyLevelReading").innerHTML =
    "Horniness Level: " + localStorage.getItem(user + "_horniness") + "%";
  styleStats();
};

var styleStats = function () {
  var currDate = new Date();
  var weeks = Math.round((currDate.getDate() + currDate.getMonth() * 30) / 7);
  var sexCount = localStorage.getItem(user + "_sexCount");
  if (weeks / sexCount < 2) {
    document.getElementById("sexCount").style = "color:green;";
  } else if (weeks / sexCount < 5) {
    document.getElementById("sexCount").style = "color:orange;";
  } else {
    document.getElementById("sexCount").style = "color:red;";
  }
  var lastNut = new Date(localStorage.getItem(user + "_lastNut"));
  var daysBetween = Math.round(
    (new Date().getTime() - lastNut.getTime()) / (1000 * 60 * 60 * 24)
  ).toFixed();
  if (daysBetween < 10) {
    document.getElementById("lastNut").style = "color:green;";
  } else if (daysBetween < 20) {
    document.getElementById("lastNut").style = "color:orange;";
  } else {
    document.getElementById("lastNut").style = "color:red;";
  }
};

var updateBio = function() {
    if (user == "cameron") {
        camInfo();
    }
    else if (user =="connor") {
        connorInfo();
    }
    else if (user == "jax") {
        jaxInfo();
    }
}

var camInfo = function() {
    document.getElementById("tabtitle").innerHTML = "Cameron Hart";
    document.getElementById("profilePic").src = "./content/images/cameron_small.jpg";
    document.getElementById("name").innerHTML = "Cameron Hart";
    document.getElementById("built").innerHTML = "Built Ugly";
    document.getElementById("twitter").href = "https://twitter.com/imhartless12";
    document.getElementById("instagram").href = "https://www.instagram.com/cameron_hart8/?hl=en";
    document.getElementById("facebook").href = "https://www.facebook.com/cameron.hart.712";
}

var connorInfo = function() {
    document.getElementById("tabtitle").innerHTML = "Connor Bartal";
    document.getElementById("profilePic").src = "./content/images/connor_small.jpg";
    document.getElementById("name").innerHTML = "Connor Bartal";
    document.getElementById("built").innerHTML = "Built Autistic";
    document.getElementById("twitter").href = "https://twitter.com/Connor_Bartal";
    document.getElementById("instagram").href = "https://www.instagram.com/cbartal/?hl=en";
    document.getElementById("facebook").href = "https://www.facebook.com/connor.bartal";
}

var jaxInfo = function() {
    document.getElementById("tabtitle").innerHTML = "Jaxon Delgado";
    document.getElementById("profilePic").src = "./content/images/jax_small.jpg";
    document.getElementById("name").innerHTML = "Jaxon Delgado";
    document.getElementById("built").innerHTML = "Built Defective";
    document.getElementById("twitter").href = "https://twitter.com/jaxon_delgado";
    document.getElementById("instagram").href = "https://www.instagram.com/jaxdelgado_/?hl=en";
    document.getElementById("facebook").href = "https://www.facebook.com/profile.php?id=100005366896337";
}