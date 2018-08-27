// Tyler Watson portfolio
//
// 2018

var page_data = {};
var url;

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
      //matches the URL then loads the page
      findURL(e.state, page_data);

      // updatePage_index(page_data.index, page_data);
      return;
    }
    else{
      return e.state;
    }
  }, false);
}

function closeProject(e){
  var $curtain = $('.black-curtain-in');
  setClass( $curtain, 'in_down' ).then(
    animCheck( '.in_down', e, emptyPage(e) )
  ).then(
    animCheck('.in_down', e, setClass($curtain,'out_down'))
  );
}

function animCheck(classs, e, emptyPage){
  var promise = new $.Deferred();
  $(classs).one('oanimationend msAnimationEnd animationend', function(e){
        emptyPage;
      });
  return promise.resolve();
}
var emptyPage = function(){
  var promise = new $.Deferred();
  $('#loaded-page').hide().empty();
  return promise.resolve();
}
// function emptyProject(){
var emptyProject = function (){
    //if close event. Empty page.
    var promise = new $.Deferred();
    if ($("#loaded-page:has(*)").length){
      return promise.resolve();
    }
    else{
      emptyPage();
    }
    // $('#loaded-page').empty().hide();
    // resolvePromise(promise);
    return promise.resolve();;
}

// function loadPage($page, page_url){
var loadPage = function ($curtain, $page, page_url){
  //console.log('loading', page_url);
  var promise = new $.Deferred();
  //one–create event on selector. Trigger pageload on event (end of curtain animation)
  $('.in_up').one('oanimationend msAnimationEnd animationend',
    function(e) {
      //console.log('load e',e);
      $page.load(page_url, function(e){
        //returns next project info (name)
        //update next project eyebrow info
        getNextProject_data(page_data, keys);
        //gets scripts for the page we loaded
        $.getScript("/scripts/project.js");
        //fades in doc and sets the height of space
        $(this).show(0, function(e){
          var that = $(this).find('.description');
          var high = that.outerHeight();
          //dynamically setting the spaceing size between the image and length of text
          $(".description-space").css({
            height : high
          });

          promise = $.Deferred(function(deferred) {
            $(deferred.resolve);
          });

        });
        // window.onload = function () {out_up($curtain) };
        return promise, page_data;
      });
  });
}


function setClass($curtain, classs){
  var promise = new $.Deferred();
  $curtain.addClass(classs);
  // resolvePromise(promise);
  return promise.resolve();
}

var out_up = function ($curtain){
  $curtain.addClass('out_up');
}

function resetClass($curtain){
  var promise = new $.Deferred();
  //console.log($curtain);
  $curtain.removeClass('in_up out_up in_down out_down');
  // resolvePromise(promise);
  return promise.resolve();
}

//create promise
//resolve
//pass
//then function
//repeat
function loadProject(page_url){
  //curtain in... callback.
  //empty project... callback
  //load project... callback
  //curtain out... callback
  //console.log('load url',page_url);
  var $page = $('#loaded-page');
  var $curtain = $('.black-curtain-in');
  resetClass($curtain).then(setClass($curtain, 'in_up')).then(emptyProject()).then(loadPage($curtain, $page, page_url));
  // resetClass($curtain).then(setClass($curtain, 'in_up')).then(emptyProject()).then(loadPage($curtain, $page, page_url)).done(out_up($curtain));

  $('.in_up').one('oanimationend msAnimationEnd animationend',
    function(v) {
    // code to execute after animation ends
    out_up($curtain);
    //console.log('v',v);
    });
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
        // Get text of clicked event
        var name = $(e.target).text();
        //return page data based on the name of the event listener
        setPgData(page_data, name);
        //updating window
        push_pageHistory(page_data,keys);
        //transition;
        //call a transition
        //load page of project
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
