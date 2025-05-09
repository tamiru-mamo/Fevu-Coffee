"use strict";
//Theme Switching
const themeToggleButton = document.getElementById('theme-toggle');
const header = document.querySelector('header'); 
const footer = document.querySelector('footer'); 
const menu = document.querySelector('.menu'); 
const form = document.querySelector('form'); 
const hero = document.getElementById('hero');
const cart = document.getElementById('cart');

// Checking for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light-mode';
document.body.classList.add(currentTheme);
header.classList.add(currentTheme); 
footer.classList.add(currentTheme); 
hero.classList.add(currentTheme);
cart.classList.add(currentTheme);
if (menu) menu.classList.add(currentTheme); 
if (form) form.classList.add(currentTheme); 

const elementsToToggle = [document.body, header, footer, hero, cart, menu, form];

const toggleTheme = () => {
    const isLight = document.body.classList.contains('light-mode');
    const oldTheme = isLight ? 'light-mode' : 'dark-mode';
    const newTheme = isLight ? 'dark-mode' : 'light-mode';

    elementsToToggle.forEach(el => {
        if (el) {
            el.classList.remove(oldTheme);
            el.classList.add(newTheme);
        }
    });

    localStorage.setItem('theme', newTheme);
    themeToggleButton.innerHTML = isLight
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
};


themeToggleButton.addEventListener('click', toggleTheme);




// Select the button and cart elements
const viewCartButton = document.getElementById('view-cart');
const cartSection = document.getElementById('cart');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Variables to keep track of cart items and total price
let cartItems = [];
let totalPrice = 0;

// Function to update the cart display
function updateCartDisplay() {
    // Clear the current cart items display
    cartItemsList.innerHTML = '';
    const tax = totalPrice * 0.06; // Adjust tax rate as needed
    const totalWithTax = totalPrice + tax;
    
    // Add each item to the cart display
    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} : $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(li);
    });

    // Update the total price display
    totalPriceElement.textContent = `Total: $${totalWithTax.toFixed(2)} (Tax: $${tax.toFixed(2)})`;
    
    // Show empty cart message if there are no items
    if (cartItems.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
        totalPriceElement.textContent = 'Total: $0.00';
    }
}

// Function to handle adding/removing items
document.querySelectorAll('.add-to-cart').forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const itemName = event.target.dataset.item;
        const itemPrice = parseFloat(event.target.dataset.price);

        if (event.target.checked) {
            // Add item to cart
            cartItems.push({ name: itemName, price: itemPrice });
            totalPrice += itemPrice;
        } else {
            // Remove item from cart
            cartItems = cartItems.filter(item => item.name !== itemName);
            totalPrice -= itemPrice;
        }

        // Update cart display
        updateCartDisplay();
    });
});

// Display the cart by default
updateCartDisplay(); // This will ensure the cart shows an empty state initially

// Toggle cart visibility
// viewCartButton.addEventListener('click', () => {
//     cartSection.style.display = (cartSection.style.display === 'none') ? 'block' : 'none';
// });
if (viewCartButton && cartSection) {
    viewCartButton.addEventListener('click', () => {
        cartSection.style.display = (cartSection.style.display === 'none') ? 'block' : 'none';
    });
}




document.getElementById('myForm').addEventListener('submit', function(event) {
    // Clear previous messages
    const outputMessage = document.getElementById('outputMessage');
    const successMessage = document.getElementById('successMessage');
    outputMessage.style.display = 'none';
    outputMessage.textContent = '';
    successMessage.style.display = 'none';
    successMessage.textContent = '';

    // Get input values
    const lName = document.getElementById('lName').value.trim();
    const fName = document.getElementById('fName').value.trim();
    const email = document.getElementById('email').value.trim();
    const confirmEmail = document.getElementById('confirmEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    
    let isValid = true;

    // Validate last name
    if (lName.length < 3 || !/^[a-zA-Z]+$/.test(lName)) {
        isValid = false;
        outputMessage.textContent += 'Last name must be at least three letters (a-z).\n';
    }

    // Validate first name
    if (fName.length < 3 || !/^[a-zA-Z]+$/.test(fName)) {
        isValid = false;
        outputMessage.textContent += 'First name must be at least three letters (a-z).\n';
    }

    // Validate email
    if (!validateEmail(email)) {
        isValid = false;
        outputMessage.textContent += 'Please enter a valid email address.\n';
    }

    // Validate email confirmation
    if (email !== confirmEmail) {
        isValid = false;
        outputMessage.textContent += 'Email and confirmation email do not match.\n';
    }

    // Validate phone number
    if (phone && (!/^\d{10,}$/.test(phone))) {
        isValid = false;
        outputMessage.textContent += 'Please enter a valid phone number with at least 10 digits.\n';
    }

    // Validate message
    if (message.length === 0) {
        isValid = false;
        outputMessage.textContent += 'Message is required.\n';
    }

     // Validate contact preference
     const prefEmail = document.getElementById('prefEmail');
     const prefPhone = document.getElementById('prefPhone');
 
     if (!prefEmail.checked && !prefPhone.checked) {
         isValid = false;
         outputMessage.textContent += 'Please select a contact preference (email or phone).\n';
     }

    // If valid, display success message; if not, prevent submission
    if (isValid) {
        event.preventDefault(); 
        successMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
        successMessage.style.display = 'block';
    } else {
        event.preventDefault();
        outputMessage.style.display = 'block';
    }
     
});

// Helper function to validate email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


  // Guessing game validation

const guessButton = document.getElementById("guess-button");
const guessInput = document.getElementById("guess-number");
const guessResult = document.getElementById("guess-result");

let randomNumber = Math.floor(Math.random() * 10) + 1;

const handleGuess = () => {
    const guessedNumber = parseInt(guessInput.value);


    if (guessedNumber < 1 || guessedNumber > 10 || isNaN(guessedNumber)) {
        guessResult.innerHTML = "Please enter a valid number between 1 and 10.";
        guessResult.style.color = "red";
    } else if (guessedNumber === randomNumber) {
        guessResult.innerHTML = `Congratulations! You guessed the right number: <strong style="color: green;">${guessedNumber}</strong> (Correct number: <strong style="color: green;">${randomNumber}</strong>).`;
        guessResult.style.color = "green";
        randomNumber = Math.floor(Math.random() * 10) + 1; // reset for next round
    } else {
        guessResult.innerHTML = `Sorry! Your guess: <strong style="color: red;">${guessedNumber}</strong>. The correct number was: <strong style="color: red;">${randomNumber}</strong>. Try again!`;
        guessResult.style.color = "red";
    }

    guessInput.value = ""; // Clear the input field
};

guessButton.addEventListener("click", handleGuess);
