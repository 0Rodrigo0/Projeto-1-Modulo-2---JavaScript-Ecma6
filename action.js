// declarando as variaveis e as class
const inputText = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const lisItens = document.querySelector(".list-itens");

// evento dos botões
addBtn.addEventListener("click", addItemToList);
/*addBtn.addEventListener("click", function (event) {
  if (document.querySelector(".input").value == "") {
    return false;
  } else {
    addEventListener("click", addItemToList);
    //location.reload();
  }
});*/

// funções
function addItemToList(event) {
  // previne o auto refresh da página
  event.preventDefault();

  // criando a div
  const divItens = document.createElement("div");
  divItens.classList.add("div-class");

  // criando as li
  const novaliItens = document.createElement("li");
  novaliItens.innerText = inputText.value;
  novaliItens.classList.add("li-class");

  divItens.appendChild(novaliItens);

  saveLocalStorage(inputText.value);

  //criando botão de lido e a classe
  const botaoLido = document.createElement("button");
  botaoLido.innerHTML = '<i class="fas fa-check"></i>';
  botaoLido.classList.add("botao-lido");
  // aqui adicionando na div o btn
  divItens.appendChild(botaoLido);

  //criando botão de lixo e a classe
  const botaoLixo = document.createElement("button");
  botaoLixo.innerHTML = '<i class="icon-trash-o"></i>';
  botaoLixo.classList.add("botao-lixo");
  // aqui adicionando na div o btn
  divItens.appendChild(botaoLixo);

  //adiciona todos itens acima na lista
  lisItens.appendChild(divItens);
  // limpa o imput
  inputText.value = "";
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
