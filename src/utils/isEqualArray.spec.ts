import {assert} from "chai";
import isEqualArrays from "./isEqualArrays";
 
describe("Equal arrays", () => {
    it("should return true if equal", () => {
        const a = [1, 2, 3];
        const b = [1, 2, 3];

        const result = isEqualArrays(a, b);
        assert.isTrue(result);
    });

    it("should return false if not equal", () => {
        const a = [1, 2];
        const b = [1, 2, 3];

        const result = isEqualArrays(a, b);
        assert.isFalse(result);
    });
});
