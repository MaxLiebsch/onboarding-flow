"use server";

import { FieldErrors } from "react-hook-form";

import { adaptFieldErrors } from "@/lib/adaptFieldErrors";
import { basicInfo, BasicInfo } from "@/types/formData";

export type SaveBasicInfoState = {
  message: string;
  success: boolean;
  errors: FieldErrors<BasicInfo>;
};

export default async function saveBasicInfoAction(
  prevState: SaveBasicInfoState,
  formData: FormData,
) {
  const form = basicInfo.safeParse({
    name: formData.get("name"),
    phoneNumber: formData.get("phoneNumber"),
    noOfUnits: formData.get("noOfUnits"),
    integrationspartner: formData.get("integrationspartner"),
  });

  if (!form.success) {
    return {
      message: "Bitte füllen Sie alle Felder aus",
      success: false,
      errors: adaptFieldErrors(
        form.error.flatten().fieldErrors,
      ) as FieldErrors<BasicInfo>,
    };
  }

  // TODO: Save basic info

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: "Basisdaten gespeichert",
    success: true,
    errors: {},
  };
}
