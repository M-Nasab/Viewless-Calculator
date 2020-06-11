function Calculator () {
    const keys = {
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
        EQUALS: '='
    };

    function isNumber (key) {
        const numberKeys = [
            keys.NUM_0,
            keys.NUM_1,
            keys.NUM_2,
            keys.NUM_3,
            keys.NUM_4,
            keys.NUM_5,
            keys.NUM_6,
            keys.NUM_7,
            keys.NUM_8,
            keys.NUM_9,
        ];

        return numberKeys.includes(key);
    }

    let outputStack = [0];

    function display () {
        return outputStack[0];
    }

    function pressKey (key) {
        if (isNumber(key)) {
            outputStack[0] = outputStack[0] * 10 + key;
        }

        return this;
    }

    this.display = display;
    this.pressKey = pressKey;
    this.keys = keys;
}

const myCalculator = new Calculator();

myCalculator.pressKey(myCalculator.keys.NUM_4).pressKey(myCalculator.keys.NUM_3).pressKey(myCalculator.keys.NUM_3);
console.log(myCalculator.display());

export default Calculator;
