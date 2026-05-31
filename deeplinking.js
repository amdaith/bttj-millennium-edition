function enableDeeplinking() {
  // change frame to pathname in URL hash if specified
  urlHash = window.location.hash.substring(1);
  if (urlHash && urlHash != window.frames[2].location.pathname) {
    console.log('Navigating to URL hash:', urlHash);
    window.frames[2].location.replace(urlHash);
  }

  // amend all links to add hash with pathname and set target to whole window
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
}

// listen for changes to URL hash and navigate frame to new pathname
window.addEventListener('hashchange', (event) => {
  console.log(`The URL hash changed!`);
  console.log('Old URL:', event.oldURL);
  console.log('New URL:', event.newURL);

  urlHash = window.location.hash.substring(1);
  console.log('New hash:', urlHash);
  if (urlHash) {
    if (urlHash != window.frames[2].location.pathname) {
      console.log('hashchange nav:', urlHash);
      window.frames[2].location.replace(urlHash);
    }
  } else {
    window.location = event.newURL;
  }
});
