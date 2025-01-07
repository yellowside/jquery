$(function () {
   // 侧边栏弹出
   $('.press-button').click(function () {
      var left = $('#wrapper')[0].offsetLeft;
      if (left == 0) {
         $('#wrapper').offset({
            'left': 170
         });
         $(this).css('transform', 'rotate(450deg)');
         $('.headSculpture img').addClass('img');
         $('.headSculpture p').addClass('opacity');
         setTimeout(function () {
            $('.option ul>li').addClass('li');
         }, 600)
      } else {
         $('#wrapper').offset({
            'left': 0
         });
         $(this).css('transform', 'rotate(0deg)');
         setTimeout(function () {
            $('.headSculpture img').removeClass('img');
            $('.headSculpture p').removeClass('opacity');
            $('.option ul>li').removeClass('li');
         }, 300)
      }
   })

   $('.option ul>li').mouseenter(function () {
      var index = $(this).index();
      $(this).children('img').attr('src', SRC[index].src);
   })
   $('.option ul>li').mouseleave(function () {
      var index = $(this).index();
      $(this).children('img').attr('src', SRC[index + 5].src);
   })
})