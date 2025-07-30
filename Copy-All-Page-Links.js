// ==UserScript==
// @name         Convert Plain URLs to Clickable Links
// @namespace    ViolentmonkeyCustom
// @version      1.0
// @description  Make plain text URLs clickable so Firefox shows "Open in new tab"
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function linkifyTextNodes(rootNode) {
    const urlRegex = /https?:\/\/[^\s"<>()]+/g;

    const treeWalker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          return node.parentNode && node.parentNode.nodeName !== 'A' && urlRegex.test(node.nodeValue)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      },
      false
    );

    const nodes = [];
    while (treeWalker.nextNode()) {
      nodes.push(treeWalker.currentNode);
    }

    nodes.forEach(textNode => {
      const parent = textNode.parentNode;
      const frag = document.createDocumentFragment();

      const parts = textNode.nodeValue.split(urlRegex);
      const matches = textNode.nodeValue.match(urlRegex);

      parts.forEach((part, i) => {
        frag.appendChild(document.createTextNode(part));
        if (matches && matches[i]) {
          const a = document.createElement('a');
          a.href = matches[i];
          a.textContent = matches[i];
          a.style.wordBreak = "break-word";
          a.target = "_blank";
          frag.appendChild(a);
        }
      });

      parent.replaceChild(frag, textNode);
    });
  }

  function run() {
    linkifyTextNodes(document.body);
  }

  run();

  // Observe dynamically loaded content
  new MutationObserver(() => run()).observe(document.body, { childList: true, subtree: true });
})();
