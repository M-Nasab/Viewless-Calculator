# Viewless Calculator

[![Build Status](https://travis-ci.org/M-Nasab/Viewless-Calculator.svg?branch=master)](https://travis-ci.org/M-Nasab/Viewless-Calculator)

Very simple calculator logic without any view, just to show internal mechanics of a basic immediate-excution calculator.

For more information see:

[Calculator Input Methods](https://en.wikipedia.org/wiki/Calculator_input_methods)

## Installation

```
npm install --save calculator-logic
```

## Usage

```javascript
import Calculator from 'calculator-logic';

const myCalculator = Calculator();
const { keys } = myCalculator;

myCalculator
.keyPress(keys.NUM_1)
.keyPress(keys.NUM_2)
.keyPress(keys.MULTIPLY)
.keyPress(keys.NUM_3)
.keyPress(keys.EQUALS);

const result = myCalculator.display();

console.log(result); // 36

```

## API

### Methods

```typescript
Calculator: {
    // Does a key press action on the calculator.
    // Takes the pressed key as an argument.
    // Returns the calculator instance to
    // make chaining key presses possible.
    keyPress (key: CalculatorKey) : Calculator;
    
    // Returns the current number displayed on the calculator screen
    display () : Number;
    
    // List of available keys on the calculator
    keys : {
        NUM_0, ..., NUM_9,
        ADD, SUBTRACT, MULTIPLY, DIVIDE,
        SQRT,
        EQUALS,
    };
};
```

## Test

```
npm run test
```

## License

MIT