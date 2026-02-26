console.log("Welcome to Glotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Finding Her", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489805/31_vsivwp.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489315/31_o9nkrp.png"},
    {songName: "Iraaday", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489808/32_b3u25j.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489316/32_snxxkh.jpg"},
    {songName: "Kaise Ab Kahein", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489798/33_uqj3eg.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489316/33_ybfs9k.png"},
    {songName: "Ishq Hai", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489790/34_t3g8lj.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489316/34_kezacs.jpg"},
    {songName: "Dil Tu Jaan Tu", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489796/35_czwdvw.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489317/35_utfegq.jpg"},
    {songName: " Tum Ho Toh", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489796/36_j63guy.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489317/36_epxrf1.jpg"},
    {songName: "Apna Bana Le", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489806/37_csqirv.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489318/37_ytmsur.jpg"},
    {songName: "Dooron Dooron", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489806/38_b45hhu.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489318/38_lljgic.jpg"},
    {songName: "Zulfein", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489810/39_nwzlsn.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489318/39_bwys4c.jpg"},
    {songName: "Tainu Khabar Nahi", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489814/40_btove8.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489318/40_b7qfqy.jpg"},
];

// Initialize first song
audioElement.src = songs[0].filePath;
if (masterSongName) {
    masterSongName.innerText = songs[0].songName;
}

// Populate song items
songItems.forEach((element, i) => { 
    if (i < songs.length) {
        const img = element.getElementsByTagName("img")[0];
        const songName = element.getElementsByClassName("songName")[0];
        
        if (img) img.src = songs[i].coverPath;
        if (songName) songName.innerText = songs[i].songName;
    }
});

// Function to update UI state
const updateUIState = (isPlaying) => {
    if (masterPlay) {
        if (isPlaying) {
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        } else {
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    }
    
    if (gif) {
        gif.style.opacity = isPlaying ? 1 : 0;
    }
};

// Function to play specific song
const playSong = (index) => {
    if (index >= 0 && index < songs.length) {
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        if (masterSongName) {
            masterSongName.innerText = songs[songIndex].songName;
        }
        audioElement.currentTime = 0;
        audioElement.play();
        updateUIState(true);
        updateSongItemButtons();
    }
};

// Handle play/pause click
if (masterPlay) {
    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            updateUIState(true);
        } else {
            audioElement.pause();
            updateUIState(false);
        }
        updateSongItemButtons();
    });
}

// Listen to Events
audioElement.addEventListener('timeupdate', () => { 
    if (!isNaN(audioElement.duration) && audioElement.duration > 0) {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = progress || 0;
    }
});


// Handle progress bar changes
if (myProgressBar) {
    myProgressBar.addEventListener('change', () => {
        if (audioElement.duration) {
            audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
        }
    });
}

// Function to reset all play buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Function to update song item buttons
const updateSongItemButtons = () => {
    makeAllPlays();
    const currentSongButton = document.getElementById(songIndex.toString());
    if (currentSongButton && !audioElement.paused) {
        currentSongButton.classList.remove('fa-play-circle');
        currentSongButton.classList.add('fa-pause-circle');
    }
};

// Handle song item clicks
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => { 
        const clickedIndex = parseInt(e.target.id);
        
        if (clickedIndex === songIndex && !audioElement.paused) {
            // If current song is playing, pause it
            audioElement.pause();
            updateUIState(false);
            makeAllPlays();
        } else {
            // Play the clicked song
            playSong(clickedIndex);
        }
    });
});

// Handle next button
const nextButton = document.getElementById('next');
if (nextButton) {
    nextButton.addEventListener('click', () => {
        const nextIndex = songIndex >= songs.length - 1 ? 0 : songIndex + 1;
        playSong(nextIndex);
    });
}

// Handle previous button
const previousButton = document.getElementById('previous');
if (previousButton) {
    previousButton.addEventListener('click', () => {
        const prevIndex = songIndex <= 0 ? songs.length - 1 : songIndex - 1;
        playSong(prevIndex);
    });
}

// Handle audio events
audioElement.addEventListener('ended', () => {
    // Auto-play next song when current song ends
    const nextIndex = songIndex >= songs.length - 1 ? 0 : songIndex + 1;
    playSong(nextIndex);
});

audioElement.addEventListener('error', (e) => {
    console.error('Audio loading error:', e);
    updateUIState(false);
});

// Handle audio loading
audioElement.addEventListener('loadstart', () => {
    console.log('Loading song:', songs[songIndex].songName);
});const c1 = document.querySelector('.cursor-core');
const c2 = document.querySelector('.cursor-glow');

document.addEventListener('mousemove',(e)=>{
    c1.style.left = e.clientX+'px';
    c1.style.top = e.clientY+'px';
    c2.style.left = e.clientX+'px';
    c2.style.top = e.clientY+'px';
});
let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove',(e)=>{
    const x = (e.clientX/window.innerWidth - 0.5) * 20;
    const y = (e.clientY/window.innerHeight - 0.5) * 20;

    lastX = x;
    lastY = y;

    requestAnimationFrame(()=>{
        document.querySelector('.energy-layer').style.transform =
          `translate3d(${x}px,${y}px,0)`;
        document.querySelector('.music-breath').style.transform =
          `translate3d(${-x}px,${-y}px,0)`;
    });
});
window.addEventListener('resize',()=>{
    energyLayer.style.transform = `translate3d(0,0,0)`;
    musicBreath.style.transform = `translate3d(0,0,0)`;
});

// NAVBAR ACTIVE BUTTON FIX

const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach(button => {

    button.addEventListener("click", function () {

        // remove active from all buttons
        navButtons.forEach(btn => btn.classList.remove("active"));

        // add active to clicked button
        this.classList.add("active");

    });

});const navBtns = document.querySelectorAll(".nav-btn");

navBtns.forEach(btn => {

    const link = btn.querySelector("a");

    if(link.href === window.location.href){
        btn.classList.add("active");
    }

    btn.addEventListener("click", function(){

        navBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");

    });

});
document.addEventListener("DOMContentLoaded", function () {

    const currentPage = window.location.pathname.split("/").pop();

    const navButtons = document.querySelectorAll(".nav-btn");

    navButtons.forEach(button => {

        const link = button.querySelector("a").getAttribute("href");

        if(link === currentPage){
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }

    });

});
document.addEventListener("DOMContentLoaded", function () {

    const currentPage = location.href;

    document.querySelectorAll(".nav-btn a").forEach(link => {

        if(currentPage.includes(link.getAttribute("href"))){
            link.parentElement.classList.add("active");
        }

    });

});



