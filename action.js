// declarando as variaveis e as class
const inputText = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const lisItens = document.querySelector(".list-itens");

// evento dos botões
document.addEventListener("DOMContentLoaded", getValuesDom);
addBtn.addEventListener("click", addItemToList);
lisItens.addEventListener("click", deleteItens);

// funções

// função que adiciona a lista e seus itens
function addItemToList(event) {
  // previne o auto refresh da página
  event.preventDefault();

  // criando a div
  const divItens = document.createElement("div");
  divItens.classList.add("div-class");

  // criando checkbox
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("check-box");
  divItens.appendChild(checkBox);

  // criando as li
  const novaliItens = document.createElement("li");
  novaliItens.innerText = inputText.value;
  novaliItens.classList.add("li-class");
  divItens.appendChild(novaliItens);

  const novaliPrices = document.createElement("li");
  novaliPrices.classList.add("li-class-price");
  divItens.appendChild(novaliPrices);

  //criando botão de lixo e a classe
  const trash = document.createElement("button");
  trash.innerHTML = '<i class="icon-x"></i>';
  trash.classList.add("trash-btn");
  divItens.appendChild(trash);

  // valida o input esta vaziu
  if (inputText.value === "") {
    alert("Nome do produto é necessário!");
    return;
  } else {
    let price = prompt("Digite o valor: " + "\n" + "(Ex: 10.45): ");
    if (price === "" || isNumber(price) === false) {
      alert("Você deve digitar um valor numérico!");
    } else {
      novaliPrices.innerText = price;
      //adiciona todos itens acima na lista
      lisItens.appendChild(divItens);
      // salva no localStorage
      saveLocalStorage(inputText.value);
      savePricesLocalStorage(price);
    }
  }
  // limpa o imput
  inputText.value = "";
}

// valida se a entrada do popup é numero
function isNumber(price) {
  return !isNaN(price);
}

// deleta da pagina
function deleteItens(event) {
  const product = event.target;
  const price = event.target;

  if (product.classList[0] === "trash-btn") {
    const listItens = product.parentElement;
    const listPrices = price.parentElement;
    removeDomValues(listItens);
    removePriceDomValues(listPrices);
    listItens.remove();
  }
}

// salva local storage o produto
function saveLocalStorage(product) {
  let listItens;

  if (localStorage.getItem("listItens") === null) {
    listItens = [];
  } else {
    listItens = JSON.parse(localStorage.getItem("listItens"));
  }

  listItens.push(product);
  localStorage.setItem("listItens", JSON.stringify(listItens));
}

// salva preco no local storage
function savePricesLocalStorage(price) {
  let listPrices;

  if (localStorage.getItem("listPrices") === null) {
    listPrices = [];
  } else {
    listPrices = JSON.parse(localStorage.getItem("listPrices"));
  }
  // salva no array
  listPrices.push(price);
  localStorage.setItem("listPrices", JSON.stringify(listPrices));
}

// busca valores no local sotrage
function getValuesDom() {
  let listItens;

  if (localStorage.getItem("listItens") === null) {
    listItens = [];
  } else {
    listItens = JSON.parse(localStorage.getItem("listItens"));
  }

  listItens.forEach((product) => {
    // criando a div
    const divItens = document.createElement("div");
    divItens.classList.add("div-class");

    // criando checkbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("check-box");
    divItens.appendChild(checkBox);

    // criando as li
    const novaliItens = document.createElement("li");
    novaliItens.innerText = product;
    novaliItens.classList.add("li-class");
    divItens.appendChild(novaliItens);

    const novaliPrices = document.createElement("li");
    novaliPrices.classList.add("li-class-price");
    divItens.appendChild(novaliPrices);

    //criando botão de lixo e a classe
    const trash = document.createElement("button");
    trash.innerHTML = '<i class="icon-x"></i>';
    trash.classList.add("trash-btn");
    divItens.appendChild(trash);

    lisItens.appendChild(divItens);
  });
}

// remove produtos local sotrage
function removeDomValues(product) {
  let listItens;
  if (localStorage.getItem("listItens") === null) {
    listItens = [];
  } else {
    listItens = JSON.parse(localStorage.getItem("listItens"));
  }
  const productIndex = product.children[1].innerText;
  //remove do array de acordo com o index
  listItens.splice(listItens.indexOf(productIndex), 1);
  // atualiza o array no local Storage
  localStorage.setItem("listItens", JSON.stringify(listItens));
}

function removePriceDomValues(price) {
  let listPrices;

  if (localStorage.getItem("listPrices") === null) {
    listPrices = [];
  } else {
    listPrices = JSON.parse(localStorage.getItem("listPrices"));
  }
  const priceIndex = price.children[2].innerText;
  console.log(priceIndex);
  //remove do array de acordo com o index
  listPrices.splice(listPrices.indexOf(priceIndex), 1);
  // atualiza o array no local Storage
  localStorage.setItem("listPrices", JSON.stringify(listPrices));
}
