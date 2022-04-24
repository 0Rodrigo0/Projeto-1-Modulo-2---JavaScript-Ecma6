// declarando as variaveis e as class
const inputText = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const lisItens = document.querySelector(".list-itens");

console.log(inputText.value);
// evento dos botões
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

  // criando as li
  const liItens = document.createElement("li");
  liItens.innerText = inputText.value;
  liItens.classList.add("li-class");
  divItens.appendChild(liItens);
  console.log(liItens);

  //
  lisItens.appendChild(divItens);
  // limpa o imput
  inputText.value = "";
}
