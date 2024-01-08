class FullScreenControls {
    constructor({ playerContainer, video, sensitivityX, sensitivityY }) {
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
                this.fsSkipForward.querySelector('h1').innerHTML = `${Math.abs(this.doubleTaps) * 10} secs`
            } else {
                this.doubleTaps--
                this.fsSkipBackward.style.opacity = "1";
                this.fsSkipBackward.querySelector('h1').innerHTML = `${Math.abs(this.doubleTaps) * 10} secs`
            }

            this.tapTimeout = setTimeout(() => {
                this.fsSkipBackward.style.opacity = "0";
                this.fsSkipForward.style.opacity = "0";
                this.video.currentTime = Math.max(0, Math.min(this.video.currentTime + (this.doubleTaps * 10), this.video.duration));

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

export default FullScreenControls