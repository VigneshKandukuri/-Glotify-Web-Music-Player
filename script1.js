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
    {songName: "Neele Neele Ambar Par - Male Version", filePath: "songs/11.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489315/11_i5bzne.jpg"},
    {songName: "Pal Pal Dil Ke Paas", filePath: "songs/12.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489314/12_tycl2j.jpg"},
    {songName: "Yeh Raaten Yeh Mausam", filePath: "songs/13.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489314/13_njorv2.jpg"},
    {songName: "Samne Yeh Kaun Aaya", filePath: "songs/14.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489315/14_enivs7.jpg"},
    {songName: "Abhi Na Jao Chhod Kar", filePath: "songs/15.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489316/15_r7ioqt.jpg"},
    {songName: "Itna Na Mujhse Tu Pyar Badha", filePath: "songs/16.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489317/16_tagc8l.jpg"},
    {songName: "Dekha Ek Khwab", filePath: "songs/17.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489317/17_tc8okc.jpg"},
    {songName: "Ham Tere Pyar Mein", filePath: "songs/18.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489317/18_a38sfh.png"},
    {songName: "Main Koi Aisa Geet Gaoon", filePath: "songs/19.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489318/19_lrrqpf.jpg"},
    {songName: "Aa Chal Ke Tujhe", filePath: "songs/20.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489318/20_xkhopb.png"},
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



