class UtilsVideoOptions {
    constructor({ container, video, sources, speed, captions }) {
        this.container = container
        this.video = video
        this.toggleSources = sources
        this.toggleSpeed = speed
        this.toggleCaptions = captions
        this.activeCaption = captions?.default.src ?? undefined
        this.captionEl = null
    }

    init() {
        this.main()

        if (this.toggleSpeed) {
            this.speed()
            this.container.querySelector('.video-options-speed-menu').addEventListener('click', () => this.container.querySelector('.video-options').dataset.active = "speed")
            this.container.querySelectorAll('.video-options-speed-button').forEach((button) => {
                button.addEventListener('click', (e) => {
                    this.handlePlaybackSpeed(e);
                    button.dataset.selected = "true";
                    this.container.querySelectorAll('.video-options-speed-button').forEach((otherButton) => {
                        if (otherButton !== button) {
                            otherButton.dataset.selected = "false";
                        }
                    });
                });
            });

        }
        if (this.toggleSources != undefined) {
            this.sources()
            this.container.querySelector('.video-options-sources-menu').addEventListener('click', () => this.container.querySelector('.video-options').dataset.active = "sources")
            this.container.querySelectorAll('.video-options-sources-button').forEach((button) => {
                button.addEventListener('click', (e) => {
                    this.handleSourceChange(e);
                    button.dataset.selected = "true";
                    this.container.querySelectorAll('.video-options-sources-button').forEach((otherButton) => {
                        if (otherButton !== button) {
                            otherButton.dataset.selected = "false";
                        }
                    });
                });
            });
        }

        if (this.toggleCaptions != undefined) {
            this.captions()
            this.video.querySelector('track').setAttribute('src', this.activeCaption)
            this.captionEl = this.video.textTracks[0]
            this.captionEl.mode = "hidden"
            
            const toggleCaptionsBtn = `
            <button class="captions-btn">
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path fill="#FFFFFF"
                        d="M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z" />
                </svg>
            </button>
            `

            prependHTMLString(this.container.querySelector('.controls-right'), toggleCaptionsBtn)

            this.container.querySelector('.captions-btn').addEventListener('click', () => {
                this.container.dataset.captions = (this.container.dataset.captions == "true") ? "false" : "true";
                this.captionEl.mode = this.captionEl.mode == "hidden" ? "showing" : "hidden"
            })

            this.container.querySelector('.video-options-captions-menu').addEventListener('click', () => this.container.querySelector('.video-options').dataset.active = "captions")
            this.container.querySelectorAll('.video-options-captions-button').forEach((button) => {
                button.addEventListener('click', (e) => {
                    this.handleCaptions(e)
                    button.dataset.selected = "true";
                    this.container.querySelectorAll('.video-options-captions-button').forEach((otherButton) => {
                        if (otherButton !== button) {
                            otherButton.dataset.selected = "false";
                        }
                    });
                });
            });
        }

        this.container.querySelectorAll('.video-options-back').forEach((button) => {
            button.addEventListener('click', () => {
                this.container.querySelector('.video-options').dataset.active = "main";
            });
        });
    }

    main() {
        const el =
            `
        <div class="video-options-container" data-active="false">
            <button class="video-options-btn">
                <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
                    <path fill="#FFFFFF"
                        d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                </svg>
            </button>

            <div class="video-options" data-active="main">

            </div>
        </div>
        `
        prependHTMLString(this.container.querySelector('.controls-right'), el)

        this.container.querySelector('.video-options-btn').addEventListener('click', () => {
            const videoOptionsContainer = this.container.querySelector('.video-options-container');
            const currentActiveValue = videoOptionsContainer.dataset.active;
            videoOptionsContainer.dataset.active = (currentActiveValue === "true") ? "false" : "true";
        })
    }

    speed() {
        const speeds = [
            0.5,
            0.75,
            'Normal',
            1.25,
            1.5,
            1.75,
            2,
            4
        ]
        const el =
            `
        <div class="video-options-item video-options-main video-options-speed-menu">
            <h1>Speed</h1>
            <h2>Normal</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10"
                viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
        </div>
        `

        const backMenu =
            `
        <div class="video-options-item video-options-speed video-options-back">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10"
                viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <h1>Playback Speed</h1>
        </div>
        `

        prependHTMLString(this.container.querySelector('.video-options'), el)
        prependHTMLString(this.container.querySelector('.video-options'), backMenu)

        speeds.forEach(speed => {
            const speed_el =
                `
            <div class="video-options-item video-options-speed video-options-speed-button" data-selected="${speed == 'Normal' ? 'true' : 'false'}" data-value="${speed}">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14"
                    viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                        d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                </svg>
                <h1>${speed == 'Normal' ? 'Normal' : speed + 'x'}</h1>
            </div>
            `

            this.container.querySelector('.video-options').innerHTML += speed_el
        })
    }


