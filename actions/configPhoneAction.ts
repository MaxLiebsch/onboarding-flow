"use server";

import { FieldErrors } from "react-hook-form";

import { adaptFieldErrors } from "@/lib/adaptFieldErrors";
import { phoneConfig, PhoneConfig } from "@/types/formData";

export type ConfigPhoneState = {
  message: string;
  success: boolean;
  errors: FieldErrors<PhoneConfig>;
};

export default async function configPhoneAction(
  prevState: ConfigPhoneState,
  formData: FormData,
) {
  const form = phoneConfig.safeParse({
    phoneNumber: formData.get("phoneNumber"),
    announcement: formData.get("announcement"),
    forwardingTested: formData.get("forwardingTested") === "on",
  });

  if (!form.success) {
    return {
      message: "Bitte füllen Sie alle Felder aus",
      success: false,
      errors: adaptFieldErrors(
        form.error.flatten().fieldErrors,
      ) as FieldErrors<PhoneConfig>,
    };
  }

  // TODO: Save phone config

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: "Telefonkonfiguration gespeichert",
    success: true,
    errors: {},
  };
}
