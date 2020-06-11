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
    let outputStack = [0];
    let cursor = 0;

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

    function display () {
        return outputStack[0];
    }

    function pressKey (key) {

        const isValidKey = Object.keys(keys).some((k) => {
            return keys[k] === key;
        });

        if (!isValidKey) {
            throw new Error('Pressed key is invalid');
        }

        if (isNumber(key)) {
            let currentValue = outputStack[0];
            let finalValue = cursor === 0 ? currentValue * 10 + key : currentValue + key*Math.pow(10, cursor);
            outputStack[0] = finalValue;

            if (cursor < 0) {
                cursor--;
            }
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