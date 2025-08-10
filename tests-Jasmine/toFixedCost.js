import { toFixedCost } from "../data/cart.js";

describe('test suite: toFixedCost', () => {
    it('converts cents into dollars', () => {
        expect(toFixedCost(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(toFixedCost(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent', () => {
        expect(toFixedCost(2000.5)).toEqual('20.01');
    });
});