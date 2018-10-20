// IIFE modules

// budgetController
const budgetController = (function () {

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
        // either income or expenses
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMStrings: function () {
      return DOMstrings;
    }
  };
})();

// global app controller
const controller = (function (budgetCtrl, UICtrl) {
  const DOM = UICtrl.getDOMStrings();

  const ctrlAddItem = function () {
    // get field input data
    const input = UICtrl.getInput();
    console.log(input);
    // add item to budget controller

    // add new item to UI

    // calculate budget

    // display budget
  };

  document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function (event) {
    // used both keyCode and which for browser compatibility
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
