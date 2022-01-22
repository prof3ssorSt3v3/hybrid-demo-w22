import TRACKS from './tracks.js';

const APP = {
  currentTrack: 0,
  audio: null,
  player: null,
  init: () => {
    //onload
    APP.audio = document.getElementById('audio');
    APP.audio.volume = 0.5;
    APP.player = document.querySelector('.player');
    document
      .querySelector('.controls')
      .addEventListener('click', APP.processClick);
    APP.buildList();
    APP.loadTrack(APP.currentTrack);
  },
  buildList: () => {
    let list = document.querySelector('.list-area ul');
    list.innerHTML = TRACKS.map((item) => {
      return `<li class="listitem" data-ref="${item.src}">
            <img src="${item.thumb}" alt="${item.title}" class="thumb" />
            <h3 class="artist-name">${item.artist}</h3>
            <h4 class="track-name">${item.title}</h4>
          </li>`;
    }).join('');
    list.addEventListener('click', APP.selectTrack);
  },
  loadTrack: (current) => {
    let track = TRACKS[current];
    APP.audio.src = track.src;
    let img = APP.player.querySelector('img');
    img.src = track.thumb;
    img.alt = track.title;
    let title = APP.player.querySelector('.visual h2');
    title.textContent = track.title;
    console.log('loadTrack - play');
    APP.play();
  },
  selectTrack: (ev) => {
    try {
      APP.player.classList.remove('active');
      // APP.audio.pause();
    } catch (err) {
      //
    }
    let li = ev.target.closest('.listitem');
    let ref = li.getAttribute('data-ref');
    let index = TRACKS.findIndex((track) => track.src === ref);
    APP.currentTrack = index;
    console.log('selected track', index);
    APP.loadTrack(index);
  },
  processClick: (ev) => {
    let btn = ev.target.closest('.btn');
    let name = btn.className.replace('btn ', '');
    switch (name) {
      case 'prev':
        break;
      case 'replay':
        break;
      case 'play-pause':
        APP.play();
        break;
      case 'stop':
        APP.stop();
        break;
      case 'forward':
        break;
      case 'next':
        break;
      default:
    }
  },
  play: (ev) => {
    if (ev) ev.preventDefault();
    let icon = document.querySelector('.play-pause .material-icons');
    if (APP.audio.paused) {
      console.log(`start playing`);
      APP.player.classList.add('active');
      APP.audio.play();
      icon.textContent = 'pause_circle';
    } else {
      console.log(`pause`);
      APP.player.classList.remove('active');
      APP.audio.pause();
      icon.textContent = 'play_circle';
    }
  },
  stop: () => {
    APP.player.classList.remove('active');
    APP.audio.pause();
    APP.audio.currentTime = 0;
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
