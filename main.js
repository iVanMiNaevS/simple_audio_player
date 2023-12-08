const titleContainer = document.querySelector(".title-container__title");
const nameMusic = document.querySelector(".name-music");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress-container__progress");
const prevBt = document.querySelector(".prevBt");
const playAndPauseBt = document.querySelector(".play-pauseBt");
const nextBt = document.querySelector(".next");
const audio = document.querySelector("audio");
const volumeCont = document.querySelector(".volume");
const volumeBar = document.querySelector(".volume__bar");

const songs = ["ЗА ДЕНЬГИ ДА", "ТАНЦУЙ", "ХАЙЕГОХО", "VANDAL"];

let index = 0;

if (localStorage.getItem("volume") == null) {
    volumeBar.style.height = `50%`;
    audio.volume = 0.25;
} else {
    volumeBar.style.height = `${localStorage.getItem("height")}`;
    audio.volume = Number(localStorage.getItem("volume"));
}

function loadSong(index) {
    audio.src = `audio/${songs[index]}.mp3`;
    titleContainer.innerText = songs[index];
    nameMusic.innerText = songs[index];
    progress.style.width = "0";
}

function pauseMusic() {
    titleContainer.classList.remove("spin-title");
    playAndPauseBt.src = "img/play-button-svgrepo-com.svg";
    audio.pause();
    playAndPauseBt.classList.remove("play");
}

function playMusic() {
    titleContainer.classList.add("spin-title");
    playAndPauseBt.src = "img/pause-svgrepo-com.svg";
    audio.play();
    playAndPauseBt.classList.add("play");
}
loadSong(index);

playAndPauseBt.addEventListener("click", () => {
    if (playAndPauseBt.classList.contains("play")) {
        pauseMusic();
    } else {
        playMusic();
    }
});

function prevSong() {
    if (index === 0) {
        index = songs.length - 1;
        loadSong(index);
        playMusic();
    } else {
        index--;
        loadSong(index);
        playMusic();
    }
}

function nextSong() {
    if (index === songs.length - 1) {
        index = 0;
        loadSong(index);
        playMusic();
    } else {
        index++;
        loadSong(index);
        playMusic();
    }
}

prevBt.addEventListener("click", prevSong);

nextBt.addEventListener("click", nextSong);

function updateProgress(e) {
    const { duration, currentTime } = this;
    const progressProcent = (currentTime / duration) * 100;
    progress.style.width = `${progressProcent}%`;
}

audio.addEventListener("timeupdate", updateProgress);

function rewindSong(e) {
    const widthCont = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audio;
    audio.currentTime = (clickX / widthCont) * duration;
}

progressContainer.addEventListener("click", rewindSong);

audio.addEventListener("ended", nextSong);

function updateVolume(e) {
    const heightCont = volumeCont.clientHeight;
    const clickY = e.offsetY;
    volumeBar.style.height = `${(clickY * 100) / heightCont}%`;
    audio.volume = (clickY * 0.5) / heightCont;
}

volumeCont.addEventListener("click", (e) => {
    updateVolume(e);
    localStorage.setItem("volume", audio.volume);
    localStorage.setItem("height", volumeBar.style.height);
});
