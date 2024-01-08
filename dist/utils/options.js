"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UtilsVideoOptions = /*#__PURE__*/function () {
  function UtilsVideoOptions(_ref) {
    var _captions$default$src;
    var container = _ref.container,
      video = _ref.video,
      sources = _ref.sources,
      speed = _ref.speed,
      captions = _ref.captions;
    _classCallCheck(this, UtilsVideoOptions);
    this.container = container;
    this.video = video;
    this.toggleSources = sources;
    this.toggleSpeed = speed;
    this.toggleCaptions = captions;
    this.activeCaption = (_captions$default$src = captions === null || captions === void 0 ? void 0 : captions["default"].src) !== null && _captions$default$src !== void 0 ? _captions$default$src : undefined;
    this.captionEl = null;
  }
  _createClass(UtilsVideoOptions, [{
    key: "init",
    value: function init() {
      var _this = this;
      this.main();
      if (this.toggleSpeed) {
        this.speed();
        this.container.querySelector('.video-options-speed-menu').addEventListener('click', function () {
          return _this.container.querySelector('.video-options').dataset.active = "speed";
        });
        this.container.querySelectorAll('.video-options-speed-button').forEach(function (button) {
          button.addEventListener('click', function (e) {
            _this.handlePlaybackSpeed(e);
            button.dataset.selected = "true";
            _this.container.querySelectorAll('.video-options-speed-button').forEach(function (otherButton) {
              if (otherButton !== button) {
                otherButton.dataset.selected = "false";
              }
            });
          });
        });
      }
      if (this.toggleSources != undefined) {
        this.sources();
        this.container.querySelector('.video-options-sources-menu').addEventListener('click', function () {
          return _this.container.querySelector('.video-options').dataset.active = "sources";
        });
        this.container.querySelectorAll('.video-options-sources-button').forEach(function (button) {
          button.addEventListener('click', function (e) {
            _this.handleSourceChange(e);
            button.dataset.selected = "true";
            _this.container.querySelectorAll('.video-options-sources-button').forEach(function (otherButton) {
              if (otherButton !== button) {
                otherButton.dataset.selected = "false";
              }
            });
          });
        });
      }
      if (this.toggleCaptions != undefined) {
        this.captions();
        this.video.querySelector('track').setAttribute('src', this.activeCaption);
        this.captionEl = this.video.textTracks[0];
        this.captionEl.mode = "hidden";
        var toggleCaptionsBtn = "\n            <button class=\"captions-btn\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\"\n                    viewBox=\"0 0 576 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->\n                    <path fill=\"#FFFFFF\"\n                        d=\"M0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 208c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48s21.5-48 48-48zm144 48c0-26.5 21.5-48 48-48c14.2 0 27 6.1 35.8 16c8.8 9.9 24 10.7 33.9 1.9s10.7-24 1.9-33.9c-17.5-19.6-43.1-32-71.5-32c-53 0-96 43-96 96s43 96 96 96c28.4 0 54-12.4 71.5-32c8.8-9.9 8-25-1.9-33.9s-25-8-33.9 1.9c-8.8 9.9-21.6 16-35.8 16c-26.5 0-48-21.5-48-48z\" />\n                </svg>\n            </button>\n            ";
        prependHTMLString(this.container.querySelector('.controls-right'), toggleCaptionsBtn);
        this.container.querySelector('.captions-btn').addEventListener('click', function () {
          _this.container.dataset.captions = _this.container.dataset.captions == "true" ? "false" : "true";
          _this.captionEl.mode = _this.captionEl.mode == "hidden" ? "showing" : "hidden";
        });
        this.container.querySelector('.video-options-captions-menu').addEventListener('click', function () {
          return _this.container.querySelector('.video-options').dataset.active = "captions";
        });
        this.container.querySelectorAll('.video-options-captions-button').forEach(function (button) {
          button.addEventListener('click', function (e) {
            _this.handleCaptions(e);
            button.dataset.selected = "true";
            _this.container.querySelectorAll('.video-options-captions-button').forEach(function (otherButton) {
              if (otherButton !== button) {
                otherButton.dataset.selected = "false";
              }
            });
          });
        });
      }
      this.container.querySelectorAll('.video-options-back').forEach(function (button) {
        button.addEventListener('click', function () {
          _this.container.querySelector('.video-options').dataset.active = "main";
        });
      });
    }
  }, {
    key: "main",
    value: function main() {
      var _this2 = this;
      var el = "\n        <div class=\"video-options-container\" data-active=\"false\">\n            <button class=\"video-options-btn\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\"\n                    viewBox=\"0 0 512 512\"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->\n                    <path fill=\"#FFFFFF\"\n                        d=\"M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z\" />\n                </svg>\n            </button>\n\n            <div class=\"video-options\" data-active=\"main\">\n\n            </div>\n        </div>\n        ";
      prependHTMLString(this.container.querySelector('.controls-right'), el);
      this.container.querySelector('.video-options-btn').addEventListener('click', function () {
        var videoOptionsContainer = _this2.container.querySelector('.video-options-container');
        var currentActiveValue = videoOptionsContainer.dataset.active;
        videoOptionsContainer.dataset.active = currentActiveValue === "true" ? "false" : "true";
      });
    }
  }, {
    key: "speed",
    value: function speed() {
      var _this3 = this;
      var speeds = [0.5, 0.75, 'Normal', 1.25, 1.5, 1.75, 2, 4];
      var el = "\n        <div class=\"video-options-item video-options-main video-options-speed-menu\">\n            <h1>Speed</h1>\n            <h2>Normal</h2>\n            <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16\" width=\"10\"\n                viewBox=\"0 0 320 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->\n                <path\n                    d=\"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z\" />\n            </svg>\n        </div>\n        ";
      var backMenu = "\n        <div class=\"video-options-item video-options-speed video-options-back\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16\" width=\"10\"\n                viewBox=\"0 0 320 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->\n                <path\n                    d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z\" />\n            </svg>\n            <h1>Playback Speed</h1>\n        </div>\n        ";
      prependHTMLString(this.container.querySelector('.video-options'), el);
      prependHTMLString(this.container.querySelector('.video-options'), backMenu);
      speeds.forEach(function (speed) {
        var speed_el = "\n            <div class=\"video-options-item video-options-speed video-options-speed-button\" data-selected=\"".concat(speed == 'Normal' ? 'true' : 'false', "\" data-value=\"").concat(speed, "\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16\" width=\"14\"\n                    viewBox=\"0 0 448 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->\n                    <path\n                        d=\"M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z\" />\n                </svg>\n                <h1>").concat(speed == 'Normal' ? 'Normal' : speed + 'x', "</h1>\n            </div>\n            ");
        _this3.container.querySelector('.video-options').innerHTML += speed_el;
      });
    }
  }, {
    key: "handlePlaybackSpeed",
    value: function handlePlaybackSpeed(e) {
      var speed = e.target.closest('.video-options-speed-button').getAttribute('data-value');
      if (speed == 'Normal') {
        this.video.playbackRate = 1.0;
        return;
      }
      this.video.playbackRate = parseFloat(speed);
    }
  }, {
    key: "handleSourceChange",
    value: function handleSourceChange(e) {
      var source = e.target.closest('.video-options-sources-button').getAttribute('data-value');
      var prevTime = this.video.currentTime;
      var playing = this.video.paused;
      this.video.src = source;
      this.video.currentTime = prevTime;
      if (!playing) this.video.play();
    }
  }, {
    key: "handleCaptions",
    value: function handleCaptions(e) {
      var selectedCaption = e.target.closest('.video-options-captions-button').getAttribute('data-value');
      this.activeCaption = selectedCaption;
      this.video.querySelector('track').setAttribute('src', this.activeCaption);
    }
  }, {
    key: "sources",
    value: function sources() {
      var _this4 = this;
      var original = this.toggleSources["default"];
      var others = this.toggleSources.others;
      var el = "\n        <div class=\"video-options-item video-options-main video-options-sources-menu\">\n            <h1>Sources</h1>\n            <h2>".concat(original.title, "</h2>\n            <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16\" width=\"10\"\n                viewBox=\"0 0 320 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->\n                <path\n                    d=\"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z\" />\n            </svg>\n        </div>\n        ");
      var backMenu = "\n        <div class=\"video-options-item video-options-sources video-options-back\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16\" width=\"10\"\n                viewBox=\"0 0 320 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->\n                <path\n                    d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z\" />\n            </svg>\n            <h1>Sources</h1>\n        </div>\n        ";
      prependHTMLString(this.container.querySelector('.video-options'), el);
      prependHTMLString(this.container.querySelector('.video-options'), backMenu);
      var originalEL = sourceElement(original, 'sources', true);
      appendHtmlString(this.container.querySelector('.video-options'), originalEL);
      if (others == undefined) return;
      others.forEach(function (source) {
        var othersEl = sourceElement(source, 'sources');
        appendHtmlString(_this4.container.querySelector('.video-options'), othersEl);
      });
    }
  }, {
    key: "captions",
    value: function captions() {
      var _this5 = this;
      var original = this.toggleCaptions["default"];
      var others = this.toggleCaptions.others;
      var el = "\n        <div class=\"video-options-item video-options-main video-options-captions-menu\">\n            <h1>Captions</h1>\n            <h2>".concat(original.title, "</h2>\n            <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16\" width=\"10\"\n                viewBox=\"0 0 320 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->\n                <path\n                    d=\"M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z\" />\n            </svg>\n        </div>\n        ");
      var backMenu = "\n        <div class=\"video-options-item video-options-captions video-options-back\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16\" width=\"10\"\n                viewBox=\"0 0 320 512\"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->\n                <path\n                    d=\"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z\" />\n            </svg>\n            <h1>Captions</h1>\n        </div>\n        ";
      prependHTMLString(this.container.querySelector('.video-options'), el);
      prependHTMLString(this.container.querySelector('.video-options'), backMenu);
      var originalEL = sourceElement(original, 'captions', true);
      appendHtmlString(this.container.querySelector('.video-options'), originalEL);
      if (others == undefined) return;
      others.forEach(function (caption) {
        var othersEl = sourceElement(caption, 'captions');
        appendHtmlString(_this5.container.querySelector('.video-options'), othersEl);
      });
    }
  }]);
  return UtilsVideoOptions;
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
function prependHTMLString(parentElement, htmlString) {
  if (parentElement) {
    parentElement.insertAdjacentHTML('afterbegin', htmlString);
  } else {
    console.error("Parent element with selector '".concat(parentSelector, "' not found."));
  }
}
function appendHtmlString(element, htmlString) {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString.trim();
  while (tempDiv.firstChild) {
    element.appendChild(tempDiv.firstChild);
  }
}
function sourceElement(source, type) {
  var selected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return "\n    <div class=\"video-options-item video-options-".concat(type, " video-options-").concat(type, "-button\" data-selected=\"").concat(selected, "\" data-value=\"").concat(source.src, "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"16\" width=\"14\" viewBox=\"0 0 448 512\">\n            <path d=\"M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z\" />\n        </svg>\n        <h1>").concat(source.title, "</h1>\n    </div>\n    ");
}
module.exports = UtilsVideoOptions;