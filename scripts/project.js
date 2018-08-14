// makes sure it fades out correctly
var back = $('.back img, .front video');
var front = $('.front img, .back video');
$.getScript("/js/jquery.chocolat.js");

//insantiating the chocolate plugin
// $('#example1').Chocolat({
//   loop           : false,
//   imageSize     : 'contain',
//   overlayOpacity : 1,
//   // fullScreen : true
// }).data('chocolat');

function emptyProject(){
  $('#loaded-page').empty();
}

//emptys history state of the page (window path)
function emptyState(){
  history.pushState({id : ''},"homepage","/");
  // console.log(history.state);
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

  // Update page data according to the index
  // set the next index
  page_data.index = next;
  // set name of the next project
  next_name = keys[next];
  page_data.name = next_name;
  // SET PATH TO NEXT PAGE
  page_data.pageTitle = projects[keys[page_data.index]].pageTitle;
  page_data.url = projects[keys[next]].page;
  page_data.page = "/projects/"+projects[keys[next]].page;

  return page_data;
}

// Next Project Button on Project Page
$('.next-project').click( page_data, function(){
  //collects next page
  returnNextPg(page_data);
  //loads the next page
  loadProject(page_data);
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
