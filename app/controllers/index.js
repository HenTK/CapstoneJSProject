var productService = new ProductService();
var productServiceList = new ProductServiceList();
var cart = [];
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
    renderProductList(response.data);
  });
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
            <button class="btn-qty sub"><i class="fas fa-chevron-left"></i></button>
            <p class="qty valueCart">1</p>
            <button class="btn-qty add" onclick = "addCart()"><i class="fas fa-chevron-right"></i></button>
          </div>
        </span>
    </div>
    `;
  }
  console.log(content);
  document.getElementById("main-cart").innerHTML = content;
}
domId("selLoai").onchange = (event) => {
  const value = event.target.value;
  const data = productServiceList.filterProductList(value);
  console.log(data);
  renderProductList(data);
};
window.onload = function () {
  getProductsList();
};

const addCart = () => {
  // var cart = +document.querySelector(".valueCart").innerHTML;
  // cart += 1;
  // document.querySelector(".valueCart").innerHTML = cart;
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
  console.log(cart);
};
