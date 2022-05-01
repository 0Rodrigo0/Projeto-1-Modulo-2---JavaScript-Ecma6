// declarando as variaveis e as class
const inputText = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const lisItens = document.querySelector(".list-itens");
const valueTotal = document.querySelector(".value");
const main = document.querySelector("#changecolor");
const button = document.querySelector("#mode-selector");
const clear = document.querySelector("#clear");
const changeList = document.querySelector(".selector");

var valorTotal = 0;
valueTotal.innerText = "R$ " + valorTotal;
const darkModeClass = "dark-mode";

// evento dos botões
document.addEventListener("DOMContentLoaded", getValuesDom);
addBtn.addEventListener("click", addItemToList);
lisItens.addEventListener("click", deleteItens);
button.addEventListener("click", changeMode);
clear.addEventListener("click", clearList);
changeList.addEventListener("click", changeListValue);

// funções

// valida se a entrada do popup é numero
function isNumber(price) {
  return !isNaN(price);
}

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
  novaliItens.classList.add("li-class");
  divItens.appendChild(novaliItens);

  const novaliPrice = document.createElement("li");
  novaliPrice.classList.add("li-class-price");
  divItens.appendChild(novaliPrice);

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
      novaliItens.innerText = inputText.value;
      novaliPrice.innerText = price;
      //adiciona todos itens acima na lista
      lisItens.appendChild(divItens);
      // salva no localStorage
      saveLocalStorage({
        name: inputText.value,
        valuePrice: price,
        checkBox: false,
      });
    }
  }
  // limpa o imput
  inputText.value = "";
}

// salva no storage o produto
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

// salva valor no local storage
function saveValueTotalLocalStorage(total) {
  let listTotal;

  if (localStorage.getItem("listTotal") === null) {
    listTotal = [];
  } else {
    listTotal = JSON.parse(localStorage.getItem("listTotal"));
  }
  const verify = total.children[0].checked;
  if (verify) {
    total = total.children[2].innerText;
    listTotal.push(total);
    localStorage.setItem("listTotal", JSON.stringify(listTotal));
  } else {
    deleteValueTotalLocalStorage(total);
    return;
  }
}

// busca no local sotrage
function getValuesDom() {
  let listItens;

  if (localStorage.getItem("listItens") === null) {
    listItens = [];
  } else {
    listItens = JSON.parse(localStorage.getItem("listItens"));
  }

  listItens.forEach(function (product) {
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
    novaliItens.innerText = product.name;
    novaliItens.classList.add("li-class");
    divItens.appendChild(novaliItens);

    const novaliPrice = document.createElement("li");
    novaliPrice.innerText = product.valuePrice;
    novaliPrice.classList.add("li-class-price");
    divItens.appendChild(novaliPrice);

    //criando botão de lixo e a classe
    const trash = document.createElement("button");
    trash.innerHTML = '<i class="icon-x"></i>';
    trash.classList.add("trash-btn");
    divItens.appendChild(trash);

    lisItens.appendChild(divItens);
  });
}

// deleta da pagina
function deleteItens(event) {
  const product = event.target;

  if (product.classList[0] === "trash-btn") {
    const itemRemove = product.parentElement;
    removeDomValues(itemRemove);
    deleteValueTotalLocalStorage(itemRemove);
    decreaseValue(itemRemove);
    itemRemove.remove();
  }
  if (product.classList[0] === "check-box") {
    const checekd = product.parentElement;
    checekd.classList.toggle("off");
    sumValue(checekd);
    saveValueTotalLocalStorage(checekd);
  }
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
  //remove do array de acordo com o index, faz um map pois eh um objeto
  listItens.splice(listItens.map((a) => a.name).indexOf(productIndex), 1);
  // atualiza o array no local Storage
  localStorage.setItem("listItens", JSON.stringify(listItens));
}

function deleteValueTotalLocalStorage(total) {
  let listTotal;

  if (localStorage.getItem("listTotal") === null) {
    listTotal = [];
  } else {
    listTotal = JSON.parse(localStorage.getItem("listTotal"));
  }
  const totalIndex = total.children[0].innerText;
  listTotal.splice("listTotal".indexOf(totalIndex), 1);
  localStorage.setItem("listTotal", JSON.stringify(listTotal));
}

//função somadora
function sumValue(product) {
  let listItens;

  if (localStorage.getItem("listItens") === null) {
    listItens = [];
  } else {
    listItens = JSON.parse(localStorage.getItem("listItens"));
  }
  const takeValue1 = product.children[0];
  if (takeValue1.checked === true) {
    const takeValue = product.children[2].innerText;
    valorTotal = parseFloat(valorTotal) + parseFloat(takeValue);
    const show = document.querySelector(".value");
    show.innerText = "R$ " + valorTotal.toFixed(2);
  } else {
    const takeValue = product.children[2].innerText;
    valorTotal = parseFloat(valorTotal) - parseFloat(takeValue);
    const show = document.querySelector(".value");
    show.innerText = "R$ " + valorTotal.toFixed(2);
  }
}

// diminui valor ao edletar
function decreaseValue(product) {
  let listItens;

  if (localStorage.getItem("listItens") === null) {
    listItens = [];
  } else {
    listItens = JSON.parse(localStorage.getItem("listItens"));
  }

  if (valorTotal <= 0) {
    return;
  } else {
    const takeValue = product.children[2].innerText;
    valorTotal = parseFloat(valorTotal) - parseFloat(takeValue);
    const show = document.querySelector(".value");
    show.innerText = "R$ " + valorTotal.toFixed(2);
  }
}

// executa as changes
function changeMode() {
  changeClasses();
  changeText();
}

// altera classes
function changeClasses() {
  main.classList.toggle(darkModeClass);
  button.classList.toggle(darkModeClass);
}

// muda texto botao
function changeText() {
  const lightMode = "Blue Mode";
  const darkMode = "Dark Mode";

  if (changecolor.classList.contains(darkModeClass)) {
    button.innerHTML = lightMode;
    return;
  }
  button.innerHTML = darkMode;
}

// limpa lista
function clearList() {
  localStorage.clear();
  location.reload();
}

// funcção list modo
function changeListValue(element) {
  const itens = lisItens.childNodes;
  itens.forEach(function (product) {
    switch (element.target.value) {
      case "all":
        product.style.display = "flex";
        break;
      case "buy":
        if (product.classList.contains("off")) {
          product.style.display = "flex";
        } else {
          product.style.display = "none";
        }
        break;
      case "open":
        if (!product.classList.contains("off")) {
          product.style.display = "flex";
        } else {
          product.style.display = "none";
        }
    }
  });
}
