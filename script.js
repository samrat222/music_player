const image = document.querySelector('img')
const title = document.getElementById('title')
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// if playing
let isPlaying = false;

// Musics  ***REMEINDER --- Song name and image name showld ba same ***
const songs = [
    {
        name: "Alakananda",
        displayName: "Alakananda",
        artist: "Shankuraj Konwar",
    },
    {
        name: "Bozropat",
        displayName: "Bozropat",
        artist: "Shankuraj konwar remix",
    },
    {
        name: "Khiriki",
        displayName: "Khiriki",
        artist: "Shankuraj konwar",
    },
    {
        name: "Tere ishq mein",
        displayName: "Tere ishq mein",
        artist: "Raghav chaitanya"
    },
    {
        name: "motoliya 2.0",
        displayName: "motoliya 2.0",
        artist: "Shannidhya bhuyan"
    }

]

// play 
function playSong () {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'pause')
    music.play();
}

// pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'play')
    music.pause();
}

// Play or pause eventlistner
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(songs) {
    title.textContent = songs.displayName;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`
    image.src = `img/${songs.name}.png`
}

// Current song
let songIndex = 0;

// Previous song
function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex])
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex])
    playSong();
}

// On load - Select First Song
loadSong(songs[songIndex])

// UpdateProgressBar and Time
updateProgressBar = (e) => {
    if(isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`
        // Calculate display for the duration
        const durationMinutes = Math.floor(duration / 60);
        // console.log('minutes' , durationMinutes);
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // console.log('seconds' ,durationSeconds)
        // Delay switching duration to avoid Nan
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
    // Calculate display for the duration
    const currentMinutes = Math.floor(currentTime / 60);
    // console.log('minutes' , currentMinutes);
    let currentSeconds = Math.floor(currentTime % 60)
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    // console.log('seconds' ,currentSeconds)
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set ProgressBar
function setProgressBar (e) {
    // console.log(e);
    const width = this.clientWidth;
    // console.log('width', width)
    const clickX = e.offsetX;
    // console.log('clickX', clickX);
    const {duration} = music;
    // console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

// Event listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar)
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar)