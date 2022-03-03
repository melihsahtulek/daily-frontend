window.addEventListener("load", () => {
  const tabButtons = document.querySelectorAll("button[data-tab-button]");
  const tabItems = document.querySelectorAll("div[data-tab-item]");

  for (const button of tabButtons) {
    button.addEventListener("click", () => changeActiveButton(button));
  }

  const changeActiveButton = (button) => {
    Array.from(tabButtons).forEach((btn) => {
      if (btn.getAttribute("data-tab-id") === button.getAttribute("data-tab-id")) {
        btn.classList.remove("active-tab");
      }
    });
    button.classList.add("active-tab");
    changeActiveTab(button.getAttribute("data-tab-id"), button.getAttribute("data-tab-button"));
  };

  const changeActiveTab = (id, tabName) => {
    console.log(id, tabName);
    Array.from(tabItems).forEach((item) => {
      if (item.getAttribute("data-tab-id") === id) {
        if (item.getAttribute("data-tab-item") !== tabName) {
          item.classList.remove("active-tab");
        } else {
          item.classList.add("active-tab");
        }
      }
    });
  };
});
