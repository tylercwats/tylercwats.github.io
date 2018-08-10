// Tyler Watson portfolio
// javascript bullshit
//
// 2018

var page_data = {};

var projects =
{
  "gladwell series" : {"image":"gladwell_series.png", "page":"gladwell_series.html"},
  "frame magazine" :{"image": "frame_magazine.png", "page" : "frame_magazine.html"},
  "arsia" : {"image":"arsia.png", "page" : "arsia.html"},
  "ÆOLIA" : {"image":"aeolia.png", "page" : "aeolia.html"},
  "EET" : {"image":"eet.png", "page" : "eet.html"},
  "motion reel": {"image":"preview.mp4", "page" : "reel.html"},
  "panopticon" : {"image":"panopticon.png", "page" : "panopticon.html"},
  "Air & Space" : {"image":"air&space4.png", "page" : "air&space.html"},
  "MV Agusta" : {"image":"mvagusta.png", "page" : "mvagusta.html"}
};

// var page_data = {};

// Gets the next page, from current page
// This function returns an object
function returnNextPg(page_data, name){

  // Look into projects and get keys
  var keys = Object.keys(projects);

  // SET INDEX OF NEXT PAGE
  page_data.index = keys.indexOf(name); // Expect 0
  var next = page_data.index + 1;
  // Update page_data
  page_data.index = next;

  // SET NAME OF NEXT PAGE
  // the name of the next project
  next_name = keys[next];
  page_data.next_name = next_name;

  // SET PATH TO NEXT PAGE
  // path to next page
  page_data.next_page = "projects/"+projects[keys[next]].page;
  // page_data = e.data;

  // console.log("name:", next_name, "index", e.data.index, "page", e.data.next_page);
  console.log("Next Page Data = ", page_data);
  return page_data;
  // page_data = e.data;
}

$( function() {
  //insantiating the chocolate plugin

  // var page_data = {};

  $('#example1').Chocolat({
    loop           : false,
    imageSize     : 'contain',
    overlayOpacity : 1,
    // fullScreen : true
  }).data('chocolat');

  // $('example1').Chocolat().loop(true);

  $('li')
    // Project on Homepage Clicked
    .click(page_data, function(){
      //inner content of li

      var name = $(this).text();
      console.log(name);
      //finds the html page to load from the object we defined
      var page = "projects/"+projects[name].page;

      // nextPage(name, index, next_page);
      returnNextPg(page_data, name);

      //trying to append next project name. Currently not working
      $('#loaded-page').load(page, function(){
        // $(this).trigger("pagecreate");
        $('i.data-project').prepend(next_name);
        //need to fix this loading of script everytime page appends
        $.getScript("scripts/script2.js","js/jquery.chocolat.js");
        console.log("completed page load");
      });

      // also loses functionality of scripts after it loads?
      //callback?

      // Sets click event to off
      $(".close").off('click');
      $("li").off("click");

      console.log(page_data);
      return page_data;
    });

    // Next Project Button on Project Page
    $('.next-project').click( page_data, function(){
      console.log('Next project data = ', page_data);
      // return page_data;
      //prepend the next project into loaded page div
      //remove the last project
    });



  var back = $('.back img, .front video');
  var front = $('.front img, .back video');
  //load next project
  //controls images that change when hover
  $("li")
      .mouseover(function(){
          var name = $(this).text();
          // var src = "images/" + images[name];
          var src = "images/" + projects[name].image;

          if (back.is(":animated")){
            //if back image is animating then we stop it's animation and fade in the front image
            back.stop(true,false).fadeOut(300,function(){
              back.removeAttr("src");});
            front.attr({"src":src}).stop(true,true).hide().fadeIn(800).queue(false);
          }
          else{
            //fade in the back when complete assign it to the front
            back.attr({"src":src}).stop(true, false).hide().fadeIn(800,function(){
              front.attr({"src":src}).stop(true, true).show();
              back.removeAttr("src");
            }).queue(false);
          }
      })
      .mouseout(function() {
        var name = $(this).text();
        // var src = "images/" + images[name];
        var src = "images/" + projects[name].image;

        if ( (name == "motion reel") && ( back.css("src") == front.css("src") ) ) {
          back.removeAttr("src");
        }

        if (back.is(":animated")){
          //if back is in transition to fading in (or just animating) fade out
          front.stop(true,false).fadeOut(400).queue(false);
        }
        else {
          front.stop(true,true).fadeOut(800).queue(false);
          back.stop(true,false).fadeOut(800).queue(false);
        }
      });
          // $('.gladwell').on('click', function(e){
          //   $('.wrapper, .wrapper-background').css({"display":"flex"});
          // });

});
