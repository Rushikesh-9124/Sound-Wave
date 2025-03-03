

const songs = [
    { id: '1', songName: 'Tum Hi Ho <br><div class="subtitle">Arjit Singh</div>', poster: "img/arjit/1.jpg" },
    { id: '2', songName: 'Samjhawan <br><div class="subtitle">Arjit Singh</div>', poster: "img/arjit/2.jpg" },
    { id: "3", songName: 'Desh Mere <br><div class="subtitle">Arjit Singh</div>', poster: "img/arjit/3.jpg" },
    { id: "4", songName: 'Dhokha <br><div class="subtitle">Arjit Singh</div>', poster: "img/arjit/4.jpg" },
    { id: "5", songName: 'Tera Yaar Hoon Main <br><div class="subtitle">Arjit Singh</div>', poster: "img/arjit/5.jpg" },
    { id: "6", songName: 'Jeena Jeena <br><div class="subtitle">Arjit Singh</div>', poster: "img/arjit/6.jpg" },
    { id: "7", songName: 'Galti Se Mistake <br><div class="subtitle">Arjit Singh</div>', poster: "img/arjit/7.jpg" },
    { id: "8", songName: `Hamari Adhuri Kahani <br><div class="subtitle">Arjit Singh</div>`, poster: "img/arjit/8.jpg" },
    { id: "9", songName: `Neki Ki Raah <br><div class="subtitle">Arjit Singh</div>`, poster: "img/arjit/9.jpg" },
    { id: "10", songName: `Humdard <br><div class="subtitle">Arjit Singh</div>`, poster: "img/arjit/10.jpg" },
    { id: "11", songName: `Mere Yaara Di <br><div class="subtitle">Arjit Singh</div>`, poster: "img/arjit/11.jpg" },
    { id: "12", songName: `Nashe Si Chadh Gayi <br><div class="subtitle">Arjit Singh</div>`, poster: "img/arjit/12.jpg" },
    { id: "13", songName: `Raazi Title-Track <br><div class="subtitle">Arjit Singh</div>`, poster: "img/arjit/13.jpg" },
    { id: "14", songName: `Agar Tum Sath Hoo <br><div class="subtitle">Arjit Singh</div>`, poster: "img/arjit/14.jpg" },
    { id: "15", songName: `Pachtaoge <br><div class="subtitle">Arjit Singh</div>`, poster: "img/arjit/15.jpg" },
];
// console.log(songs);
const music = new Audio('./audio/arjit/2.mp3');
//music.play();

Array.from(document.getElementsByClassName('mySong')).forEach((e, i)=>{
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let wave = document.getElementById('wave');
let masterPlay = document.getElementById('master_play');
masterPlay.addEventListener("click", () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play');
        masterPlay.classList.add('bi-pause');
        

    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play');
        masterPlay.classList.remove('bi-pause');
    }
})

let pop_song_left = document.getElementById("pop_song_left");
let pop_song_right = document.getElementById("pop_song_right");
let pop_song = document.getElementsByClassName("pop_song")[0];
pop_song_right.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
})
pop_song_left.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
})


let pop_artist_left = document.getElementById("pop_artist_left");
let pop_artist_right = document.getElementById("pop_artist_right");
let pop_artist = document.getElementsByClassName("pop_artist")[0];
pop_artist_right.addEventListener('click', () => {
    pop_artist.scrollLeft += 330;
})
pop_artist_left.addEventListener('click', () => {
    pop_artist.scrollLeft -= 330;
})

const makeAllBackground = () =>{ Array.from(document.getElementsByClassName('songItem')).forEach((e) => {
    Array.from(document.getElementsByClassName('songItem')).forEach( (el) => {
        el.style.background = 'rgb(105,105,105,.0';
    })
})
}
const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('playMyList')).forEach((el) => {
        el.classList.remove('bi-pause-circle');
        el.classList.add('bi-play-circle');
    });
};


let idx = 0;
let poster_master_play = document.getElementById('poster_master_play');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playMyList')).forEach((e) => {
    e.addEventListener('click', (element) => {
        idx = element.target.id;
        music.src = `./audio/arjit/${idx}.mp3`;
        poster_master_play.src =`/img/arjit/${idx}.jpg`
        title.innerHTML = ``
        music.play();
        masterPlay.classList.remove('bi-play');
        masterPlay.classList.add('bi-pause');

        download_music.href = `../audio/arjit/${idx}.mp3`

        let songTitle = songs.filter((element) => {
            return element.id == idx;
        });

        songTitle.forEach((el) => {
            let {songName} = el;
            title.innerHTML = songName
            download_music.setAttribute('download', songName)
        })
        wave.classList.add('active1');

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[idx-1].style.background = 'rgba(105, 105, 105, 0.308)';

        makeAllPlay(); 

        let selectedElement = document.getElementById(idx);
        if (selectedElement) {
            selectedElement.classList.remove('bi-play-circle');
            selectedElement.classList.add('bi-pause-circle');
        }
    })
})




