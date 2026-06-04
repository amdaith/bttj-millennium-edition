// Copyright 2026 Amdaith

/*
yes, my JS probably sucks but I'm not a frontend dev!

also: I am so glad that I am not a frontend dev, this took me forever
to figure out... event listeners are pretty cool though!
*/

/*
  amend all links to add hash with pathname and set target to whole window

    this has to be a function called by frame onload as otherwise it gets
    run before the target frame has loaded :-(
    also this is because I can't figure out a way to run all of this JS stuff
    after the frames have loaded because framesets are used instead of the
    body tag apparently! and yes, I could replace frameset with iframes but
    I am trying to avoid making too many changes to the original code and
    handle as much as possible by just using JS to make modifications on
    top of it!
*/
function enableDeeplinking() {
  aElements = window.frames[2].document.getElementsByTagName("a");
  for (i = 0; i < aElements.length ; i++) {
    // add hash and target to links unless they already have either
    if (!aElements[i].hash && !aElements[i].getAttribute("target")) {
      aElements[i].href = window.location.pathname + "#" + aElements[i].pathname;
      aElements[i].setAttribute("target", "_top");
    } else if (aElements[i].hash && aElements[i].pathname != window.frames[2].location.pathname) {
      // insert pathname hash into URL before existing hash for links with existing hashes
      originalHash = aElements[i].hash;
      aElements[i].href = window.location.pathname + "#" + aElements[i].pathname + originalHash;
      aElements[i].setAttribute("target", "_top");
    }
  }
};

/*
  change frame to pathname in URL hash if specified
*/
document.addEventListener("DOMContentLoaded", (event) => {
  urlHash = window.location.hash.substring(1);
  if (urlHash && urlHash != window.frames[2].location.pathname) {
    window.frames[2].location.replace(urlHash);
  }
});

/*
  listen for changes to URL hash and navigate frame to new pathname
*/
window.addEventListener('hashchange', (event) => {
  urlHash = window.location.hash.substring(1);
  if (urlHash) {
    if (urlHash != window.frames[2].location.pathname) {
      window.frames[2].location.replace(urlHash);
    }
  } else {
    window.location = event.newURL;
  }
});
