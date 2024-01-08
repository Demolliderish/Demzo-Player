"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FullScreenControls = /*#__PURE__*/function () {
  function FullScreenControls(_ref) {
    var playerContainer = _ref.playerContainer,
      video = _ref.video,
      sensitivityX = _ref.sensitivityX,
      sensitivityY = _ref.sensitivityY,
      doubleTapSkip = _ref.doubleTapSkip;
    _classCallCheck(this, FullScreenControls);
    _defineProperty(this, "isFullscreen", function () {
      return document.fullscreenElement !== null;
    });
    this.video = video;
    this.playerContainer = playerContainer;
    this.fsTimeline = playerContainer.querySelector(".full-screen-progress-container") || null;
    this.fsTimelineBar = playerContainer.querySelector(".fs-progress-bar") || null;
    this.fsCurrentTime = playerContainer.querySelector(".fs-current-time") || null;
    this.fsTotalTime = playerContainer.querySelector(".fs-total-time") || null;
    this.fsVolume = playerContainer.querySelector(".full-screen-volume-container") || null;
    this.fsVolumeBar = playerContainer.querySelector(".fs-volume-bar") || null;
    this.fsSkipForward = playerContainer.querySelector(".double-tap-right") || null;
    this.fsSkipBackward = playerContainer.querySelector(".double-tap-left") || null;
    this.isDragging = 0;
    this.initialY = 0;
    this.initialX = 0;
    this.secondsToSkip = 0;
    this.currTotalTime = 0;
    this.isHorizontalDrag = null;
    this.sensitivityX = sensitivityX;
    this.sensitivityY = sensitivityY;
    this.lastTapTime = 0;
    this.doubleTaps = 0;
    this.tapTimeout = null;
    this.doubleTapSkip = doubleTapSkip;
    this.initialVolume;
  }
  _createClass(FullScreenControls, [{
    key: "showTimeline",
    value: function showTimeline() {
      this.fsTimeline.style.display = "flex";
      this.fsTimeline.style.opacity = 1;
    }
  }, {
    key: "hideTimeline",
    value: function hideTimeline() {
      this.fsTimeline.style.display = "none";
      this.fsTimeline.style.opacity = 0;
    }
  }, {
    key: "showVolume",
    value: function showVolume() {
      this.fsVolume.style.display = "flex";
      this.fsVolume.style.opacity = 1;
    }
  }, {
    key: "hideVolume",
    value: function hideVolume() {
      this.fsVolume.style.display = "none";
      this.fsVolume.style.opacity = 0;
    }
  }, {
    key: "handleVerticalDrag",
    value: function handleVerticalDrag(deltaY) {
      var volumeSlider = this.playerContainer.querySelector(".volume-slider-container input[type='range']");
      if (this.fsTimeline != null) this.hideTimeline();
      this.showVolume();
      var screenHeight = window.innerHeight;
      var volumePercentage = deltaY / screenHeight * 100;
      var volumeChange = volumePercentage * this.sensitivityY / 100;
      var newVolume = Math.min(Math.max(this.initialVolume - volumeChange, 0), 1);
      this.video.volume = newVolume;
      volumeSlider.value = this.video.volume;
      this.fsVolumeBar.style.backgroundSize = newVolume * 100 + "% 100%";
      this.video.muted = this.video.volume === 0;
      this.playerContainer.dataset.muted = this.video.muted.toString();
      handleBackgroundFill(volumeSlider);
    }
  }, {
    key: "handleHorizontalDrag",
    value: function handleHorizontalDrag(deltaX) {
      if (this.fsVolume != null) this.hideVolume();
      this.showTimeline();
      var screenWidth = window.innerWidth;
      var relativeDistance = deltaX / screenWidth * this.sensitivityX;
      this.secondsToSkip = relativeDistance * this.video.duration;
      this.playerContainer.dataset.hidecontrols = "true";
      this.currTotalTime = Math.max(0, Math.min(this.video.currentTime + this.secondsToSkip, this.video.duration));
      this.fsCurrentTime.textContent = formatDuration(this.currTotalTime);
      this.fsTimelineBar.style.backgroundSize = this.currTotalTime * 100 / this.video.duration + "% 100%";
    }
  }, {
    key: "handleDoubleTap",
    value: function handleDoubleTap() {
      var _this = this;
      if (this.fsSkipForward == null) return false;
      var currentTime = new Date().getTime();
      var timeSinceLastTap = currentTime - this.lastTapTime;
      var state = false;
      if (timeSinceLastTap < 300) {
        if (this.tapTimeout != null) clearTimeout(this.tapTimeout);
        var screenWidth = window.innerWidth;
        if (this.initialX >= screenWidth / 2) {
          this.doubleTaps++;
          this.fsSkipForward.style.opacity = "1";
          this.fsSkipForward.querySelector('h1').innerHTML = "".concat(Math.abs(this.doubleTaps) * this.doubleTapSkip, " secs");
        } else {
          this.doubleTaps--;
          this.fsSkipBackward.style.opacity = "1";
          this.fsSkipBackward.querySelector('h1').innerHTML = "".concat(Math.abs(this.doubleTaps) * this.doubleTapSkip, " secs");
        }
        this.tapTimeout = setTimeout(function () {
          _this.fsSkipBackward.style.opacity = "0";
          _this.fsSkipForward.style.opacity = "0";
          _this.video.currentTime = Math.max(0, Math.min(_this.video.currentTime + _this.doubleTaps * _this.doubleTapSkip, _this.video.duration));
          _this.doubleTaps = 0;
          clearTimeout(_this.tapTimeout);
        }, 800);
        state = true;
      }
      this.lastTapTime = currentTime;
      return state;
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(e) {
      if (!this.isFullscreen()) return;
      this.initialX = e.touches[0].clientX;
      this.initialY = e.touches[0].clientY;
      this.initialVolume = this.video.volume;
      if (this.fsTotalTime != null) this.fsTotalTime.innerHTML = formatDuration(this.video.duration);
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(e) {
      if (!this.isFullscreen()) return;
      this.isDragging = true;
      var currentX = e.touches[0].clientX;
      var deltaX = currentX - this.initialX;
      var currentY = e.touches[0].clientY;
      var deltaY = currentY - this.initialY;
      if (this.isHorizontalDrag === null) this.isHorizontalDrag = Math.abs(deltaX) > Math.abs(deltaY);else if (!this.isHorizontalDrag && this.fsVolume != null) this.handleVerticalDrag(deltaY);else if (this.isHorizontalDrag && this.fsTimeline != null) this.handleHorizontalDrag(deltaX);else return;
    }
  }, {
    key: "handleTouchEnd",
    value: function handleTouchEnd() {
      if (this.fsTimeline != null) this.hideTimeline();
      if (this.fsVolume != null) this.hideVolume();
      if (this.handleDoubleTap()) return;
      if (!this.isDragging || !this.isFullscreen()) {
        this.playerContainer.dataset.hidecontrols = this.playerContainer.dataset.hidecontrols == "true" ? "false" : "true";
        return;
      }
      this.isDragging = false;
      if (this.fsTimeline == null) return;
      if (this.isHorizontalDrag) this.video.currentTime = this.currTotalTime;
      this.isHorizontalDrag = null;
    }
  }]);
  return FullScreenControls;
}();
function mobileCheck() {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
;
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function handleBackgroundFill(e) {
  var target = null;
  if (e.target == undefined) target = e;else target = e.target;
  var _target = target,
    min = _target.min,
    max = _target.max,
    value = _target.value;
  target.style.backgroundSize = (value - min) * 100 / (max - min) + "% 100%";
}
function formatDuration(time) {
  var seconds = Math.floor(time % 60);
  var minutes = Math.floor(time / 60) % 60;
  var hours = Math.floor(time / 3600);
  var formattedMinutes = String(minutes).padStart(2, '0');
  var formattedSeconds = String(seconds).padStart(2, '0');
  if (hours === 0) {
    return "".concat(formattedMinutes, ":").concat(formattedSeconds);
  } else {
    var formattedHours = String(hours).padStart(2, '0');
    return "".concat(formattedHours, ":").concat(formattedMinutes, ":").concat(formattedSeconds);
  }
}
module.exports = FullScreenControls;