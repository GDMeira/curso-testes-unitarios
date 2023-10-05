import { getInfractionsFrom } from '../../src/infractions-service';
import * as infractionsRepository from '../../src/infractions-repository';
import * as usersRepository from "../../src/users-repository";
import { Level } from '@prisma/client';

describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    const licenseId = "123456789";
    const user = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      licenseId
    };
    const infractions = [
      {
        id: 1,
        userId: 1,
        description: "Speeding",
        cost: 100,
        date: new Date(),
        level: Level.MEDIUM
      },
      {
        id: 2,
        userId: 1,
        description: "Speeding",
        cost: 150,
        date: new Date(),
        level: Level.SEVERE
      }
    ];

    jest.spyOn(usersRepository, "getUserByDocument").mockResolvedValueOnce(user);

    jest.spyOn(infractionsRepository, "getInfractionsFrom").mockResolvedValueOnce(infractions);

    const result = await getInfractionsFrom(licenseId);

    expect(result).toEqual({
      ...user,
      infractions
    });
  });

  it("should throw an error when driver license does not exists", () => {
    const licenseId = "123456789";
    const user = undefined;

    jest.spyOn(usersRepository, "getUserByDocument").mockResolvedValueOnce(user);

    const result = getInfractionsFrom(licenseId);

    expect(result).rejects.toEqual({ type: "NOT_FOUND", message: "Driver not found." });
  })
});