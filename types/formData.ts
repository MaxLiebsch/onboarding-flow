import { z } from "zod";

export const accountDetails = z.object({
  email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
  password: z
    .string()
    .min(8, { message: "Passwort muss mindestens 8 Zeichen lang sein" }),
});

export const basicInfo = z.object({
  name: z.string().min(1, { message: "Name ist erforderlich" }),
  phoneNumber: z.string().min(1, { message: "Telefonnummer ist erforderlich" }),
  noOfUnits: z
    .string()
    .min(1, { message: "Anzahl der Einheiten ist erforderlich" }),
  integrationspartner: z
    .string()
    .min(1, { message: "Integrationspartner ist erforderlich" }),
});

export const phoneConfig = z.object({
  announcement: z.string().min(1, { message: "Ankündigung ist erforderlich" }),
  phoneNumber: z.string().min(1, { message: "Telefonnummer ist erforderlich" }),
  forwardingTested: z.boolean().refine((val) => val === true, {
    message: "Bitte testen Sie die Weiterleitung",
  }),
});

export const phoneNumberForwarding = z.object({
  phoneNumber: z.string().min(1, { message: "Telefonnummer ist erforderlich" }),
});

export type PhoneNumberForwarding = z.infer<typeof phoneNumberForwarding>;

export type AccountDetails = z.infer<typeof accountDetails>;
export type BasicInfo = z.infer<typeof basicInfo>;
export type PhoneConfig = z.infer<typeof phoneConfig>;

export const onboardingData = z.object({
  accountDetails,
  basicInfo,
  phoneConfig,
});

export type OnboardingData = z.infer<typeof onboardingData>;

export type OnboardingDataStep = keyof OnboardingData;
