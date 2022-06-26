
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

/**Video */
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function myFunction() {
    if (video.paused) {
        video.play();
        btn.innerHTML = "Pause";
    } else {
        video.pause();
        btn.innerHTML = "Play";
    }
}

var priceCalculator = document.getElementById('quote-calc');
priceCalculator.onchange = calculatesubtotal;
priceCalculator.onchange();
function calculatesubtotal() {
	var hostel = Number(document.getElementById('hostel').value) || 0;
	var hotel = Number(document.getElementById('hotel').value) || 0;
	var motel = Number(document.getElementById('motel').value) || 0;
	var house = Number(document.getElementById('house').value) || 0;
	var extras = 0;
	var breakfast = 0;
	var lunch = 0;
	var dinner = 0;
	var internet = 0;
	var laundry = 0;
		if ( $( "#breakfast-col" ).hasClass( "on" ) ) {  breakfast = 100; }
		if ( $( "#lunch-col" ).hasClass( "on" ) ) { lunch = 100; }
		if ( $( "#dinner-col" ).hasClass( "on" ) ) { dinner = 100; }
		if ( $( "#internet-col" ).hasClass( "on" ) ) { internet = 20; }
		if ( $( "#laundry-col" ).hasClass( "on" ) ) { laundry = 40; }
	extras = breakfast + lunch + dinner + internet + laundry;
	
	var subtotal = hostel + extras;
	document.getElementById("total_hostel").innerHTML = "$" + subtotal.toFixed(2);
	var subtotal = hotel + extras;
	document.getElementById("total_hotel").innerHTML = "$" + subtotal.toFixed(2);
	var subtotal = motel + extras;
	document.getElementById("total_motel").innerHTML = "$" + subtotal.toFixed(2);
	var subtotal = house + extras;
	document.getElementById("total_house").innerHTML = "$" + subtotal.toFixed(2);
}

$('#breakfast-col').on('click', function() {
	var $$ = $(this)
	if (!$$.is('.on')) {
		$$.addClass('on');
		// run function to remove all other 'ons' from other oftens
		document.getElementById("breakfast").src = "assets/img/breakfast.jpg";
	} else {
		$$.removeClass('on');
		document.getElementById("breakfast").src = "assets/img/breakfast.jpg";
	}
	calculatesubtotal();
})
$('#lunch-col').on('click', function() {
	var $$ = $(this)
	if (!$$.is('.on')) {
		$$.addClass('on');
		// run function to remove all other 'ons' from other oftens
		document.getElementById("lunch").src = "assets/img/lunch.jpg";
	} else {
		$$.removeClass('on');
		document.getElementById("lunch").src = "assets/img/lunch.jpg";
	}
	calculatesubtotal();
})
$('#dinner-col').on('click', function() {
	var $$ = $(this)
	if (!$$.is('.on')) {
		$$.addClass('on');
		// run function to remove all other 'ons' from other oftens
		document.getElementById("dinner").src = "assets/img/dinner.jpg";
	} else {
		$$.removeClass('on');
		document.getElementById("dinner").src = "assets/img/dinner.jpg";
	}
	calculatesubtotal();
})
$('#internet-col').on('click', function() {
	var $$ = $(this)
	if (!$$.is('.on')) {
		$$.addClass('on');
		// run function to remove all other 'ons' from other oftens
		document.getElementById("internet").src = "assets/img/internet.jpg";
	} else {
		$$.removeClass('on');
		document.getElementById("internet").src = "assets/img/internet.jpg";
	}
	calculatesubtotal();
})
$('#laundry-col').on('click', function() {
	var $$ = $(this)
	if (!$$.is('.on')) {
		$$.addClass('on');
		// run function to remove all other 'ons' from other oftens
		document.getElementById("laundry").src = "assets/img/laundry.png";
	} else {
		$$.removeClass('on');
		document.getElementById("laundry").src = "assets/img/laundry.png";
	}
	calculatesubtotal();
});

//for accordion

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

//for JS timer

const oneSec = 1000,
      container = document.getElementById('timer');

let dataHours 	= container.getAttribute('data-hours'),
    dataMinutes = container.getAttribute('data-minutes'),
    dataSeconds = container.getAttribute('data-seconds'),
		timerEnd 		= container.getAttribute('data-timer-end'),
		timerOnEndMsg = "data-timer-end";

if (dataHours == '' || dataHours == null || dataHours == NaN) {
  dataHours = "0";
}
if (dataMinutes == '' || dataMinutes == null || dataMinutes == NaN) {
  dataMinutes = "0";
}
if (dataSeconds == '' || dataSeconds == null || dataSeconds == NaN) {
  dataSeconds = "0";
}

let hoursSpan = document.createElement('span'),
    minutesSpan = document.createElement('span'),
    secondsSpan = document.createElement('span'),
    separator1 = document.createElement('span'),
    separator2 = document.createElement('span'),
    separatorValue = ":",
    max = 59,
    s = parseInt(dataSeconds) > max ? max : parseInt(dataSeconds),
    m = parseInt(dataMinutes) > max ? max : parseInt(dataMinutes),
    h = parseInt(dataHours);

secondsSpan.classList.add('time');
minutesSpan.classList.add('time');
hoursSpan.classList.add('time');
separator1.classList.add('separator');
separator1.textContent = separatorValue;
separator2.classList.add('separator');
separator2.textContent = separatorValue;

checkValue = (value)=>{
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
}

hoursSpan.textContent = checkValue(dataHours);
minutesSpan.textContent = checkValue(dataMinutes);
secondsSpan.textContent = checkValue(dataSeconds);

timer = (sv,mv,hv)=>{

  s = parseInt(sv);
  m = parseInt(mv);
  h = parseInt(hv);
  
  if (s > 0) {
    return s -= 1;
  } else {
    s = max;
    if (m > 0) {
      return m -= 1;
    } else {
      m = max;
      if (h > 0) {
        return h -= 1;
      }
    }
  }
}

finished = ()=>{
  max = 0;
	let timerEnd = container.getAttribute(timerOnEndMsg);
	container.setAttribute(timerOnEndMsg, 'true');
	if (timerEnd == '' || timerEnd == null) {
		container.textContent = "Your accommodation savings start here!";
	} else {
		container.textContent = timerEnd;
	}
}

counter = setInterval(()=>{

  if (h == 0 && m == 0 && s == 0) {
    clearInterval(counter, finished());
  }

  if (s >= 0) {
    timer(s,m,h);
    hoursSpan.textContent   = checkValue(h);
    minutesSpan.textContent = checkValue(m);
    secondsSpan.textContent = checkValue(s);
  }
}, oneSec);

let children = [hoursSpan, separator1, minutesSpan, separator2, secondsSpan];

for (child of children) {
  container.appendChild(child);
}
