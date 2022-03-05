window.addEventListener("load", () => {
  const categories = [
    {
      id: 1,
      name: "breakfast food",
      image: "breakfast.png",
    },
    {
      id: 2,
      name: "cakes & desserts",
      image: "cake.png",
    },
    {
      id: 3,
      name: "water & drinks",
      image: "drinks.png",
    },
    {
      id: 4,
      name: "fastfood",
      image: "fastfood.png",
    },
    {
      id: 5,
      name: "foods",
      image: "food.png",
    },
    {
      id: 6,
      name: "fruits & vegetables",
      image: "fruits.png",
    },
    {
      id: 7,
      name: "icecream",
      image: "icecream.png",
    },
    {
      id: 8,
      name: "bakery",
      image: "bakery.png",
    },
  ];

  const categoriesRrow = document.querySelector(".categories-row");
  const searchInp = document.querySelector('input[name="search-category"]');
  const filterResult = document.querySelector(".filter-result");
  const filterResultList = document.querySelector(".filter-result-list");
  const blackScreen = document.querySelector(".black-screen");

  for (const category of categories) {
    categoriesRrow.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="category">
        <a href="javascript:void(0)" class="content">
          <h3>${category.name}</h3>
          <img src="./images/${category.image}" alt="" />
        </a>
      </div>
    `
    );
  }

  searchInp.addEventListener("focus", (e) => {
    blackScreen.setAttribute("data-is-show", "true");
  });

  searchInp.addEventListener("blur", (e) => {
    blackScreen.setAttribute("data-is-show", "false");
    filterResult.setAttribute("data-is-show", "false");
    searchInp.value = null;
  });

  searchInp.addEventListener("keyup", (e) => {
    filterResultList.innerHTML = null;
    filterResult.setAttribute("data-is-show", "false");
    let { value } = e.target;
    if (value.length > 0) {
      for (const category of categories) {
        if (category.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
          filterResult.setAttribute("data-is-show", "true");
          filterResultList.insertAdjacentHTML(
            "beforeend",
            `<li>
              <a href="javascript:void(0)">
                <img src="http://127.0.0.1:5500/day-5-categories-filter/images/${category.image}" alt="" />
                <h4>${category.name}</h4>
              </a>
            </li>`
          );
        }
      }
    } else {
      filterResultList.innerHTML = null;
      filterResult.setAttribute("data-is-show", "false");
    }
  });
});
