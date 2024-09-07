//temp
let products = [];
//cart list
let cartItemList = [];
let productId = 1;

const fromData = document.querySelector('form');
fromData.addEventListener('submit',(e)=>{
    e.preventDefault();
    let productName = document.getElementById('productName').value;
    let productPrice = document.getElementById('productPrice').value;
    let product = {
        name: productName,
        price: productPrice,
        id:productId
    };
    if(productName==="" || productPrice==="" || isNaN(productPrice) || productPrice<=0){
        alert("Please provide the product Name and Price!");
        return;
    }
    productId++;
    let allProduct = JSON.parse(JSON.stringify(product));
    products.push(allProduct);
    fromData.reset();

    displayProduct();

});


function displayProduct(){
    let showProducts = document.getElementById('showProducts');
    showProducts.innerHTML ="";
    for (let index = 0; index < products.length; index++) {
        const element = products[index];
        
        showProducts.insertAdjacentHTML("beforeend",
            `<div class="card mb-3" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body text-center">
                      <h5 class="card-title">${element.name}</h5>
                      <p class="card-text">${element.price}</p>
                      <a href="#" onclick="addToCart(${index})" class="btn btn-primary">Add to Cart</a>
                    </div>
                  </div>`)
    }
}


function renderCartTable(){
    let cartTable = document.getElementById("cart");
    cartTable.innerHTML="";
    for (let index = 0; index < cartItemList.length; index++) {
        const item = cartItemList[index];
        cartTable.insertAdjacentHTML("beforeend",`
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><button onclick="removeItem(${index})" class="btn btn-small btn-danger">Remove</button></td>
            </tr>
            `)
    }
}



function addToCart(index){
    let selectedProduct = {...products[index]};
    cartItemList.unshift(selectedProduct);
    
    renderCartTable();
    displayProduct();
    updatePrice();
}


function removeItem(index){
    cartItemList.splice(index,1);
    renderCartTable();
    updatePrice();
    console.log(cartItemList);
    
}

function updatePrice(){
    let sum=null;
    let updatePrice = document.getElementById("total_price");
    updatePrice.innerHTML="";
    for (let index = 0; index < cartItemList.length; index++) {
        const item = cartItemList[index];
        sum+= item.price * (item.quantity || 1);
        updatePrice.innerHTML = sum;
        
    }

                    
}