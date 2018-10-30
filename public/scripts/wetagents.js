class WetAgents {
    constructor(audioContext) {
        this.context = audioContext
        this.contextNode = {}
        this.sourceNode = {}
        this.streamNode = {}
        this.analyserNode = {}
        this.drawVisual = ''
        this.applicables = {}
        this.appliesWith = {}
    }

    inputStreamSource(done, sourceName, stream) {
        try {
            if (this.streamNode[sourceName] === undefined &&
                this.sourceNode[sourceName] === undefined &&
                this.contextNode[sourceName] === undefined &&
                sourceName) {
                if (stream === 0) { done(false); return }
                this.sourceNode[sourceName] = this.context.createMediaStreamSource(stream);
                setTimeout(() => {
                    this.sourceNode[sourceName].onRemove = () => { }
                    done(false, stream)
                }, 100)
                return
            } else {
                done(sourceName + ' already exists or no argumet value!!')
                return
            }
        } catch (err) {
            done(err)
        }
    }

    setElementSource(done, sourceName, mediaElement) {
        try {
            if (this.streamNode[sourceName] === undefined &&
                this.sourceNode[sourceName] === undefined &&
                this.contextNode[sourceName] === undefined &&
                sourceName) {
                this.sourceNode[sourceName] = this.context.createMediaElementSource(mediaElement);
                setTimeout(() => {
                    this.sourceNode[sourceName].onRemove = () => { }
                }, 100)
                done(false)
                return
            } else {
                done(sourceName + ' already exists or no argumet value!!')
                return
            }
        } catch (err) {
            done(err)
        }
    }

    setStreamDestination(done, streamName, contextNode) {
        try {
            if (this.streamNode[streamName] === undefined &&
                streamName) {
                this.streamNode[streamName] = this.context[contextNode]()
                done(false, this.streamNode[streamName])
            } else {
                done(sourceName + ' already exists or no argumet value!!')
            }
        } catch (err) {
            done(err)
        }
    }

    analyser(done, nodename) {
        try {
            if (!this.analyserNode[nodename] && nodename) {
                this.analyserNode[nodename] = this.context.createAnalyser();
                this.analyserNode[nodename].minDecibels = -90;
                this.analyserNode[nodename].maxDecibels = -10;
                this.analyserNode[nodename].smoothingTimeConstant = 0.85;
                setTimeout(() => {
                    this.analyserNode[nodename].onRemove = {}
                    done()
                }, 100)
            } else {
                done(nodename + ' already exists or no argumet value!!')
            }
        } catch (err) {
            done(err)
        }
    }

    gain(done, gainNode, destination) {
        try {
            if (this.sourceNode[gainNode] === undefined &&
                this.contextNode[gainNode] === undefined &&
                gainNode) {
                if (destination !== true) {
                    this.contextNode[gainNode] = this.context.createGain()
                    setTimeout(() => {
                        this.contextNode[gainNode].onRemove = () => { }
                        done()
                    }, 100)
                } else {
                    this.setStreamDestination((state, node) => {
                        done(state, node)
                    }, gainNode, 'createGain')
                }

            } else {
                done()
            }
        } catch (err) {
            done('gain error')
            throw new Error(err);
        }
    }

    reverb(done, reverbName, buffer) {  //, distortionCurve) {
        try {
            if (this.sourceNode[reverbName] === undefined &&
                this.contextNode[reverbName] === undefined &&
                reverbName) {
                this.contextNode[reverbName] = this.context.createConvolver();
                this.contextNode[reverbName].buffer = buffer
                this.contextNode[reverbName].normalize = true 
                done(null)
            } else {
                done('already exists')
            }
        } catch (err) {
            done('waveShaper error')
            throw new Error(err);
        }
    }

    waveShaper(done, waveName, overS, amount) {  //, distortionCurve) {
        try {
            if (this.sourceNode[waveName] === undefined &&
                this.contextNode[waveName] === undefined &&
                waveName && overS && amount) {
                this.contextNode[waveName] = this.context.createWaveShaper();
                this.contextNode[waveName].oversample = `${overS}x`;
                this.contextNode[waveName].curve = this.makeDistortionCurve(parseInt(amount));/* distortionCurve(amount) ||*/
                setTimeout(() => {
                    this.contextNode[waveName].onRemove = () => { }
                    done()
                }, 100)
            } else {
                done('already exists')
            }
        } catch (err) {
            done('waveShaper error')
            throw new Error(err);
        }
    }

    makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 50,
            n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 120,
            i = 0,
            x;
        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    };

    panner(done, pann) {
        try {
            if (this.sourceNode[pann] === undefined &&
                this.contextNode[pann] === undefined && pann) {
                this.contextNode[pann] = this.context.createPanner();
                setTimeout(() => {
                    this.contextNode[pann].onRemove = () => { }
                    done(null)
                }, 100)
            } else {
                done('already exists')
            }
        } catch (err) {
            done('panner error')
            throw new Error(err);
        }

    }

    delay(done, delay) {
        console.log(delay)
        try {
            if (this.sourceNode[delay] === undefined &&
                this.contextNode[delay] === undefined && delay) {
                this.contextNode[delay] = this.context.createDelay(179);
                setTimeout(() => {
                    this.contextNode[delay].onRemove = () => { }
                    done(null)
                }, 100)
            } else {
                done('already exists')
            }
        } catch (err) {
            done('delay error')
            throw new Error(err);
        }

    }

    biquadFilter(done, filter) {
        try {
            if (this.sourceNode[filter] === undefined &&
                this.contextNode[filter] === undefined && filter) {
                this.contextNode[filter] = this.context.createBiquadFilter();
                setTimeout(() => {
                    this.contextNode[filter].onRemove = () => { }
                    done(null)
                }, 100)
            } else {
                done('already exists')
            }
        } catch (err) {
            done('biquad filter error')
            throw new Error(err);
        }

    }
    compressor(done, compressor) {
        try {
            if (this.sourceNode[compressor] === undefined &&
                this.contextNode[compressor] === undefined && compressor) {
                this.contextNode[compressor] = this.context.createDynamicsCompressor();
                setTimeout(() => {
                    this.contextNode[compressor].onRemove = () => { }
                    done(null, this.contextNode[compressor])
                }, 100)
            } else {
                done('already exists', undefined)
            }
        } catch (err) {
            done('compressor error', undefined)
            throw new Error(err);
        }
    }

    listner(listen, forwardX, forwardY, forwardZ, upX, upY, upZ) {
        this.contextNode[listen].forwardX.value = forwardX || 0;
        this.contextNode[listen] = this.context.listener;
        this.contextNode[listen].forwardY.value = forwardY || 0;
        this.contextNode[listen].forwardZ.value = forwardZ || -1;
        this.contextNode[listen].upX.value = upX || 0;
        this.contextNode[listen].upY.value = upY || 1;
        this.contextNode[listen].upZ.value = upZ || 0;
    }

    connectAgents(done, agent1, agent2, connect) {
        try {
            if (connect == true) {
                agent1.connect(agent2)
                agent2.connected = agent1
            } else {
                agent1.disconnect(agent2)
                agent2.connected = false
            }
            done()
        } catch (err) {
            done(err)
        }
    }

    setAgentParamTo(done, agent, param1, param2, to, to1, to2, func) {
        try {
            if (func === true) {
                agent[param1][param2](to, this.context.currentTime + to1, to2)
                console.log(param1, param2, to, to1, to2, func)
                done(null)
            } else {
                console.log(param1, param2, to, to1, to2, func)
                if (typeof agent[param1] !== 'function') {
                    if (param2 !== null) {
                        agent[param2] = param2 === 'curve' ? this.makeDistortionCurve(parseInt(to1)) : to1
                    } else {
                        agent[param1] = to
                    }
                } else {
                    agent[param1](to, to1, to2)
                }
                done(null)
            }

            //  agent.changed = true
        }
        catch (err) {
            done(err)
        }
    }

    decode(done, arrayBuffer) {
        try {
            this.context.decodeAudioData(arrayBuffer, (buff) => {
                done(buff)
            })
        }
        catch (err) {
            done(err)
        }
    }

    removeAgents(done, context, agent) {
        this[context][agent].onRemove()
        delete this[context][agent]
        done()
    }

    setApplicable(done, obj) {
        if (obj.elemTitle !== undefined) {
            if (!this.applicables[obj.elemTitle]) {
                this.applicables[obj.elemTitle] = obj
                // console.log('create', this.applicables[obj.elemTitle])
            } else {
                this.applicables[obj.elemTitle].arr.push(obj.arr[0])
                // console.log('add', this.applicables[obj.elemTitle])
            }
        }
        done()
    }

    setAppliesWith(done, obj, rec) {
        if (!this.appliesWith[obj.name]) {
            this.appliesWith[obj.name] = new Array(obj)
        } else {
            let arr = this.appliesWith[obj.name]
            arr.push(obj)
            this.appliesWith[obj.name] = arr
        }
        done()

    }

    revoveAppliesWith(done, obj) {
        let arr1 = []
        for (let i = 0; i < this.appliesWith[obj.name].length; i++) {
            if (this.appliesWith[obj.name][i].titleFuncion !== obj.titleFuncion) {
                arr1.push(this.appliesWith[obj.name][i])
            }
        }
        this.appliesWith[obj.name] = arr1
        done()
    }

    revoveElemTitle(done, elemTitle) {
        if (this.applicables[elemTitle]) {
            delete this.appliesWith[elemTitle]
            delete this.applicables[elemTitle]
        }
        done()
    }

    revoveApplicables(done, elemTitle, titleFunction) {
        let arr2 = []
        for (let j = 0; j < this.applicables[elemTitle].arr.length; j++) {
            if (this.applicables[elemTitle].arr[j].titleFuncion !== titleFunction) {
                arr2.push(this.applicables[elemTitle].arr[j])
            }
        }
        this.applicables[elemTitle].arr = arr2
        done()
    }

    revoveFunction(done, elemTitle, titleFunction) {
        if (this.appliesWith[elemTitle]) {
            this.revoveAppliesWith(() => {
            }, elemTitle, titleFunction)
        }
        this.revoveApplicables(() => {
        }, elemTitle, titleFunction)
        done()
    }

    sineWave(done, canvasCtx, width, height, nodename) {
        try {
            if (this.analyserNode[nodename] && nodename) {
                const WIDTH = width;
                const HEIGHT = height
                var drawVisual
                this.analyserNode[nodename].fftSize = 2048;
                var bufferLength = this.analyserNode[nodename].fftSize;
                var dataArray = new Uint8Array(bufferLength);
                canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

                var draw = () => {
                    this.drawVisual = requestAnimationFrame((draw).bind(this));
                    this.analyserNode[nodename].getByteTimeDomainData(dataArray);
                    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
                    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                    canvasCtx.lineWidth = 2;
                    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
                    canvasCtx.beginPath();
                    var sliceWidth = WIDTH * 1.0 / bufferLength;
                    var x = 0;
                    for (var i = 0; i < bufferLength; i++) {

                        var v = dataArray[i] / 128.0;
                        var y = v * HEIGHT / 2;

                        if (i === 0) {
                            canvasCtx.moveTo(x, y);
                        } else {
                            canvasCtx.lineTo(x, y);
                        }

                        x += sliceWidth;
                    }

                    canvasCtx.lineTo(WIDTH, HEIGHT / 2);
                    canvasCtx.stroke();
                }
                done()
                draw();
            } else {
                done(nodename + ` doesn't exist or no argumet value!!`)
            }
        } catch (err) {
            done(err)
        }
    }

    bubbleBurst(done, canvasCtx, width, height, nodename) {
        try {
            if (this.analyserNode[nodename] && nodename) {
                const WIDTH = width;
                const HEIGHT = height;
                var stdSize = 50
                var stdSize2 = (WIDTH / 3) + stdSize
                var stdSize3 = (WIDTH / 1.5) + stdSize
                this.analyserNode[nodename].fftSize = 256;
                var bufferLengthAlt = this.analyserNode[nodename].frequencyBinCount;
                var dataArrayBubl = new Uint8Array(bufferLengthAlt);

                canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

                var drawBubl = () => {
                    this.drawVisual = requestAnimationFrame(drawBubl);
                    //  analyser.getByteTimeDomainData(dataArrayBubl);
                    this.analyserNode[nodename].getByteFrequencyData(dataArrayBubl);
                    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                    canvasCtx.beginPath();
                    var barWidth = (WIDTH / dataArrayBubl) * 1.5;
                    var barHeight;
                    this.circles(canvasCtx, dataArrayBubl, bufferLengthAlt, stdSize + 25, barHeight, barWidth, HEIGHT, true, 0, 0)
                    this.circles(canvasCtx, dataArrayBubl, bufferLengthAlt, (stdSize2 - 25), barHeight, barWidth, HEIGHT, 0, true, 0)
                    this.circles(canvasCtx, dataArrayBubl, bufferLengthAlt, (stdSize3 - 80), barHeight, barWidth, HEIGHT, 0, 0, true)
                }
                done()
                drawBubl();
            } else {
                done(nodename + ` doesn't exist or no argumet value!!`)
            }
        } catch (err) {
            done(err)
        }
    }

    circles(canvasCtx, dataArrayBubl, bufferLengthAlt, stdsize, barHeight, barWidth, HEIGHT, fixed1, fixed2, fixed3) {
        var x = stdsize;
        for (var i = 0; i < bufferLengthAlt; i++) {
            if (fixed1 !== true) {
                x = x + barHeight || barHeight + stdsize
            } else if (fixed1 === 0) {
                x = stdsize
            }
            barHeight = dataArrayBubl[i];
            canvasCtx.beginPath();
            canvasCtx.strokeStyle = `rgb( ${barHeight + HEIGHT}, 100, ${barHeight})`
            canvasCtx.arc(x, 70, (barHeight / 3.5), 0, 2 * Math.PI);
            canvasCtx.stroke()
            x += barWidth + 5000;
        }

        for (var i = 0; i < bufferLengthAlt; i++) {
            if (fixed2 !== true) {
                x = x + barHeight || barHeight + stdsize
            } else if (fixed1 === 0) {
                x = stdsize
            }
            barHeight = dataArrayBubl[i];
            canvasCtx.beginPath();
            canvasCtx.strokeStyle = `rgb(100, ${barHeight},  ${barHeight + HEIGHT}, ${HEIGHT + 100})`
            canvasCtx.arc(x, 70, (barHeight / 5), 0, 2 * Math.PI);
            canvasCtx.stroke()
            x += barWidth + 5000;
        }

        for (var i = 0; i < bufferLengthAlt; i++) {
            if (fixed3 !== true) {
                x = barHeight + stdsize || x + barHeight
            } else if (fixed1 === 0) {
                x = stdsize
            }
            barHeight = dataArrayBubl[i];
            canvasCtx.beginPath();
            canvasCtx.strokeStyle = `rgb(${barHeight + 50},  ${HEIGHT + 100}, ${barHeight})`
            canvasCtx.arc(x, 70, (barHeight / 8), 0, 2 * Math.PI);
            canvasCtx.stroke()
            x += barWidth + 5000;
        }
    }

    barGraph(done, canvasCtx, width, height, nodename) {
        try {
            if (this.analyserNode[nodename] && nodename) {
                const WIDTH = width;
                const HEIGHT = height;
                this.analyserNode[nodename].fftSize = 256;
                var bufferLengthAlt = this.analyserNode[nodename].frequencyBinCount;
                var stdSize2 = (WIDTH / 3) + 50
                var dataArrayAlt = new Uint8Array(bufferLengthAlt);

                canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

                var drawAlt = () => {
                    this.drawVisual = requestAnimationFrame(drawAlt);
                    this.analyserNode[nodename].getByteFrequencyData(dataArrayAlt);

                    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
                    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

                    var barWidth = (WIDTH / bufferLengthAlt) * 1.5;
                    var barHeight;


                    this.bars(canvasCtx, dataArrayAlt, bufferLengthAlt, barWidth, barHeight, HEIGHT)
                    this.circles(canvasCtx, dataArrayAlt, bufferLengthAlt, stdSize2, barHeight, barWidth, HEIGHT, true, 0, 0)
                };
                drawAlt();
                done()
            } else {
                done(nodename + ` doesn't exist or no argumet value!!`)
            }
        } catch (err) {
            done(err)
        }
    }


    bars(canvasCtx, dataArrayAlt, bufferLengthAlt, barWidth, barHeight, HEIGHT) {
        var x = 0;
        for (var i = 0; i < bufferLengthAlt; i++) {
            canvasCtx.beginPath();
            barHeight = dataArrayAlt[i];
            canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
            canvasCtx.stroke()
            x += barWidth + 1;
        }
    }

    killVisual(context2d, width, height) {
        context2d.fillStyle = '#000000'
        context2d.fillRect(0, 0, width, height)
        window.cancelAnimationFrame(this.drawVisual)
    }

    //methods not applyed yet\\


    whiteNoise() {
        this.newBuffer('whitenoise', 2)

        for (let channel = 0; channel < this['whitenoise'].numberOfChannels; channel++) {
            // This gives us the actual ArrayBuffer that contains the data

            for (let i = 0; i < this['whitenoise'].length; i++) {
                // Math.random() is in [0; 1.0]
                // audio needs to be in [-1.0; 1.0]
                this.buffering[i] = Math.random() * 2 - 1;
            }
        }
        // Get an AudioBufferSourceNode.
        // This is the AudioNode to use when we want to play an AudioBuffer
        this.bufferSource();
        // set the buffer in the AudioBufferSourceNode
        this.source.buffer = this['whitenoise'];
        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        // this.source.connect(this.context.destination);
        // start the source playing
        //  this.source.start();
    }
}

