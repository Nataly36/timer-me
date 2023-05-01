// import '../css/stile.css';

const refs = {
    startBtn:document.querySelector('button[data-action-start]'),
    stopBtn:document.querySelector('button[data-action-stop]'),
    clockface:document.querySelector('.js-clockface')
};
// let isActive = false;

class Timer {
    constructor({ onTick }) {
        this.intervalID = null;
        this.isActive = false;
        this.onTick = onTick;
        // this.init();
    }
    // init() {
    //   const time = this.getTimeComponents(0);
    //     this.onTick(0);  
    // }
     start() {
        if (this.isActive) {
            return;
            }

        const startTime = Date.now();
        this.isActive = true;
        this.intervalID = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;
            const time = this.getTimeComponents(deltaTime);
            this.onTick(time);
            
            }, 1000);
    }
        getTimeComponents(time) {
            const hours =this.pad(Math.floor((time % (100 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            const mins =this.pad(Math.floor((time % (100 * 60 * 60)) / (1000 * 60)));
            const secs = this.pad(Math.floor((time % (100 * 60)) / 1000));
           
            return { hours, mins, secs };
    }
         pad(value) {
            return String(value).padStart(2, '0');
}

    stop(){
        clearInterval(this.intervalID);
        this.isActive = false;
        const time = this.getTimeComponents(0);
        this.onTick(0);
}
};

const timer = new Timer({
    onTick: updateClockface
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));

refs.stopBtn.addEventListener('click', timer.stop.bind(timer));




function updateClockface({ hours, mins, secs }) {
    refs.clockface.textContent = `${hours}:${mins}:${secs}`;
};

