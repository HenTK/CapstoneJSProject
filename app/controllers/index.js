var cart = [];
var productService = new ProductService();
var productServiceList = new ProductServiceList();
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
  for (var i = 0; i < data.length; i++) {
    content += `
    <div class = "card">
        <div class = "img-container">
            <img src="${data[i].img}" alt="">
        </div>
        <p class = "details">${data[i].type}</p>
        <p>${data[i].desc}</p>
        <p>${data[i].name}</p>
        <p>${data[i].price}</p>
        <p>${data[i].screen}</p>
        <p>${data[i].backCamera}</p>
        <p>${data[i].frontCamera}</p>
        <button onclick="addItem(${data[i].id})" class="add-btn">ADD TO CART <i class="fas fa-chevron-right"></i></button>
        <span class="btn-add qty-change">
          <div>
            <button class="btn-qty sub" onclick = "removeCart(${data[i].id})"><i class="fas fa-chevron-left"></i></button>
            <p class="qty valueCart"></p>
            <button class="btn-qty add" onclick = "addCart(${data[i].id})"><i class="fas fa-chevron-right"></i></button>
          </div>
        </span>
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
  cart.push(cartItem);
};

let addCart = (id) => {
  for (var i = 0; i < cart.length; i++) {
    if (id == cart[i].product.id) {
      cart[i].quantity++;
      console.log(cart[i]);
    }
  }
  renderCart(cart);
};
let removeCart = (id) => {
  for (var i = 0; i < cart.length; i++) {
    if (id == cart[i].product.id && cart[i].quantity > 0) {
      cart[i].quantity--;
      console.log(cart[i]);
    }
  }
  renderCart(cart);
};
function renderCart(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    content += `
    <tr>
      <td>${data[i].product.id}</td>
      <td>${data[i].product.price}</td>
      <td>${data[i].product.name}</td>
      <td>${data[i].quantity}</td>
      <td></td>
    </tr>
    `;
    document.getElementById("tbodyP").innerHTML = content;
  }
}
var cartShop = document.getElementById("body-cart-shop");
var openCart = document.getElementById("cartOpen");
var closeCart = document.getElementById("cartClose");
let openCartModel = () => {
  cartShop.classList.remove("none");
  openCart.classList.add("none");
  cartShop.classList.remove("changeBar");
};
let closeCartModel = () => {
  cartShop.classList.add("none");
  openCart.classList.remove("none");
  cartShop.classList.add("changeBar");
};
