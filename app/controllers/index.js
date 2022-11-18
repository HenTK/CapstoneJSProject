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
};

const addItem = (id) => {
  const value = productServiceList.findProductList(id);

  var cartItem = {
    product: {
      id: value.id,
      price: value.price,
      name: value.name,
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
};
function quantityValue(quantity) {
  return quantity;
}
function renderCart(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    content += `
    <tr>
      <td>${data[i].product.id}</td>
      <td>$${data[i].product.price}</td>
      <td>${data[i].product.name}</td>
      <td>
      <button onclick = "removeCart(${data[i].product.id})"><i class="fa-solid fa-minus"></i></button>
      ${data[i].quantity}
      <button onclick = "addCart(${data[i].product.id})"><i class="fa-solid fa-plus"></i></button>
      </td>
      <td><i class="fa-solid fa-trash"></i></td>
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
  renderCart();
}
