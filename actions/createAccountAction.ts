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
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: "Account erstellt",
    success: true,
    errors: {},
  };
}
