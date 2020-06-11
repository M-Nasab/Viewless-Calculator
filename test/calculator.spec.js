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

});