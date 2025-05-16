import { adaptFieldErrors } from "../lib/adaptFieldErrors";

describe("adaptFieldErrors", () => {
  test("should transform field errors from array format to message object format", () => {
    const fieldErrors = {
      name: ["Name is required"],
      email: ["Email is invalid", "Email is required"],
    };

    const result = adaptFieldErrors(fieldErrors);

    expect(result).toEqual({
      name: { message: "Name is required" },
      email: { message: "Email is invalid" },
    });
  });

  test("should only include fields with errors", () => {
    const fieldErrors = {
      name: ["Name is required"],
      email: [],
      password: undefined,
    };

    const result = adaptFieldErrors(fieldErrors);

    expect(result).toEqual({
      name: { message: "Name is required" },
    });
    expect(result.email).toBeUndefined();
    expect(result.password).toBeUndefined();
  });

  test("should return an empty object when no errors exist", () => {
    const fieldErrors = {
      name: [],
      email: [],
      password: undefined,
    };

    const result = adaptFieldErrors(fieldErrors);

    expect(result).toEqual({});
  });

  test("should handle empty input object", () => {
    const fieldErrors = {};

    const result = adaptFieldErrors(fieldErrors);

    expect(result).toEqual({});
  });

  test("should preserve field names in the output", () => {
    const fieldErrors = {
      "user.name": ["Name is required"],
      "contact-email": ["Email is invalid"],
    };

    const result = adaptFieldErrors(fieldErrors);

    expect(result).toEqual({
      "user.name": { message: "Name is required" },
      "contact-email": { message: "Email is invalid" },
    });
  });
});
