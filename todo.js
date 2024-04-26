 document.addEventListener("DOMContentLoaded", function () {
   var listItems = document.querySelectorAll(".nav li");
   var containers = document.querySelectorAll(
     ".ItemContainer > .cardContainer"
   );

   containers.forEach(function (container) {
     container.style.display = "none";
   });

   containers[0].style.display = "block";

   listItems.forEach(function (item, index) {
     item.addEventListener("click", function () {
       containers.forEach(function (container) {
         container.style.display = "none";
       });

       switch (item.textContent) {
         case "Create Item":
           containers[0].style.display = "block";
           break;
         case "Item List":
           containers[1].style.display = "block";
           break;
         case "Mark as Completed List":
           containers[2].style.display = "block";
           break;
         default:
           break;
       }
     });
   });
 });


document.addEventListener("DOMContentLoaded", function () {
  loadItems();
 
  var createBtn = document.querySelector(".btnCreate");
  createBtn.addEventListener("click", function () {
    var itemName = document.querySelector(
      'input[placeholder="Enter a Item Name ..."]'
    ).value;
    var itemDesc = document.querySelector(
      'textarea[placeholder="Enter a Item Description ..."]'
    ).value;

    if (itemName.trim() === "" || itemDesc.trim() === "") {
      alert("Please enter both Item Name and Item Description.");
      return;
    }

    var newItem = {
      name: itemName,
      description: itemDesc,
    };

    var existingItems = JSON.parse(localStorage.getItem("items")) || [];

    existingItems.push(newItem);

    localStorage.setItem("items", JSON.stringify(existingItems));

    loadItems();
    document.querySelector('input[placeholder="Enter a Item Name ..."]').value =
      "";
    document.querySelector(
      'textarea[placeholder="Enter a Item Description ..."]'
    ).value = "";

    alert("Item created successfully!","Please Check In the Item List");
  });
});


function loadItems() {
  var existingItems = JSON.parse(localStorage.getItem("items")) || [];
  var itemListContainer = document.querySelector(".ItemListContainer");
  itemListContainer.innerHTML = "";
  existingItems.forEach(function (item, index) {
    var newItemCard = createItemCard(item.name, item.description, index);
    itemListContainer.appendChild(newItemCard);
  });
}

