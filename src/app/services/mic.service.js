(function () {
  'use strict';

  angular
    .module('spectrumAnalyzer')
    .service('mic', mic);

  function mic () {
    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();
    var source;
    var drawVisual;

    // set up canvas context for visualizer

    var canvas = document.querySelector('.visualizer');
    var canvasCtx = canvas.getContext('2d');

    // canvas.setAttribute('width', 500);
    // canvas.setAttribute('height', 500);

    navigator.getUserMedia({
      audio: true
    },
    function (stream) {
      console.log(stream);
      source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      visualize();
    }, function (error) {
      console.log(error);
    });

    function visualize () {
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;

      analyser.fftSize = 2048;
      var bufferLength = analyser.fftSize;
      var dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      function draw() {
        drawVisual = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        var sliceWidth = WIDTH * 1.0 / bufferLength;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {

          var v = dataArray[i] / 128.0;
          var y = v * HEIGHT/2;

          if(i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height/2);
        canvasCtx.stroke();
      }

      draw();
    }

  }

})();
