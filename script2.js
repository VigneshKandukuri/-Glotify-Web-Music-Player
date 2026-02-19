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
    {songName: "Tum Se Hi", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489740/21_lokedi.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489318/21_djua5o.jpg"},
    {songName: " Tere Hone Laga Hoon  ", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489800/22_nlpbtu.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489312/22_afcpwz.jpg"},
    {songName: "Pehli Nazar Mein", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489785/23_y7wxph.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489312/23_muyg1d.jpg"},
    {songName: "Tere Bina", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489743/24_y1gydq.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489312/24_qyylc3.jpg"},
    {songName: "O Re Piya", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489749/25_dtjuls.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489314/25_fclhyy.jpg"},
    {songName: "Main Agar Kahoon", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489757/26_zr5tie.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489313/26_pqyaw5.jpg"},
    {songName: "Teri Ore", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489760/27_ogxevr.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489313/27_rpjlhy.jpg"},
    {songName: "Tum Tak", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489765/28_twjjsa.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489314/28_thyhvl.jpg"},
    {songName: "Ishq Bulaava", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489771/29_i7bhst.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489314/29_bwruh9.jpg"},
    {songName: "Pee Loon", filePath: "https://res.cloudinary.com/dzkvuk2ha/video/upload/v1771489778/30_tlsufi.mp3", coverPath: "https://res.cloudinary.com/dzkvuk2ha/image/upload/v1771489314/30_i7zbpw.jpg"},
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





