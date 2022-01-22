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
    //listen for the ended event
    APP.audio.addEventListener('ended', APP.ended);
    APP.loadTrack(APP.currentTrack, true);
  },
  loadTrack: (current, wait) => {
    let track = TRACKS[current];
    APP.audio.src = track.src;
    let img = APP.player.querySelector('img');
    img.src = track.thumb;
    img.alt = track.title;
    let title = APP.player.querySelector('.visual h2');
    title.textContent = track.title;
    console.log('loadTrack - play');
    if (!wait) APP.play();
  },
  selectTrack: (ev) => {
    //user clicks on an item in the playlist
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
        APP.prev();
        break;
      case 'replay':
        APP.replay();
        break;
      case 'play-pause':
        APP.play();
        break;
      case 'stop':
        APP.stop();
        break;
      case 'forward':
        APP.forward();
        break;
      case 'next':
        APP.next();
        break;
      default:
    }
  },
  play: (ev) => {
    if (ev) ev.preventDefault();
    let icon = document.querySelector('.play-pause .material-icons');
    if (APP.audio.paused || APP.audio.ended) {
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
    APP.audio.pause();
    APP.audio.currentTime = 0;
    APP.player.classList.remove('active');
    let icon = document.querySelector('.play-pause .material-icons');
    icon.textContent = 'play_circle';
  },
  next: () => {
    APP.currentTrack++;
    if (APP.currentTrack >= TRACKS.length) APP.currentTrack = 0;
    APP.loadTrack(APP.currentTrack);
  },
  prev: () => {
    APP.currentTrack--;
    if (APP.currentTrack < 0) APP.currentTrack = TRACKS.length - 1;
    APP.loadTrack(APP.currentTrack);
  },
  forward: () => {
    let time = APP.audio.currentTime;
    time += 30;
    if (time > APP.audio.duration) {
      APP.audio.pause();
      APP.next();
    } else {
      APP.audio.currentTime = time;
    }
  },
  replay: () => {
    let time = APP.audio.currentTime;
    time -= 10;
    if (time < 0) time = 0;
    APP.audio.currentTime = time;
  },
  ended: (ev) => {
    //track has ended
    APP.next();
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
