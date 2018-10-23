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

  // better to have one data structure than random floating variables
  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    // allow other modules to add an item into data structure
    addItem: function (type, desc, val) {
      let newItem, ID;
      // create new ID
      // TODO: fix TypeError: Cannot read property 'length' of undefined on following line
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item based on inc or exp type
      if (type === 'exp') {
        newItem = new Expense(ID, desc, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val);
      }

      // push item into data structure
      data.allItems[type].push(newItem);
      return newItem;
    },
    testing: function () {
      console.log(data);
    }
  };
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

    // add item to budget controller
    const newItem = budgetCtrl.addItem(input.type, input.description, input.value);

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
