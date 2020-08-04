// create web audio api context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const masterGain = audioCtx.createGain();

var isPlaying = false;

// Create Oscillator node
var osc1 = audioCtx.createOscillator();
osc1.type = 'sine';
osc1.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz

// Create Gain node
var gain1 = audioCtx.createGain();
// gainNode.gain.setValueAtTime(0, audioCtx.currentTime); // Start quiet

// Da hook up
osc1.connect(gain1).connect(masterGain).connect(audioCtx.destination);

osc1.start();
audioCtx.suspend();
isPlaying = true;

function stopTone() {
    gain1 ? gain1.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.04) : console.log("durr") // do nothin
    isPlaying = false;
}

const volumeControl = document.querySelector('#volume');
volumeControl.addEventListener('input', function () {
    masterGain.gain.value = this.value;
}, false);

const playToggle = document.getElementById("playToggle");
playToggle.addEventListener("click", () => {
    if (audioCtx.state === "running") {
        audioCtx.suspend();
        volumeControl.disabled = true;
    } else if (audioCtx.state === "suspended") {
        audioCtx.resume();
        volumeControl.disabled = false;
    }
})
