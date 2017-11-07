function styleCenter() {
  var playBtn = document.querySelectorAll('.play-container img');
  var playContainer = document.querySelectorAll('.play-container');
  var image = document.querySelectorAll('.trailer-cover');

  var playHeight = playBtn[0].clientHeight;
  var coverHeight = image[0].clientHeight;

  var topMargin = 20 + coverHeight/2 - playHeight/2;

  for(var i = 0; i < playContainer.length; i++) {
    playContainer[i].style.marginTop = topMargin + 'px';
  }
}

function navFunctionality() {
  var pageSections = document.querySelectorAll('.page-section');
  var navButtons = document.querySelectorAll('.nav-menu .button');
  var navButtonContainers = document.querySelectorAll('.nav-menu .button-container');

  var navMenuTopMargin = 20;
  var welcomePageHeight = pageSections[0].clientHeight;
  var navButtonHeight = navButtons[0].clientHeight;
  var menuYOffset = navMenuTopMargin + window.pageYOffset;
  var rightMargin = 70 + 'px';
  var leftMargin = 80 + 'px';

  resetMargins();
  navLogic();

  window.addEventListener('load', navLogic);
  // window.addEventListener('resize', navLogic);
  window.addEventListener('resize', resetMargins);

  function resetMargins() {
    var mq = window.matchMedia( "(max-width: 930px)" );
    if (mq.matches) {
      rightMargin = 0 + 'px';
      leftMargin = 0 + 'px';
      navLogic();
    }
  }

  function navLogic() {
    for (var i = 0; i < navButtons.length; i++) {
      var buttonHeight = navMenuTopMargin + (i) * navButtonHeight + window.pageYOffset + ((i + 1) * navMenuTopMargin);

      if( menuYOffset > welcomePageHeight) {
        for(var i = 0; i < navButtons.length; i++) {
          navButtonContainers[i].style.marginLeft = 0 + "px";
          navButtonContainers[i].style.marginRight = 0 + "px";
          navButtonContainers[i].classList.add('nav-menu-faded');
        }
      } else if(buttonHeight >= welcomePageHeight) {
        navButtonContainers[i].classList.add('nav-menu-faded');
        navButtonContainers[i].style.marginRight = 0 + "px";
        navButtonContainers[i].style.marginLeft = rightMargin;
      } else if (buttonHeight < welcomePageHeight) {
        navButtonContainers[i].classList.remove('nav-menu-faded');
        navButtonContainers[i].style.marginRight = leftMargin;
        navButtonContainers[i].style.marginLeft = 0 + "px";
      }
    }
  }
}

function slider() {
  var slides = document.querySelectorAll('.slide');
  var slider = document.querySelector('.slider');
  var slideContainer = document.querySelector('.slider-container');
  var arrowLeft = document.querySelector('.arrow-left');
  var arrowRight = document.querySelector('.arrow-right');
  var emil = document.querySelector('.emil img');
  var slideDescription = document.querySelectorAll('.slide-description');
  var slideImg = document.querySelectorAll('.slide-img img');
  var slideWidth = slides[0].clientWidth;
  var slideHeight = slides[0].clientHeight;
  var sliderWidth = slider.clientWidth;
  var center = sliderWidth/2;
  var currentSlide = 1;

  var leftSpacing = slider.style.left;

  slider.style.left = centerSlide(currentSlide) + "px";

  window.addEventListener('resize', initialize);
  window.addEventListener('resize', resizeSlider);
  window.addEventListener('resize', centerImage);
  window.addEventListener('load', centerImage);
  window.addEventListener('load', centerDescription);

  arrowLeft.addEventListener('click', previous);
  arrowRight.addEventListener('click', next);

  function centerImage() {
    for (var i = 0; i < slideImg.length; i++) {
      var imageHeight = slideImg[i].clientHeight;
      var imageTopMargin = (slideHeight/2) - imageHeight/2;
      slideImg[i].style.marginTop = imageTopMargin + 'px';
    }
  }

  function centerDescription() {
    for (var i = 0; i < slideDescription.length; i++) {
      var descriptionTopMargin = (slideHeight/2) - (slideDescription[i].clientHeight/2);
      slideDescription[i].style.marginTop = descriptionTopMargin + 'px';
    }
  }

  function initialize() {
    centerImage();
    centerDescription();
    slideWidth = slides[0].clientWidth;
    sliderWidth = slider.clientWidth;
    center = slideWidth/2;
    slider.style.left = centerSlide(currentSlide) + "px";
  }

  function centerSlide(slide) {
    if (slide === 1) {
      return 0;
    } else if (slide === slides.length) {
      var totalSliderWidth = (slideWidth * slides.length) + (slides.length - 1) * 8;
      var whiteSpace = (slides - 1) * 8;
      var position = -totalSliderWidth + sliderWidth;
      return position;
    } else {
      var offset = slide - 1;
      var whiteSpace = (slide - 1) * 8;
      var position = center - slideWidth/2 - (offset * slideWidth);
      return position - whiteSpace;
    }
  }

  function resizeSlider() {
    setTimeout(function() {
      var newSlides = document.querySelectorAll('.slide');
      var newSlideWidth = newSlides[0].clientWidth;
      if(newSlideWidth !== slideWidth) {
        initialize();
      }
    }, 801);
  }

  function previous() {
    if(currentSlide <= slides.length && currentSlide > 1) {
      currentSlide--;
    } else {
      currentSlide = slides.length;
    }
    slider.style.left = centerSlide(currentSlide) + 'px';
  }

  function next() {
    if(currentSlide < slides.length) {
      currentSlide++;
    } else {
      currentSlide = 1;
    }
    slider.style.left = centerSlide(currentSlide) + 'px';
  }
}

function centerText(textClass, containerClass) {
  var textBox = document.querySelector(textClass);
  var container = document.querySelector(containerClass);
  var textHeight =  textBox.clientHeight;
  var containerHeight = container.clientHeight;

  var topMaring = containerHeight/2 - textHeight/2;

  textBox.style.marginTop = topMaring + 'px';
}

slider();
window.addEventListener('load', function() {
  centerText('.story', '.story-container')
});
window.addEventListener('resize', styleCenter);
window.addEventListener('resize', function() {
  setTimeout(function() {
    styleCenter()
  }, 801);
});
// window.onload = styleCenter();
window.addEventListener('load', styleCenter);
window.addEventListener('load', navFunctionality);
window.addEventListener('resize', navFunctionality);
window.addEventListener('scroll', navFunctionality);
