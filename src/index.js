/**
 * List of available keys on the calculator
 *
 * @readonly
 * @enum {string|number}
 */
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
    SQRT: '√',
    CHS: '±',
    CLEAR: 'c',
};

export default function Calculator() {
    let operands = [0];
    let operators = [];
    let cursor = 0;
    let displayPointer = 0;
    let nextDisplayPointer = 0;
    let shouldReplace = false;

    function clear() {
        operands = [0];
        operators = [];
        cursor = 0;
        displayPointer = 0;
        nextDisplayPointer = 0;
        shouldReplace = false;
    }

    /**
     * Determines if the provided calculator key is a number
     *
     * @param {number|string} key the calculator key to check
     *
     * @returns {boolean} returns true is the provided key is a number
     */
    function isNumber(key) {
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

    /**
     * Determines of the provided key is a binary operator
     *
     * @param {number|string} key the calculator key to check
     *
     * @returns {boolean} returns true when the provided key is a binary operator
     */
    function isBinaryOperator(key) {
        const binaryOperators = [
            keys.ADD,
            keys.SUBTRACT,
            keys.DIVIDE,
            keys.MULTIPLY
        ];

        return binaryOperators.includes(key);
    }

    /**
     * Determines of the provided key is a unary operator
     *
     * @param {number|string} key the calculator key to check
     *
     * @returns {boolean} returns true when the provided key is a unary operator
     */
    function isUnaryOperator(key) {
        const unaryOperators = [
            keys.SQRT,
            keys.CHS,
        ];

        return unaryOperators.includes(key);
    }

    /**
     * Performs a binary calculation
     *
     * @param {number} firstOperand
     * @param {number} secondOperand
     * @param {string} operation
     *
     * @returns {number}
     */
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

    /**
     * Performs a unary calculation
     *
     * @param {number} operand
     * @param {string} operator
     *
     * @returns {number}
     */
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

    /**
     * Returns the current display
     *
     * @returns {number}
     */
    function display() {
        return operands[displayPointer];
    }

    /**
     * Stacks a calculator key
     *
     * @param {number|string} key
     * @returns {Calculator}
     */
    function pressKey(key) {

        const isValidKey = Object.keys(keys).some((k) => {
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

            let currentValue = !shouldReplace ? operands[displayPointer] : 0;
            let finalValue = cursor === 0 ? currentValue * 10 + key : currentValue + key * Math.pow(10, cursor);
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
            const operand = operands[displayPointer];
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

    const calculator = {
        display,
        pressKey,
        keys,
    };

    return calculator;
}