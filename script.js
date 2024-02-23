const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');

const focusMusicInput = document.querySelector('#alternar-musica');
const music = new Audio('./sons/luna-rise-part-one.mp3');
music.loop = true;

const startPauseBt = document.querySelector('#start-pause');
const startPauseLabelBt = document.querySelector('#start-pause span');
const startPauseIconBt = document.querySelector('.app__card-primary-butto-icon');

const timer = document.querySelector('#timer');

const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioTimeOver = new Audio('./sons/beep.mp3');

let timeInSeconds = 1500;
let intervalId = null;

focusMusicInput.addEventListener('change', () => {
    if(music.paused)
        music.play();
    else
        music.pause();
});

focoBt.addEventListener('click', () => {
    timeInSeconds = 1500;
    changeContext('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    timeInSeconds = 300;
    changeContext('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    timeInSeconds = 900;
    changeContext('descanso-longo');
    longoBt.classList.add('active');
});

function changeContext(context) {
    showTimer();
    
    buttons.forEach(function(context) {
        context.classList.remove('active');
    });

    html.setAttribute('data-contexto', context);
    banner.setAttribute('src', `./imagens/${context}.png`);

    switch(context) {
        case 'foco':
            title.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>';
            break;
        case 'descanso-curto':
            title.innerHTML = 'Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>';
            break;
        case 'descanso-longo':
            title.innerHTML = 'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>';
            break;
        default:
            break;
    }
}

const countdown = () => {
    if(timeInSeconds <= 0) {
        audioTimeOver.play();
        alert('Time is over');
        reset();
        return;
    }
    timeInSeconds -= 1;
    showTimer()
}

startPauseBt.addEventListener('click', startPause);

function startPause() {
    if(intervalId) {
        audioPause.play();
        reset();
        return;
    }
    audioPlay.play();
    intervalId = setInterval(countdown, 1000);
    startPauseLabelBt.textContent = "Pausar";
    startPauseIconBt.setAttribute('src', './imagens/pause.png');
}

function reset() {
    clearInterval(intervalId);
    startPauseLabelBt.textContent = "Começar";
    startPauseIconBt.setAttribute('src', './imagens/play_arrow.png');
    intervalId = null;
}

function showTimer() {
    const time = new Date(timeInSeconds * 1000);
    const formattedTime = time.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${formattedTime}`;
}

showTimer();