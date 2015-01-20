/**
 * Created by dmaynard on 1/19/15.
 */

function AudioSample(name, location) {
    this.location = location;
    this.name = name;
    this.incomingbuffer = undefined;
    this.savedBuffer = undefined;
    var xhr = new XMLHttpRequest();
    xhr.open('get',location, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = (function () {
        darworms.audioContext.decodeAudioData(xhr.response,
            (function(incomingBuffer) {
                console.log( "on Load incoming Buffer");
                console.log(" xhr " + xhr.status + "  " + xhr.statusText);
                console.log(" incoming buffer = " + incomingBuffer );
                console.log ( " this.name " + this.name);
                this.savedBuffer = incomingBuffer; // Save the buffer, we'll reuse it
            }
        ).bind(this));
    }).bind(this);
    xhr.send();
}

AudioSample.prototype.playSample = function () {
    var source;
    console.log(" playSample " + this.name + "  " + this.location + "  savedBuffer " + this.savedBuffer);

    if (this.savedBuffer !== undefined) {
        source = darworms.audioContext.createBufferSource();
        source.buffer = this.savedBuffer;
        source.connect(darworms.sampleGainNode);
        source.connect(darworms.audioContext.destination);
        source.start(0); // Play sound immediately. Renamed source.start from source.noteOn
    }
};

