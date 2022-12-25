import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const STOR_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(e) {
  localStorage.setItem(STOR_KEY, JSON.stringify(e.seconds));
}

player.setCurrentTime(localStorage.getItem(STOR_KEY)).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      console.log('Wrong time!');
      break;

    default:
      console.log('Error!');
      break;
  }
});
