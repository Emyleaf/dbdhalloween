let progressBar = document.getElementById("progress-bar");
let progress = 0;
let intervalprogress = setInterval(updateProgressBar, 1000);

// Funzione per aggiornare la barra di progresso
function updateProgressBar() {
    if (progress < 100) { // Controlla se non ha raggiunto il 100%
        progress += 1; // Incrementa del 1%
        progressBar.value = progress; // Imposta il nuovo valore
    }
    if (progress >= 100){
        youwin();
    }
}

function updateProgressBarBonus(a){
    if (progress < 100){
        if(a == 150){
            progress += 2;
        }
        if(a == 50){
            progress += 1;
        }
        progressBar.value = progress;
    }
    if (progress >= 100){
        youWin();
    }
}

function loseProgressBar(){
    if (progress < 100 && progress >= 0){
        progress -= 10;
        progressBar.value = progress;
    }
    if (progress < 0){
        progress = 0;
        progressBar.value = progress;
    }
}

function startGeneration() {
    document.getElementById("start").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    isPlaying = 1;
    
    intervalprogress;
    randomGeneration();
}

function randomGeneration() {
    var intervalspawn = Math.floor(3000 * Math.random() + 2000);
    setTimeout(function() {
        newZone()
    }, intervalspawn)
}

function newZone() {
    scInc.load(),
    scInc.play(),
    setTimeout(function() {
        newRandomPos(),
        zone.style.transform = "rotate(" + randomPos + "deg)",
        newSkillCheck()
    }, 500)
}

function newSkillCheck() {
    skillCheck.style.opacity = "1",
    document.getElementById("zone").style.opacity = "0.7",
    document.getElementById("tick").style.opacity = "1",
    document.getElementById("customkeyoverlay").style.opacity = "1",
    moveTick(26, 8)
}

function moveTick(a, b) {
    setTimeout(function() {
        0 == isStopped ? (degSC += b,
        tick.style.transform = "translate(60px, 65px) rotate(" + degSC + "deg)",
        degSC < 180 ? newSkillCheck() : (testZoneMatch(),
        setTimeout(resetSC, 500))) : 1 == isStopped && (isStopped = 0)
    }, a)
}
function keydown(a) {
    a.keyCode == customKey && (isPressed = !0,
    isStopped = 1,
    testZoneMatch(),
    setTimeout(resetSC, 500))
}
function resetSC() {
    skillCheck.style.opacity = "0",
    document.getElementById("zone").style.opacity = "0",
    document.getElementById("tick").style.opacity = "0",
    document.getElementById("customkeyoverlay").style.opacity = "0",
    setTimeout(function() {
        zone.style.transform = "",
        tick.style.transform = "",
        degSC = -180,
        isStopped = 0,
        isPressed = !1
    }, 100)
}
function newRandomPos() {
    randomPos = Math.floor(210 * Math.random() + 1 - 30)
}

function testZoneMatch() {
    degSC >= -68 + randomPos && degSC <= -60 + randomPos ? (showNotif(150),
    sc150.load(),
    sc150.play()) : degSC >= -59 + randomPos && degSC <= -23 + randomPos ? (showNotif(50),
    sc50.load(),
    sc50.play()) : degSC >= -180 + randomPos && degSC <= -69 + randomPos ? (loseProgressBar(),
    sc0.load(),
    sc0.play()) : degSC >= -22 + randomPos && (loseProgressBar(),
    sc0.load(),
    sc0.play());
    
    randomGeneration();
}

function showNotif(a) {
    150 == a ? notiftitle.innerHTML = "GREAT SKILL CHECK" : 50 == a && (notiftitle.innerHTML = "GOOD SKILL CHECK"),
    notifpoints.innerHTML = "+" + a,
    leftpanel.className = "notifshown",
    updateProgressBarBonus(a);
    setTimeout(function() {
        leftpanel.className = "notifvanish",
        setTimeout(function() {
            leftpanel.className = "notifhidden"
        }, 2000)
    }, 800)
}

var skillCheck = document.getElementById("skillcheck")
  , tick = document.getElementById("tick")
  , zone = document.getElementById("zone")
  , leftpanel = document.getElementById("leftpanel")
  , notiftitle = document.getElementById("notiftitle")
  , notifpoints = document.getElementById("notifpoints")
  , scInc = document.getElementById("scinc")
  , sc150 = document.getElementById("sc150")
  , sc50 = document.getElementById("sc50")
  , sc0 = document.getElementById("sc0")
  , customKey = 32
  , previousTry = ""
  , textStats = document.getElementsByClassName("value")
  , achievementTitle = ["You pip'd so you had fun", "Farming : MAX", "Level up", "Trust me, I'm a engineer", "Brand New Dwight", "Blame the lag", "Well deserved facecamp", "-rep Please uninstall", "Not even immersed", "Best player in the world", "Now play the actual game", "What in tarnation ?", "Infinite abuser", "Esport ready", "Blame Mclean"]
  , achievementDescription = ["Get 7 000 blood points", "Get 32 000 blood points", "Hit 50 great skill checks", "Hit 100 great skill checks", "Hit 500 great skill checks", "Fail 50 skill checks", "Fail 100 skill checks", "Fail 500 skill checks", "Hit 5 great skill checks in a row", "Hit 10 great skill checks in a row", "Play for a total of 1 000 skill checks", "Play for a total of 2 000 skill checks", "Play for a total of 3 000 skill checks", "Play for a total of 5 000 skill checks", "???"];

document.getElementById("zone").style.opacity = "0",
document.getElementById("tick").style.opacity = "0",
document.getElementById("customkeyoverlay").style.opacity = "0";
var degSC = -180, isStopped = 0, randomPos, isPlaying = 0;

document.body.addEventListener("keydown", keydown);

document.body.addEventListener("touchstart", handleTouch);

function handleTouch() {
    if (isPlaying == 1){
        isPressed = true;
        isStopped = 1;
        testZoneMatch();
        setTimeout(resetSC, 500);
    }
}

function youwin(){
    const element = document.getElementById("game");
    element.remove();
    clearInterval(intervalprogress);

    Swal.fire({
        title: "Brava!",
        text: "Hai vinto un regalino!",
        icon: "success"
      });
}