let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');

let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener('timeupdate', () => {
    let music_curr = Math.floor(music.currentTime);
    let music_dur = Math.floor(music.duration);

    let min = Math.floor(music_curr / 60);
    let sec = music_curr % 60;

    let min2 = Math.floor(music_dur / 60);
    let sec2 = music_dur % 60;

    currentStart.innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    currentEnd.innerText = `${min2}:${sec2 < 10 ? '0' : ''}${sec2}`;

    let progressBar = (music.currentTime / music.duration) * 100;
    seek.value = progressBar;
    bar2.style.width = `${progressBar}%`;
    dot.style.left = `${progressBar}%`;
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * (music.duration ) /100;
})

let volume_icon = document.getElementById('volume_icon');
let volume = document.getElementById('volume');
let volume_bar = document.getElementById('volume_bar');
let volume_dot = document.getElementById('volume_dot');

volume.addEventListener("input", () => {
    let vol = volume.value;
    if(volume.value == 0){
        volume_icon.classList.remove('bi-volume-up-fill');
        volume_icon.classList.remove('bi-volume-down-fill');

        volume_icon.classList.add('bi-volume-off-fill');
    }
    else if(volume.value > 0 && volume.value < 60){
        volume_icon.classList.remove('bi-volume-up-fill');
        volume_icon.classList.remove('bi-volume-off-fill');

        volume_icon.classList.add('bi-volume-down-fill');
    }
    else{
        volume_icon.classList.remove('bi-volume-down-fill');
        volume_icon.classList.remove('bi-volume-off-fill');

        volume_icon.classList.add('bi-volume-up-fill');
    }

    volume_bar.style.width = `${vol}%`;
    volume_dot.style.left = `${vol}%`;
    music.volume = vol/100;


    
})


let back = document.getElementById("back");
let next = document.getElementById("next");

idx = Array.from(document.getElementsByClassName('songItem')).length;
console.log(idx);

back.addEventListener("click", () => {
    idx -= 1;
    if(idx < 1){
        idx = 20; // total songs is 20..
    }
    music.src = `./audio/arjit/${idx}.mp3`;
        poster_master_play.src =`/img/arjit/${idx}.jpg`
        title.innerHTML = ``
        music.play();

        let songTitle = songs.filter((element) => {
            return element.id == idx;
        });

        songTitle.forEach((el) => {
            let {songName} = el;
            title.innerHTML = songName
        })
        wave.classList.add('active1');

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[idx-1].style.background = 'rgba(105, 105, 105, 0.308)';

        makeAllPlay(); 

        let selectedElement = document.getElementById(idx);
        if (selectedElement) {
            selectedElement.classList.remove('bi-play-circle');
            selectedElement.classList.add('bi-pause-circle');
        }
})

next.addEventListener("click", () => {
    idx ++;
    if(idx > 20){
        idx = 1;
    }
    music.src = `./audio/arjit/${idx}.mp3`;
    poster_master_play.src =`/img/arjit/${idx}.jpg`
    title.innerHTML = ``
    music.play();

    let songTitle = songs.filter((element) => {
        return element.id == idx;
    });

    songTitle.forEach((el) => {
        let {songName} = el;
        title.innerHTML = songName
    })
    wave.classList.add('active1');

    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[idx-1].style.background = 'rgba(105, 105, 105, 0.308)';

    makeAllPlay(); 

    let selectedElement = document.getElementById(idx);
    if (selectedElement) {
        selectedElement.classList.remove('bi-play-circle');
        selectedElement.classList.add('bi-pause-circle');
    }
})


let shuffle = document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click', () => {
    let a = shuffle.innerHTML;
    switch (a ){
        case "next":
            shuffle.classList.remove('bi-music-note');
            shuffle.classList.remove('bi-shuffle');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.innerHTML = "repeat"
            break;
    
        case "repeat":
            shuffle.classList.remove('bi-music-note');
            shuffle.classList.add('bi-shuffle');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.innerHTML = "random"
            break;
        
        case "random":
            shuffle.classList.remove('bi-music-note');
            shuffle.classList.remove('bi-shuffle');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.innerHTML = "next"
            break;
    }
});

