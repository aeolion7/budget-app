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
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    }
  };

  return {
    // allow other modules to add an item into data structure
    addItem: function (type, desc, val) {
      let newItem, ID;
      // create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][(data.allItems[type].length) - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item based on inc or exp type
      if (type === 'expense') {
        newItem = new Expense(ID, desc, val);
      } else if (type === 'income') {
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
    expenseContainer: '.expenses__list',
    incomeContainer: '.income__list',
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

    addListItem: function (obj, type) {
      let element, html, newHTML;
      // create HTML string with placeholder text
      if (type === 'income') {
        element = DOMstrings.incomeContainer;

        html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      } else if (type === 'expense') {
        element = DOMstrings.expenseContainer;

        html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }

      // replace placeholder text with data
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', obj.value);

      // insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
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
    UICtrl.addListItem(newItem, input.type);

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
