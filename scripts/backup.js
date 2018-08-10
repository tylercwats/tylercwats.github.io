// Tyler Watson portfolio
// javascript bullshit
//
// 2018


var images = {
  "gladwell series" : "gladwell_series.png",
  "frame magazine" : "frame_magazine.png",
  "arsia" : "arsia.png",
  "ÆOLIA" : "ÆOLIA.png",
  "EET" : "EET.png",
  "motion reel" : "motion reel.png",
  "panopticon" : "panopticon.png",
  "Air & Space" : "Air & Space.png",
  "MV Agusta" : "Mv Agusta.png"
};

$(function() {

  var back = $('.back img');
  var front = $('.front img');

    $("li")
        .mouseover(function(){
            // var src = $(this).attr("src").match(/[^\.]+/) + "over.gif";
            // $(this).attr("src", src);
            var name = $(this).text();
            var src = "images/" + images[name];

            if (back.is(":animated")){
              //if back image is animating then we stop it's animation and fade in the front
              back.stop(true,false).fadeOut(300);
              front.attr({"src":src}).stop(true,true).hide().fadeIn(800).queue(false);
              console.log("on is on")
            }
            else{
              back.attr({"src":src}).stop(true, true).hide().fadeIn(800,function(){
                front.attr({"src":src}).stop(true, true).show();
                back.removeAttr("src");
              }).queue(false);
            }
            //if back is animating
            //stop it. fade it out when fade out is finished then assign it to front
            // if (back.is(':animated')){
            //   console.log("animated");
            // }
            // get the text of the li element
            // match that in the dictionary to it's src
            // return and update the src of the image
            // if (back.is(':animated')){
            //   console.log("is");
            // }



            //to make cross dissolve
            //assign new src to image behind
            //begin fading the current image out
            //once faded out reassign top immage to image in the back
        })
        .mouseout(function() {
          // var name = $(this).text();
          // var src = "images/" + images[name];
          if (!back.is(":animated")){
          front.stop(true, true).fadeOut(600).queue(false);
          //   back.stop(false,false);
          //   front.attr({"src":src}).stop(true, false).show();
          //   back.removeAttr("src");
            console.log("out is not");
          }
          if (back.is(":animated")){
            back.stop(true,false).fadeOut(300).queue(false);
          }
          // if (back.is(':animated')){
          //   src = back.attr("src");
          //   front.attr({"src":src}).stop(true, true).show();
          //   back.removeAttr("src");
          //   console.log("back removed 2");
          // }

          var src = "";
          // $()
          // $(".image img").stop(true, true).fadeOut(600).queue(false
          //   // function(){
          //   //   $(this).removeAttr("src");
          //   // }
          // );
          // $( this ).dequeue();
        });

});
