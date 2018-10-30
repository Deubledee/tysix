var imageCapture;
var audioCapture;
var kill = {
    setTimeout: false
}

function onGetUserMediaButtonClick() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(mediaStream => {
            localVideo.srcObject = mediaStream;
            localAudio.srcObject = mediaStream;
        })
        .catch(error => console.log(error));
}

function getFromVideoElement() {
    var video = document.querySelector('video')
    var canvas = document.querySelector('#getFromVideoElement')
    var ctx = canvas.getContext('2d')
    canvas.width = video.clientWidth / 1.2
    canvas.height = video.clientHeight / 1.2
    ctx.drawImage(video, 0, 0, video.clientWidth / 1.2, video.clientHeight / 1.2);
    toGrey(ctx, canvas)
    ////loop this function\\\
    kill.setTimeout = false
    var time = setTimeout(() => {
        if (kill.setTimeout === false) {
            getFromVideoElement()
        } else {
            clearTimeout(time)
        }
    }, 1000 / 120)
}

function onGrabFrameButtonClick() {
    let canvas = document.querySelector('#grabFrameCanvas'),
        ctx = canvas.getContext('2d')
    imageCapture.grabFrame()
        .then(imageBitmap => {
            drawCanvas(canvas, imageBitmap);
            // toGrey(ctx, canvas)
        })
        .catch(error => {/*console.log(error)*/ });
    ////loop this function\\\
    kill.setTimeout = false
    var time = setTimeout(() => {
        if (kill.setTimeout === false) {
            onGrabFrameButtonClick()
        } else {
            clearTimeout(time)
        }
    }, 1000 / 60)
}

function onTakePhotoButtonClick() {
    imageCapture.takePhoto()
        .then(blob => createImageBitmap(blob))
        .then(imageBitmap => {
            const canvas = document.querySelector('#takePhotoCanvas');
            drawCanvas(canvas, imageBitmap);
        })
        .catch(error => console.log(error));
    ////loop this function\\\
    kill.setTimeout = false
    var time = setTimeout(() => {
        if (kill.setTimeout === false) {
            onTakePhotoButtonClick()
        } else {
            clearTimeout(time)
        }
    }, 5000)
}
function toStop() {
    kill.setTimeout = true
}
/* Utils */
function toGrey(ctx, canvas) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    var data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    imageData.data = data
    // toClear()
    ctx.putImageData(imageData, 0, 0);
}

function drawCanvas(canvas, img) {
    canvas.width = getComputedStyle(canvas).width.split('px')[0];
    canvas.height = getComputedStyle(canvas).height.split('px')[0];
    let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
        x, y, img.width * ratio, img.height * ratio);
}

/* Utils extended */

function handleDataAvailable(event) {
    console.log('handling data to record', event.data)
    if (event.data && event.data.size > 0) {
        recordedVideo.push(event.data);
    }
}

function toRecord(canvasId) {
    var element = document.querySelector(canvasId)
    var options = { mimeType: 'video/webm;codecs=vp9' },
        stream = element.captureStream()
    videoRecorder = new MediaRecorder(stream, options);
    videoRecorder.onstop = handleStop;
    recordedVideo = []
    videoRecorder.start(25)
    videoRecorder.ondataavailable = function (event) {
        // console.log('handling data to record', event.data)
        if (event.data && event.data.size > 0) {
            recordedVideo.push(event.data);
        }
    };
}

function toStopRecord() {
    videoRecorder.stop()
}

function handleStop(event) {
    console.log('Recorder stopped: ', event);
}

function toPlayRecorded() {
    var blob = new Blob(recordedVideo, { type: 'video/webm' });
    var url = window.URL.createObjectURL(blob);
    document.querySelector('#videoElement2').src = ''
    document.querySelector('#videoElement2').src = url
    document.querySelector('#videoElement2').play()
}

function toStream(elemSrc, elemTrg) {
    let src = document.querySelector(elemSrc)
    let target = document.querySelector(elemTrg)
    var stream = src.captureStream()
    target.srcObject = stream
}

function toDownload() {
    var blob = new Blob(recordedVideo, { type: 'video/webm' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = Math.floor(Math.random(1) * 1000) + 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}