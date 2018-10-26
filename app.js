// IIFE modules

// Budget controller module
const budgetController = (function () {
  // use objects to store descriptions, values, and IDs
  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    }

    calcPercentage(totalIncome) {
      if (totalIncome > 0) {
        this.percentage = Math.round((this.value / totalIncome) * 100);
      } else {
        this.percentage = -1;
      }
    }

    getPercentage() {
      return this.percentage;
    }
  }

  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  const calculateTotal = (type) => {
    let sum = 0;

    data.allItems[type].forEach(function (item) {
      sum += item.value;
    });

    data.totals[type] = sum;
  };

  // better to have one data structure than random floating variables
  const data = {
    allItems: {
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    },
    budget: 0,
    // -1 is a value used to say that something is nonexistent
    // the percentage value does not yet exist
    percentage: -1
  };

  return {
    // allow other modules to add an item into data structure
    addItem(type, desc, val) {
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

    calculateBudget() {
      // calculate total income and expenses
      calculateTotal('expense');
      calculateTotal('income');
      // calculate budget (income - expenses)
      data.budget = data.totals.income - data.totals.expense;
      // calculate percentage of income spent
      if (data.totals.income > 0) {
        data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages() {
      data.allItems.expense.forEach(function (expense) {
        expense.calcPercentage(data.totals.income);
      });
    },

    deleteItem(type, id) {
      // [1, 2, 3, 6, 8] => id = 3 would be 6
      const ids = data.allItems[type].map(function (currentItem) {
        return currentItem.id;
      });

      const index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    getBudget() {
      return {
        budget: data.budget,
        totalIncome: data.totals.income,
        totalExpenses: data.totals.expense,
        percentage: data.percentage
      };
    },

    getPercentages() {
      const allPercentages = data.allItems.expense.map(function (exp) {
        return exp.getPercentage();
      });
      return allPercentages;
    },

    testing() {
      console.log(data);
    }
  };
})();

// User Interface controller module
const UIController = (function () {
  // DOMstrings object stores strings accessed by querySelector
  const DOMstrings = {
    budgetLabel: '.budget__value',
    container: '.container',
    expenseContainer: '.expenses__list',
    expenseLabel: '.budget__expenses--value',
    incomeContainer: '.income__list',
    incomeLabel: '.budget__income--value',
    inputButton: '.add__btn',
    inputDescription: '.add__description',
    inputType: '.add__type',
    inputValue: '.add__value',
    percentageLabel: '.budget__expenses--percentage'
  };

  return {
    getInput() {
      return {
        // type is either income or expenses
        type: document.querySelector(DOMstrings.inputType).value,
        // description based on user input
        description: document.querySelector(DOMstrings.inputDescription).value,
        // value based on user input, takes a string and converts it to a number
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },

    addListItem(obj, type) {
      // obj argument is each list item, type is either 'exp' or 'inc'
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
      // refactor into function?
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', obj.value);

      // insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
    },

    // clears input fields after value submission
    clearFields() {
      const fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
      // fields is a list, not an array, a shallow copy must be created
      const fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function (field) {
        field.value = '';
      });
      // focus should be back on description box after input
      fieldsArr[0].focus();
    },

    deleteListItem(selectorID) {
      const element = document.getElementById(selectorID);
      element.parentNode.removeChild(element);
    },

    displayBudget(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalIncome;
      document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExpenses;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = '---';
      }
    },

    // makes the DOMstrings object public
    getDOMStrings() {
      return DOMstrings;
    }
  };
})();

// global app controller module
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

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };

  const updateBudget = function () {
    // calculate budget
    budgetCtrl.calculateBudget();
    // return the budget
    const budget = budgetCtrl.getBudget();
    // display budget
    UICtrl.displayBudget(budget);
  };

  const updatePercentages = function () {
    // calculate percentages
    budgetCtrl.calculatePercentages();
    // read percentages from budget controller
    const percentages = budgetCtrl.getPercentages();
    // update UI
    console.log(percentages);
  };

  const ctrlAddItem = function () {
    // get field input data
    const input = UICtrl.getInput();

    // only update the budget if the description is not empty and the number is a positive nonzero number
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // add item to budget controller
      const newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // add new item to UI
      UICtrl.addListItem(newItem, input.type);

      // clear fields
      UICtrl.clearFields();

      // calculate and update budget
      updateBudget();

      // update percentages
      updatePercentages();
    }
  };

  const ctrlDeleteItem = function (event) {
    const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      // income-1 or expense-3
      const splitID = itemID.split('-');
      const type = splitID[0];
      const ID = parseInt(splitID[1]);

      // delete item from data structure
      budgetCtrl.deleteItem(type, ID);
      // delete item from UI
      UICtrl.deleteListItem(itemID);
      // update and show new budget and percentages
      updateBudget();
      updatePercentages();
    }
  };

  return {
    init() {
      console.log('Initializing...');
      setupEventListeners();
      // initialize UI with zeroes using an object literal
      UICtrl.displayBudget({
        budget: 0,
        totalIncome: 0,
        totalExpenses: 0,
        percentage: 0
      });
      console.log('Initialization complete.');
    }
  };
})(budgetController, UIController);

controller.init();
