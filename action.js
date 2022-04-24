// declarando as variaveis e as class
const inputText = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const lisItens = document.querySelector(".list-itens");

// evento dos botões
document.addEventListener("DOMContentLoaded", getValuesDom);
//addBtn.addEventListener("click", addItemToList);
lisItens.addEventListener("click", deleteItens);
addBtn.addEventListener("click", function (event) {
  if (document.querySelector(".input").value == "") {
    return false;
  } else {
    addEventListener("click", addItemToList);
    location.reload();
  }
});

// funções
function addItemToList(event) {
  // previne o auto refresh da página
  event.preventDefault();

  // criando a div
  const divItens = document.createElement("div");
  divItens.classList.add("div-class");

  // criando checkbox
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.classList.add("check-box");
  divItens.appendChild(checkBox);

  // criando as li
  const novaliItens = document.createElement("li");
  novaliItens.innerText = inputText.value;
  novaliItens.classList.add("li-class");
  divItens.appendChild(novaliItens);

  // salva no localStorage
  saveLocalStorage(inputText.value);

  //criando botão de lixo e a classe
  const trash = document.createElement("button");
  trash.innerHTML = '<i class="icon-trash-o"></i>';
  trash.classList.add("trash-btn");
  divItens.appendChild(trash);

  //adiciona todos itens acima na lista
  lisItens.appendChild(divItens);
  // limpa o imput
  inputText.value = "";
}

function deleteItens(event) {
  const item = event.target;
  if (item.classList[0] === "trash-btn") {
    const value = item.parentElement;
    deleteLocalStorage(value);
    value.remove();
  }
  /*if (item.classList[0] === "botao-lido") {
    const tarefa = item.parentElement;
    tarefa.classList.toggle("completed");
  }*/
}

// salvando no localStorage
function saveLocalStorage(value) {
  let itens;
  // verificando localStorage ta vaziu, se esta cria o array, se nao traz os itens
  if (localStorage.getItem("itens") === null) {
    itens = [];
  } else {
    itens = JSON.parse(localStorage.getItem("itens"));
  }
  //add item no array e salva no localStorage
  itens.push(value);
  localStorage.setItem("itens", JSON.stringify(itens));
}

function getValuesDom() {
  let itens;
  // verificando localStorage ta vaziu, se esta cria o array, se nao traz os itens
  if (localStorage.getItem("itens") === null) {
    itens = [];
  } else {
    itens = JSON.parse(localStorage.getItem("itens"));
  }

  itens.forEach((value) => {
    // repetiu o codigo de criação das divs
    // criando a div
    const divItens = document.createElement("div");
    divItens.classList.add("div-class");

    // criando checkbox
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("check-box");
    divItens.appendChild(checkBox);

    // criando as li
    const novaliItens = document.createElement("li");
    novaliItens.innerText = value;
    novaliItens.classList.add("li-class");
    divItens.appendChild(novaliItens);

    //criando botão de lixo e a classe
    const trash = document.createElement("button");
    trash.innerHTML = '<i class="icon-trash-o"></i>';
    trash.classList.add("trash-btn");
    divItens.appendChild(trash);

    //adiciona todos itens acima na lista
    lisItens.appendChild(divItens);
  });
}

function deleteLocalStorage(value) {
  let itens;
  // verificando localStorage ta vaziu, se esta cria o array, se nao traz os itens
  if (localStorage.getItem("itens") === null) {
    itens = [];
  } else {
    itens = JSON.parse(localStorage.getItem("itens"));
  }
  // aqui ele esta buscando o valor contido no array do localStorage
  const valueIndex = value.children[0].innerText;
  console.log(valueIndex);

  //remove do array
  itens.splice(itens.valueIndex, 1);

  //atualiza o array
  localStorage.setItem("itens", JSON.stringify(itens));
}
