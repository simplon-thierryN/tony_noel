$(function(){
  var divAlbum;
  var imgAlbum;
  var linkimg;
  var nameAlbum;

  var ul=$("<ul>");
  var ullyon = $("<ul>");
  var ulviagem = $("<ul>");


  function menustate(){
    if(!second_menuOpen){
      $second_menuIn();
      $(".menu_contact").fadeOut();
      $(".menu_about").fadeOut();
      $(".sous_albums").fadeIn();
      $(".btn_back").removeClass("cross_back");
    }
    else{
      $(".menu_contact").fadeOut(700);
      $(".menu_about").fadeOut(700);
      $second_menuOut();
      setTimeout(function(){
        $second_menuIn();
        $(".btn_back").removeClass("cross_back");
        $(".sous_albums").fadeIn();
      },800);
    }
  }

  function albums(album){
    divAlbum = $("<div>");
    linkimg=$("<a>");
    imgAlbum = $("<img>");
    imgAlbum.attr("src","img/"+album.resizepics);
    divAlbum.addClass(album.name);
    divAlbum.addClass("fade");
    linkimg.attr("href","img/"+album.normalpics);
    linkimg.attr("rel","fancybox-button");
    linkimg.attr("data-id",album.id);
    linkimg.addClass("fancybox");
    divAlbum.css({
      "display":"flex",
      "align-items":"center"
    });
    linkimg.append(imgAlbum);
    divAlbum.append(linkimg);
    $(".grid").append(divAlbum);
  }

  $(".bouton_menu").click(function(){
    // $.ajax({
    //     url:"php/main.php?action=albums",
    //     method:"POST",
    //     datatype:"JSON",
    //     success:function(ret){
    //         for(i=0;i<ret.length;i++){
    //             nameAlbums(ret[i],$(".album_title"),ul);
    //         }
    //     }
    // });
  });

  function nameAlbums(name,place,liste){
    nameAlbum=$("<li>");
    var a = $("<a>");
    a.text(name.name);
    nameAlbum.addClass(name.name);
    nameAlbum.append(a);
    liste.append(nameAlbum);
    place.append(liste);
  }

    $.ajax({
      url:"php/main.php",
      method:"GET",
      datatype:"JSON",
      success:function(ret){
        for(i=0; i<ret.length;i++){
          albums(ret[i]);
          $(".fancybox").fancybox({
            openEffect	: 'none',
            closeEffect	: 'none'
          });

        }
        $('.grid').append(ret).masonry({
          isAnimated:true,
          gutter:15,
          itemSelector:"div:not(.hidden)"
        }).masonry('appended',ret);
      }
    });
  });

$(window).load(function(){
var reloadcount = 0;
  $('.grid').imagesLoaded( function() {
  $('.grid').masonry();
});

    $(".grid").find("div:not(.Accueil)").addClass("hidden").fadeOut();

    var $reload = setInterval(function(){
      reloadcount++;
      $(".grid").masonry('reloadItems');
      $(".grid").masonry('layout');
      if (reloadcount == 5) {
        clearInterval($reload);
      }
      console.log('toto',reloadcount);
    },500);


    $(".album_title").on("click","ul li",function(e){
      var cls= $(this).attr("class");
      $(".grid").find(".hidden").fadeIn();
      $(".grid").find("div").removeClass("hidden");
      $(".grid").find("div:not(."+cls+")").addClass("hidden").stop().fadeOut();
      $(".grid ."+cls+" a").removeAttr("rel");
      console.log("popo :",$(".grid ."+cls+" a").attr("rel"));
      $(".grid ."+cls+" a").attr("rel",cls);
      // console.log("popo2 :",$(".grid ."+cls+" a").attr("rel"));
      setTimeout(function(){
        $(".grid").masonry('reloadItems');
        $(".grid").masonry();
      },600);
      $(".down").trigger("click");
      e.preventDefault();
    });

    $(".home").click(function(e){
      $(".grid").find("div").removeClass("hidden").fadeIn();
      $(".grid").find("div:not(.Accueil)").addClass("hidden").fadeOut();
      $(".grid div a").removeAttr("rel");
      $(".grid div a").attr("rel","allPics");
      $(".btn_back").trigger("click");
      e.preventDefault();
    });

});