function createItemCard(name, description, index) {
  var newItemCard = document.createElement("div");
  newItemCard.className = "ItemListCard";

  var itemDetailDiv = document.createElement("div");
  itemDetailDiv.className = "ItemDetail";

  var itemNameHeading = document.createElement("h2");
  itemNameHeading.textContent = name;

  var itemDescPara = document.createElement("p");
  itemDescPara.textContent = description;

  itemDetailDiv.appendChild(itemNameHeading);
  itemDetailDiv.appendChild(itemDescPara);

  var itemFuncDiv = document.createElement("div");
  itemFuncDiv.className = "ItemFunc";

  var editDiv = document.createElement("div");
  editDiv.className = "edit";

  var editIcon = document.createElement("i");
  editIcon.className = "bi bi-pencil-square";

  var editPara = document.createElement("p");
  editPara.textContent = "Edit Item";

  editDiv.appendChild(editIcon);
  editDiv.appendChild(editPara);

  var completeDiv = document.createElement("div");
  completeDiv.className = "MasC";

  var completeIcon = document.createElement("i");
  completeIcon.className = "bi bi-check-square";

  var completePara = document.createElement("p");
  completePara.textContent = "Mark as Complete";

  completeDiv.appendChild(completeIcon);
  completeDiv.appendChild(completePara);

  var deleteDiv = document.createElement("div");
  deleteDiv.className = "delete";

  var deleteIcon = document.createElement("i");
  deleteIcon.className = "bi bi-trash3";

  var deletePara = document.createElement("p");
  deletePara.textContent = "Delete Item";

  deleteDiv.appendChild(deleteIcon);
  deleteDiv.appendChild(deletePara);

  deleteDiv.addEventListener("click", function () {
    var existingItems = JSON.parse(localStorage.getItem("items")) || [];
    existingItems.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(existingItems));
    loadItems();
  });

  editDiv.addEventListener("click", function () {
    showEditForm(name, description, index);
  });



  completeDiv.addEventListener("click", function () {
    moveItemToCompleted(index);
    completeIcon.className = "bi bi-check-square-fill";
  });

  function showEditForm(name, description, index) {
    var overlay = document.createElement("div");
    overlay.className = "overlay";

    var editFormContainer = document.createElement("div");
    editFormContainer.className = "editFormContainer";
    editFormContainer.style.backgroundColor = "#02eded";
    editFormContainer.style.width = "60%";
    editFormContainer.style.alignItems = "center";
    editFormContainer.style.justifyContent = "center";
    editFormContainer.style.borderRadius = "8px";
    editFormContainer.style.padding = "14px";

    


    var editForm = document.createElement("form");
    editForm.className = "editForm";
      editForm.style.display = "flex";
      editForm.style.flexDirection = "column";
      editForm.style.marginLeft = " 13rem"


    var itemNameInput = document.createElement("input");
    itemNameInput.style.marginTop = "20px";
    itemNameInput.type = "text";
    itemNameInput.value = name;
    itemNameInput.placeholder = "Enter a Item Name ...";

    var itemDescTextarea = document.createElement("textarea");
    itemDescTextarea.style.marginTop = "20px";
    itemDescTextarea.name = "desc";
    itemDescTextarea.placeholder = "Enter a Item Description ...";
    itemDescTextarea.textContent = description;

 

    var saveButton = document.createElement("button");
    saveButton.textContent = "SAVE";
    saveButton.type = "submit";
    saveButton.style.padding = "10px";
    saveButton.style.width = "6rem";
    saveButton.style.marginLeft = "4rem";
    saveButton.style.marginTop = "3rem";
    saveButton.style.backgroundColor = "#7689f2";
    saveButton.style.outline = "none";
    saveButton.style.cursor = "pointer";
    saveButton.style.border = "none";
    saveButton.style.borderRadius = "2px";
    saveButton.style.color = "aliceblue";




    var cancelButton = document.createElement("button");
    cancelButton.textContent = "CANCEL";
    cancelButton.type = "button";
    cancelButton.className = "cancelBtn";
    cancelButton.style.padding = "10px";
    cancelButton.style.width = "6rem";
    cancelButton.style.marginLeft = "18rem";
    cancelButton.style.position = "absolute";
    cancelButton.style.marginTop = "13.2rem";
    cancelButton.style.marginBottom = "1rem";
    cancelButton.style.backgroundColor = "rgb(245, 53, 53)";
    cancelButton.style.outline = "none";
    cancelButton.style.border = "none";
    cancelButton.style.cursor = "pointer";
    cancelButton.style.border = "none";
    cancelButton.style.borderRadius = "2px";
    cancelButton.style.color = "aliceblue";


    cancelButton.addEventListener("click", function () {
      overlay.remove();
    });

    editForm.appendChild(itemNameInput);
    editForm.appendChild(itemDescTextarea);
    editForm.appendChild(saveButton);
    editForm.appendChild(cancelButton);

    editFormContainer.appendChild(editForm);
    overlay.appendChild(editFormContainer);
    document.body.appendChild(overlay);
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";

    editForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var newName = itemNameInput.value;
      var newDesc = itemDescTextarea.value;

      var existingItems = JSON.parse(localStorage.getItem("items")) || [];
      existingItems[index].name = newName;
      existingItems[index].description = newDesc;
      localStorage.setItem("items", JSON.stringify(existingItems));

      loadItems();

      overlay.remove();
    });
  }


  function moveItemToCompleted(index) {
    var existingItems = JSON.parse(localStorage.getItem("items")) || [];
    var completedItems =
      JSON.parse(localStorage.getItem("completedItems")) || [];
    var itemToMove = existingItems[index];

    completedItems.push(itemToMove);
    localStorage.setItem("completedItems", JSON.stringify(completedItems));

    existingItems.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(existingItems));
    loadItems();
    loadCompletedItems();

  }

  function loadCompletedItems() {
    var completedItems =
      JSON.parse(localStorage.getItem("completedItems")) || [];
    var completeListContainer = document.querySelector(".completeContainer");
    completeListContainer.innerHTML = "";
    completedItems.forEach(function (item, index) {
      var newItemCard = createCompletedItemCard(
        item.name,
        item.description,
        index
      );
      completeListContainer.appendChild(newItemCard);
    });
  }

  function createCompletedItemCard(name, description, index) {
    loadItems();
    var newItemCard = document.createElement("div");
    newItemCard.className = "ItemListCard";

    var itemDetailDiv = document.createElement("div");
    itemDetailDiv.className = "ItemDetail";

    var itemNameHeading = document.createElement("h2");
    itemNameHeading.textContent = name;

    var itemDescPara = document.createElement("p");
    itemDescPara.textContent = description;

    itemDetailDiv.appendChild(itemNameHeading);
    itemDetailDiv.appendChild(itemDescPara);

    var itemFuncDiv = document.createElement("div");
    itemFuncDiv.className = "ItemFunc";

    var deleteDiv = document.createElement("div");
    deleteDiv.className = "delete";

    var deleteIcon = document.createElement("i");
    deleteIcon.className = "bi bi-trash3";

    var deletePara = document.createElement("p");
    deletePara.textContent = "Delete Item";

    var completeDiv = document.createElement("div");
    completeDiv.className = "MasC";

    var completeIcon = document.createElement("i");
    completeIcon.className = "bi bi-check-square-fill";

    var completePara = document.createElement("p");
    completePara.textContent = "Mark as Completed";

    completeDiv.appendChild(completeIcon);
    completeDiv.appendChild(completePara);

    deleteDiv.appendChild(deleteIcon);
    deleteDiv.appendChild(deletePara);

    deleteDiv.addEventListener("click", function () {
      var completedItems =
        JSON.parse(localStorage.getItem("completedItems")) || [];
      completedItems.splice(index, 1);
      localStorage.setItem("completedItems", JSON.stringify(completedItems));
      loadCompletedItems();
    });

    itemFuncDiv.appendChild(deleteDiv);
    itemFuncDiv.appendChild(completeDiv);
    newItemCard.appendChild(itemDetailDiv);
    newItemCard.appendChild(itemFuncDiv);
    return newItemCard;
  }

  
  itemFuncDiv.appendChild(editDiv);
  itemFuncDiv.appendChild(completeDiv);
  itemFuncDiv.appendChild(deleteDiv);
  newItemCard.appendChild(itemDetailDiv);
  newItemCard.appendChild(itemFuncDiv);
  return newItemCard;
}
