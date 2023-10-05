import { faker } from "@faker-js/faker";

import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    const order: OrderInput = {
      client: faker.person.firstName(),
      description: faker.commerce.productDescription()
    };

    const orderProtocol = faker.string.uuid();

    jest.spyOn(orderRepository, "create").mockResolvedValueOnce({
      protocol: orderProtocol,
      status: "IN_PREPARATION"
    });

    const result = await createOrder(order);

    expect(result.protocol).toBe(orderProtocol);
    expect(result.status).toBe("IN_PREPARATION");
  });

  it("should return an order based on the protocol", async () => {
    const orderProtocol = faker.string.uuid();

    jest.spyOn(orderRepository, "getByProtocol").mockResolvedValueOnce({
      protocol: orderProtocol,
      status: "IN_PREPARATION"
    });

    const result = await getOrderByProtocol(orderProtocol);

    expect(result.protocol).toBe(orderProtocol);
    expect(result.status).toBe("IN_PREPARATION");
  });

  it("should return status INVALID when protocol doesn't exists", async () => {
    const orderProtocol = faker.string.uuid();

    jest.spyOn(orderRepository, "getByProtocol").mockResolvedValueOnce(undefined);

    const result = await getOrderByProtocol(orderProtocol);

    expect(result.protocol).toBe(orderProtocol);
    expect(result.status).toBe("INVALID");
  });
});