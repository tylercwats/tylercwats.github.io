// Tyler Watson portfolio
//
// 2018

var page_data = {};
var url;
var projects =
{
  "about" : {"image":"", "page":"about.html", 'pageTitle':'TYLER WATSON | about'},
  "gladwell series" : {"image_id":"_gladwell", "page":"gladwell_series.html", 'pageTitle':'TYLER WATSON | Gladwell Series'},
  "frame magazine" :{"image_id": "_frame", "page" : "frame_magazine.html", 'pageTitle': 'TYLER WATSON | Frame Magazine'},
  "arsia" : {"image_id":"_arsia", "page" : "arsia.html", 'pageTitle': 'TYLER WATSON | Arsia'},
  "æolia" : {"image_id":"_aeolia", "page" : "aeolia.html", 'pageTitle': 'TYLER WATSON | AEOLIA'},
  "eet" : {"image_id":"_eet", "page" : "eet.html", 'pageTitle': 'TYLER WATSON | EET'},
  "motion reel": {"image_id":"_reel", "page" : "reel.html", 'pageTitle': 'TYLER WATSON | Motion Reel'},
  "panopticon" : {"image_id":"_panopticon", "page" : "panopticon.html", 'pageTitle': 'TYLER WATSON | Panopticon'},
  "air & space" : {"image_id":"_air", "page" : "air&space.html", 'pageTitle': 'TYLER WATSON | Air & Space'},
  "mv agusta" : {"image_id":"_mv", "page" : "mvagusta.html", 'pageTitle': 'TYLER WATSON | MV Agusta'}
};
var keys = Object.keys(projects);

//object defined above corresponds to html and files
//retrieves the corresponding page data
function returnPgData(page_data, name){
  // SET INDEX OF NEXT PAGE
  page_data.index = keys.indexOf(name);
  var index = page_data.index;
  page_data.name = name;

  page_data.url = projects[keys[index]].page;
  page_data.page = "/projects/"+projects[keys[index]].page;

  page_data.image_id = projects[keys[index]].image_id;

  return page_data, keys;
}

function updatePage_index(index, page_data){
  page_data.index = index;
  name = keys[index];
  page_data.name = name;

  return page_data;
}

//returns imageID for controlling fadeIn/Out Preview functions
// is currently setting it to the first gladwell and not changing
// need to restructure
function returnImageID(page_data, name){
  // var ImageID = {};
  var keys = Object.keys(projects);
  var index = keys.indexOf(name);
  page_data.image_id = projects[keys[index]].image_id;

  return page_data;
}

function getNextProject_data(page_data, keys){
  var next = page_data.index;
  var size = keys.length - 1;
  //if we are at the last project
  //back to the beginning
  if(page_data.index == (size) ){
    next = 1;
  }
  else{
     next = page_data.index + 1;
  }

  // current project we're on
  $('.status-current').prepend(next);
  // out of # of projects
  $('.status-length').prepend(size);
  // next name of project in list
  next_name = keys[next];
  $('i.data-project').prepend(next_name);

  return;
}
//controls history state of window
function push_pageHistory(page_data,keys){
  // parameters — history.pushState(state, pageTitle, url);
  //assigns id to main key in object (project OG title)
  var state = keys[page_data.index];
  // var pageTitle = projects[keys[page_data.index]].pageTitle;
  var pageTitle = page_data.pageTitle;
  var url = page_data.url;
  //make url look clean in window
  url = url.replace(".html", "");
  history.pushState(state, pageTitle, url);
}

//finds url of object based on name
//for updating pagestate
function findURL(name, page_data){
  //find index of projects based on name
  var index = keys.indexOf(name);
  var url = '/projects/' + projects[keys[index]].page;

  //remove project and load current one
  emptyProject();
  loadProject(url);

  return;
}
// renders correct page that corresponds to the window path
// when clicking the the forward and back arrows of the browser
function renderPopState(){
  // on event of clicking the arrows
  window.addEventListener('popstate', function (e) {
    // if (history.state === '' && e.state === '') {
    if (e.state == '' || e.state.id === '') {
        //empties to homepage
        emptyProject();
        return;
    }
    else if (history.state === e.state){
      // getPrevProject_data(page_data, keys);
      console.log('same: estate', e.state);
      console.log('historystate', history.state);
      console.log('page', page_data);
      findURL(e.state, page_data);
      return;
    }
    else{
      console.log('not valid', e.state);
      return e.state;
    }
  }, false);
}

function loadProject(page_url){
  //goes to id on index
  $page = $('#loaded-page');
  //loads the projects page
  $page.load(page_url, function(){
    // currently loads project without always emptying
    //decide if we want to automate emptying in here
    //and check to see if there's content inside the loaded-page class
    // emptyProject();

    //returns next project info (name)
    //update next project eyebrow info
    getNextProject_data(page_data, keys);
    //gets scripts for the page we loaded
    $.getScript("/scripts/project.js");
    //fades in doc and sets the height of space
    $(this).stop().fadeIn(300, function(){
      var that = $(this).find('.description');
      var high = that.outerHeight();
      //dynamically setting the spaceing size between the image and length of text
      $(".description-space").css({
        height : high
      });

    }).queue(false);

    // incorporates an upwards motion if the css is switched in .wrapper
    // $(this).stop().fadeIn(200).find('.wrapper').animate({
    //   top: '0'
    // }, 300).queue(false);
    return page_data;
  });
}

function fadeInPreview(e){
  var name = $(e.target).text();
  returnImageID(page_data, name);
  // console.log("in: ",name);
  //target unique image_id
  var id = "#" + page_data.image_id;
  that = $(id);
  // stop the animation (go to the end current because it could be fading out).
  // Fade in. Don't add to queue
  that.stop(true,true).fadeIn(500).queue(false);
}

function fadeOutPreview(e){
  var name = $(e.target).text();
  // console.log("out: ",name);
  returnImageID(page_data, name);
  //target unique image_id
  var id = "#" + page_data.image_id;
  // stop the animation (don't to the end because it'd suddently fade up).
  // Fade out. Don't add to queue
  $(id).stop(true,false).fadeOut(500).queue(false);
}

//on document ready
$( function() {
  // $.getScript("/scripts/loader.js");
  // initialize history event
  history.replaceState('','','');

  renderPopState();
  // Set listeners on all li's
  // Bind click event
  $('li').on('click', bindProject.bind(this));
  $('.terminal > div p').on('click', bindProject.bind(this));
  //initializes our state object so we can have proper history
  // controls the projects background image hover transitions on index
  $('li')
    .mouseover(function(e){
      fadeInPreview(e);
    })
    .mouseout(function(e){
      fadeOutPreview(e);
    });

  function bindProject(e){
        // Get text of clicked event
        var name = $(e.target).text();
        //return page data based on the name of the event listener
        returnPgData(page_data, name);
        //updating window
        push_pageHistory(page_data,keys)
        //load page of project
        // loadProject(page_data);
        loadProject(page_data.page);

        return page_data;
  }
    $(".space .projects")
      .mouseover(function(){
        $(".page").stop(true,false).animate({
            'opacity': '.8'
          }, 400, 'linear');
      })
      .mouseout(function(){
        $(".page").stop(true,false).animate({
            'opacity': '1'
          }, 400, 'linear');
      });

});
