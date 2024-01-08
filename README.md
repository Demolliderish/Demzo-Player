# Demzo Player

## Why use this package?

This is custom made lightweight vanilla JS video-player with useful customizable features. It has 0 dependencies.

## Getting Started

**INSTALLATION**
`npm i demzo-player`

**CommonJS:**
```js
const Player = require('@demolliderish/demzo-player').default;

// Create new instance of demzoPlayer
// Please select the parent node which you want the player to be contained in 'container' parameter
const player = new Player('[INSERT PATH/URL TO MP4]', {
    container: parent_node,
})

```

**ESModule:**
```js
import demzoPlayer from `@demolliderish/demzo-player`

// Create new instance of demzoPlayer
// Please select the parent node which you want the player to be contained in 'container' parameter
const player = new demzoPlayer('[INSERT PATH/URL TO MP4]', {
    container: parent_node,
})

// e.g.
const player = new demzoPlayer('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', {
    container: document.querySelector('.player-container'),
});


```

## Options

| Property | Default | Description |
|---|---|---|
| container | `N/A, required` | Define node which player will be contained in |
| theme | `#C082FF` | Define the colour-theme used throughout the player |
| keyboardControls | `true` | When true; toggle keyboard controls for the player, e.g. Pressing 'F' = toggles fullscreen |
| volumeControls | `true` | When true; allows the user to change the volume of the video in browser |
| speedControls | `true` | When true; allows the user to change the playback rate of the video |
| slideControls | `false` | When true; allows the user access fullscreen sliding behaviour. See [slide controls](#slide-controls) |
| doubleTap | `false`| When true; allows the user (if in full screen AND `mobileCheck() = true`) to skip forwards/backwards by set amount of time. See [double tap](#double-tap)|
| sources | `undefined` | If you have multiple sources (e.g. different qualities 720p and 1080p) define them here. See [sources and captions](#sources-and-captions) |
| captions | `undefined` | If you have caption(s) define them here. See [sources and captions](#sources-and-captions) |


### Slide Controls
There are two types of slide controls. Seek and volume. 

Slide controls are ONLY enabled when the user is in fullscreen AND their device is a mobile device. Defined when `mobileCheck() = true`

#### Seek
Seek allows the user to SKIP forwards/backwards in the video depending on the amount of the screen's WIDTH the user drags/slides their finger by.

**NOTE** : If sensitivity is NOT set, it defaults to 0.25 (25% of video for **FULL** width)

```js
const player = new demzoPlayer('[INSERT PATH/URL TO MP4]', {
    container: parent_node,
    slideControls: {
        seek: {
            enable: true, // Enable/disable feature
            sensitivity: 0.5 // What percentage of the video is skipped when the user drags the FULL width of their screen. 0.5 = 1/2 of the video is skipped.
        }
    }
})
```

#### Volume
Volume allows the user to increase the volume of the video depending on the amount of the screen's HEIGHT the user drags/slides their finger by.

**NOTE** : If sensitivity is NOT set, it defaults to 4 (Full volume change for **1/4** of height)

```js
const player = new demzoPlayer('[INSERT PATH/URL TO MP4]', {
    container: parent_node,
    slideControls: {
        volume: {
            enable: true, // Enable/disable feature
            sensitivity: 2 // What percentage of the volume is changed when the user drags the FULL height of their screen. 2 = It takes 1/2 of height to change volume by 100%.
        }
    }
})
```

#### Both
If you want **both** slide control features enabled AND at their **default** value simply set slideControls to true

```js
const player = new demzoPlayer('[INSERT PATH/URL TO MP4]', {
    container: parent_node,
    slideControls: true
})
```

### Double Tap
When enabled, if the user double taps the screen it skips forwards (if on right side) and backwards (if on left side). 

**NOTE** : The amount of seconds skipped defaults to 5 seconds if not defined

Double taps is ONLY enabled when the user is in fullscreen AND their device is a mobile device. Defined when mobileCheck() = true

```js
const player = new demzoPlayer('[INSERT PATH/URL TO MP4]', {
    container: parent_node,
    doubleTap: {
        enable: true, // Enable/disable feature
        amount: 10 // Amount of seconds skipped when double tapping, 10 = 10 seconds
    }
})
```

### Sources And Captions
Properties which, when defined, allows the user to change sources and/or toggle captions (with options)

#### Sources
User is able to change between sources in one player without loading out of page

**IMPORTANT** : If using this feauture ensure you make the src param to **FALSE**
```js
const player = new demzoPlayer(false, { // <== false
    container: parent_node,
    sources: {
        default: { // The source the player will play (default to) upon loading
            title: 'Title One',
            src: 'src'
        },
        others: [ // Rest of sources
            {
                title: 'Title Two',
                src: 'src2'
            },
            {
                title: 'Title Three',
                src: 'src3'
            },
            // ...
        ]
    }
})
```

#### Captions
Displays WebVTT captions when the user requests it

```js
const player = new demzoPlayer('[INSERT PATH/URL TO MP4]', {
    container: parent_node,
    captions: {
        default: {
            title: 'English',
            src: './spanish.vtt'
        },
        others: [
            {
                title: 'Spanish',
                src: './spanish.vtt',
            },
            // ...
        ]
    }
})
```

### Example Options
You can set the global language which YouTube should return results in or set the return language per search/request:
```js
const player = new demzoPlayer(false, {
    container: document.querySelector('.player-container'), // Define parent container
    doubleTap: true, // Enable double taps at default value (5 seconds)
    slideControls: { 
        seek: {
            enable: true // Only have seek enabled, at default sensitivity (0.25)
        }
    },
    theme: '#ED9F4A', // Set custom theme colour
    sources: { 
        default: { // Default Source
            title: '360p',
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"'
        },
        others: [ // Other Sources
            {
                title: '1080p',
                src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            }
        ]

    },
    captions: {
        default: { // Default Captions
            title: 'English',
            src: './english.vtt'
        },
        others: [ // Other Captions
            {
                title: 'Spanish',
                src: './spanish.vtt',
            }
        ]

    }
})
```
