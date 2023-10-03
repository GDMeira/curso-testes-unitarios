import calculator from "../../src/calculator";

let operations = {
  "sum": (n1: number, n2: number) => calculator.sum(n1, n2),
  "sub": (n1: number, n2: number) => calculator.sub(n1, n2),
  "mul": (n1: number, n2: number) => calculator.mul(n1, n2),
  "div": (n1: number, n2: number) => calculator.div(n1, n2),
};

describe("calculator tests", () => {
  it("should sum two numbers", async () => {
      const operation = "sum";
      const n1 = 2;
      const n2 = 2;

    const mathOperation = operations[operation];
    const result = mathOperation(n1, n2) as number;
    expect(result).toBe(n1 + n2);
  });

  it("should subtract two numbers", async () => {
    const operation = "sub";
      const n1 = 2;
      const n2 = 2;

    const mathOperation = operations[operation];
    const result = mathOperation(n1, n2) as number;
    expect(result).toBe(n1 - n2);
  });
  it("should multiply two numbers", async () => {
    const operation = "mul";
      const n1 = 3;
      const n2 = 2;

    const mathOperation = operations[operation];
    const result = mathOperation(n1, n2) as number;
    expect(result).toBe(n1 * n2);
  });

  it("should divide two numbers", async () => {
    const operation = "div";
      const n1 = 2;
      const n2 = 2;

    const mathOperation = operations[operation];
    const result = mathOperation(n1, n2) as number;
    expect(result).toBe(n1 / n2);
  });

  it("should return 0 when diving by zero", async () => {
    const operation = "div";
      const n1 = 2;
      const n2 = 0;

    const mathOperation = operations[operation];
    const result = mathOperation(n1, n2) as number;
    expect(result).toBe(0);
  });
})