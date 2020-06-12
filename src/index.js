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
    EQUALS: '=',
    DOT: '.',
};

export default function Calculator () {
    let operands = [0];
    let operators = [];
    let cursor = 0;
    let displayPointer = 0;
    let shouldReplace = false;

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

    function isBinaryOperator (key) {
        const binaryOperators = [
            keys.ADD,
            keys.SUBTRACT,
            keys.DIVIDE,
            keys.MULTIPLY
        ];

        return binaryOperators.includes(key);
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
                return firstOperand / secondOperand;
            default:
                throw new Error("opration is not valid");
        }
    }

    function doOperation () {
        if (operators.length) {
            const operation = operators[0];
            const firstOperand = operands[0];
            const secondOperand = operands[1];

            const result = firstOperand !== undefined && secondOperand !== undefined ? calculate(firstOperand, secondOperand, operation) : firstOperand;

            operands[0] = result;
        }

        displayPointer = 0;
        shouldReplace = true;
        cursor = 0;
    }

    function display () {
        return operands[displayPointer];
    }

    function pressKey (key) {

        const isValidKey = Object.keys(keys).some((k) => {
            return keys[k] === key;
        });

        if (!isValidKey) {
            throw new Error('Pressed key is invalid');
        }

        if (isNumber(key)) {
            if (displayPointer === 0 && operators.length) {
                operands.push(0);
                cursor = 0;
                displayPointer = 1;
            }

            let currentValue = !shouldReplace ? operands[displayPointer] : 0;
            let finalValue = cursor === 0 ? currentValue * 10 + key : currentValue + key*Math.pow(10, cursor);
            operands[displayPointer] = finalValue;
            shouldReplace = false;

            if (cursor < 0) {
                cursor--;
            }
        }

        if (isBinaryOperator(key)) {
            if (displayPointer === 1) {
                doOperation();
            }

            operators[0] = key;
        }

        if (key === keys.EQUALS) {
            doOperation();
        }

        if (key === keys.DOT) {
            if (cursor === 0) {
                cursor = -1;
            }
        }

        return this;
    }

    const calculator = {
        display,
        pressKey,
        keys,
    };

    return calculator;
}