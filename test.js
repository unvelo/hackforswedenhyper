function myFunction() {

  var userInput = document.getElementById("myText").value;
  var userKommun = userInput.toLowerCase();
  var xmlhttp = new XMLHttpRequest();
  var url1 = "kommuner_lowercase.json";

  var xhr = new XMLHttpRequest 
  xhr.open("GET", url1, false );
  xhr.send();

  //Change from text to JSON format
  var jsonData = JSON.parse(xhr.responseText);
  console.log(jsonData);

  var komId= jsonData.kommun;

  for (var i = 0; i < komId.length; i++) {

    if (komId[i].Kommuner == userKommun) {
      var newKommunId = komId[i].KommunId;
      console.log(newKommunId);

      var xml = new XMLHttpRequest();
      var url2 = "taxpayers_lowercase.json";

      var xhr = new XMLHttpRequest 
      xhr.open("GET", url2, false );
      xhr.send();

      //Change from text to JSON format
      var taxData = JSON.parse(xhr.responseText);
      console.log(taxData);

      var taxPeople = taxData.kommun;

      for (var i = 0; i < taxPeople.length; i++) {

        if (taxPeople[i].kommune == userKommun) {
          var taxPayers = taxPeople[i].taxpayers;
          document.getElementById("skatt").innerHTML = taxPayers;

          // Api reguest to get all ads from an area
          var nyckelOrd = "'butikssäljare'OR'barnvakt'OR'butikssäljare'OR'barnflicka'OR'extrainhopp'OR'varuplockare'OR'lagerarbetare'OR'cafévärd'OR'Städare'OR'tidningsdistributör'OR'enklare städuppgifter'OR'kökshjälp'OR'burger king'OR'butiksmedarbetare'OR'cafépersonal'OR'campingvärd'OR'campingvärder'OR'sommarpersonal'OR'servitris'OR'servitör'OR'butikssäljare'OR'mcdonalds'OR'sommarjobb'OR'tidningsbud'OR'brevbärare'OR'tidningsdistributörer'OR'tidningsdistributör'OR'Cafebiträde'OR'diskare'OR'sommarmedarbetare'OR'Köksbiträde'OR'serveringspersonal'OR'reklamutdelning'OR'kassapersonal'OR'minst 16 år'OR'minst 17 år'OR'minst 18 år'AND'deltid"; //This is always decided of us

          var rad = "30"; //This is always decided (we can also have more pages)

          var url = "http://api.arbetsformedlingen.se/af/v0/platsannonser/matchning?kommunid=" + newKommunId + "&nyckelord=" + nyckelOrd + "&antalrader=" + rad;
          console.log(url);

          /*$(function() {
            $('a.page-scroll').bind('click', function(event) {
              var $anchor = $(this);
                $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
                }, 
                5000, 'easeInOutExpo');
                event.preventDefault();
              });
          });*/

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

            console.log(annonsId);
            //Hanne newcode
            jQuery.fn.center = function () {
                this.css("position","absolute");
                this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
                return this;
            }

            document.getElementById("annonser").innerHTML += "<div class='ad'> <div class='wrap-ad'>" +  "<div class='headline'>" + annonsRubrik + "</div>" + "<br>" + "<div class='undertitle'>" + arbetsplatsNamn + "<br>" + yrkesBenamning + "</div>" + "</div>" + "<br>" + "<input type='image' src='plus.png' id=annonsimage>" + "<div id='annonsid' style='display:none'>" + annonsId + "</div>" + "</div>";


            // + "<br>" + "<p class='job-adress'>" + jobAddress +' '+ postort + "</p>"

            $("input#annonsimage").click(function() {
                var annonsid = $(this).next().html();
                $(".helannons").show();
                $(".helannons").center();
                console.log(annonsid);

              var url1 = "http://api.arbetsformedlingen.se/af/v0/platsannonser/" + annonsid;
              console.log(url);

              //API call
              var xhr = new XMLHttpRequest 
              xhr.open("GET", url1, false );
              xhr.send();

              //Change from text to JSON format
              var annonsData = JSON.parse(xhr.responseText);
              console.log(annonsData);

              //Address output for the travel calculation
              var jobAddress = annonsData.platsannons.arbetsplats.postadress;
              var postort = annonsData.platsannons.arbetsplats.postort;

              /*$('button.address-placeholder').click(function() {
                  console.log("button clicked");
                  //$(this).hide();
              });*/


              //Show all elements in 
              document.getElementById("annonsrubrik").innerHTML = annonsData.platsannons.annons.annonsrubrik;
              document.getElementById("yrke").innerHTML = annonsData.platsannons.annons.yrkesbenamning;
              document.getElementById("annonstext").innerHTML = annonsData.platsannons.annons.annonstext;
              document.getElementById("foretag").innerHTML = annonsData.platsannons.arbetsplats.arbetsplatsnamn;
              //Hanne newcode
              $("#sok-knapp-button").attr('href', annonsData.platsannons.annons.platsannonsUrl);
            })
            $("#minus").click(function() { 
                $(".helannons").hide(); 
            });
          }
        }
      }
    }
  }
}

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
//  })



