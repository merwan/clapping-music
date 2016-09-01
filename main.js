window.addEventListener('load', function() {
  var context = new AudioContext();
  var compressor = context.createDynamicsCompressor();
  compressor.connect(context.destination);

  function loadSample(sample) {
    var request  = new XMLHttpRequest();
    request.responseType = 'arraybuffer';
    request.addEventListener('load', decodeAudio);
    request.open('GET', sample);
    request.send();
  }

  function decodeAudio() {
    context.decodeAudioData(this.response, decodeBuffer, errorFun);
  }

  function decodeBuffer(decodedBuffer) {
    playBuffer(decodedBuffer);
  }

  function errorFun(error) {
    console.error('Cannot decode buffer', error);
  }

  function playBuffer(buffer) {
    source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(compressor);
    source.start(0);
  }

  loadSample('clap.wav');
});
