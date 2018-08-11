// Tyler Watson portfolio
// javascript bullshit
//
// 2018

var page_data = {};

var projects =
{
  "gladwell series" : {"image":"gladwell_series.png", "page":"gladwell_series.html", 'pageTitle':'TYLER WATSON | Gladwell Series'},
  "frame magazine" :{"image": "frame_magazine.png", "page" : "frame_magazine.html", 'pageTitle': 'TYLER WATSON | Frame Magazine'},
  "arsia" : {"image":"arsia.png", "page" : "arsia.html", 'pageTitle': 'TYLER WATSON | Arsia'},
  "æolia" : {"image":"aeolia.png", "page" : "aeolia.html", 'pageTitle': 'TYLER WATSON | AEOLIA'},
  "eet" : {"image":"eet.png", "page" : "eet.html", 'pageTitle': 'TYLER WATSON | EET'},
  "motion reel": {"image":"preview.mp4", "page" : "reel.html", 'pageTitle': 'TYLER WATSON | Motion Reel'},
  "panopticon" : {"image":"panopticon.png", "page" : "panopticon.html", 'pageTitle': 'TYLER WATSON | Panopticon'},
  "air & space" : {"image":"air&space4.png", "page" : "air&space.html", 'pageTitle': 'TYLER WATSON | Air & Space'},
  "mv agusta" : {"image":"mvagusta.png", "page" : "mvagusta.html", 'pageTitle': 'TYLER WATSON | MV Agusta'}
};
var keys = Object.keys(projects);

// var page_data = {};

//object defined above corresponds to html and files
//retrieves the corresponding page data
function returnPgData(page_data, name){
  var keys = Object.keys(projects);
  // SET INDEX OF NEXT PAGE
  page_data.index = keys.indexOf(name);
  var index = page_data.index;
  page_data.name = name;

  page_data.pageTitle = projects[keys[page_data.index]].pageTitle;
  page_data.url = projects[keys[index]].page;
  page_data.page = "/projects/"+projects[keys[index]].page;

  // page_data.pageTitle = projects[keys[index]].pageTitle;
  // console.log("pageTitle: ",page_data);

  return page_data, keys;
}

function getNextProject_data(page_data, keys){
  // var current = page_data.index;
  var next = page_data.index + 1;
  var size = keys.length;

  $('.status-current').prepend(next);
  $('.status-length').prepend(size);
  //if we are at the last project
  //back to the beginning
  if(next == (size)){
      next = 0;
      // todo
      //modify next project to say first project
  }
  next_name = keys[next];

  // sets the next name in project
  $('i.data-project').prepend(next_name);

  // sets current project data at end of page
  return;
}

function updatePageState(page_data,keys){
  var state = keys[page_data.index];
  // var pageTitle = projects[keys[page_data.index]].pageTitle;
  var pageTitle = page_data.pageTitle;
  var url = page_data.url;
  //make url look clean in window
  url = url.replace(".html", "");

  // console.log("data:",state,pageTitle,url,page_data.page);
  // history.pushState(state, pageTitle, url);
}

function loadProject(page_data){
  //goes to id on index
  //loads the projects page
  $('#loaded-page').load(page_data.page, function(){
    updatePageState(page_data, keys);
    //returns next project info (name)
    //update next project eyebrow info
    getNextProject_data(page_data, keys);
    //gets scripts for the page we loaded
    $.getScript("/scripts/project.js");
    return page_data;
  });
}

$( function() {

  //load lazy load
  ;(function() {
    // Initialize
    var bLazy = new Blazy();
  })();
  // Set listeners on all li's
  // Bind click event
  $('li').on('click', bindProject.bind(this));

  //initializes our state object so we can have proper history

  function bindProject(e){
        // Get text of clicked event
        var name = $(e.target).text();
        //return page data based on the name of the event listener
        returnPgData(page_data, name);
        //load page of project
        loadProject(page_data);

        return page_data;
  }

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

      $(".space .projects")
        .mouseover(function(){
          $(".page").stop(true,false).animate({
              'opacity': '.8'
            }, 400, 'linear');
            // console.log('over');
        })
        .mouseout(function(){
          $(".page").stop(true,false).animate({
              'opacity': '1'
            }, 400, 'linear');
            // console.log('out');
          back.stop(true,false).fadeOut(800).queue(false);
          front.stop(true,false).fadeOut(800).queue(false);
        });

});
