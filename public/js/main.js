
var onGetUserMediaButtonClick, getFromVideoElement, toStop, toRecord, toStopRecord, toPlayRecorded, toStream

import('/public/js/usermedia-v0.1.0.js')
    .then((item) => {
        onGetUserMediaButtonClick = item.onGetUserMediaButtonClick
        getFromVideoElement = item.getFromVideoElement
        toStop = item.toStop
        toRecord = item.toRecord
        toStopRecord = item.toStopRecord
        toPlayRecorded = item.toPlayRecorded
        toStream = item.toStream
        toDownload = item.toDownload
    }).catch((err) => {
        console.error(err)
    })
