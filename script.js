const songs = [

{title:"Song 1", artist:"Artist 1", cover:"images/song1.jpg", src:"songs/song1.mp3"},
{title:"Song 2", artist:"Artist 2", cover:"images/song2.jpg", src:"songs/song2.mp3"},
{title:"Song 3", artist:"Artist 3", cover:"images/song3.jpg", src:"songs/song3.mp3"},
{title:"Song 4", artist:"Artist 4", cover:"images/song4.jpg", src:"songs/song4.mp3"},
{title:"Song 5", artist:"Artist 5", cover:"images/song5.jpg", src:"songs/song5.mp3"},
{title:"Song 6", artist:"Artist 6", cover:"images/song6.jpg", src:"songs/song6.mp3"},
{title:"Song 7", artist:"Artist 7", cover:"images/song7.jpg", src:"songs/song7.mp3"},
{title:"Song 8", artist:"Artist 8", cover:"images/song8.jpg", src:"songs/song8.mp3"},
{title:"Song 9", artist:"Artist 9", cover:"images/song9.jpg", src:"songs/song9.mp3"},
{title:"Song 10", artist:"Artist 10", cover:"images/song10.jpg", src:"songs/song10.mp3"}
]

const audio = document.getElementById("audio")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")

const shuffleBtn = document.getElementById("shuffle")
const repeatBtn = document.getElementById("repeat")

const title = document.getElementById("title")
const artist = document.getElementById("artist")
const cover = document.getElementById("cover-img")
const bg = document.getElementById("bg")

const playlist = document.getElementById("playlist")

const progress = document.getElementById("progress")
const volume = document.getElementById("volume")

let currentSong = 0
let playing = false
let shuffle = false
let repeat = false

function loadSong(index){

const song = songs[index]

title.textContent = song.title
artist.textContent = song.artist
cover.src = song.cover
audio.src = song.src

bg.style.backgroundImage = `url(${song.cover})`
highlightSong()
}

function playSong(){
audio.play()
playBtn.textContent="⏸"
playing=true
}

function pauseSong(){
audio.pause()
playBtn.textContent="▶"
playing=false
}

playBtn.onclick=()=>{
playing ? pauseSong() : playSong()
}

nextBtn.onclick=()=>{

if(shuffle){
currentSong = Math.floor(Math.random()*songs.length)
}else{
currentSong++
if(currentSong >= songs.length) currentSong=0
}

loadSong(currentSong)
playSong()
}

prevBtn.onclick=()=>{
currentSong--

if(currentSong < 0)
currentSong=songs.length-1

loadSong(currentSong)
playSong()
}

/* PROGRESS */
audio.addEventListener("timeupdate",()=>{

progress.value = (audio.currentTime / audio.duration)*100 || 0
})

progress.oninput=()=>{
audio.currentTime = (progress.value/100)*audio.duration
}

/* VOLUME */
volume.oninput=()=>{
audio.volume = volume.value
}

/* SHUFFLE */
shuffleBtn.onclick=()=>{
shuffle=!shuffle
shuffleBtn.style.color = shuffle ? "cyan":"white"
}

/* REPEAT */
repeatBtn.onclick=()=>{
repeat=!repeat
repeatBtn.style.color = repeat ? "cyan":"white"
}

/* AUTO NEXT */
audio.addEventListener("ended",()=>{
if(repeat){
playSong()
return
}

nextBtn.click()
})

/* KEYBOARD CONTROLS */
document.addEventListener("keydown",(e)=>{
if(e.code==="Space"){
e.preventDefault()
playing ? pauseSong() : playSong()
}

if(e.code==="ArrowRight") nextBtn.click()
if(e.code==="ArrowLeft") prevBtn.click()
})

/* PLAYLIST */
songs.forEach((song,index)=>{
const div=document.createElement("div")
div.classList.add("song")

div.innerHTML=`<img src="${song.cover}">`

div.onclick=()=>{

currentSong=index
loadSong(index)
playSong()
}

playlist.appendChild(div)
})

function highlightSong(){
document.querySelectorAll(".song").forEach((s,i)=>{
s.classList.toggle("active", i===currentSong)
})
}

loadSong(currentSong)
