import { describe, it, expect } from "vitest"
import { calculateTotal } from "./calculateTotal"

describe("calculateTotal", () => {
    it("sums valid numbers", () => {
        expect(calculateTotal("100,200,300")).toBe(600)
    })

    it("handles whitespace", () => {
        expect(calculateTotal("100, 200, 300")).toBe(600)
    })

    it("handles decimals correctly", () => {
        expect(calculateTotal("1.5, 2.5, 3")).toBe(7)
    })

    it("handles empty string", () => {
        expect(calculateTotal("")).toBe(0)
    })

    it("handles invalid inputs", () => {
        expect(calculateTotal("abc,100,def")).toBe(100);
        expect(calculateTotal("3\ntwo,3")).toBe(6)
    })

    it("handles trailing comma", () => {
        expect(calculateTotal("100,200,")).toBe(300)
    })
})