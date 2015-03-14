// Api reguest to get all ads from an area
var kommunId = "1080"; // Depends on user input
var nyckelOrd = "sommarjobb"; //This is always decided of us
var rad = "30"; //This is always decided (we can also have more pages)

var url = "http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?kommunid=" + kommunId + "&nyckelord=" + nyckelOrd + "&antalrader=" + rad;
console.log(url);

//API call
var xhr = new XMLHttpRequest 
xhr.open("GET", url, false );
xhr.send();

//Change from text to JSON format
var jsonData = JSON.parse(xhr.responseText);
console.log(jsonData);
var result = jsonData.matchningslista.matchningdata;

//Get the wanted information from the API
for(var i = 0; i < result.length; i++) {
	var annonsRubrik = result[i].annonsrubrik;
	var arbetsplatsNamn = result[i].arbetsplatsnamn;
	var yrkesBenamning = result[i].yrkesbenamning;
	var annonsId = result[i].annonsid;



document.getElementById("annonser").innerHTML += "<div class='ad'>" + annonsRubrik + "<br>" + arbetsplatsNamn + "<br>" + yrkesBenamning + "<br>" + "<input type='image' src='plus_icon.png' id=annonsimage>" + "<div id='annonsid' style='display:none'>" + annonsId + "</div>" + "</div>" + "<br>";
//function loadAd(adId){
//	console.log(adId);
}// This function is not working as I want to, want to get the right annonsId value when I click the ugly plus symbol :)


//Hanne newcode
jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    return this;
}

$("input#annonsimage").click(function() {
	var annonsid = $(this).next().html();
	$(".helannons").show();
	$(".helannons").center();
	console.log(annonsid);
	



//To get more detailed ads with input from the list
//var id = "6197460"; //This will be the annonsId output from the list

var url1 = "http://api.arbetsformedlingen.se/af/v0/platsannonser/" + annonsid;
console.log(url);

//API call
var xhr = new XMLHttpRequest 
xhr.open("GET", url1, false );
xhr.send();

//Change from text to JSON format
var annonsData = JSON.parse(xhr.responseText);
console.log(annonsData);
//Show all elements in 
document.getElementById("annonsrubrik").innerHTML = annonsData.platsannons.annons.annonsrubrik;
document.getElementById("yrke").innerHTML = annonsData.platsannons.annons.yrkesbenamning;
document.getElementById("annonstext").innerHTML = annonsData.platsannons.annons.annonstext;
document.getElementById("foretag").innerHTML = annonsData.platsannons.arbetsplats.arbetsplatsnamn;
//Hanne newcode
$("#sok-knapp-button").attr('href', annonsData.platsannons.annons.platsannonsUrl);
document.getElementById("sista-dag").innerHTML = annonsData.platsannons.ansokan.sista_ansokningsdag;

//Address output for the travel calculation
var postadress = annonsData.platsannons.arbetsplats.postadress;
var postnummer = annonsData.platsannons.arbetsplats.postnummer;
var postort = annonsData.platsannons.arbetsplats.postort;

console.log(postadress);
console.log(postnummer);
console.log(postort);

/*
$(".helannons").hide();
$("input#annonsimage").click(function() {
	var annonsid = $(this).next().html();
	$(".helannons").slideToggle();
    });


*/
//Hanne newcode - change to button so that the entire ad doesn't go away
//$(".helannons").click(function() {
//$(".helannons").hide();
//	})
})