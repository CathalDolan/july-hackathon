$(".add_to_cart").click(function (event) {      //Function to call the name and price from the string and give it a count of 1
    event.preventDefault();      // Prevent the links from doing their default behavious such as href links
    var name = $(this).attr("data-name");      // "this" respresents the link clicked on
    var price = Number($(this).attr("data-price"));

    addItemToCart(name, price, 1);
    displayCart();
});

$("#clear_cart").click(function (event) {
    clearCart();
    displayCart();
});

function displayCart() { // Displays the cart contents on front end
    var cartArray = listCart();
    var output = "";
    for (let i in cartArray) {
        output += `<div class="row"><div class="col-5">${cartArray[i].name}</div><div class="col-2">${cartArray[i].count}</div><div class="col-2">${cartArray[i].price}</div><div class="col-2">${cartArray[i].total}</div><div class="col-1"><button class='delete_item' data-name='${cartArray[i].name}'>X</button></div></div></li>`;
    }

    $("#order_details_row").html(output)
    // $("#item_name").html(cartArray[i].name);
    // $("#item_count").html(cartArray[i].count);
    // $("#item_price").html(cartArray[i].price.toFixed(2));
    // $("#items_total").html(cartArray[i].total);
    //$(".trash").html(<button class='delete_item' data-name='"cartArray[i].name"'>X</button>);

    // $("#show_cart").html(output);
    $("#total_items").html(countCart());
    $("#total_price").html(totalCart());
}

$("#show_cart").on("click", ".delete_item", function (event) {
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
        if (cart[i].name === name) { // Matches by name
            cart[i].count++; // If an item is already in the cart, it increases the count by 1.   .cart[i].count += count; This could work for sausage rolls as they are sold in 3's
            // saveCart();    Part of local storage
            return;
        }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    // saveCart();    Part of local storage
}

function removeItemFromCart(name) { // To remove a single item, for example remove one tea
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count--; //reduces count by 1
            if (cart[i].count === 0) { // Prevents count from being a negative number
                cart.splice(i, 1); // If the count is 0, that item is removed from the cart array
            }
            break;
        }
    }
    // saveCart();    Part of local storage
}

function removeItemFromCartAll(name) { // To remove all of a particular item, for example remove all teas
    for (var i in cart) {
        if (cart[i].name === name) {
            cart.splice(i, 1);
        }
        break;
    }
    // saveCart();    Part of local storage
}

function clearCart() { // empties entire cart
    cart = [];
    // saveCart();    Part of local storage
}

function countCart() { // counts total number of items in cart by adding the total of the counts
    var totalCount = 0; //Goes outside the loop so that the count starts at 0 only once....I think
    for (var i in cart) {
        totalCount += cart[i].count;
    }
    return totalCount;
}

function totalCart() { // counts total cost of all items in cart by adding the total of the prices
    var totalCost = 0; //Goes outside the loop so that the count starts at 0 only once....I think
    for (var i in cart) {
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

// LOGIC TO SEND HTTP REQUEST
function sendHttpRequest(method, url, data) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.send(JSON.stringify(data));
    })
    return promise
}

// VARIABLES TO GRAB RADIO BUTTONS
const tenMin = document.getElementById('10min');
const fifteenMin = document.getElementById('15min');
const twentyMin = document.getElementById('20min');
const thirtyMin = document.getElementById('30min');

// FUNCTION TO BE EXECUTED UPON CLICKING SUBMIT
const submitOrder = () => {

    // CHECK REQUIRED COLLECTION TIME
    let collectionTime;
    const getCollectionTime = () => {
        if (tenMin.checked) {
            collectionTime = 10;
        } else if (fifteenMin.checked) {
            collectionTime = 15;
        } else if (twentyMin.checked) {
            collectionTime = 20;
        } else { collectionTime = 30 }
        return collectionTime
    }

    // CREATE ORDER OBJECT TO MERGE CART AND COLLECTION TIME
    let order = {
        cart: cart,
        collectionTime: getCollectionTime(),
    };

    // SEND HTTP REQUEST WITH DUMMY URL
    sendHttpRequest('POST', '#', order);

    // UPDATE UI
    const orderSection = document.getElementById('order_section');
    orderSection.innerHTML = `<h2>Order Submitted</h2><p>Your order will be ready in ${collectionTime} minutes`

}

// ORDER BUTTON VARIABLE AND EVENT LISTENER
const orderButton = document.getElementById('submit-order');
orderButton.addEventListener('click', submitOrder)

