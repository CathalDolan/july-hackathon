$(".add_to_cart").click(function(event){      //Function to call the name and price from the string and give it a count of 1
    event.preventDefault();      // Prevent the links from doing their default behavious such as href links
    var name = $(this).attr("data-name");      // "this" respresents the link clicked on
    var price = Number($(this).attr("data-price"));

    addItemToCart(name, price, 1);
    displayCart();
});

$("#clear_cart").click(function(event){
    clearCart();
    displayCart();
});

function displayCart() { // Displays the cart contents on front end
    var cartArray = listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<li>"
            +cartArray[i].name
            +" "+cartArray[i].count
            +" x "+cartArray[i].price
            +" = "+cartArray[i].total
            +" <button class='delete_item' data-name='"
            +cartArray[i].name+"'>X</button>"
            +"</li>";
    }
    $("#show_cart").html(output);
    $("#total_items").html( countCart());
    $("#total_cart").html( totalCart() );
}

$("#show_cart").on("click", ".delete_item", function(event) {
    var name = $(this).attr("data-name");
    removeItemFromCartAll(name);
    displayCart();
});

// Shopping Cart Functions

var cart = [];

var Item = function (name, price, count) {
    this.name = name
    this.price = price
    this.count = count
};

function addItemToCart(name, price, count) {
    for (var i in cart) { // Loop to check cart contents. 
        if (cart[i].name === name){ // Matches by name
            cart[i].count ++; // If an item is already in the cart, it increases the count by 1.   .cart[i].count += count; This could work for sausage rolls as they are sold in 3's
            // saveCart();    Part of local storage
            return;
        }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    // saveCart();    Part of local storage
}

function removeItemFromCart(name){ // To remove a single item, for example remove one tea
    for (var i in cart) {
        if (cart[i].name === name){
            cart[i].count --; //reduces count by 1
            if (cart[i].count === 0){ // Prevents count from being a negative number
                cart.splice(i, 1); // If the count is 0, that item is removed from the cart array
            }
            break;
        }
    }
    // saveCart();    Part of local storage
}

function removeItemFromCartAll(name) { // To remove all of a particular item, for example remove all teas
    for (var i in cart) {
        if (cart[i].name === name){
            cart.splice(i, 1);
        }
        break;
    }
    // saveCart();    Part of local storage
}

function clearCart(){ // empties entire cart
    cart=[];
    // saveCart();    Part of local storage
} 

function countCart() { // counts total number of items in cart by adding the total of the counts
    var totalCount = 0; //Goes outside the loop so that the count starts at 0 only once....I think
    for (var i in cart){
        totalCount += cart[i].count;
    }
    return totalCount;
}

function totalCart() { // counts total cost of all items in cart by adding the total of the prices
    var totalCost = 0; //Goes outside the loop so that the count starts at 0 only once....I think
    for (var i in cart){
        totalCost += cart[i].price * cart[i].count;     
    }
    return totalCost.toFixed(2);
}

function listCart() { // return an array of items to display on the page, but it doesn't display directly to the html. It's "decoupled". Tutorial Video #12 https://www.youtube.com/watch?v=MTY-84b8fik&list=PLoN_ejT35AEhzNoPStBzAkpqAu3YQwPj7&index=12
    var cartCopy = [];
    for (var i in cart) {
        var item = cart[i];
        var itemCopy = {};
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        itemCopy.total = (item.price * item.count).toFixed(2); //toFixed rounds to 2 decimal places.
        cartCopy.push(itemCopy);
    }
    return cartCopy
}

/*
function saveCart() { // Saves cart to local storeage so that it can be passed around
    localStorage.setItem("shoppingCart", JSON.stringify(cart)); // Local storage is for strings and number so JSON needed to convert the cart array and objects
}

function loadCart() { // if navigate away and come back, it reloads the cart
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

//loadCart(); All local storage stuff*/
//displayCart();





// Drinks Variables
const espressoSmInput = document.querySelector("#espresso-sm");
const espressoLgInput = document.querySelector("#espresso-lg");
const americanoSmInput = document.querySelector("#americano-sm");
const americanoLgInput = document.querySelector("#americano-lg");
const macchiatoSmInput = document.querySelector("#macchiato-sm");
const macchiatoLgInput = document.querySelector("#macchiato-lg");
const mochaSmInput = document.querySelector("#mocha-sm");
const mochaLgInput = document.querySelector("#mocha-lg");
const cappucinoSmInput = document.querySelector("#cappucino-sm");
const cappucinoLgInput = document.querySelector("#cappucino-lg");
const flatWhiteSmInput = document.querySelector("#flat-white-sm");
const flatWhiteLgInput = document.querySelector("#flat-white-lg");
const latteSmInput = document.querySelector("#latte-sm");
const latteLgInput = document.querySelector("#latte-lg");
const tigerEyeSmInput = document.querySelector("#tiger-eye-sm");
const tigerEyeLgInput = document.querySelector("#tiger-eye-lg");
const teaSmInput = document.querySelector("#tea-sm");
const teaLgInput = document.querySelector("#tea-lg");

// Food Variables
const fruitSconeInput = document.querySelector("#fruit-scone");
const carrotCakeInput = document.querySelector("#carrot-cake");
const danishInput = document.querySelector("#danish");
const sausageRollInput = document.querySelector("#sausage-roll");
const proteinBarInput = document.querySelector("#protein-bar");
const cheeseToastyInput = document.querySelector("#cheese-toasty");

let order;


// document.addEventListener(onkeypress, (() => {
//   order = {
//     espressoSm: espressoSmInput,
//     espressoLg: espressoLgInput,
//     americanoSm: americanoSmInput,
//     americanoLg: americanoLgInput,
//     macchiatoSm: macchiatoSmInput,
//     macchiatoLg: macchiatoLgInput,
//     mochaSm: mochaSmInput,
//     mochaLg: mochaLgInput,
//     cappucinoSm: cappucinoSmInput,
//     cappucinoLg: cappucinoLgInput,
//     flatWhiteSm: flatWhiteSmInput,
//     flatWhiteLg: flatWhiteLgInput,
//     latteSm: latteSmInput,
//     latteLg: latteLgInput,
//     tigerEyeSm: tigerEyeSmInput,
//     tigerEyeLg: tigerEyeLgInput,
//     teaSm: teaSmInput,
//     teaLg: teaLgInput,
//     fruitScone: fruitSconeInput,
//     carrotCake: carrotCakeInput,
//     danish: danishInput,
//     sausageRoll: sausageRollInput,
//     proteinBar: proteinBarInput,
//     cheeseToasty: cheeseToastyInput,
//   }
// }))