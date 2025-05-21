"use server";

import { verify } from "hcaptcha";
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
  if (process.env.IS_AUTOMATED_TEST !== "true") {
    const hcaptcha = formData.get("hcaptcha");

    if (!hcaptcha) {
      return {
        message: "Captcha ist erforderlich",
        success: false,
        errors: {},
      };
    }

    const hcaptchaResponse = await verify(
      process.env.HCAPTCHA_SECRET_KEY as string,
      hcaptcha as string,
    );

    if (!hcaptchaResponse.success) {
      return {
        message: "Captcha ist ungültig",
        success: false,
        errors: {},
      };
    }
  }

  const form = accountDetails.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    terms: formData.get("terms") === "true",
  });

  if (!form.success) {
    return {
      message: "Ungültige Anmeldeinformationen",
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
