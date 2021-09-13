const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p class="text-danger">Category: ${product.category}</p>
      <h2 class="text-secondary">Price: $ ${product.price}</h2>
       <h5 class="text-success">Total Rating:${product.rating.count}</h5>
      <h5 class="text-"><span class="text-warning">
      <span class="fa fa-star"></span></span>Rating:${product.rating.rate}</h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" class="btn btn-info" onclick="loadDetails(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// 
const loadDetails = (productId) => {
  const url = `https://fakestoreapi.com/products/${productId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDetail(data));
}
loadDetails();
const showDetail = (product) => {
  const showDetail = document.getElementById('show-detail');
  showDetail.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
    <img src="${product.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h3 >${product.title}</h3>
    <p >Category: ${product.category}</p>
    <h2 >Price: $ ${product.price}</h2>
    <h5 class="text-primary">Rating:${product.rating.rate}</h5>
    <h5 class="text-primary text-center">Total Rating:${product.rating.count}</h5>
    <button onclick="addToCart(${product.productid}),${product.price})" id="addToCart-btn" class="buy-now btn btn-primary mx-auto">add to cart</button>
    </div>
    `;
  showDetail.appendChild(div);

}
// 
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = (Math.round(total * 100) / 100).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (Math.round(value * 100) / 100).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = (Math.round(grandTotal * 100) / 100).toFixed(2);
};