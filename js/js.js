$(function(){
  var open_album=false;
  var second_menuOpen=false;
  var openmail = false;

  function $second_menuIn(){
    $(".second_menu").css({
      "transform-origin":"left",
      "transition":"all 1s cubic-bezier(0.215, 0.61, 0.355, 1)",
      "transform":"translateZ(0)"
    });
    second_menuOpen=true;
  }

  function $second_menuOut(){
    $(".second_menu").css({
      "transform-origin":"left",
      "transition":"all 1s cubic-bezier(0.215, 0.61, 0.355, 1)",
      "transform":"perspective(500px) rotate3d(0, 1, 0, 90deg)"
    });
    second_menuOpen=false;
  }

  function $albumIn(){
    $(".album_title").fadeIn();
    $(".contact").css("margin-top","1em");
    open_album=true;
  }

  function $albumOut(){
    $(".album_title").fadeOut();
    $(".contact").css("margin-top","0");
    open_album=false;
  }


  /*XXXXXXXXXXXXXXXXXXXXXX --- 1st menu --- XXXXXXXXXXXXXXXXXXXXXXXX*/
  $(".bouton_menu").click(function(){
    // $(".menu").fadeIn(2000);
    $(".btn_close").removeClass("cross_back");
    $(".btn_back").removeClass("cross_back");
    console.log("ok");
    $("nav").css({
      "transform-origin":"left",
      "transition":"all 1.5s cubic-bezier(0.215, 0.61, 0.355, 1)",
      "transform":"translateZ(0)"
    });
    $(".menu").css({
      "z-index":"2"
    });
    $(".bar1").removeClass("fadeInLeft");
    $(".bar3").removeClass("fadeInLeft");
    $(".bouton_menu h3").removeClass("fadeInRight");
    $(".bar2").removeClass("fadeInRight");

    $(".bar1").addClass("fadeOutLeft");
    $(".bar3").addClass("fadeOutLeft");
    $(".bouton_menu h3").addClass("fadeOutRight");
    $(".bar2").addClass("fadeOutRight");
    $(".bouton_menu").fadeOut(500);
  });

  $(".btn_close").click(function(){
    $(this).addClass("cross_back");
    $("nav").css({
      "transform-origin":"left",
      "transition":"all 1s cubic-bezier(0.215, 0.61, 0.355, 1)",
      "transform":"perspective(500px) rotate3d(0, 1, 0, 90deg)"
    });
    $(".second_menu").css({
      "transform-origin":"left",
      "transition":"all 1s cubic-bezier(0.215, 0.61, 0.355, 1)",
      "transform":"perspective(500px) rotate3d(0, 1, 0, 90deg)"
    });
    $(".bar1").removeClass("fadeOutLeft");
    $(".bar3").removeClass("fadeOutLeft");
    $(".bouton_menu h3").removeClass("fadeOutRight");
    $(".bar2").removeClass("fadeOutRight");

    $(".bar1").addClass("fadeInLeft");
    $(".bar3").addClass("fadeInLeft");
    $(".bouton_menu h3").addClass("fadeInRight");
    $(".bar2").addClass("fadeInRight");
    $(".bouton_menu").fadeIn(1500);
    $(".btn_back").addClass("cross_back");
    $(".album_title ul").empty();
    $(".sous_albums ul").empty();
    $(".menu_contact").fadeOut();
    $(".menu_about").fadeOut();
    $(".album_title").fadeOut();
    $(".contact").css("margin-top","0");
    second_menuOpen=false;
  });

  var email = $("<div>");
  email.html("tonynoelphotographe@gmail.com");
  email.css({
    "color":"white",
    "margin-top":"1em"
  });
  $(".reseaux").append(email);

  $(".email").click(function(e){
    if(!openmail){
      $(".reseaux div").fadeIn();
      openmail=true;
    }
    else {
      $(".reseaux div").fadeOut();
      openmail=false;
    }
    e.preventDefault();
  });
  /*XXXXXXXXXXXXXXXXXXXXXX --- 2nd menu --- XXXXXXXXXXXXXXXXXXXXXXXX*/
  $(".albums").click(function(e){
    $second_menuOut();
    if(!open_album){
      $albumIn();
    }
    else {
      $albumOut();
    }
    e.preventDefault();
  });

  $(".contact").click(function(e){
    if (!second_menuOpen) {
      $second_menuIn();
      $(".sous_albums").fadeOut();
      $(".menu_about").fadeOut();
      $(".menu_contact").fadeIn();
      $(".btn_back").removeClass("cross_back");
      e.preventDefault();
    }
    else {
      $(".sous_albums").fadeOut(700);
      $(".menu_about").fadeOut(700);
      $second_menuOut();
      setTimeout(function(){
        $second_menuIn();
        $(".btn_back").removeClass("cross_back");
        $(".menu_contact").fadeIn();
      },800);
      e.preventDefault();
    }
  });

  $(".about").click(function(e){
    if (!second_menuOpen) {
      $second_menuIn();
      $(".sous_albums").fadeOut();
      $(".menu_contact").fadeOut();
      $(".menu_about").fadeIn();
      $(".btn_back").removeClass("cross_back");
      e.preventDefault();
    }
    else {
      $(".sous_albums").fadeOut(700);
      $(".menu_contact").fadeOut(700);
      $second_menuOut();
      setTimeout(function(){
        $second_menuIn();
        $(".btn_back").removeClass("cross_back");
        $(".menu_about").fadeIn();
      },800);
      e.preventDefault();
    }
  });

  /*XXXXXXXXXXXXXXXXXXXXXX --- back menu --- XXXXXXXXXXXXXXXXXXXXXXXX*/
  $(".btn_back").click(function(){
    $(this).addClass("cross_back");
    $second_menuOut();
    $(".sous_albums").fadeOut(1000);
  });

  var timeout = null;

  $(document).on('mousemove', function() {
    if (timeout !== null) {
      $(".down").fadeIn();
      clearTimeout(timeout);
    }

    timeout = setTimeout(function() {
      $(".down").fadeOut();
    }, 1000);
  });

  $(".down").click(function(e){
    var target = $(this).attr("href");
    console.log(target);
    $('html, body').stop().animate({scrollTop: $(target).offset().top}, 1000 );
    e.preventDefault();
  });

});