music.addEventListener('ended', () => {
    if(shuffle.innerHTML == 'next'){
        if(idx >= 20){
            idx = 1;
        }
        else{
            idx++;
        }
        music.src = `./audio/arjit/${idx}.mp3`;
        poster_master_play.src =`/img/arjit/${idx}.jpg`
        title.innerHTML = ``
        music.play();
        masterPlay.classList.remove('bi-play');
        masterPlay.classList.add('bi-pause');

        download_music.href = `../audio/arjit/${idx}.mp3`

        let songTitle = songs.filter((element) => {
            return element.id == idx;
        });

        songTitle.forEach((el) => {
            let {songName} = el;
            title.innerHTML = songName
            download_music.setAttribute('download', songName)
        })
        wave.classList.add('active1');

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[idx-1].style.background = 'rgba(105, 105, 105, 0.308)';

        makeAllPlay(); 

        let selectedElement = document.getElementById(idx);
        if (selectedElement) {
            selectedElement.classList.remove('bi-play-circle');
            selectedElement.classList.add('bi-pause-circle');
        }
    }

    if(shuffle.innerHTML == 'repeat'){
        // let randomSong = Math.floor(Math.random()*(20));
        idx = idx;
        music.src = `./audio/arjit/${idx}.mp3`;
        poster_master_play.src =`/img/arjit/${idx}.jpg`
        title.innerHTML = ``
        music.play();
        masterPlay.classList.remove('bi-play');
        masterPlay.classList.add('bi-pause');

        download_music.href = `../audio/arjit/${idx}.mp3`

        let songTitle = songs.filter((element) => {
            return element.id == idx;
        });

        songTitle.forEach((el) => {
            let {songName} = el;
            title.innerHTML = songName
            download_music.setAttribute('download', songName)
        })
        wave.classList.add('active1');

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[idx-1].style.background = 'rgba(105, 105, 105, 0.308)';

        makeAllPlay(); 

        let selectedElement = document.getElementById(idx);
        if (selectedElement) {
            selectedElement.classList.remove('bi-play-circle');
            selectedElement.classList.add('bi-pause-circle');
        }
    }
    if(shuffle.innerHTML == 'random'){
        let randomNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        idx = randomNum;
        music.src = `./audio/arjit/${idx}.mp3`;
        poster_master_play.src =`/img/arjit/${idx}.jpg`
        title.innerHTML = ``
        music.play();
        masterPlay.classList.remove('bi-play');
        masterPlay.classList.add('bi-pause');

        download_music.href = `../audio/arjit/${idx}.mp3`

        let songTitle = songs.filter((element) => {
            return element.id == idx;
        });

        songTitle.forEach((el) => {
            let {songName} = el;
            title.innerHTML = songName
            download_music.setAttribute('download', songName)
        })
        wave.classList.add('active1');

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[idx-1].style.background = 'rgba(105, 105, 105, 0.308)';

        makeAllPlay(); 

        let selectedElement = document.getElementById(idx);
        if (selectedElement) {
            selectedElement.classList.remove('bi-play-circle');
            selectedElement.classList.add('bi-pause-circle');
        }
    }
})



let playSamjawan = document.getElementById('play-samjawan');

playSamjawan.addEventListener('click', ()=> {
    music.play();
    masterPlay.classList.remove('bi-play');
    masterPlay.classList.add('bi-pause');


    wave.classList.add('active1');
})

let search_results = document.getElementsByClassName('search_results')[0];

songs.forEach(element => {
    const { id, songName, poster } = element;

    let card = document.createElement('a');
    card.classList.add('card');
    card.href = '#' + id;
    card.innerHTML = `
        <img src="${poster}" alt="">
        <div class="content">
            ${songName}
        </div>`;

    search_results.appendChild(card);
});

let input = document.getElementById('search_song'); // Fixed here
input.addEventListener('keyup', () => {
    let input_value = input.value.toUpperCase();
    let items = search_results.getElementsByTagName('a');
    
    for (let index = 0; index < items.length; index++) {
        let as = items[index].getElementsByClassName('content')[0];
        let text_value = as.textContent || as.innerHTML;

        if (text_value.toUpperCase().indexOf(input_value) > -1) {
            items[index].style.display = 'flex';
        } else {
            items[index].style.display = 'none';
        }

        if(input.value == 0){
            search_results.style.display = 'none';
        }
        else{
            search_results.style.display = '';
        }
    }

    search_results.addEventListener("click", (event) => {
        let item = event.target.closest("a");
        if (!item) return; // If not clicking on an <a>, exit
    
        event.preventDefault(); // Prevent default anchor behavior
    
        let targetId = item.getAttribute("href").substring(1); 
        
        music.src = `./audio/arjit/${targetId}.mp3`;
        poster_master_play.src =`/img/arjit/${targetId}.jpg`
        title.innerHTML = ``
        music.play();
        masterPlay.classList.remove('bi-play');
        masterPlay.classList.add('bi-pause');

        download_music.href = `../audio/arjit/${targetId}.mp3`

        let songTitle = songs.filter((element) => {
            return element.id == targetId;
        });

        songTitle.forEach((el) => {
            let {songName} = el;
            title.innerHTML = songName
            download_music.setAttribute('download', songName)
        })
        wave.classList.add('active1');

        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[targetId-1].style.background = 'rgba(105, 105, 105, 0.308)';

        makeAllPlay(); 

        let selectedElement = document.getElementById(targetId);
        if (selectedElement) {
            selectedElement.classList.remove('bi-play-circle');
            selectedElement.classList.add('bi-pause-circle');
        }

    });
    
    
});