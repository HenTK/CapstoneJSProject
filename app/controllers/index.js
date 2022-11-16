var productService = new ProductService();
var productServiceList = new ProductServiceList();
function getProductsList() {
  productService.getList().then(function (response) {
    productServiceList.productList = response.data.map((element) => {
      const product = new Product(
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
    </div>
    `;
  }
  console.log(content);
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
