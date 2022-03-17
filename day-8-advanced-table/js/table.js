window.addEventListener("load", () => init());

const init = () => {
  console.clear();
  //

  const thead = document.querySelector(".thead");
  const tbody = document.querySelector(".tbody");

  const getJsonData = new Promise((resolve, reject) => {
    try {
      setTimeout(async () => {
        const response = await fetch("/day-8-advanced-table/table-data.json");
        const json = await response.json();
        resolve(json);
      }, 1000);
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
    })
    .catch((error) => console.log(error));

  const writeFilters = (data) => {
    const row = document.createElement("tr");
    row.classList.add("tr");
    thead.insertAdjacentElement("beforeend", row);
    console.log(thead.children[0]);

    Array.from(Object.keys(data[0])).forEach((key) => {
      thead.children[0].insertAdjacentHTML(
        "beforeend",
        `
        <div class="th">
          <button type="button" data-filter="a-z">${key.replace("_", " ")}<i class="ri-arrow-down-s-line"></i></button>
        </div>
      `
      );
    });
  };

  const writeRows = (data) => {
    console.log(data.length);
  };
};
