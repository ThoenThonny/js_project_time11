var products = [];
var cartItems = [];

// Display products
const Display = (prd) => {
    const showPrd = document.getElementById("show-products");
    showPrd.innerHTML = "";
  prd.forEach((item) => {

    showPrd.innerHTML +=
      `  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card coffee-card h-100 shadow-lg border-0">
                <img src="${item.image}" class="card-img-top" alt="">
                <div class="card-body ">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">$${item.description.substring(0, 50)}...</p>
                    <p class="card-text text-success fw-bold">$${item.price.toFixed(2)}</p>
                    <button class="btn btn-dark w-100">Add to Cart</button>
                </div>
            </div>
        </div>
`;
  });
};

fetch("https://thoenthonny.github.io/Coffee-Api/data.json")
  .then((res) => res.json())
  .then((dataprd) => {
    products = dataprd;
    Display(products);
  })
  .catch((err) => console.log(err));

// Search products
document.getElementById("search_products").addEventListener("input", (e) => {
  const searchVal = e.target.value.toLowerCase();
  console.log(searchVal);

  const IsProducts = products.filter((pro) =>
    pro.name.toLowerCase().includes(searchVal),
  );
  if (IsProducts.length > 0) {
    Display(IsProducts);
  } else {
    Display([]);
    const showPrd = document.getElementById("show-products");

    showPrd.innerHTML += `  

        <h1 class=" text-center text-danger">Product Is Not Found</h1>
           
`;
  }
});
