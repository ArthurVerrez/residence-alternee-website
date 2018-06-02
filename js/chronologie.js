var timelineSwiper = new Swiper(".timeline .swiper-container", {
  direction: "vertical",
  loop: false,
  speed: 1600,
  pagination: {
    el:".swiper-pagination",
    type:"bullets",
    clickable:true,
    dynamicBullets:true,
    dynamicMainBullets:1,
    renderBullet: function (index, className) {
    var year = document
      .querySelectorAll(".swiper-slide")
      [index].getAttribute("data-year");
    return '<span class="' + className + '">' + year + "</span>";
    },
  },
  
  /*paginationBulletRender: function(swiper, index, className) {
    var year = document
      .querySelectorAll(".swiper-slide")
      [index].getAttribute("data-year");
    return '<span class="' + className + '">' + year + "</span>";
  },*/

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      direction: "horizontal"
    }
  }
});

/*var timelineSwiper = new Swiper(".timeline .swiper-container", {
  direction: "vertical",
  loop: false,
  speed: 1600,
  pagination:{
    el:'.swiper-pagination',
    type:'bullets',
    renderBullet: function(index, className) {
      var year = document
        .querySelectorAll(".swiper-slide")
        [index].getAttribute("data-year");
      return '<span class="' + className + '">' + year + "</span>";
    },

  clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
,
  

  breakpoints: {
    768: {
      direction: "horizontal"
    }
  }
});*/