function language_atw(hljs) {
  return {
    keywords: 'vertex fragment fun def var if',
    contains: [
      {
        className: 'keyword',
        begin: '\\b(vertex|fragment|fun|def|var|if)\\b',
      },
      hljs.HASH_COMMENT_MODE,
    ]
  };
}

document.addEventListener("DOMContentLoaded", function () {
  // Use ?number at the end of the URL to show slide numbers.
  var slideNumber = location.search.indexOf("number") !== -1;

  // Initialize Reveal.
  Reveal.initialize({
    controls: false,
    progress: false,
    center: false,
    transition: 'none',
    history: true,
    dependencies: [
      {
        'src': 'node_modules/reveal.js/plugin/highlight/highlight.js',
        async: true,
        callback: function () {
          hljs.configure({
            languages: ['c', 'javascript', 'atw'],
          });
          hljs.registerLanguage('atw', language_atw);
          hljs.initHighlightingOnLoad();
        },
      }
    ],
    slideNumber: slideNumber,
  });

  // Render math with KaTeX. We replace math in any <span class="math">.
  for (var el of document.querySelectorAll('span.math')) {
    var opts = {};
    if (el.classList.contains("displaymath")) {
      opts = {displayMode: true};
    }
    katex.render(el.textContent, el, opts);
  }

  var dingusEl = document.querySelector('.sscdingus');
  var dingus = sscDingus(dingusEl, {
    history: false,
    lineNumbers: false,
    scrollbars: false,
  });

  var primary = dingusEl.querySelector('.primary');
  var secondary = dingusEl.querySelector('.secondary');

  function dingusPrimary() {
    primary.style.display = 'block';
    secondary.style.display = 'none';
  }
  function dingusSecondary() {
    primary.style.display = 'none';
    secondary.style.display = 'block';
  }

  // Click the arrow to switch the dingus output.
  dingusEl.querySelector('.arrow').addEventListener('click', function () {
    if (primary.style.display === 'block') {
      dingusSecondary();
    } else {
      dingusPrimary();
    }
  });

  function updateDingus() {
    var slide = Reveal.getCurrentSlide();
    var mode = slide.dataset['example'];
    if (mode) {
      // Get the code.
      var codeEls = slide.querySelectorAll('script[type="text/example"]');
      var code = "";
      var preamble = "";
      for (var i = 0; i < codeEls.length; ++i) {
        var el = codeEls[i];
        if (el.dataset["preamble"]) {
          preamble += el.textContent;
        } else {
          code += el.textContent;
        }
      }

      // Fill in the dingus.
      dingus.set_preamble(preamble);
      dingus.run(code.trim(), mode);

      console.log(slide.dataset);
      if (slide.dataset['showcode'] !== undefined) {
        // Show the compiled output code.
        dingusSecondary();
      } else {
        // Show the important stuff (the real output).
        dingusPrimary();
      }

      // Set the current mode as a CSS class for style.
      dingusEl.classList.remove("webgl");
      dingusEl.classList.remove("interp");
      dingusEl.classList.remove("compile");
      dingusEl.classList.add(mode);
      dingus.cm.refresh();

      dingusEl.style.position = 'absolute';
    } else {
      dingusEl.style.position = 'relative';
    }
  }

  Reveal.addEventListener('slidechanged', updateDingus);
  Reveal.addEventListener('ready', updateDingus);

});
