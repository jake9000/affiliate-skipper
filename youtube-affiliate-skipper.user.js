// ==UserScript==
// @name         YouTube Affiliate Detector
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically scroll down when an affiliate sticker is in use. buy an ad you fucks.
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

 (function () {
  'use strict';

  let skipTimer = 0;

  function checkForAffiliate() {
    const now = Date.now();
    if (now - skipTimer < 2000) return;

    const fresh = document.querySelectorAll('.ytOverlayProductStickerHost:not([data-skipped])');
    if (fresh.length > 0) {
      console.log('affiliate detected');
      skipTimer = now;
      fresh.forEach(function (el) { el.dataset.skipped = '1'; });
      const navBtn = document.querySelector('#navigation-button-down button');
      if (navBtn) {
        navBtn.click();
      } else {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40, which: 40, bubbles: true }));
      }
    }
  }

  checkForAffiliate();

  const observer = new MutationObserver(checkForAffiliate);
  observer.observe(document.body, { childList: true, subtree: true });
})();
