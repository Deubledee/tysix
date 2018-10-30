
        /****************************************************************************
        * WebRTC peer connection 
        ****************************************************************************/
       var conUser = { user: '' }
       var startTime;
       var recordedVideo = new Array()
       var recordedAudio = new Array()
       var videoRecorder = {}, audioRecorder = {}
       var localVideo = document.querySelector('#videoElement')
       var localAudio = document.querySelector('#gum-local')
       var remoteVideo = document.querySelector('#videoElement4')
       var remoteAudio = document.querySelector('#gum-remote')
       var stream = localAudio.captureStream()
       var peerOfferConn
       var peerAnswerConn
       var offerOptions = {
           offerToReceiveAudio: 1,
           offerToReceiveVideo: 1,
           iceRestart: false,
           voiceActivityDetection: true
       };
       var connectec = false
       var restReq = 0
       var STUN = {
           urls: 'stun:stun.l.google.com:19302'
       };

       var TURN = {
           urls: 'turn:numb.viagenie.ca',
           credential: 'muazkh',
           username: 'webrtc@live.com'
       };

       var config = {
           iceServers: [STUN, TURN],
           iceTransportPolicy: 'all',
           iceCandidatePoolSize: 2
       };

       var DtlsSrtpKeyAgreement = {
           DtlsSrtpKeyAgreement: true
       };

       var optional = {
           optional: [DtlsSrtpKeyAgreement]
       };

       function signalingMessageCallback(user, message) {
           if (message.msg.type === 'offer') {
               onRemoteOffer(user, message)
           }
           else if (message.msg.type === 'answer') {
               conUser.user = user
               peerOfferConn.setRemoteDescription(new RTCSessionDescription(message.msg), function (data) {
               }, logError);
           }
           else if (message.msg.type === 'candidate') {
               conUser.user = user
               console.log('candidates.........', message.msg.candidate)
               if (message.sender === false && peerOfferConn) {
                   console.log('candidate...........1', message.msg.candidate)
                   peerOfferConn.addIceCandidate(new RTCIceCandidate({
                       candidate: message.msg.candidate
                   }));
               }
               if (message.sender === false && peerAnswerConn) {
                   console.log('candidate...........2', message.msg.candidate)
                   peerAnswerConn.addIceCandidate(new RTCIceCandidate({
                       candidate: message.msg.candidate
                   }));
               }
           }
           else if (message.msg.type === 'bye') {
               console.log('bye from.', user);
               conUser.user = ''
               hangup(true)
           }
           else if (message.msg.type === 'restart') {
               //   console.log('restart request from.', user);
               if (message.msg.toZero == true) {
                   restReq -= 1
               }
               if (restReq <= 5) {
                   createOffer()
                   restReq += 1
                   //  console.log('restart offer #.', restReq);
               } else {
                   console.log('restart offer exceeded', restReq, 'requests! Canceling restart offer requests from', user);
               }
           }
       }

       function createPeerConnection(user) {
           conUser.user = user
           peerOfferConn = new RTCPeerConnection(config, optional);
           connectec = true
           stream.getTracks().forEach(function (track) {
               peerOfferConn.addTrack(
                   track,
                   stream
               );
           });
           createOffer()
           peerOfferConn.onicegatheringstatechange = onicegatheringstatechange;
       }

       function onRemoteOffer(user, message) {
           let mess = message.msg
           if (message.sender === false) {
               conUser.user = user
               peerAnswerConn = new RTCPeerConnection(config, optional);
               peerAnswerConn.setRemoteDescription(new RTCSessionDescription(mess), function (data) {
                   console.log('set Remote Description success')
               }, logError);
               peerAnswerConn.createAnswer(gotDescription, logError);
               peerAnswerConn.onicecandidate = onIceCandidate2
               peerAnswerConn.onicegatheringstatechange = onicegatheringstatechange;
               peerAnswerConn.ontrack = gotRemoteStream;
               if (connectec === true) return
               onGetUserMediaButtonClick(user)
           } else {
               console.log(message.msg.sdp, message.nick, message.room)
           }
       }

       function createOffer() {
           peerOfferConn.createOffer(offerOptions)
               .then(function (desc) {
                   peerOfferConn.setLocalDescription(desc);
                   sendMessage(conUser.user, desc);
               })
               .catch(function (error) {
                   console.log('Failed to createOffer: ', error);
               });
       }

       function gotDescription(desc) {
           peerAnswerConn.setLocalDescription(desc).then(
               function () {
                   sendMessage(conUser.user, desc);
               }, logError);
       }

       function onIceCandidate2(event) {
           if (event.candidate !== null) {
               console.log('aquiiiiiiiiiiiiiiiiiiiiiiiii!!!!', event, event.candidate)
               addICECandidate(peerAnswerConn, event)
           }
       }

       function addICECandidate(peer, event) {
           peer.addIceCandidate(event.candidate)
               .then(function () {
                   console.log('event candidate', conUser.user, event.candidate.candidate)
                   sendICE(event)
               }, logError);
       }

       function sendICE(event) {
           sendMessage(conUser.user, {
               type: 'candidate',
               label: event.candidate.sdpMLineIndex,
               id: event.candidate.sdpMid,
               candidate: event.candidate.candidate
           });
       }

       function gotRemoteStream(e) {
           console.log('CaLlEd')
           if (remoteVideo.srcObject !== e.streams[0]) {
               remoteVideo.srcObject = e.streams[0];
               remoteAudio.srcObject = e.streams[0];
           }
           testStream(remoteVideo, 3000)
       }

       function testStream(peer, time) {
           setTimeout(() => {
               if (peer.played.length === 0) {
                   sendMessage(conUser.user, {
                       type: 'restart'
                   })
                   console.log('restart....!!!')
               }
           }, time)
       }

       function onicegatheringstatechange(event) {
           // if (pc) {
           console.log('ICE state change event: ', event.type);
           //}
       }

       function restart(arg) {
           sendMessage(conUser.user, {
               toZero: arg || false,
               type: 'restart'
           })
       }

       function hangup(sender) {
           peerAnswerConn.close();
           peerAnswerConn = null;
           peerOfferConn.close();
           peerOfferConn = null;
           connectec = false
           if (!sender === true)
               sendMessage(conUser.user, {
                   type: 'bye'
               })
       }

       function logError(err) {
           console.log(err.toString(), err);
       }
