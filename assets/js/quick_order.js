// Quick Order

const quickOrderForm = document.querySelector(".quick_order_form");
const quickOrderSubmit = document.getElementById("q-o-btn");
const updateFunction = () => {
    quickOrderForm.innerHtml = `<h2>Order Submitted</h2><p>Your order is received</p>`;
    console.log("ordered");
    }

quickOrderSubmit.addEventListener("click", updateFunction)