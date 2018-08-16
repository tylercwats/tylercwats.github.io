
// loading animation of first page
$(function(){
  var logo = $('.logo path');
  //gets each path of the svg and sets it's length
  logo.each( function(i,path){
    var length = path.getTotalLength();
    path.style.strokeDashoffset = length;
    path.style.strokeDasharray = length + '' + 100;
    path.getBoundingClientRect();
    //animates the stroke of path
    //on complete fill the path and fade into our main page
    $(path).animate({
        strokeDashoffset: "0"
      }, 1000, function(){
      //background to white
      $('.loader').css({backgroundColor: '#fff', transition: "20ms"});
       //fille to dark
      $(path).css({
        fill: "#0d0b0d",
        strokeWidth : '0',
        transition: "400ms",
      });
      // $(path).css({fill: "#fff", transition: "400ms"});
      //fade
      $('.loader').stop().delay(800).fadeOut(400).queue(false);
    });
  });

});
