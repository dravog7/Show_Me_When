function get_file_name(path) {
    path = decodeURI(path)
    file = path.substr(path.lastIndexOf('/')+1)
    return file.substring(0,file.lastIndexOf('.'))
}

function drag(event){
    let target = event.target
    let audio = target.children[0];
    let song = get_file_name(audio.src)
    let time = audio.currentTime
    event.dataTransfer.setData("song", song);
    event.dataTransfer.setData("time",time);
}

function allowDrop(event){
    event.preventDefault()
}

function drop(event){
    event.preventDefault();
    let song = event.dataTransfer.getData("song");
    let time = event.dataTransfer.getData("time");
    event.target.innerText = song;
    checkFinish(song, time)
}

SONG_HASH = "091a6d995a112694cf3e2ef40f02be4e82011a30b5c432f0f24bb99d669dc9df"

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);                    
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));                 
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}

async function checkFinish(song, time){
    if((await sha256(song) == SONG_HASH)&&(time>58)&&(time<61))
        showNext()
}

function showNext(){
    
    overlay = document.getElementsByClassName("overlay")[0]
    overlay.style.display = "block"
}

function closeOverlay(event){
    event.target.style.display = "none"
}