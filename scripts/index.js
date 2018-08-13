// Tyler Watson portfolio
// javascript bullshit
//
// 2018

var page_data = {};

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
  var keys = Object.keys(projects);
  // SET INDEX OF NEXT PAGE
  page_data.index = keys.indexOf(name);
  var index = page_data.index;
  page_data.name = name;

  // page_data.pageTitle = projects[keys[page_data.index]].pageTitle;
  // console.log(page_data.pageTitle);
  page_data.url = projects[keys[index]].page;
  page_data.page = "/projects/"+projects[keys[index]].page;

  // page_data.pageTitle = projects[keys[index]].pageTitle;
  // console.log("pageTitle: ",page_data);

  return page_data, keys;
}

//returns imageID for controlling fadeIn/OutPreview functions
function returnImageID(page_data, name){
  // var ImageID = {};
  var keys = Object.keys(projects);
  var index = keys.indexOf(name);
  page_data.image_id = projects[keys[index]].image_id;

  return page_data;
}

function getNextProject_data(page_data, keys){
  // var current = page_data.index;
  // var next = page_data.index + 1;
  // var size = keys.length;
  var next = page_data.index;
  var size = keys.length - 1;

  $('.status-current').prepend(next);
  $('.status-length').prepend(size);
  //if we are at the last project
  //back to the beginning
  if(page_data.index == (size) ){
    next = 1;
  }
  else{
     next = page_data.index + 1;
  }
  next_name = keys[next];

  // sets the next name in project
  $('i.data-project').prepend(next_name);

  // sets current project data at end of page
  return;
}

//not updating stack correctly
function updatePageState(page_data,keys){
  // parameters — history.pushState(state, pageTitle, url);
  var state = {id : keys[page_data.index] };
  // var pageTitle = projects[keys[page_data.index]].pageTitle;
  var pageTitle = page_data.pageTitle;
  var url = page_data.url;
  //make url look clean in window
  url = url.replace(".html", "");
  // console.log('history: ',history.state, history.state.id);

  window.addEventListener('popstate', function (event) {
    // console.log(page_data.url);
    if (history.state && history.state.id === '') {
        // Render new content for the hompage
        // console.log('home');
    }
  }, false);

  // console.log("data:",state,pageTitle,url,page_data.page);
  history.pushState(state, pageTitle, url);
  // console.log('history: ', history.state, history.state.id);

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

function fadeInPreview(e){
  var name = $(e.target).text();
  returnImageID(page_data, name);
  // console.log("in: ",name);
  //target unique image_id
  var id = "#" + page_data.image_id;
  that = $(id);
  //fade in
  //magic shit I don't fully understand
  that.stop(true,true).fadeIn(500).queue(false);
  // $(id).clearQueue().fadeIn(500).queue(false);
  // $(id).addClass('.display-preview');
  // console.log('in: ',id);

}

function fadeOutPreview(e){
  var name = $(e.target).text();
  // console.log("out: ",name);
  returnImageID(page_data, name);
  //target unique image_id
  var id = "#" + page_data.image_id;
  //fade out
  //magic shit I don't fully understand
  // console.log('out ',id);
  $(id).stop(true,false).fadeOut(500).queue(false);
  // $(id).clearQueue().fadeOut(500).queue(false);
  // returnPgData(page_data, name);
  // console.log(page_data,keys);
}

$( function() {

  //load lazy load
  // initialize history event
  history.replaceState({id : ''},'','/');
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
        //load page of project
        loadProject(page_data);

        return page_data;
  }



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
      });



  //load next project
  //controls images that change when hover
  // $("li")
  //     .mouseover(function(){
  //         var name = $(this).text();
  //         // var src = "images/" + images[name];
  //         var src = "images/" + projects[name].image;
  //
  //         if (back.is(":animated")){
  //           //if back image is animating then we stop it's animation and fade in the front image
  //           back.stop(true,false).fadeOut(300,function(){
  //             back.removeAttr("src");});
  //           front.attr({"src":src}).stop(true,true).hide().fadeIn(800).queue(false);
  //         }
  //         else{
  //           //fade in the back when complete assign it to the front
  //           back.attr({"src":src}).stop(true, false).hide().fadeIn(800,function(){
  //             front.attr({"src":src}).stop(true, true).show();
  //             back.removeAttr("src");
  //           }).queue(false);
  //         }
  //     })
  //     .mouseout(function() {
  //       var name = $(this).text();
  //       // var src = "images/" + images[name];
  //       var src = "images/" + projects[name].image;
  //
  //       if ( (name == "motion reel") && ( back.css("src") == front.css("src") ) ) {
  //         back.removeAttr("src");
  //       }
  //
  //       if (back.is(":animated")){
  //         //if back is in transition to fading in (or just animating) fade out
  //         front.stop(true,false).fadeOut(400).queue(false);
  //       }
  //       else {
  //         front.stop(true,true).fadeOut(800).queue(false);
  //         back.stop(true,false).fadeOut(800).queue(false);
  //       }
  //     });
  //
  //     $(".space .projects")
  //       .mouseover(function(){
  //         $(".page").stop(true,false).animate({
  //             'opacity': '.8'
  //           }, 400, 'linear');
  //           // console.log('over');
  //       })
  //       .mouseout(function(){
  //         $(".page").stop(true,false).animate({
  //             'opacity': '1'
  //           }, 400, 'linear');
  //           // console.log('out');
  //         back.stop(true,false).fadeOut(800).queue(false);
  //         front.stop(true,false).fadeOut(800).queue(false);
  //       });

});
