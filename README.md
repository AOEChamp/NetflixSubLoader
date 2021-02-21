# NetflixSubLoader

## About The Project

While using Netflix for studying language with the help of [Language Learning Netflix](https://languagelearningwithnetflix.com/), I found that many titles lacked subtitles in my desired languages. In particular, Netflix often has subtitles region locked (ie JP subs in Japan only). The goal of this project is to load external subtitles into Netflix to allow for efficient language learning.

### Built With

* [Preact](https://preactjs.com/) (lightweight React alternative)
* Redux
* Webpack/Babel

## Getting Started

To use the script with Netflix, you will first need to set up a few things

### Prerequisites

* A Netflix account
* [Language Learning Netflix](https://languagelearningwithnetflix.com/)
* [Tampermonkey](https://www.tampermonkey.net/)
* (Optional) [Netflix - subtitle downloader](https://greasyfork.org/en/scripts/26654-netflix-subtitle-downloader)

### Supported Environments
This project has only been tested on Chrome with Tampermonkey. Greasemonkey, Firefox, etc have not been tested and are not guaranteed to function correctly.

### Installation

Install the script to your browser using Tampermonkey. Navigate to Netflix.

### Usage

Under the subtitles menu, you will find a third section to load external subtitles.

![image](https://user-images.githubusercontent.com/5560163/108628037-e2472b80-749b-11eb-9150-60a591a0bc07.png)

Currently supported subtitle formats:
* WEBVTT

After uploading a subtitle it will automatically be selected. It will also be cached for future use with the same title. Begin playing the video to see subtitles. Note that this script will display subtitles below any LLN subtitles. Subtitles will be displayed as plain text. In order to take advantage of LLN's language learning features, it is recommended to use LLN for the language you wish to learn, and this script for subtitles in your native language.

As an example, a Japanese language learner wishing to watch the title "Attack on Titan" would ideally watch on Netflix Japan. LLN will then display JP subtitles, and this script can be used to upload subtitles. It is up to the user to find subtitles to upload. In some cases, such as the aforementioned title, Netflix itself provides subtitles in different regions. Using the optional script mentioned before, one can download these subtitles and upload them when playing in another region. [uNoGS](https://unogs.com/) can be used to determine subtitle availability by region. Subtitles can also be found online. The author does not endorse any illegal activity, so please check your local copyright laws before downloading any subtitles.

You will often find that external subtitles are out of alignment with the video. If this happens, click on the align button to open the alignment window.

![image](https://user-images.githubusercontent.com/5560163/108628521-cd1fcc00-749e-11eb-98ba-70e61bb18856.png)

The first subtitle displayed will be the next LLN subtitle. Below it will be the expected subtitle from this script. If they do not match, use the left or right arrow to find the expected subtitle. Once found, click the `align` button to set the alignment.

You can also manually align by inputting a number in the box below. Values are in milliseconds. Negative numbers display the subtitle earlier, positive values delay it.

## Building
For developers wishing to build or modify the script:

## Prerequisites
* Node and npm
* [Yarn 2](https://yarnpkg.com/getting-started/install)

## Build
1. `yarn install`
2. `yarn build` for dev or `yarn package` for production

## Dev testing
Use `yarn start` to start the webpack dev server. In the `dist` directory, a `devproxy.user.js` file will be generated. Installing this file in Tampermonkey will allow file changes to be picked up from webpack server on page refresh.
