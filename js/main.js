// Snappa upp text fältet
let inputField = document.querySelector(".inputField");
// Snappa upp "Lägg till knappen"
let addItemBtn = document.querySelector(".addItem");
//Skapar Återställ knapp
let refreshBtn = document.querySelector(".refresh");
// snappa upp Fältet där texten ska visas för "Att göra"
let toDoList = document.querySelector(".to-do-list");
// snappa upp Fältet där texten ska visas för "Färdig"
let doneList = document.querySelector(".done-list");
//Snappar upp området till felmeddelandet längst upp
let errorInputField = document.querySelector(".error");
//snappar upp området till felmeddelandet till "Att göra"
let toDoError = document.querySelector(".error-to-do");
//Snappar upp området till felmeddelande till "Färdig"
let doneListError = document.querySelector(".error-finished-list");

//Skapar en eventlister på lägg till knappen
addItemBtn.addEventListener("click", () => {
  //Om fältet är tomt när användaren trycker på lägg till
  if (inputField.value === "") {
    //Lägger till felmeddelande till input
    textContent.addError(errorInputField);
    //Om fältet inte är tomt
  } else {
    //--------- Skapa en ny li -------------
    let listItem = document.createElement("li");
    // Lägger till en klass för att styla
    listItem.classList.add("listItem");

    //------------Skapar ett nytt textfält-------------
    let inputArea = document.createElement("input");
    //Gör texten disabled
    inputArea.disabled = "true";
    //Lägger till en klass för att styla
    inputArea.classList.add("newInputField");
    //textfältet får värdet av det som skrivs in textfältet
    inputArea.value = inputField.value;
    //Lägger till li till listan i HTML
    toDoList.append(listItem);
    //Lägger till textfältet till li
    listItem.appendChild(inputArea);
    //tar bort felmeddelandet
    textContent.addEmptyString(errorInputField);
    //Värdet i det första text fältet rensas efter varje tryck
    textContent.addEmptyInputValue(inputField);

    // -------------- "Ändra" knappen---------------
    // Skapar knappen till "Att göra"
    let editBtnToDoList = document.createElement("button");
    //Lägger till en klass för att styla
    editBtnToDoList.classList.add("btn");
    //Lägger till text i knappen
    textContent.addBtnTextChange(editBtnToDoList);
    // Lägger till knappen till listan i HTML
    listItem.appendChild(editBtnToDoList);

    //Skapar en eventlistener på knappen
    editBtnToDoList.addEventListener("click", () => {
      //Om fältet är tomt när användaren trycker på Ändra
      if (inputArea.value === "") {
        //Om listobjektet ligger i att göra listan
        if (listItem.parentNode === toDoList) {
          //lägg till felmeddelande
          textContent.addError(toDoError);
          //Om listobjektet ligger i färdig listan
        } else if (listItem.parentNode === doneList) {
          //lägger till felmeddelande
          textContent.addErrorOnSave(doneListError);
        }
      } else {
        //Tar bort felmeddelandet om användaren skriver in något
        textContent.addEmptyString(toDoError);
        textContent.addEmptyString(doneListError);
        //Om texten är disabled
        if (inputArea.disabled) {
          //Ändrar text på knappen
          textContent.addBtnTextSave(editBtnToDoList);
          //gör texten till enabled
          inputArea.disabled = !"disabled";
          // Om texten är enabled
        } else if (inputArea.disabled !== "disabled") {
          //Ändra texten på knappen
          textContent.addBtnTextChange(editBtnToDoList);
          //gör texten till disabled
          inputArea.disabled = "disabled";
        }
      }
    });

    // ---------------- "Färdig" knappen--------------
    let doneBtn = document.createElement("button");
    //Lägger till en klass för att styla
    doneBtn.classList.add("btn");
    //Lägger till text i knappen
    textContent.addBtnTextDone(doneBtn);
    // Lägger till knappen till listan i HTML
    listItem.appendChild(doneBtn);

    //Skapar eventlistener på knappen
    doneBtn.addEventListener("click", () => {
      //Om fältet är tomt, lägg inte till i färdig listan
      if (inputArea.value === "") {
        //Lägg till felmeddelande
        textContent.addErrorOnSave(toDoError);
        //Om fältet inte är tomt
      } else {
        //Lägg till i färdiglistan
        doneList.append(listItem);
        //tar bort färdig knappen
        doneBtn.remove();
      }
    });

    // ----------- "Radera" knappen----------------
    let deleteBtn = document.createElement("button");
    //Lägger till en klass för att styla
    deleteBtn.classList.add("btn");
    //Lägger till text i knappen
    textContent.addBtnTextDelete(deleteBtn);

    // Lägger till knappen till listan i HTML
    listItem.appendChild(deleteBtn);

    //Skapar en eventlistener på knappen
    deleteBtn.addEventListener("click", () => {
      //Tar bort listobjektet
      listItem.remove();
      //Tar bort felmeddelanden
      textContent.addEmptyString(errorInputField);
      textContent.addEmptyString(toDoError);
      textContent.addEmptyString(doneListError);
    });
  }

  //Skapar en eventlister på Återställ knappen
  refreshBtn.addEventListener("click", () => {
    //rensar att göra listan
    while (toDoList.lastElementChild) {
      toDoList.removeChild(toDoList.lastElementChild);
    }
    //rensar färdig listan
    while (doneList.lastElementChild) {
      doneList.removeChild(doneList.lastElementChild);
    }
    //Värdet i det första text fältet rensas
    textContent.addEmptyInputValue(inputField);
    //Tar bort felmeddelande
    textContent.addEmptyString(errorInputField);
    textContent.addEmptyString(toDoError);
    textContent.addEmptyString(doneListError);
  });
});
// ------ Skapar objekt -------
let textContent = {
  // text strings
  empty: "",
  error: "Får ej skapa tomma sysslor",
  errorOnsave: "Får ej spara tomma sysslor",
  // Metoder
  addEmptyString: function (location) {
    return `${(location.textContent = this.empty)}`;
  },
  addError: function (location) {
    return `${(location.textContent = this.error)}`;
  },
  addErrorOnSave: function (location) {
    return `${(location.textContent = this.errorOnsave)}`;
  },
  addEmptyInputValue: function (location) {
    return `${(location.value = this.empty)}`;
  },
  // text strings till knappar
  btnTextChange: "Ändra",
  btnTextSave: "Spara",
  btnTextDone: "Färdig",
  btnTextDelete: "Radera",
  // Metoder
  addBtnTextChange: function (name) {
    return `${(name.textContent = this.btnTextChange)}`;
  },
  addBtnTextSave: function (name) {
    return `${(name.textContent = this.btnTextSave)}`;
  },
  addBtnTextDone: function (name) {
    return `${(name.textContent = this.btnTextDone)}`;
  },
  addBtnTextDelete: function (name) {
    return `${(name.textContent = this.btnTextDelete)}`;
  },
};
