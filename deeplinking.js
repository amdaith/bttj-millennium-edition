// Copyright 2026 Amdaith

/*
Yes, my JS probably sucks but I'm not a frontend dev!

Also: I am so glad that I am not a frontend dev, this took me forever
to figure out... Event listeners are pretty cool though!
*/

/*
  Amend all links to add hash with pathname and set target to whole window

    This has to be a function called by frame onload as otherwise it gets
    run before the target frame has loaded :-(
    Also this is because I can't figure out a way to run all of this JS stuff
    after the frames have loaded because framesets are used instead of the
    body tag apparently! And yes, I could replace frameset with iframes but
    I am trying to avoid making too many changes to the original code and
    handle as much as possible by just using JS to make modifications on
    top of it!
*/
function enableDeeplinking() {
  aElements = window.frames[2].document.getElementsByTagName("a");
  for (i = 0; i < aElements.length ; i++) {
    // add hash and target to links as long as they don't have both already
    if (!aElements[i].hash
        && !aElements[i].getAttribute("target")
        // also don't apply to mailto links (no hostname) or external links
        && (aElements[i].hostname && aElements[i].hostname == window.location.hostname)
      ) {
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
  Navigate content frame to pathname in URL hash if specified

    I've used DOMContentLoaded here because it gets fired earlier than load!
*/
document.addEventListener("DOMContentLoaded", (event) => {
  urlHash = window.location.hash.substring(1);
  if (urlHash && urlHash != window.frames[2].location.pathname) {
    window.frames[2].location.replace(urlHash);
  }
});

/*
  Listen for changes to URL hash and navigate content frame to new pathname
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
