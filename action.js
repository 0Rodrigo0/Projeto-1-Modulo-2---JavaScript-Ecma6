// declarando as variaveis e as class
const imputText = document.querySelector(".imput");
const addBtn = document.querySelector(".add-btn");
const lisItens = document.querySelector(".list-itens");

// evento dos botões
addBtn.addEventListener("click", addItemToList);

// funções
function addItemToList(event) {
  // previne o auto refresh da página
  event.preventDefault();

  // criando a div
  const divItens = document.createElement("div");
  divItens.classList.add("div-class");

  // criando as li
  const liItens = document.createElement("li");
  liItens.innerText = imputText.value;
  liItens.classList.add("li-class");
  divItens.appendChild(liItens);
  console.log(liItens);

  //
  lisItens.appendChild(divItens);
  // limpa o imput
  imputText.value = "";
}
