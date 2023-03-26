import {assert} from "chai";
import isEqualArrays from "./isEqualArrays";
 
describe("Equal arrays", () => {
    it("Equal arrays should return true", () => {
        const a = [1, 2, 3];
        const b = [1, 2, 3];

        const result = isEqualArrays(a, b);
        assert.isTrue(result);
    });

    it("Not equal arrays should return false", () => {
        const a = [1, 2];
        const b = [1, 2, 3];

        const result = isEqualArrays(a, b);
        assert.isFalse(result);
    });
});
