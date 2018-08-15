// makes sure it fades out correctly
var back = $('.back img, .front video');
var front = $('.front img, .back video');
$.getScript("/js/jquery.chocolat.js");


function emptyProject(){
  $('#loaded-page').stop().fadeOut(300,
    function(){ $(this).empty();
    }).queue(false);
  // $('#loaded-page').empty();
}

//emptys history state of the page (window path)
function emptyState(){
  history.pushState({id : ''},"homepage","/");
}

// returns next project in sequence
// using the current pages data as reference
function returnNextPg(page_data){
  // Look into projects and get keys
  var keys = Object.keys(projects);
  //define the size for last project case
  var size = keys.length;
  // SETS INDEX OF NEXT PAGE
  // if last in sequence, next project is the first
  if(page_data.index == (size - 1) ){
    var next = 1;
  }
  else{
    var next = page_data.index + 1;
  }

  // updatePage_data(next, keys, page_data);
  updatePage_index(next, page_data);
  returnPgData(page_data, name);

  push_pageHistory(page_data,keys);

  return page_data;
}

// Next Project Button on Project Page
$('.next-project').click( page_data, function(){
  //collects next page
  returnNextPg(page_data);

  //write transition between the projects
  
  //loads the next page
  loadProject(page_data.page);
});

// Close project panel
$(".close")
  .mouseover(function() {
    var close = $('.close h2');
    close.stop(true,false).animate({
      opacity: 1
    },200, 'linear');
  })
  .mouseout(function(){
    var close = $('.close h2');
    close.stop(true,false).animate({
      opacity: .3
    },200, 'linear');
  })
  .on('click', function(e){

    //closes window by removing project
    emptyState();
    emptyProject();

  });
