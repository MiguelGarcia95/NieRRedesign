navigationScroll();

function navigationScroll() {
  var menus = document.querySelectorAll('.nav-menu .button-container');
  var sections = document.querySelectorAll('.page-section');

  for (var i = 0; i < menus.length; i++) {
    (function () {

      var section = i - 1;
      menus[i].addEventListener('click', function() {
        var height = 0;
        if (section === -1) {
          height = 0
        } else {
          for (var k = section; k >= 0; k--) {
            height += sections[k].clientHeight;
          }
        }
        scrollTo(document.documentElement, height, 800);
      })
    }());
  }

  function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var value = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = value;
      if(currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    }
    animateScroll();
  }

  // t = current time
  // b = start value
  // c = change in value
  // d = duration

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2 * t * t + b;
    t--;
    return -c/2 * (t * (t - 2) - 1) + b;
  };
}
