import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid", () => ({ v4: () => "1234" }));

describe("calculator tests", () => {
  it("should generate a protocol with priority", async () => {
    const [firstName, lastName, hasPriority] = ["John", "Doe", true];
    const protocol = generateProtocolForPacient(firstName, lastName, hasPriority);
    expect(protocol).toEqual({
      priority: true,
      date: expect.any(Date),
      pacient: "John Doe",
      protocol: expect.any(String),
    });
  });

  it("should generate a protocol without priority", async () => {
    const [firstName, lastName, hasPriority] = ["John", "Doe", false];
    const protocol = generateProtocolForPacient(firstName, lastName, hasPriority);
    expect(protocol).toEqual({
      priority: false,
      date: expect.any(Date),
      pacient: "John Doe",
      protocol: expect.any(String),
    });
  });
});