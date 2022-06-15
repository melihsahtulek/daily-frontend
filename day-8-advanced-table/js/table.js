window.addEventListener("load", () => init());

const init = () => {
  console.clear();
  //

  const thead = document.querySelector(".thead");
  const tbody = document.querySelector(".tbody");
  const searchInp = document.querySelector("input[name=s]");

  const getJsonData = new Promise((resolve, reject) => {
    try {
      setTimeout(async () => {
        const response = await fetch("../table-data.json");
        const json = await response.json();
        resolve(json);
      }, 250);
    } catch (error) {
      reject(error);
    }
  });

  getJsonData
    .then((result) => {
      let { data } = result;
      writeFilters(data);
      return data;
    })
    .then((data) => {
      writeRows(data);
      return data;
    })
    .then((data) => {
      filterEvent(data);
      return data;
    })
    .then((data) => {
      searchEvent(data);
    })
    .catch((error) => console.log(error));

  const writeFilters = (data) => {
    const row = document.createElement("tr");
    row.classList.add("tr");
    thead.insertAdjacentElement("beforeend", row);

    Array.from(Object.keys(data[0])).forEach((key) => {
      thead.children[0].insertAdjacentHTML(
        "beforeend",
        `
        <div class="th">
          <button type="button" class="filter-button" data-filter-type="a-z" data-filter-name=${key}>${key.replace(
          "_",
          " "
        )}<i class="ri-arrow-down-s-line arrow-icon"></i></button>
        </div>
      `
      );
    });
  };

  const writeRows = (data) => {
    tbody.innerHTML = null;
    Array.from(data).forEach((perData, index) => {
      const row = document.createElement("tr");
      row.classList.add("tr");
      tbody.insertAdjacentElement("beforeend", row);

      Array.from(Object.keys(perData)).forEach((key) => {
        tbody.children[index].insertAdjacentHTML(
          "beforeend",
          `
            <div class="td">${perData[key]}</div>
          `
        );
      });

      tbody.children[index].insertAdjacentHTML(
        "beforeend",
        `
        <div class="td">
          <a href="javascript:void(0)"> link ${perData.id} </a>
        </div>
        `
      );
    });
  };

  const filterEvent = (data) => {
    const buttons = document.querySelectorAll(".filter-button");
    const icons = document.querySelectorAll(".arrow-icon");

    Array.from(buttons).forEach((button, index) => {
      button.addEventListener("click", () => {
        // clear

        Array.from(buttons).forEach((_button) => {
          if (button !== _button) {
            _button.setAttribute("data-filter-type", "a-z");
          }
        });

        Array.from(icons).forEach((icon) => {
          icon.style.transform = "rotate(0)";
        });

        button.setAttribute("data-filter-type", button.getAttribute("data-filter-type") === "a-z" ? "z-a" : "a-z");
        filterData(button.getAttribute("data-filter-name"), data, button.getAttribute("data-filter-type"));
        if (button.getAttribute("data-filter-type") === "z-a") {
          icons[index].style.transform = "rotate(180deg)";
        }
      });
    });
  };

  const filterData = (fName, _data, type) => {
    let control = true;
    let data = [..._data];

    const setArr = (data, i) => {
      let memo = data[i];
      data[i] = data[i + 1];
      data[i + 1] = memo;
      control = false;
    };

    while (true) {
      control = true;

      for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1; j++) {
          if (type === "a-z") {
            if (data[i][fName].toString().includes("-")) {
              if (data[i][fName].split("-").reverse().join("-") > data[i + 1][fName].split("-").reverse().join("-")) {
                setArr(data, i);
              }
            } else {
              if (data[i][fName] > data[i + 1][fName]) {
                setArr(data, i);
              }
            }
          } else {
            if (data[i][fName].toString().includes("-")) {
              if (data[i][fName].split("-").reverse().join("-") < data[i + 1][fName].split("-").reverse().join("-")) {
                setArr(data, i);
              }
            } else {
              if (data[i][fName] < data[i + 1][fName]) {
                setArr(data, i);
              }
            }
          }
        }
      }

      if (control) {
        break;
      }
    }

    writeRows(data);
  };

  const searchEvent = (data) => {
    searchInp.addEventListener("keyup", (e) => {
      let val = e.target.value.toLowerCase().trim();
      writeRows(data.filter((row) => row["first_name"].toLowerCase().includes(val)));
    });
  };
};
