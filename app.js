/* app.js */



const productsEl=document.querySelector(".products");
const cartItemsEl=document.querySelector(".cart-items");
const subTotal=document.querySelector(".subtotal");
const totalItemsInCartEl=document.querySelector(".total-items-in-cart");


//Renderimi i produkteve

let products=[];

    
function renderProducts(){
   
    fetch('https://dummyjson.com/products')
.then(response => response.json())
.then(data =>{
    
    let products=data.products
    console.log(products)
     
    products.forEach((product)=>{

        
        productsEl.innerHTML+=`

        <div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src="${product.thumbnail}" alt="${product.title}">
            </div>
            <div class="desc">
                <h2>${product.title}</h2>
                <h2><small></small>$${product.price}</h2>
                <p>
                ${product.description.substring(0,30)}...
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart" onclick="addToCart(${product.id})">
                <img src="./icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
        </div> 
        
        `;

        
    
    })

    })

}


renderProducts();


//Kart Array
let cart=JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//Vendo ne Kart

// function addToCart(id){
    
//    const item=products.find((product)=>product.id===id);
//    console.log(item);
// }


function addToCart(id){
   
    fetch('https://dummyjson.com/products')
.then(response => response.json())
.then(data =>{
    
    let products=data.products
    
     
 if(cart.some((item)=>item.id===id)){
   changeNumberofUnits('plus',id)
 }else{
    const item=products.find((product)=>product.id===id);
    cart.push({
        ...item,
    numberOfUnits:1});
    console.log(cart)
}
        
updateCart();
    
    })

   

}

function updateCart(){
    renderCartItems();
    renderSubtotal();

    //Ruajtja e artikujve ne LocalStorage

    localStorage.setItem("CART",JSON.stringify(cart))
}

//Kalkulimi dhe paraqitja e totalit ne faqe

function renderSubtotal(){
    let totalPrice=0,totalItems=0;

    cart.forEach((item)=>{
        totalPrice+=item.price*item.numberOfUnits;
        totalItems+=item.numberOfUnits;
    });

    subTotal.innerHTML=`Subtotal (${totalItems} items): Eur${totalPrice.toFixed(2)}`;
    totalItemsInCartEl.innerHTML=totalItems;
}

function renderCartItems(){
    cartItemsEl.innerHTML="";// Fshirja e elementeve
    cart.forEach((item)=>{
        
       
        cartItemsEl.innerHTML+= `  
        <div class="cart-item">
        <div class="item-info" onclick="removeItemfromCart(${item.id})" title="Kliko nëse dëshironi ta fshini artikullin">
            <img src="${item.thumbnail}" alt="${item.title}">
            <h4>${item.title}</h4>
        </div>
        <div class="unit-price">
            <small>$</small>${item.price}
        </div>
        <div class="units">
            <div class="btn minus" onclick="changeNumberofUnits('minus',${item.id})">-</div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" onclick="changeNumberofUnits('plus',${item.id})">+</div>           
        </div>
    </div>
    `;
    console.log(cartItemsEl)
    });
   
}

//Funksion per fshirjen e te dhenave nga karta

function removeItemfromCart(id){
    cart=cart.filter((item)=>(item.id!==id));
    updateCart();

}


//Funksion per ndryshimin e sasise se artikujve

function changeNumberofUnits(action,id){

    cart=cart.map((item)=>{

        let numberOfUnits=item.numberOfUnits
        
        if(item.id===id){
            if(action==="minus" && numberOfUnits>1){
                numberOfUnits--;
            } 
            
            else if(action==="plus"&&numberOfUnits<item.stock){

                numberOfUnits++;
            }
        }
        return {
            ...item,
            numberOfUnits,
        };

    });

    updateCart();

}



    // let artikulli=[]

    // searchBar.addEventListener("input",(e)=>{
    //     const searchString=e.target.value.toLowerCase();

    //     products.forEach(product=>{
    //         const filterSearch=product.title.includes(searchString)
          
            
    //     })
    // })
        
        
       
        
    

function searchProducts(query){
    const url=`https://dummyjson.com/products/search?q=${query}`
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        
        let products=data.products
        const results=products.map(product=>product.title)
        if(results.length>0){ renderSearchResults(products)}
        else
        productsEl.innerHTML="<p>---Nuk u gjeten produkte nga kerkimi!</p>"
       
        console.log(renderProducts)
        
        })    
}

  function renderSearchResults(products){
productsEl.innerHTML="";
    products.forEach((product)=>{

        
        productsEl.innerHTML+=`

        <div class="item">
        <div class="item-container">
            <div class="item-img">
                <img src="${product.thumbnail}" alt="${product.title}">
            </div>
            <div class="desc">
                <h2>${product.title}</h2>
                <h2><small></small>$${product.price}</h2>
                <p>
                ${product.description.substring(0,30)}...
                </p>
            </div>
            <div class="add-to-wishlist">
                <img src="./icons/heart.png" alt="add to wish list">
            </div>
            <div class="add-to-cart" onclick="addToCart(${product.id})">
                <img src="./icons/bag-plus.png" alt="add to cart">
            </div>
        </div>
        </div> 
        
        `;

        
    
    })

  }

  
let searchTimeoutToken=0;
window.onload=()=>{
    const searchBarEl=document.getElementById("kerko");
    document.getElementById("kerko").onkeyup=(event)=>{
        clearTimeout(searchTimeoutToken);
        if(searchBarEl.value.trim().length===0){
            return;
        }
        searchTimeoutToken=setTimeout(()=>{
            searchProducts(searchBarEl.value);
        },250);
       


    };
   
}
 


 
    




 




