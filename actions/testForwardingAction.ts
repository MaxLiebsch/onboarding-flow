"use server";

import { FieldErrors } from "react-hook-form";

import { phoneNumberForwarding, PhoneNumberForwarding } from "@/types/formData";

export type TestForwardingState = {
  message: string;
  success: boolean;
  errors: FieldErrors<PhoneNumberForwarding>;
};

const testForwardingAction = async ({ phoneNumber }: PhoneNumberForwarding) => {
  const form = phoneNumberForwarding.safeParse({
    phoneNumber,
  });

  if (!form.success) {
    return {
      message: "Bitte geben Sie eine gültige Telefonnummer ein",
      success: false,
      errors: form.error.flatten()
        .fieldErrors as FieldErrors<PhoneNumberForwarding>,
    };
  }

  // TODO: Test forwarding

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: "Weiterleitung getestet",
    success: true,
    errors: {},
  };
};

export default testForwardingAction;
