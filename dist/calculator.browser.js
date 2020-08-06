var Calculator = (function () {
    'use strict';

    var keys = {
      NUM_1: 1,
      NUM_2: 2,
      NUM_3: 3,
      NUM_4: 4,
      NUM_5: 5,
      NUM_6: 6,
      NUM_7: 7,
      NUM_8: 8,
      NUM_9: 9,
      NUM_0: 0,
      ADD: '+',
      SUBTRACT: '-',
      MULTIPLY: '×',
      DIVIDE: '÷',
      EQUALS: '=',
      DOT: '.',
      SQRT: '√',
      CHS: '±',
      CLEAR: 'c'
    };
    function Calculator() {
      var operands = [0];
      var operators = [];
      var cursor = 0;
      var displayPointer = 0;
      var nextDisplayPointer = 0;
      var shouldReplace = false;

      function clear() {
        operands = [0];
        operators = [];
        cursor = 0;
        displayPointer = 0;
        nextDisplayPointer = 0;
        shouldReplace = false;
      }

      function isNumber(key) {
        var numberKeys = [keys.NUM_0, keys.NUM_1, keys.NUM_2, keys.NUM_3, keys.NUM_4, keys.NUM_5, keys.NUM_6, keys.NUM_7, keys.NUM_8, keys.NUM_9];
        return numberKeys.includes(key);
      }

      function isBinaryOperator(key) {
        var binaryOperators = [keys.ADD, keys.SUBTRACT, keys.DIVIDE, keys.MULTIPLY];
        return binaryOperators.includes(key);
      }

      function isUnaryOperator(key) {
        var unaryOperators = [keys.SQRT, keys.CHS];
        return unaryOperators.includes(key);
      }

      function calculate(firstOperand, secondOperand, operation) {
        switch (operation) {
          case keys.ADD:
            return firstOperand + secondOperand;

          case keys.SUBTRACT:
            return firstOperand - secondOperand;

          case keys.MULTIPLY:
            return firstOperand * secondOperand;

          case keys.DIVIDE:
            if (secondOperand === 0) {
              throw new Error('division by zero');
            }

            return firstOperand / secondOperand;

          default:
            throw new Error("operation is not valid");
        }
      }

      function calculateUnaryOperation(operand, operator) {
        switch (operator) {
          case keys.SQRT:
            return Math.sqrt(operand);

          case keys.CHS:
            return -operand;

          default:
            throw new Error("operation is not valid");
        }
      }

      function doOperation() {
        if (operators[0]) {
          var operation = operators[0];
          var firstOperand = operands[0];
          var secondOperand = operands[1];
          var result = firstOperand !== undefined && secondOperand !== undefined ? calculate(firstOperand, secondOperand, operation) : firstOperand;
          operands[0] = result;
        }

        displayPointer = 0;
        shouldReplace = true;
        cursor = 0;
      }

      function display() {
        return operands[displayPointer];
      }

      function pressKey(key) {
        var isValidKey = Object.keys(keys).some(function (k) {
          return keys[k] === key;
        });

        if (!isValidKey) {
          throw new Error('Pressed key is invalid');
        }

        if (isNumber(key)) {
          if (nextDisplayPointer !== displayPointer) {
            operands[nextDisplayPointer] = 0;
            cursor = 0;
            displayPointer = nextDisplayPointer;
          }

          var currentValue = !shouldReplace ? operands[displayPointer] : 0;
          var finalValue = cursor === 0 ? currentValue * 10 + key : currentValue + key * Math.pow(10, cursor);
          operands[displayPointer] = finalValue;
          shouldReplace = false;

          if (cursor < 0) {
            cursor--;
          }
        } else if (isBinaryOperator(key)) {
          if (displayPointer === 1) {
            doOperation();
          }

          operators[0] = key;
          nextDisplayPointer = 1;
        } else if (isUnaryOperator(key)) {
          var operand = operands[displayPointer];
          operands[displayPointer] = calculateUnaryOperation(operand, key);
        } else if (key === keys.EQUALS) {
          doOperation();
          nextDisplayPointer = 0;
        } else if (key === keys.DOT) {
          if (cursor === 0) {
            cursor = -1;
          }
        } else if (key === keys.CLEAR) {
          clear();
        }

        return this;
      }

      var calculator = {
        display: display,
        pressKey: pressKey,
        keys: keys
      };
      return calculator;
    }

    return Calculator;

}());
