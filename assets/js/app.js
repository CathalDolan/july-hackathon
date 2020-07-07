// Mobile Navbar Dropdown

const navBurger = document.getElementById("nav-burger");

const toggleVisibility = () => {
  const fullNav = document.querySelector('.full-nav');
  if (fullNav.style.display === "none") {
    fullNav.style.display = "block";
  } else {
    fullNav.style.display = "none";
  }
}

navBurger.addEventListener('click', toggleVisibility)

// Section collapse and expand. Taken from w3schools
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}