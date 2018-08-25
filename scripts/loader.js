
// loading animation of first page
$(function(){
// window.onload = function(){
  var logo = $('.logo path'),
  perfData = window.performance.timing, // The PerformanceTiming interface
  EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart), // Calculated Estimated Time of Page Load which returns negative value.
  // time = parseInt((EstimatedTime/1000) % 60)*100; //Converting EstimatedTime from miliseconds to seconds.
  // time = parseInt((EstimatedTime/1000)%60)*50; //Converting EstimatedTime from miliseconds to seconds.
  time = 1000;
  console.log('seconds', time);
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
      }, time, function(){
        //fille to dark
       $(path).css({
         strokeWidth : '0',
         transition: "20ms",
         fill: "#0d0b0d",
       });
      //background to white
      $('.loader').css({backgroundColor: '#fff', transition: "100ms"});
      // $(path).css({fill: "#fff", transition: "400ms"});
      //fade
      $('.loader').stop().delay(800).fadeOut(400).queue(false);
    });
  });
});
