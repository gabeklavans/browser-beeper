
// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var oscillator, gainNode;

var isPlaying = false;

function playTone(freq) {
    // Create Oscillator node
    oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz

    // Create Gain node
    gainNode = audioCtx.createGain();
    // gainNode.gain.setValueAtTime(0, audioCtx.currentTime); // Start quiet

    // Da hook up
    oscillator.connect(gainNode).connect(audioCtx.destination);

    oscillator.start();
    isPlaying = true;
}

function stopTone() {
    gainNode ? gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.04) : console.log("durr") // do nothin
    isPlaying = false;
}

function buttonHandler(freq) {
    if (isPlaying) {
        stopTone();
        console.log("Stopping!");
    } else {
        playTone(freq);
        console.log("Starting!");
    }
}