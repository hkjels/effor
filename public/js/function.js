
(function (doc, win) {
  "use strict";

  /**
   * Hide notifications after a `periodOfTime`.
   */

  var periodOfTime = 5000,
      messages;

  if (messages = doc.getElementsByClassName('msg')) {
    for (var key in messages) {
      if (!messages.hasOwnProperty(key) || !messages[key]) continue;
      setTimeout(function () {
        this.classList.add('is-hidden');
      }.bind(messages[key]), periodOfTime);
    }
  }


  /**
   * Animate password-icon.
   * Just a little fun-bit.
   */

  var password;

  if (password = doc.getElementById('password')) {
    password.addEventListener('keyup', function (e) {
      if (this.value.length !== 5) return;
      var lock = doc.getElementsByClassName('unlocked')[0];
      lock.classList.toggle('locked');
    });
  }


  // Highlight code

  hljs.tabReplace = '    ';
  hljs.initHighlightingOnLoad();

})(document, window);

