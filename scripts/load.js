$(function(){
  var logo = $('.logo path');
  //implement counter
  logo.each( function(i,e){
    e.style.transition = e.style.WebkitTransition = 'none';
    // setPath(i,e);
    var length = e.getTotalLength();

    e.style.strokeDashoffset = length;
    e.style.strokeDasharray = length + '' + 100;


    e.getBoundingClientRect();

    $(e).animate({
        strokeDashoffset: "0"
      }, 2000, function(){
      $(e).css({fill: "#000", transition: "800ms"});
      $('.loading').stop(true,false).delay(800).fadeOut(600).queue(false);
      console.log('done');
    });
  });

});
