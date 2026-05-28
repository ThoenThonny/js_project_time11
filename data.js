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
                    <button onclick="AddTocart(${item.id})" class="btn btn-dark w-100">Add to Cart</button>
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

// add to cart

const AddTocart = (productId) => {
  const prds = products.find(item => item.id === productId);
  const Iscart = cartItems.find(pro => pro.id === productId);
  if (Iscart) {
    Iscart.qty += 1;
  } else {
    cartItems.push({ ...prds, qty: 1 });
  }
  Swal.fire({
  title: `${prds.name} added to cart!`,
  icon: "success",
  draggable: true
});
  DisplayCartItems();
}

// Diplay Cart Items

const DisplayCartItems = () => {
  const cartcount = document.getElementById("cart-count");
  const showCartitems = document.getElementById("cart-items");
  let cartSummary = document.getElementById("cart-sumary");
  cartcount.innerText = cartItems.length;
  console.log(cartItems);

  let show = ``;
  if (cartItems.length < 1) {
    show = `<h3 class=" text-center text-dark-subtle">Your Cart Is Empty</h3>`;
    cartSummary.innerHTML = `<h6>Summary</h6>
                <div class="d-flex justify-content-between">
                    <span>Total Items:</span>
                    <span id="total-qty">0</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Total Price:</span>
                    <span id="total-price">$0</span>
                </div>

                <button onclick="Checkout()" class="btn btn-success w-100 mt-3">
                    Checkout
                </button>`

  }else{
    let totalpay = cartItems.reduce((sum, pro)=> sum + pro.price * pro.qty,0)
    let totalqty = cartItems.reduce((total, item)=> total + item.qty,0)
    cartItems.forEach(item =>{
      show += `<div class="d-flex align-items-center mb-3 border-bottom pb-2">
                    <img src="${item.image}" width="60"
                        class="rounded me-2" />

                    <div class="flex-grow-1">
                        <h6 class="mb-0">${item.name}</h6>
                        <small>$${item.price.toFixed(2)}</small>

                        <!-- Quantity Control -->
                        <div class="d-flex align-items-center mt-2">
                            <button onclick="UpdateQty(${item.id}, -1)" class="btn btn-sm btn-outline-secondary">-</button>

                            <span class="mx-2">${item.qty}</span>

                            <button onclick="UpdateQty(${item.id}, 1)" class="btn btn-sm btn-outline-secondary" >+</button>
                        </div>
                    </div>

                    <button onclick="RemoveCart(${item.id})" class="btn btn-sm btn-danger ms-2">X</button>
                </div>`
    })
    cartSummary.innerHTML = `<h6>Summary</h6>
                <div class="d-flex justify-content-between">
                    <span>Total Items:</span>
                    <span id="total-qty">${totalqty}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Total Price:</span>
                    <span id="total-price">$${totalpay.toFixed(2)}</span>
                </div>

                <button onclick="Checkout()" class="btn btn-success w-100 mt-3">
                    Checkout
                </button>`
  }

  showCartitems.innerHTML = show;

}
DisplayCartItems();

// Remove From Cart

const RemoveCart = (prdId) =>{
   cartItems = cartItems.filter((pro)=> pro.id !== prdId);
   DisplayCartItems();

}

// update qty

const UpdateQty = (prdId, change)=>{
  const Items = cartItems.find(pro => pro.id === prdId);
  if(Items){
    Items.qty += change;
    if(Items.qty <1){
      RemoveCart(prdId);
    }
    DisplayCartItems();
  }


}

// checkout

const Checkout = () =>{
  if(cartItems.length < 1){
    Swal.fire({
  icon: "error",
  title: "Your Cart Is Empty",
  text: "Please add some products to cart before checkout.",
});
  }else{
    cartItems = [];
    DisplayCartItems();
    Swal.fire({
  title: "Thank You for ordering",
  text: "Nice To Meet You",
  icon: "success"
});
  }
}

