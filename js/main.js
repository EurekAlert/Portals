var footerStick = function() {
  $('body').css('margin-bottom', $('#footer').outerHeight());
},
didResize = false;

$(window).resize(function() {
  didResize = true;
});

setInterval(function() {
  if(didResize) {
    didResize = false;
    footerStick();
  }
}, 250);

$(document).ready(function() {

  footerStick();
  
  //mobile swipe to reveal search
  $('#navigation > .header').swipe( {
    swipeDown:function(event) {
      $('#search').collapse('show');
    },
    swipeUp:function() {
      $('#search').collapse('hide');
    },
    threshold:0,
    allowPageScroll: 'none',
    excludedElements: '#search, .search-btn, .advanced-search, .logo, .brand'
  });

  //allow mobile click to reveal mega dropdown
  $('.mega-dropdown > .dropdown-toggle').on('click', function(e){
    e.preventDefault();
    $(this).parent().toggleClass('hover');
    $(this).parent().find('> .dropdown-menu').fadeToggle(200);
  });

  //show/hide mega dropdown on hover
  $('.mega-dropdown').hoverIntent(
    function(){
      //android fix
      if($('html').hasClass('no-touch')) {
        $(this).addClass('hover');
        $('> .dropdown-menu', this).fadeIn(200);
      } else {
        return true;
      }
    },
    function(){
      $(this).removeClass('hover');
      $('> .dropdown-menu', this).fadeOut(200);
    }
  );

  //placeholder support for older browsers
  $('[placeholder]').focus(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
      input.removeClass('placeholder');
    }
  }).blur(function() {
    var input = $(this);
    if (input.val() == '' || input.val() == input.attr('placeholder')) {
      input.addClass('placeholder');
      input.val(input.attr('placeholder'));
    }
  }).blur();

  $('.btn').button()

});