    handlePlaybackSpeed(e) {
        const speed = e.target.closest('.video-options-speed-button').getAttribute('data-value')

        if (speed == 'Normal') {
            this.video.playbackRate = 1.0
            return
        }

        this.video.playbackRate = parseFloat(speed)
    }

    handleSourceChange(e) {
        const source = e.target.closest('.video-options-sources-button').getAttribute('data-value')
        const prevTime = this.video.currentTime
        const playing = this.video.paused

        this.video.src = source
        this.video.currentTime = prevTime

        if (!playing) this.video.play()
    }

    handleCaptions(e) {
        const selectedCaption = e.target.closest('.video-options-captions-button').getAttribute('data-value')
        this.activeCaption = selectedCaption
        this.video.querySelector('track').setAttribute('src', this.activeCaption)
    }

    sources() {

        const original = this.toggleSources.default
        const others = this.toggleSources.others

        const el =
            `
        <div class="video-options-item video-options-main video-options-sources-menu">
            <h1>Sources</h1>
            <h2>${original.title}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10"
                viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
        </div>
        `

        const backMenu =
            `
        <div class="video-options-item video-options-sources video-options-back">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10"
                viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <h1>Sources</h1>
        </div>
        `
        prependHTMLString(this.container.querySelector('.video-options'), el)
        prependHTMLString(this.container.querySelector('.video-options'), backMenu)


        const originalEL = sourceElement(original, 'sources', true)

        appendHtmlString(this.container.querySelector('.video-options'), originalEL);

        if (others == undefined) return
        others.forEach((source) => {
            const othersEl = sourceElement(source, 'sources')

            appendHtmlString(this.container.querySelector('.video-options'), othersEl);
        });
    }

    captions() {

        const original = this.toggleCaptions.default
        const others = this.toggleCaptions.others

        const el =
            `
        <div class="video-options-item video-options-main video-options-captions-menu">
            <h1>Captions</h1>
            <h2>${original.title}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10"
                viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
        </div>
        `

        const backMenu =
            `
        <div class="video-options-item video-options-captions video-options-back">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10"
                viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
            <h1>Captions</h1>
        </div>
        `
        prependHTMLString(this.container.querySelector('.video-options'), el)
        prependHTMLString(this.container.querySelector('.video-options'), backMenu)

        const originalEL = sourceElement(original, 'captions', true)
        appendHtmlString(this.container.querySelector('.video-options'), originalEL);

        if (others == undefined) return
        others.forEach((caption) => {
            const othersEl = sourceElement(caption, 'captions')
            appendHtmlString(this.container.querySelector('.video-options'), othersEl);
        })
    }
}

function prependHTMLString(parentElement, htmlString) {
    if (parentElement) {
        parentElement.insertAdjacentHTML('afterbegin', htmlString);
    } else {
        console.error(`Parent element with selector '${parentSelector}' not found.`);
    }
}

function appendHtmlString(element, htmlString) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString.trim();

    while (tempDiv.firstChild) {
        element.appendChild(tempDiv.firstChild);
    }
}

function sourceElement(source, type, selected = false) {
    return `
    <div class="video-options-item video-options-${type} video-options-${type}-button" data-selected="${selected}" data-value="${source.src}">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </svg>
        <h1>${source.title}</h1>
    </div>
    `
}

