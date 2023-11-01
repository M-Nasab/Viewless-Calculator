declare function Calculator(): {
    display: () => number;
    pressKey: (key: number | string) => typeof Calculator;
    keys: {
        NUM_1: number;
        NUM_2: number;
        NUM_3: number;
        NUM_4: number;
        NUM_5: number;
        NUM_6: number;
        NUM_7: number;
        NUM_8: number;
        NUM_9: number;
        NUM_0: number;
        ADD: string;
        SUBTRACT: string;
        MULTIPLY: string;
        DIVIDE: string;
        EQUALS: string;
        DOT: string;
        SQRT: string;
        CHS: string;
        CLEAR: string;
    };
};
export default Calculator;

export { }
