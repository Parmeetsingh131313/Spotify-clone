console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songsItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songname: "Feelinga", filePath: "songs/1.mp3", coverPath: "cover/1.jpg"},
    {songname: "Punjabi Kompa", filePath: "songs/2.mp3", coverPath: "cover/2.jpg"},
    {songname: "Medal", filePath: "song/3.mp3", coverPath: "cover/3.jpg"},
    {songname: "Tu Ru Ruu", filePath: "song/4.mp3", coverPath: "cover/4.jpg"},
    {songname: "Snowman", filePath: "song/5.mp3", coverPath: "cover/5.jpg"},
    {songname: "Often", filePath: "song/6.mp3", coverPath: "cover/6.jpg"},
    {songname: "Harleys In Hawaai", filePath: "song/7.mp3", coverPath: "cover/7.jpg"},
    {songname: "Unholy", filePath: "song/8.mp3", coverPath: "cover/8.jpg"},
    {songname: "No Idea", filePath: "song/9.mp3", coverPath: "cover/9.jpg"}
]

songsItems.forEach((element,i)=>{
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songname;
})

// audioElement.play();   

// handle play/pause click  
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// listen to events
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    // update seekbar
    progress = ((audioElement.currentTime / audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () =>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100);
})

// makeAllPlays function defined
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () =>{
    if(songIndex>9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () =>{
    if(songIndex<0){
        songIndex = 9;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

