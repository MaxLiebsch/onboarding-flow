"use server";

import { FieldErrors } from "react-hook-form";

import { adaptFieldErrors } from "@/lib/adaptFieldErrors";
import { AccountDetails, accountDetails } from "@/types/formData";

export type CreateAccountState = {
  message: string;
  success: boolean;
  errors: FieldErrors<AccountDetails>;
};

export default async function createAccountAction(
  prevState: CreateAccountState,
  formData: FormData,
) {
  const form = accountDetails.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    terms: formData.get("terms") === "true",
  });

  if (!form.success) {
    return {
      message: "Ungültige E-Mail-Adresse oder Passwort",
      success: false,
      errors: adaptFieldErrors(
        form.error.flatten().fieldErrors,
      ) as FieldErrors<AccountDetails>,
    };
  }

  // TODO: Create account
  // TODO: Create user in stripe
  // TODO: Create subscription

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: "Account erstellt",
    success: true,
    errors: {},
  };
}