class FullScreenControls {
    constructor({ playerContainer, video, sensitivityX, sensitivityY, doubleTapSkip }) {
        this.video = video
        this.playerContainer = playerContainer;
        this.fsTimeline = playerContainer.querySelector(".full-screen-progress-container") || null;
        this.fsTimelineBar = playerContainer.querySelector(".fs-progress-bar") || null;

        this.fsCurrentTime = playerContainer.querySelector(".fs-current-time") || null;
        this.fsTotalTime = playerContainer.querySelector(".fs-total-time") || null;

        this.fsVolume = playerContainer.querySelector(".full-screen-volume-container") || null;
        this.fsVolumeBar = playerContainer.querySelector(".fs-volume-bar") || null;

        this.fsSkipForward = playerContainer.querySelector(".double-tap-right") || null;
        this.fsSkipBackward = playerContainer.querySelector(".double-tap-left") || null;

        this.isDragging = 0
        this.initialY = 0
        this.initialX = 0
        this.secondsToSkip = 0
        this.currTotalTime = 0
        this.isHorizontalDrag = null
        this.sensitivityX = sensitivityX
        this.sensitivityY = sensitivityY

        this.lastTapTime = 0
        this.doubleTaps = 0
        this.tapTimeout = null
        this.doubleTapSkip = doubleTapSkip

        this.initialVolume;
    }

    isFullscreen = () => document.fullscreenElement !== null;

    showTimeline() {
        this.fsTimeline.style.display = "flex"
        this.fsTimeline.style.opacity = 1
    }

    hideTimeline() {
        this.fsTimeline.style.display = "none"
        this.fsTimeline.style.opacity = 0
    }

    showVolume() {
        this.fsVolume.style.display = "flex"
        this.fsVolume.style.opacity = 1
    }

    hideVolume() {
        this.fsVolume.style.display = "none"
        this.fsVolume.style.opacity = 0
    }

    handleVerticalDrag(deltaY) {
        const volumeSlider = this.playerContainer.querySelector(".volume-slider-container input[type='range']");

        if (this.fsTimeline != null) this.hideTimeline();
        this.showVolume();

        const screenHeight = window.innerHeight;
        const volumePercentage = (deltaY / screenHeight) * 100

        const volumeChange = (volumePercentage * this.sensitivityY) / 100;

        const newVolume = Math.min(Math.max(this.initialVolume - volumeChange, 0), 1);

        this.video.volume = newVolume;

        volumeSlider.value = this.video.volume;
        this.fsVolumeBar.style.backgroundSize = (newVolume * 100) + "% 100%";
        this.video.muted = this.video.volume === 0;
        this.playerContainer.dataset.muted = this.video.muted.toString();

        handleBackgroundFill(volumeSlider);
    }


    handleHorizontalDrag(deltaX) {
        if (this.fsVolume != null) this.hideVolume();
        this.showTimeline();
        const screenWidth = window.innerWidth;

        const relativeDistance = deltaX / screenWidth * this.sensitivityX;

        this.secondsToSkip = relativeDistance * this.video.duration;
        this.playerContainer.dataset.hidecontrols = "true";
        this.currTotalTime = Math.max(0, Math.min(this.video.currentTime + this.secondsToSkip, this.video.duration));
        this.fsCurrentTime.textContent = formatDuration(this.currTotalTime);
        this.fsTimelineBar.style.backgroundSize = (this.currTotalTime * 100) / this.video.duration + "% 100%";
    };

    
    handleDoubleTap() {
        
        if(this.fsSkipForward == null) return false

        const currentTime = new Date().getTime();
        const timeSinceLastTap = currentTime - this.lastTapTime;
        var state = false

        if (timeSinceLastTap < 300) {

            if (this.tapTimeout != null) clearTimeout(this.tapTimeout);
            const screenWidth = window.innerWidth;

            if (this.initialX >= screenWidth / 2) {
                this.doubleTaps++
                this.fsSkipForward.style.opacity = "1";
                this.fsSkipForward.querySelector('h1').innerHTML = `${Math.abs(this.doubleTaps) * this.doubleTapSkip} secs`
            } else {
                this.doubleTaps--
                this.fsSkipBackward.style.opacity = "1";
                this.fsSkipBackward.querySelector('h1').innerHTML = `${Math.abs(this.doubleTaps) * this.doubleTapSkip} secs`
            }

            this.tapTimeout = setTimeout(() => {
                this.fsSkipBackward.style.opacity = "0";
                this.fsSkipForward.style.opacity = "0";
                this.video.currentTime = Math.max(0, Math.min(this.video.currentTime + (this.doubleTaps * this.doubleTapSkip), this.video.duration));

                this.doubleTaps = 0                
                clearTimeout(this.tapTimeout);
            }, 800);
            state = true
        }
        this.lastTapTime = currentTime;

        return state
    };

