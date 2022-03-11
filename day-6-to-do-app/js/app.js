const myTodoList = [
  {
    id: 1,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    completed: true,
  },
  {
    id: 2,
    desc: "Duis aliquam est quis finibus feugiat.",
    completed: false,
  },
];

const toDoListUl = document.querySelector(".open-to-do-ul");
const openLen = document.querySelector(".open-len");
const addNewToDoBtn = document.querySelector(".add-new-to-do");
const textInput = document.querySelector("input[name=to-do-input]");

addNewToDoBtn.addEventListener("click", () => {
  addToDo(textInput.value);
  textInput.focus();
});

const writeTheList = () => {
  // myTodoList

  toDoListUl.innerHTML = null;

  for (const toDo of myTodoList) {
    toDoListUl.insertAdjacentHTML(
      "beforeend",
      `
      <li data-id=${"todo_" + toDo.id} class=${toDo.completed && "checked"}>
        <label for=${"todo_" + toDo.id}>
          <div class="checkbox">
            <input type="checkbox" hidden name="checkbox_input" id=${"todo_" + toDo.id} ${toDo.completed && "checked"} />
            ${toDo.completed ? '<i class="ri-check-line checked-icon"></i>' : ""}
          </div>
          <h4>${toDo.desc}</h4>
        </label>
      </li>
    `
    );
  }

  updateLength();
  toDoEvent();
};

const updateLength = () => {
  let _length = 0;

  myTodoList.forEach((elem) => {
    if (elem.completed) {
      _length++;
    }
  });

  openLen.textContent = `you have ${_length} open to-do`;
};

const toDoEvent = () => {
  const toDoElems = document.querySelectorAll('[name="checkbox_input"]');

  for (const toDoInp of toDoElems) {
    toDoInp.addEventListener("change", (e) => {
      updateToDoList(toDoInp.getAttribute("id"), toDoInp.checked);
    });
  }
};

const updateToDoList = (id, checked) => {
  let newID = parseInt(id.split("_")[id.split("_").length - 1]);
  for (const toDo of myTodoList) {
    if (toDo.id === newID) {
      toDo.completed = checked;
    }
  }

  writeTheList();
};

const addToDo = (newToDo) => {
  let val = newToDo.trim();
  if (val.length > 0) {
    myTodoList.push({
      id: myTodoList.length + 1,
      desc: val,
      completed: false,
    });

    textInput.value = null;
    writeTheList();
  }
};

writeTheList();
