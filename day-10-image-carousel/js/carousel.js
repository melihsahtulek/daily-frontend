/*

  BY MELIHSAH TULEK - 2022
  github.com/melihsahtulek/

*/

window.addEventListener("load", () => {
  const carousels = document.querySelectorAll(".carousel");
  const carouselItems = document.querySelectorAll(".carousel-item");
  let carouselMemo = [];

  /*
    ITEMS: data-carousel-item-id
    CONTROLS: data-carousel-btn
  */

  const addObjToMemo = (carousel, event) => {
    let _len = Array.from(carouselItems).filter((item) => item.getAttribute("data-carousel-item-id") === carousel.getAttribute("id")).length;

    carouselMemo.push({
      id: carousel.getAttribute("id"),
      width: carousel.clientWidth,
      touchStart: event.touches[0].clientX - (document.body.clientWidth - carousel.clientWidth) / 2,
      counter: 1,
      maxLen: _len,
      value: 0,
    });
  };

  for (const carousel of carousels) {
    carousel.addEventListener("touchstart", (event) => {
      event.preventDefault();

      if (carouselMemo.length > 0) {
        for (const memo of carouselMemo) {
          if (memo.id === carousel.getAttribute("id")) {
            memo.touchStart = event.touches[0].clientX - (document.body.clientWidth - carousel.clientWidth) / 2;
            return false;
          } else {
            addObjToMemo(carousel, event);
          }
        }
      } else {
        addObjToMemo(carousel, event);
      }

      carousel.addEventListener("touchmove", (event) => moveTheCarousel(event, carousel));
    });

    carousel.addEventListener("touchend", (event) => touchEnd(event, carousel));
    // carousel.addEventListener("touchcancel", handleCancel, false);
  }

  const moveTheCarousel = (event, carousel) => {
    let x = event.touches[0].clientX - (document.body.clientWidth - carousel.clientWidth) / 2;
    let memo = carouselMemo.filter((elem) => elem.id === carousel.getAttribute("id"))[0];
    let { width, touchStart, counter, maxLen, id } = carouselMemo.filter((item) => item.id === carousel.getAttribute("id"))[0];

    if (counter - 1 === 0) {
      memo.value = (touchStart - x) * -1;
    } else {
      memo.value = (touchStart - x) * -1 + width * (counter - 1) * -1;
    }

    /*
    
    
    
    */

    if (width * counter - (touchStart - x) * -1 < counter * width) {
      console.log("if");
    } else {
      console.log("else");
    }

    Array.from(carouselItems).forEach((carouselItem, index) => {
      if (carouselItem.getAttribute("data-carousel-item-id") === id) {
        carouselItem.style.transform = `translateX(${memo.value}px)`;
      }
    });
  };

  const touchEnd = (event, carousel) => {
    let memo = carouselMemo.filter((elem) => elem.id === carousel.getAttribute("id"))[0];
    let { width, touchStart, counter, maxLen, id } = carouselMemo.filter((item) => item.id === carousel.getAttribute("id"))[0];

    // memo.counter += 1;
  };

  const nextCarouselItem = () => {};
  const prevCarouselItem = () => {};
});