    handleTouchStart(e) {
        if (!this.isFullscreen()) return;
        this.initialX = e.touches[0].clientX;
        this.initialY = e.touches[0].clientY;
        this.initialVolume = this.video.volume

        if (this.fsTotalTime != null) this.fsTotalTime.innerHTML = formatDuration(this.video.duration);
    };

    handleTouchMove(e) {
        if (!this.isFullscreen()) return;

        this.isDragging = true;
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - this.initialX;
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - this.initialY;
        if (this.isHorizontalDrag === null) this.isHorizontalDrag = Math.abs(deltaX) > Math.abs(deltaY);
        else if (!this.isHorizontalDrag && this.fsVolume != null) this.handleVerticalDrag(deltaY);
        else if (this.isHorizontalDrag && this.fsTimeline != null) this.handleHorizontalDrag(deltaX);
        else return
    };

    handleTouchEnd() {
        if (this.fsTimeline != null) this.hideTimeline();
        if (this.fsVolume != null) this.hideVolume();

        if(this.handleDoubleTap()) return

        if (!this.isDragging || !this.isFullscreen()) {
            this.playerContainer.dataset.hidecontrols = (this.playerContainer.dataset.hidecontrols == "true") ? "false" : "true";
            return;
        }
        this.isDragging = false;

        if (this.fsTimeline == null) return

        if (this.isHorizontalDrag) this.video.currentTime = this.currTotalTime;
        this.isHorizontalDrag = null
    };
}

class demzoPlayer {
    constructor(src, {
        container,
        keyboardControls = true,
        slideControls = false,
        volumeControls = true,
        doubleTap = false,
        theme = '#C082FF',
        speedControls = true,
        captions = undefined,
        sources = undefined,
    }) {
        this.src = src
        this.sources = sources
        this.captions = captions
        this.speed = speedControls
        this.container = container
        this.theme = theme
        this.keyboardControls = keyboardControls
        this.slideControlsVol = slideControls == true ? true : slideControls.volume ?? false;
        this.slideControlsScrub = slideControls == true ? true : slideControls.seek ?? false;
        this.volumeControls = volumeControls
        this.doubleTapControls = doubleTap
        this.volume = 0
        this.time = 0
        this.playing = false
        this.scrubbing = false
        this.videoContainer = null
        this.video = null
        this.loadingEl = null
        this.timelineEl = null
        this.cursorHideTimeout = null

        this.init()
    }

    init() {

        console.log(this.slideControlsVol)
        console.log(this.slideControlsScrub)

        // Set theme color
        var r = document.querySelector(':root');
        r.style.setProperty('--themeMainColor', this.theme);

        this.setupPlayer()
        this.defineVideo()
        this.mainListeners()
    }

    setupPlayer() {
        const playerHTML = `
            <div class="video-container" data-paused="true" data-muted="false" data-fullscreen="false" data-mini="false"
            data-ismobile="false" data-hidecontrols="false" data-captions="false">

                <div class="overlay-pause">
                    <svg class="play-icon" viewBox="0 0 24 24">
                        <path fill="#FFFFFF" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                </div>

                <div class="video-controls">
                    <div class="video-controls-overlay"></div>
                    <div class="video-progress-bar" data-active="false">
                        <div class="buffering-indicator">
                            <div class="buffering-indicator-inner"></div>
                        </div>
                        <div class="video-progress-margin">
                            <input type="range" min="0" max="100" step="any" value="0">
                            <span class="timeline-tooltip">00:00</span>
                        </div>
                    </div>
                    <div class="controls">
                        <button class="play-pause-btn">
                            <svg class="play-icon" viewBox="0 0 24 24">
                                <path fill="#FFFFFF" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                            </svg>
                            <svg class="pause-icon" viewBox="0 0 24 24">
                                <path fill="#FFFFFF" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                            </svg>
                        </button>
                        <div class="duration-container">
                            <div class="current-time">00:00</div>
                            /
                            <div class="total-time">00:00</div>
                        </div>

                        <div class="controls-right">
                        
                            <button class="mini-player-btn">
                                <svg viewBox="0 0 24 24">
                                    <path fill="#FFFFFF"
                                        d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
                                </svg>
                            </button>

                            <button class="full-screen-btn">
                                <svg class="full-screen-open-icon" viewBox="0 0 24 24">
                                    <path fill="#FFFFFF"
                                        d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                                </svg>
                                <svg class="full-screen-close-icon" viewBox="0 0 24 24">
                                    <path fill="#FFFFFF"
                                        d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="video-wrapper">
                </div>
                <div class="loading-overlay">
                    <span></span>
                </div>

                <div class="full-screen-container">
                </div>
            </div>
            `
        this.container.insertAdjacentHTML('beforeend', playerHTML);
        this.videoContainer = this.container.querySelector(".video-container")

        if (this.volumeControls) this.volControls()
        if (this.keyboardControls) document.addEventListener("keydown", (e) => this.handleKeyboardControl(e));

        if (this.slideControlsVol.enable || this.slideControlsVol) this.slideVol()
        if (this.slideControlsScrub.enable || this.slideControlsScrub) this.slideScrub()
        if (this.doubleTapControls.enable || this.doubleTapControls) this.doubleTap()
    }

