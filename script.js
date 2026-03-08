const songs = [

{
title:"We Are Going To Be Ok",
artist:"No Spirit",
cover:"images/song1.jpg",
src:"songs/song1.mp3"
},

{
title:"Another Night",
artist:"Jhove",
cover:"images/song2.jpg",
src:"songs/song2.mp3"
},

{
title:"Sky Dreams",
artist:"No Spirit",
cover:"images/song3.jpg",
src:"songs/song3.mp3"
}
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

/* LOAD SONG */
function loadSong(index){
const song = songs[index]
title.textContent = song.title
artist.textContent = song.artist
cover.src = song.cover
audio.src = song.src

bg.style.backgroundImage = `url(${song.cover})`
highlightSong()
}

/* PLAY */
function playSong(){
audio.play()
playBtn.textContent="⏸"
playing=true
}

/* PAUSE */
function pauseSong(){
audio.pause()
playBtn.textContent="▶"
playing=false
}

/* PLAY BUTTON */
playBtn.onclick=()=>{
playing ? pauseSong() : playSong()
}

/* NEXT */
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

/* PREVIOUS */
prevBtn.onclick=()=>{
currentSong--
if(currentSong < 0)
currentSong=songs.length-1
loadSong(currentSong)
playSong()
}

/* PROGRESS BAR */
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