// Tyler Watson portfolio
//
// 2018

var page_data = {};
var url;
var $curtain = $('.black-curtain-in');

var projects =
{
  "about" : {"image":"", "page":"about.html", 'pageTitle':'TYLER WATSON | about'},
  "mv agusta" : {"image_id":"_mv", "page" : "mvagusta.html", 'pageTitle': 'TYLER WATSON | MV Agusta'},
  "air & space" : {"image_id":"_air", "page" : "air&space.html", 'pageTitle': 'TYLER WATSON | Air & Space'},
  "motion reel": {"image_id":"_reel", "page" : "reel.html", 'pageTitle': 'TYLER WATSON | Motion Reel'},
  "panopticon" : {"image_id":"_panopticon", "page" : "panopticon.html", 'pageTitle': 'TYLER WATSON | Panopticon'},
  "æolia" : {"image_id":"_aeolia", "page" : "aeolia.html", 'pageTitle': 'TYLER WATSON | AEOLIA'},
  "eet" : {"image_id":"_eet", "page" : "eet.html", 'pageTitle': 'TYLER WATSON | EET'},
  "gladwell series" : {"image_id":"_gladwell", "page":"gladwell_series.html", 'pageTitle':'TYLER WATSON | Gladwell Series'},
  "arsia" : {"image_id":"_arsia", "page" : "arsia.html", 'pageTitle': 'TYLER WATSON | Arsia'},
};
var keys = Object.keys(projects);

//object defined above corresponds to html and files
//sets the corresponding page data
function setPgData(page_data, name){
  // SET INDEX OF NEXT PAGE
  page_data.index = keys.indexOf(name);
  var index = page_data.index;
  page_data.name = name;

  page_data.url = projects[keys[index]].page;
  page_data.page = "/projects/"+projects[keys[index]].page;

  page_data.image_id = projects[keys[index]].image_id;
  page_data.pageTitle = projects[keys[index]].pageTitle;

  return page_data, keys;
}

function updatePage_index(index, page_data){
  page_data.index = index;
  name = keys[index];
  page_data.name = name;

  return page_data;
}

//returns imageID for controlling fadeIn/Out Preview functions
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
  $('.status-current').prepend(page_data.index);
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
  updatePage_index(index, page_data);
  //remove project and load current one
  emptyPage();
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
        emptyPage();
        return;
    }
    else if (history.state === e.state){
      // getPrevProject_data(page_data, keys);
      //matches the URL then loads the page
      findURL(e.state, page_data);
      return;
    }
    else{
      return e.state;
    }
  }, false);
}

function closeProject(e){
  var promise = new $.Deferred();

  $.when( animCurtain('down') ).done(
    function(){
      setTimeout(function(){
        emptyPage();
      },150);
    }
  ).then(
    function(){ animCurtain('down') }
  ).done(function(){
      return promise.resolve();
    });
}

//checks to see if class is animating
//returns promise when complete
function animCheck(classs){
  var promise = new $.Deferred();
  $(classs).on('oanimationend msAnimationEnd animationend', function(e){
      console.log('animation over emptying');
      return promise.resolve();
  });
}

function emptyPage(){
  var promise = new $.Deferred();
  console.log('emptying');
  $('#loaded-page').hide().empty();
  return promise.resolve();
}

var loadPage = function ($curtain, $page, page_url){
  $.ajax(page_url, {
    success: function(data){
      //analytics
      ga('send', {
        hitType: 'pageview',
        page: page_url
      });
      //append returned data into page
      $.when( emptyPage() ).done(function(){
        console.log('page appened');
        $page.append(data);
      })
      //further update the page accordingly
      //returns next project info (name)
      //update next project eyebrow info
      getNextProject_data(page_data, keys);
      //gets scripts for the page we loaded
      $.getScript("/scripts/project.js");
      //fades in doc and sets the height of space
      $page.show(400, function(e){
        var that = $(this).find('.description');
        var high = that.outerHeight();
        //dynamically setting the spaceing size between the image and length of text
        $(".description-space").css({height : high});
      });
    },
    error: function(){
      console.log('error retrieving project')
    },
    complete: function(){

      setTimeout(function(){
        animCurtain('up');
      },1000);
    }
  })
}

//adds class to curtain to animate.
//returns on completion of animations
function setCurtain(classs){
  var $curtain = $('.black-curtain-in');
  var promise = new $.Deferred();
  $curtain.addClass(classs);
  $.when( animCheck(classs) ).done( function(){
    console.log('animation complete', classs);
    return promise.resolve();
  });
}

var resetCurtain = function(){
  // var $curtain = $('.black-curtain-in');
  var og = ( 1.3 * $(window).height() );
  $curtain.css({top:og});
}

function animCurtain( direction ){
  var $curtain = $('.black-curtain-in');
  var promise = new $.Deferred();
  direction = returnDirection_val(direction);
  console.log('direction',direction);
  $curtain.animate({top: ('+=' + direction)}, 300, function(){
    return promise.resolve();
  });
}

function returnDirection_val( direction ){
  var vh = ( 1.3 * $(window).height() );
  console.log(vh);
  if(direction == 'up'){
    console.log('up');
    direction = ('-' + vh);
  }
  if(direction == 'down'){
    console.log('down');
    direction = vh;
  }
  return direction;
}

function resetClass($curtain){
  var promise = new $.Deferred();
  $curtain.removeClass('in_up out_up in_down out_down');
  return promise.resolve();
}

//loads project with transitions.
//Chains together necessary functions
function loadProject(page_url){
  //resetclass. move curtain in. emptyproject. load new project. move curtain after load.
  var $page = $('#loaded-page');
  var $curtain = $('.black-curtain-in');
  //after the class has been reset and the animation is complete. load the page.
  // $.when( resetClass($curtain).done( function(){ setCurtain('in_up') } ) ).then( function(){ loadPage($curtain, $page, page_url) } );
  $.when( animCurtain('up') ).then( function(){ loadPage($curtain, $page, page_url) } ).then(resetCurtain);
}

function fadeInPreview(e){
  var name = $(e.target).text();
  returnImageID(page_data, name);
  // //console.log("in: ",name);
  //target unique image_id
  var id = "#" + page_data.image_id;
  that = $(id);
  // stop the animation (go to the end current because it could be fading out).
  // Fade in. Don't add to queue
  that.stop(true,true).fadeIn(500).queue(false);
}

function fadeOutPreview(e){
  var name = $(e.target).text();
  // //console.log("out: ",name);
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
        //default action of event will not be triggered.
        e.preventDefault();
        // Get text of clicked event
        var name = $(e.target).text();
        //return page data based on the name of the event listener
        setPgData(page_data, name);
        //updating window
        push_pageHistory(page_data,keys);
        //transition and async load
        loadProject(page_data.page);

        return page_data;
  }
    $(".space .projects")
      .mouseover(function(){
        $(".page").stop(true,false).animate({
            'opacity': '.85'
          }, 400, 'linear');
      })
      .mouseout(function(){
        $(".page").stop(true,false).animate({
            'opacity': '1'
          }, 400, 'linear');
      });

});