    defineVideo() {

        if (this.src == false) {
            this.src = this.sources.default.src
        }

        this.videoContainer.querySelector(".video-wrapper").innerHTML =
            `   <video data-setup="{}" tabindex="-1" role="application" src="${this.src}">
                <source src="${this.src}" type="video/mp4">
                <p></p>
                <track kind="captions" src="#">
            </video>`;
        this.video = this.videoContainer.querySelector(".video-container video");
        this.loadingEl = this.videoContainer.querySelector(".loading-overlay");
        this.timelineEl = this.videoContainer.querySelector(".video-progress-bar input[type='range']");

        this.video.addEventListener("loadeddata", () => this.handleLoadedData());
        this.video.addEventListener("timeupdate", () => this.handleTimeUpdate());
        this.video.addEventListener("progress", () => this.handleVideoBuffering());
        this.video.addEventListener('waiting', () => this.loadingEl.style.display = 'flex');
        this.video.addEventListener('canplay', () => this.loadingEl.style.display = 'none');

        this.videoContainer.addEventListener("fullscreenchange", () => {
            this.videoContainer.dataset.fullscreen = (document.fullscreenElement == null) ? "false" : "true"
            this.handleCursorHide()
        })
        this.video.addEventListener("enterpictureinpicture", () => { videoContainer.dataset.mini = "true" })
        this.video.addEventListener("leavepictureinpicture", () => { videoContainer.dataset.mini = "false" })
    }

    handleVideoBuffering() {
        const bufferingIndicator = this.videoContainer.querySelector(".buffering-indicator-inner");
        const bufferedRanges = this.video.buffered;
        if (bufferedRanges.length > 0) {
            const bufferedEnd = bufferedRanges.end(bufferedRanges.length - 1);
            const bufferedPercent = (bufferedEnd / this.video.duration) * 100;
            bufferingIndicator.style.width = `${bufferedPercent}%`;
        } else {
            bufferingIndicator.style.width = `100%`;
        }
    }


    togglePlay({ force = "toggle" } = {}) {
        if (force === "pause") this.video.pause();
        else if (force === "play") this.video.play();
        else this.video.paused ? this.video.play() : this.video.pause();

        this.videoContainer.dataset.paused = this.video.paused.toString();
    }

    toggleMute() {
        const volumeSlider = this.videoContainer.querySelector(".volume-slider-container input[type='range']");
        if (!this.video.muted) this.volume = volumeSlider.value;

        this.video.muted = !this.video.muted;
        volumeSlider.value = this.video.muted ? 0 : this.volume;
        volumeSlider.style.backgroundPosition = this.video.muted ? "-999999999px" : "0px";
        this.videoContainer.dataset.muted = this.video.muted.toString();
    }

    skip(duration) {
        this.video.currentTime += duration;
        handleBackgroundFill(this.timelineEl);
    }

    toggleFullScreenMode() {
        if (document.fullscreenElement == null) {

            this.videoContainer.requestFullscreen()
            this.videoContainer.dataset.fullscreen = "true"
        } else {
            document.exitFullscreen()
            this.videoContainer.dataset.fullscreen = "false"
        }
    }

    toggleMiniPlayerMode() {
        if (document.pictureInPictureElement) document.exitPictureInPicture()
        else if (document.pictureInPictureEnabled) this.video.requestPictureInPicture()

    }


