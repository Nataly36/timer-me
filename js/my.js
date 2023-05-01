// import '../css/stile.css';

const refs = {
    startBtn:document.querySelector('button[data-action-start]'),
    stopBtn:document.querySelector('button[data-action-stop]'),
    clockface:document.querySelector('.js-clockface')
};

const timer = {
    intervalID: null,
    isActive: false,
    start() {
        if(isActive){
            return;
        }

        const startTime = Date.now();
        this.isActive = true;
        this.intervalID = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;
            const time = getTimeCmponents(deltaTime);
            updateClockface(time);
        }, 1000);
    },

    stop() {
        clearInterval(this.intervalID);
        this.isActive = false;
    },
};

refs.startBtn.addEventListener('click', () => {
    timer.start();
});

refs.stopBtn.addEventListener('click', () => {
    timer.stop();
});

function pad(value) {
    return String(value).padStart(2, '0');
}


function updateClockface({ hours, mins, secs }) {
    refs.clockface.textContent = `${hours}:${mins}:${secs}`;
};

function getTimeComponents(time) {
    const hours = pad(Math.floor((time % (100 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (100 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (100 * 60)) / 1000));
    
    return { hours, mins, secs };
    
}