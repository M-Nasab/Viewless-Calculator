import { expect } from 'chai';
import Calculator from '../src';

/**
 * Check if our toy calculator works as expected
 */

describe('Calculator', function () {
    let calculator;

    beforeEach(function () {
        calculator = Calculator();
    });

    it('Should return a calculator instance', function () {
        expect(calculator).to.have.property('display');
        expect(calculator.display).to.be.a('function');

        expect(calculator).to.have.property('pressKey');
        expect(calculator.pressKey).to.be.a('function');

        expect(calculator).to.have.property('keys');
    });

    it('Should return itself on keyPress', function () {
        const keyPressResult = calculator.pressKey(calculator.keys.NUM_9);

        expect(keyPressResult).to.equal(calculator);
    });

    it('Should throw error if pressed key is invalid', function () {
        const pressInvalidKey = () => {
            calculator.pressKey('some invalid key');
        };

        expect(pressInvalidKey).to.throw();
    });

    it('Should display \'0\' on start', function () {
        expect(calculator.display()).to.equal(0);
    });

    it('Should display the pressed digit number if one digit is pressed', function () {
        calculator.pressKey(calculator.keys.NUM_5);
        expect(calculator.display()).to.equal(5);
    });

    it('Should display the correct value if multiple digits are pressed', function () {
        calculator.pressKey(calculator.keys.NUM_5).pressKey(calculator.keys.NUM_2).pressKey(calculator.keys.NUM_6);

        expect(calculator.display()).to.equal(526);
    });

    it('Should add digits to fraction part', function () {
        calculator
        .pressKey(calculator.keys.NUM_4)
        .pressKey(calculator.keys.DOT)
        .pressKey(calculator.keys.NUM_2)
        .pressKey(calculator.keys.NUM_5);

        expect(calculator.display()).to.equal(4.25);
    });

    it('Should start getting new input if user presses binary operator keys', function () {
        calculator.pressKey(calculator.keys.NUM_3).pressKey(calculator.keys.NUM_2);

        calculator.pressKey(calculator.keys.ADD);

        calculator.pressKey(calculator.keys.NUM_8).pressKey(calculator.keys.NUM_5);

        expect(calculator.display()).to.equal(85);
    });

    it('Should show the operation result if \'=\' button is pressed after both operands have been entered', function () {
        calculator.pressKey(calculator.keys.NUM_3).pressKey(calculator.keys.NUM_2);

        calculator.pressKey(calculator.keys.SUBTRACT);

        calculator.pressKey(calculator.keys.NUM_8).pressKey(calculator.keys.EQUALS);

        expect(calculator.display()).to.equal(24);
    });

    it('Should replace the operation if a binary operation key is pressed right after another one', function () {
        calculator
        .pressKey(calculator.keys.NUM_4)
        .pressKey(calculator.keys.ADD)
        .pressKey(calculator.keys.MULTIPLY)
        .pressKey(calculator.keys.NUM_3)
        .pressKey(calculator.keys.EQUALS);

        expect(calculator.display()).to.equal(12);
    });

    it('Should return the first operand of the second operand is not provided and the operation and equals button have been pressed', function () {
        calculator
        .pressKey(calculator.keys.NUM_4)
        .pressKey(calculator.keys.NUM_7)
        .pressKey(calculator.keys.MULTIPLY)
        .pressKey(calculator.keys.EQUALS);

        expect(calculator.display()).to.equal(47);
    });

    it('Should get new input after \'=\' is pressed', function () {
        calculator.pressKey(calculator.keys.NUM_3).pressKey(calculator.keys.NUM_2).pressKey(calculator.keys.EQUALS);
        calculator.pressKey(calculator.keys.NUM_1);
        expect(calculator.display()).to.equal(1);
    });

    it('Should not continue to get fractions after \'=\' has been pressed', function () {
        calculator
        .pressKey(calculator.keys.NUM_3)
        .pressKey(calculator.keys.DOT)
        .pressKey(calculator.keys.NUM_7)
        .pressKey(calculator.keys.NUM_6)
        .pressKey(calculator.keys.EQUALS)
        .pressKey(calculator.keys.NUM_5)
        .pressKey(calculator.keys.NUM_9)

        expect(calculator.display()).to.equal(59);
    });

    it('Should repeat the previous operation if the \'=\' is pressed', function () {
        calculator
        .pressKey(calculator.keys.NUM_2)
        .pressKey(calculator.keys.NUM_3)
        .pressKey(calculator.keys.ADD)
        .pressKey(calculator.keys.NUM_4)
        .pressKey(calculator.keys.EQUALS)
        .pressKey(calculator.keys.EQUALS)
        .pressKey(calculator.keys.EQUALS);

        expect(calculator.display()).to.equal(35);
    });

    it('Should finish the previous operation and show the result if exists when a binary operation key is pressed', function () {
        calculator
        .pressKey(calculator.keys.NUM_7)
        .pressKey(calculator.keys.MULTIPLY)
        .pressKey(calculator.keys.NUM_8)
        .pressKey(calculator.keys.ADD);

        expect(calculator.display()).to.equal(56);
    });

    it('Should not repeat the operation if the operator button is pressed multiple times', function () {
        calculator
        .pressKey(calculator.keys.NUM_5)
        .pressKey(calculator.keys.ADD)
        .pressKey(calculator.keys.NUM_4)
        .pressKey(calculator.keys.ADD)
        .pressKey(calculator.keys.ADD)
        .pressKey(calculator.keys.ADD)
        .pressKey(calculator.keys.ADD);

        expect(calculator.display()).to.equal(9);
    });

    it('Should be able to start new operation after the previous one has finished by pressing \'=\'', function () {
        calculator
        .pressKey(calculator.keys.NUM_5)
        .pressKey(calculator.keys.MULTIPLY)
        .pressKey(calculator.keys.NUM_6)
        .pressKey(calculator.keys.EQUALS)
        .pressKey(calculator.keys.NUM_8)
        .pressKey(calculator.keys.SUBTRACT)
        .pressKey(calculator.keys.NUM_3)
        .pressKey(calculator.keys.EQUALS);

        expect(calculator.display()).to.equal(5);
    });

    it('Should do multiple binary operations sequently', function () {
        calculator
        .pressKey(calculator.keys.NUM_9)
        .pressKey(calculator.keys.MULTIPLY)
        .pressKey(calculator.keys.NUM_4)
        .pressKey(calculator.keys.ADD)
        .pressKey(calculator.keys.NUM_1)
        .pressKey(calculator.keys.NUM_0)
        .pressKey(calculator.keys.SUBTRACT)
        .pressKey(calculator.keys.NUM_4)
        .pressKey(calculator.keys.ADD);

        expect(calculator.display()).to.equal(42);
    });

    it('Should throw error on devision by zero', function () {

        const calculate = () => {
            calculator
            .pressKey(calculator.keys.NUM_8)
            .pressKey(calculator.keys.NUM_5)
            .pressKey(calculator.keys.DIVIDE)
            .pressKey(calculator.keys.NUM_0)
            .pressKey(calculator.keys.EQUALS);
        };

        expect(calculate).to.throw();
    });

    describe('Binary Operators', function () {
        it('Should do addition correctly', function () {
            calculator
            .pressKey(calculator.keys.NUM_4)
            .pressKey(calculator.keys.ADD)
            .pressKey(calculator.keys.NUM_6)
            .pressKey(calculator.keys.EQUALS);

            expect(calculator.display()).to.equal(10);
        });

        it('Should do subtraction correctly', function () {
            calculator
            .pressKey(calculator.keys.NUM_9)
            .pressKey(calculator.keys.SUBTRACT)
            .pressKey(calculator.keys.NUM_6)
            .pressKey(calculator.keys.EQUALS);

            expect(calculator.display()).to.equal(3);
        });

        it('Should do multiplication correctly', function () {
            calculator
            .pressKey(calculator.keys.NUM_9)
            .pressKey(calculator.keys.MULTIPLY)
            .pressKey(calculator.keys.NUM_6)
            .pressKey(calculator.keys.EQUALS);

            expect(calculator.display()).to.equal(54);
        });

        it('Should do division correctly', function () {
            calculator
            .pressKey(calculator.keys.NUM_9)
            .pressKey(calculator.keys.DIVIDE)
            .pressKey(calculator.keys.NUM_6)
            .pressKey(calculator.keys.EQUALS);

            expect(calculator.display()).to.equal(1.5);
        });
    });

    it('Should apply the unary operator if input is the first operand', function () {
        calculator.pressKey(calculator.keys.NUM_9).pressKey(calculator.keys.SQRT).pressKey(calculator.keys.EQUALS);
        expect(calculator.display()).to.equal(3);
    });

    it('Should apply the unary operator if input is the second operand', function () {
        calculator
        .pressKey(calculator.keys.NUM_6)
        .pressKey(calculator.keys.ADD)
        .pressKey(calculator.keys.NUM_1)
        .pressKey(calculator.keys.NUM_6)
        .pressKey(calculator.keys.SQRT)
        .pressKey(calculator.keys.EQUALS);

        expect(calculator.display()).to.equal(10);
    });

    describe('Unary Operators', function () {
        it('Should change sign', function () {
            calculator.pressKey(calculator.keys.NUM_7).pressKey(calculator.keys.CHS);

            expect(calculator.display()).to.equal(-7);
        });

        it('Should return square root', function () {
            calculator
            .pressKey(calculator.keys.NUM_2)
            .pressKey(calculator.keys.NUM_5)
            .pressKey(calculator.keys.NUM_6)
            .pressKey(calculator.keys.SQRT);

            expect(calculator.display()).to.equal(16);
        });
    });
});