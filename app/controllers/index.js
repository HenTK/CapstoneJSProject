var cart = [];
var productService = new ProductService();
var productServiceList = new ProductServiceList();
var cartShop = document.getElementById("body-cart-shop");
var openCart = document.getElementById("cartOpen");
var closeCart = document.getElementById("cartClose");
var cartoverlay = document.getElementById("overlay");
var MoneyPay = 0;
function getProductsList() {
  productService.getList().then(function (response) {
    productServiceList.productList = response.data.map((element) => {
      const product = new Product(
        element.id,
        element.name,
        element.price,
        element.screen,
        element.backCamera,
        element.frontCamera,
        element.img,
        element.desc,
        element.type
      );
      return product;
    });
  });
  renderProductList(productServiceList.productList);
}
function domId(id) {
  return document.getElementById(id);
}
function renderProductList(data) {
  var content = "";
  var pos = 0;
  for (var i = 0; i < data.length; i++) {
    content += `
    <div class = "card">
        <i class = "state">In stock</i>
        <div class = "img-container">
            <img src="${data[i].img}" alt="">
        </div>
        <div class = "details">
              <p class = "title">Loại: ${data[i].type}</p>
              <p class = "info">${data[i].desc}</p>
              <p class = "info">Tên: ${data[i].name}</p>
              <p class = "info">Màn hình: ${data[i].screen}</p>
              <p class = "info">Camera trước: ${data[i].backCamera}</p>
              <p class = "info">Camera sau: ${data[i].frontCamera}</p>
              <div class = "display-info">
                <p class = "">$${data[i].price}</p>
                <button onclick="addItem(${data[i].id})" class="add-btn">ADD TO CART <i class="fas fa-chevron-right"></i></button>   
              </div>         
        </div>
    </div>
    `;
  }
  document.getElementById("main-cart").innerHTML = content;
}
domId("selLoai").onchange = (event) => {
  const value = event.target.value;
  const data = productServiceList.filterProductList(value);
  renderProductList(data);
};
window.onload = function () {
  getProductsList();
  getProductListFromLocalStorage();
  if (cart[0].quantity == "") {
    document.getElementById("empty-cart").style.display = "block";
  } else {
    document.getElementById("empty-cart").style.display = "none";
  }
};

const addItem = (id) => {
  let quantity = 0;
  const value = productServiceList.findProductList(id);
  var cartItem = {
    product: {
      id: value.id,
      price: value.price,
      name: value.name,
      image: value.img,
    },
    quantity: 1,
  };
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].product.id == id) {
      return 0;
    }
  }
  cart.push(cartItem);
  renderCart(cart);
  renderQuantity();
  setLocalStorage();
};

let addCart = (id) => {
  var quantity;
  for (var i = 0; i < cart.length; i++) {
    if (id == cart[i].product.id) {
      cart[i].quantity++;
      MoneyPay += +cart[i].product.price;
      console.log(MoneyPay);
      quantity = quantityValue(cart[i].quantity);
    }
  }
  renderCart(cart);
  renderQuantity();
  setLocalStorage();
};
let removeCart = (id) => {
  var quantity;
  for (var i = 0; i < cart.length; i++) {
    if (id == cart[i].product.id && cart[i].quantity > 0) {
      cart[i].quantity--;
      MoneyPay -= +cart[i].product.price;
      console.log(MoneyPay);
      quantity = quantityValue(cart[i].quantity);
    }
  }
  renderCart(cart);
  renderQuantity();
  setLocalStorage();
};
function quantityValue(quantity) {
  return quantity;
}
function renderCart(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    content += `
    <tr>
      <td><img class = "renderCartProducts" src="${data[i].product.image}" alt=""></td>
      <td>$${data[i].product.price}</td>
      <td>${data[i].product.name}</td>
      <td>
      <button class = "quantityDec" onclick = "removeCart(${data[i].product.id})"><i class="fa-solid fa-minus"></i></button>
      ${data[i].quantity}
      <button class = "quantityInc" onclick = "addCart(${data[i].product.id})"><i class="fa-solid fa-plus"></i></button>
      </td>
      <td><i class="fa-solid fa-trash trash" onclick = "deleteModal(${data[i].product.id})"></i></td>
    </tr>
    `;
  }

  document.getElementById("tbodyP").innerHTML = content;
  document.getElementById("total").innerHTML = "" + MoneyPay;
}

let openCartModel = () => {
  cartShop.classList.remove("none");
  openCart.classList.add("none");
  cartShop.classList.remove("changeBar");
  cartoverlay.classList.remove("changeBar");
  cartoverlay.classList.remove("none");
};

let closeCartModel = () => {
  cartShop.classList.add("none");
  openCart.classList.remove("none");
  cartShop.classList.add("changeBar");
  cartoverlay.classList.add("changeBar");
  cartoverlay.classList.add("none");
};

let total = (cart) => {
  MoneyPay += +cart.product.money * +cart.quantity;
  document.querySelector("total").innerHTML = MoneyPay;
};

function clearCart() {
  cart = [];
  MoneyPay = 0;
  console.log(cart);
  renderCart(cart);
  renderQuantity();
  setLocalStorage();
}

let renderQuantity = () => {
  var totalQuantity = 0;
  for (var i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  document.getElementById("cartQuantity").innerHTML = totalQuantity;
};

function deleteModal(id) {
  for (var i = 0; i < cart.length; i++) {
    if (id == cart[i].product.id) {
      cart.splice(i, 1);
    }
  }
  renderCart(cart);
  renderQuantity();
}

const setLocalStorage = () => {
  const stringify = JSON.stringify(cart);
  localStorage.setItem("PRODUCT_LIST_KEY", stringify);
};

const getLocalStorage = () => {
  const stringify = localStorage.getItem("PRODUCT_LIST_KEY");
  if (stringify) {
    return JSON.parse(stringify);
  }
  return cart;
};

const getProductListFromLocalStorage = () => {
  const data = getLocalStorage();
  cart = data;
  renderCart(cart);
  renderQuantity();
};
