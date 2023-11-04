import './style.css'

interface Todo{
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] =[];

const todosContainer = document.querySelector(".todosContainer") as HTMLDivElement;
const  todoInput = document.querySelector(".input") as HTMLInputElement;
//const myForm = document.querySelector("#myForm") as HTMLFormElement;
const submitButton = document.querySelector(".btn") as HTMLButtonElement;


submitButton.addEventListener("click",(e)=>{
  e.preventDefault();
  const todo:Todo = {
    title:todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 10000)
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
})

const generateTodoItem = (todo:Todo) => {
  const{title, isCompleted, id} = todo;
  const todoItem: HTMLDivElement = document.createElement("div");
  //add className to todoItem
  todoItem.className = "todo-item";

  //create a checkbox
  const checkbox:HTMLInputElement = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  // add className to checkbox
  checkbox.className = "isCompleted";
  checkbox.checked = isCompleted;

  checkbox.onchange = ()=>{
    // check kro jo bhi checkbox tik hai matlab jiski id aa chuki hai uske checkbox ko pir se tik krdo

    todos.find((item)=>{
      if(item.id === id)
        item.isCompleted = checkbox.checked;
    });

    paragraph.className = checkbox.checked ? "text-cut" : "title";
  }

  // creating a p tag for title
  const paragraph:HTMLParagraphElement = document.createElement("p");
  paragraph.className="title"
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "text-cut" : "title"

  // creating a delete button
  const btn:HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = ()=>{
    deleteTodo(id);
  }

  // appeding all properties to todo div
  todoItem.append(checkbox, paragraph, btn);

  todosContainer.append(todoItem);

}

const deleteTodo = (id:string)=>{
  const index = todos.findIndex((item)=> item.id === id);
  todos.splice(index, 1);
  renderTodo(todos);
}



const renderTodo = (todos:Todo[]):void => {
  todosContainer.innerText = "";
  todos.forEach(todo =>{
    generateTodoItem(todo);
  });
}




