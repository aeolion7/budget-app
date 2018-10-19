// IIFE modules

// budgetController
const budgetController = (function () {

})();

// UIController
const UIController = (function () {

})();

// global app controller
const controller = (function (budgetCtrl, UICtrl) {

  const ctrlAddItem = function () {
    // get field input data

    // add item to budget controller

    // add new item to UI

    // calculate budget

    // display budget

  };

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function (event) {
    // used both keyCode and which for browser compatibility
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