    mainListeners() {
        this.video.addEventListener("click", () => this.togglePlay());

        const playPauseBtn = this.videoContainer.querySelector(".play-pause-btn");
        playPauseBtn.addEventListener("click", () => this.togglePlay());
        this.videoContainer.querySelector(".overlay-pause").addEventListener("click", () => this.togglePlay({ force: "play" }));


        if (this.volumeControls) {
            const volumeBtn = this.videoContainer.querySelector('.volume-controls .volume-btn');
            const volumeSlider = this.videoContainer.querySelector(".volume-slider-container input[type='range']");
            volumeBtn.addEventListener(`click`, () => this.toggleMute())
            volumeSlider.addEventListener("input", (e) => this.handleVolumeChange(e));
        }

        const timelineContainer = this.videoContainer.querySelector(".video-progress-bar");

        this.timelineEl.addEventListener("input", (e) => this.handleTimelineScrub(e));
        this.videoContainer.addEventListener("mouseup", () => this.handleTimelineSelect());
        this.videoContainer.addEventListener("touchend", () => this.handleTimelineSelect());

        this.timelineEl.addEventListener('mouseover', () => timelineContainer.dataset.active = "true");
        this.timelineEl.addEventListener('touchstart', () => timelineContainer.dataset.active = "true");

        this.timelineEl.addEventListener('mouseout', () => timelineContainer.dataset.active = "false");
        this.timelineEl.addEventListener('touchend', () => timelineContainer.dataset.active = "false");

        this.timelineEl.addEventListener('mousemove', (e) => this.handleTooltip(e))
        this.timelineEl.addEventListener('touchmove', (e) => this.handleTooltip(e))

        this.videoContainer.querySelector(".full-screen-btn").addEventListener("click", () => this.toggleFullScreenMode());
        this.videoContainer.querySelector(".mini-player-btn").addEventListener("click", () => this.toggleMiniPlayerMode());

        if (this.slideControlsVol ||
            this.slideControlsScrub ||
            this.doubleTapControls) {
            this.enableFSControls()
        }

        if (this.sources != undefined ||
            this.speed == true) {
            this.enableVideoOptions()
        }
    }

    handleVolumeChange(e) {
        this.video.volume = e.target.value;
        this.video.muted = e.target.value === "0";
        handleBackgroundFill(e);
        this.videoContainer.dataset.muted = this.video.muted.toString();
    }

    handleTimelineScrub(e) {
        if (!this.scrubbing) this.playing = !this.video.paused;

        this.scrubbing = true;
        this.time = e.target.value;
        handleBackgroundFill(e)

        this.togglePlay({ force: "pause" });
    }

    handleTimelineSelect() {
        if (this.scrubbing) {
            this.video.currentTime = this.time / 100 * this.video.duration;
            this.scrubbing = false;
            if (this.playing) this.togglePlay({ force: "play" });
        }
    }

    handleTooltip(e) {
        const timelineTooltip = this.videoContainer.querySelector(".timeline-tooltip");
        var percent

        if (e.type == 'mousemove' || e.type == 'touchmove') {
            const touch = e.type == "mousemove" ? e : e.touches[0];
            const rect = e.target.getBoundingClientRect();
            percent = (touch.clientX - rect.left) / rect.width;
            timelineTooltip.style.left = `${percent * 100}%`;
        }

        const previewTime = this.video.duration * percent;
        timelineTooltip.textContent = formatDuration(previewTime);
    }

    handleLoadedData() {
        if (mobileCheck()) this.videoContainer.dataset.ismobile = "true"
        this.videoContainer.querySelector(".total-time").textContent = formatDuration(this.video.duration)
    }

    handleTimeUpdate() {
        // Duration
        this.videoContainer.querySelector(".current-time").textContent = formatDuration(this.video.currentTime)

        // Timeline
        const percent = (this.video.currentTime / this.video.duration) * 100;
        this.timelineEl.value = percent
        handleBackgroundFill(this.timelineEl);
    }

    handleKeyboardControl(e) {
        {
            const tagName = document.activeElement.tagName.toLowerCase();

            if (tagName === "input") return;

            switch (e.key.toLowerCase()) {
                case " ":
                    this.togglePlay({ force: "toggle" });
                    break;
                case "m":
                    this.toggleMute();
                    break;
                case "f":
                    this.toggleFullScreenMode();
                    break;
                case "arrowleft":
                    this.skip(-5);
                    break;
                case "arrowright":
                    this.skip(5);
                    break;
            }
        }
    }

