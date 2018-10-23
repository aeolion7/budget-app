// IIFE modules

// budgetController
const budgetController = (function () {
  // use objects to store descriptions, values, and IDs
  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }
})();

// UIController
const UIController = (function () {
  // DOMstrings object stores strings accessed by querySelector
  const DOMstrings = {
    inputButton: '.add__btn',
    inputDescription: '.add__description',
    inputType: '.add__type',
    inputValue: '.add__value'
  };

  return {
    getInput: function () {
      return {
        // type is either income or expenses
        type: document.querySelector(DOMstrings.inputType).value,
        // description based on user input
        description: document.querySelector(DOMstrings.inputDescription).value,
        // value based on user input
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    // makes the DOMstrings object public
    getDOMStrings: function () {
      return DOMstrings;
    }
  };
})();

// global app controller
const controller = (function (budgetCtrl, UICtrl) {
  const setupEventListeners = function () {
    const DOM = UICtrl.getDOMStrings();

    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
    // used both keyCode and which for browser compatibility
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  const ctrlAddItem = function () {
    // get field input data
    const input = UICtrl.getInput();
    console.log(input);
    // add item to budget controller

    // add new item to UI

    // calculate budget

    // display budget
  };

  return {
    init: function () {
      console.log('Application initialized.');
      setupEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
