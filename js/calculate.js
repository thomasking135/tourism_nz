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


{"records"[
    {"Accommodation":"Hotel","Guests":"1-2", "Stay":"1-5 Nights", "Price":"$157.00"},
    {"Accommodation":"Hostel","Guests":"1", "Stay":"1-10 Nights","Price":"$30.00"},
    {"Accommodation":"Motel","Guests":"2-4","Stay":"3-10 Nights", "Price":"$90.00"},
    {"Accommodation":"House","Guests":"1-4", "Stay":"2-15 Nights","Price":"240.00"}
    ]
    } 