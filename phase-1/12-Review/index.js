const BASE_URL = "http://localhost:3000/items";
// Select and save the items container element
// Select and save the items form element

// Test your code. What is the return value and why?

// Add an event listener to form calling the event handler, createItem 

function createItem() {
  // This event handler should create a new Items object and persist data
}

// Review this code, can you identify anything that is missing? Test your theories!

function renderItem(item) {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  if (item.completed) {
    checkBox.checked = true;
  }

  // Fix this code to pass the item object to the event handler
  checkBox.addEventListener("click", updateCompleted);

  // Remember that element id's should be unique
  const listItem = document.createElement("li");
  listItem.id = `items`;
  listItem.textContent = `Name: ${item.name} - Quantity: ${item.quantity} - Bought: `;

  const deleteBttn = document.createElement("button");
  deleteBttn.textContent = "X";

  listItem.append(checkBox, deleteBttn);

  // Test this method by calling in getItems method to render items to DOM
}

function updateCompleted(item) {

  // This logic will use the ! operator to toggle the status of the property, completed. If it returns false, it will update to true and vice versa.
  let completed = (item.completed = !item.completed);

  // Make a fetch request to update data on server upon checkbox click
 
}

function getItems() {
  // Need to make a fetch request for all items from server
}