    handleCursorHide() {
        const videoControlsEl = this.videoContainer.querySelector(".video-controls")

        if (mobileCheck()) return

        if (document.fullscreenElement == null) {
            this.video.removeEventListener("mousemove");
            return
        }


        this.videoContainer.addEventListener('mousemove', () => {
            if (videoControlsEl.matches(':hover')) {
                this.videoContainer.dataset.hidecontrols = "false";
                clearTimeout(this.cursorHideTimeout);
                return
            }

            this.videoContainer.dataset.hidecontrols = "false";
            clearTimeout(this.cursorHideTimeout);
            this.cursorHideTimeout = setTimeout(() => this.videoContainer.dataset.hidecontrols = "true", 2000);
        });
    }

    volControls() {
        const el = `
        <div class="volume-controls">
            <button class="volume-btn">
                <svg class="volume-active-icon" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path fill="#FFFFFF"
                        d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z">
                    </path>
                </svg>

                <svg class="volume-mute-icon" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path fill="#FFFFFF"
                        d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z">
                    </path>
                </svg>
            </button>
            <div class="volume-slider-container">
                <input type="range" min="0" max="1" step="any" value="0.7">
            </div>
        </div>
        `
        this.videoContainer.innerHTML += el
        insertAfter(this.videoContainer.querySelector(".play-pause-btn"), this.videoContainer.querySelector(".volume-controls"))
    }

    slideVol() {
        const el = `
        <div class="full-screen-volume-container">
            <svg class="fs-volume-active-icon" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path fill="#FFFFFF"
                    d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z">
                </path>
            </svg>
            <div class="fs-volume-bar"></div>
        </div>
        `
        this.videoContainer.innerHTML += el
    }

    slideScrub() {
        const el = `
        <div class="full-screen-progress-container">
            <div class="fs-duration-container">
                <div class="fs-current-time">00:00</div>
                /
                <div class="fs-total-time">00:00</div>
            </div>
            <div class="fs-progress-bar"></div>
            <div class="fs-progress-overlay">

            </div>
        </div>
        `
        this.videoContainer.innerHTML += el
    }

    doubleTap() {
        const el = `
        <div class="double-tap-overlay">
            <div class="double-tap-left">
                <img src="https://media1.giphy.com/media/452Zx50ny9RDGBCI07/giphy.gif?cid=ecf05e47erwzfx2katayemxegr78nh1epuf3nxanb0nfq1x2&ep=v1_gifs_related&rid=giphy.gif&ct=s">
                <h1>10 secs</h1>
            </div>
            <div class="double-tap-right">
                <img src="https://media1.giphy.com/media/452Zx50ny9RDGBCI07/giphy.gif?cid=ecf05e47erwzfx2katayemxegr78nh1epuf3nxanb0nfq1x2&ep=v1_gifs_related&rid=giphy.gif&ct=s">
                <h1>10 secs</h1>
            </div>
        </div>
        `
        this.videoContainer.innerHTML += el
    }


    enableFSControls() {
        const fsControls = new FullScreenControls({
            playerContainer: this.videoContainer,
            video: this.video,
            sensitivityX: this.slideControlsScrub.sensitivity ? this.slideControlsScrub.sensitivity : 0.25,
            sensitivityY: this.slideControlsVol.sensitivity ? this.slideControlsVol.sensitivity : 4,
            doubleTapSkip: this.doubleTapControls.amount ? this.doubleTapControls.amount : 5
        });

        const fsControlsEl = this.videoContainer.querySelector(".full-screen-container")
        fsControlsEl.addEventListener('touchstart', (e) => fsControls.handleTouchStart(e));
        fsControlsEl.addEventListener('touchmove', (e) => fsControls.handleTouchMove(e));
        fsControlsEl.addEventListener('touchend', () => fsControls.handleTouchEnd());
    }

    enableVideoOptions() {
        const videoOptions = new UtilsVideoOptions({
            container: this.videoContainer,
            video: this.video,
            sources: this.sources,
            speed: this.speed,
            captions: this.captions
        })

        videoOptions.init()
    }
}

function mobileCheck() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function handleBackgroundFill(e) {
    var target = null
    if (e.target == undefined) target = e
    else target = e.target
    const { min, max, value } = target;
    target.style.backgroundSize = ((value - min) * 100) / (max - min) + "% 100%";
}

function formatDuration(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    if (hours === 0) {
        return `${formattedMinutes}:${formattedSeconds}`;
    } else {
        const formattedHours = String(hours).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
}
