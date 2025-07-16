// ==UserScript==


2
// @name         Copy All Page Links


3
// @namespace    http://your.namespace


4
// @version      1.0


5
// @description  Copy all <a href> links from the current page silently via menu


6
// @author       Cr'x Nihab


7
// @match        *://*/*


8
// @grant        GM_registerMenuCommand


9
// @grant        GM_setClipboard


10
// ==/UserScript==


11
​


12


(function() {


13
    'use strict';


14
​


15


    function copyAllLinks() {


16
        const links = Array.from(document.querySelectorAll('a[href]'))


17
            .map(a => a.href)


18
            .filter(href => href && href.startsWith('http'))


19
            .join('\n');


20
​


21


        if (links) {


22
            GM_setClipboard(links, 'text');


23
            console.log(`[Copy All Links] Copied ${links.split('\n').length} links.`);


24


        } else {


25
            console.log('[Copy All Links] No links found.');


26
        }


27
    }


28
​


29
    GM_registerMenuCommand("📋 Copy All Links", copyAllLinks);


30
})();
