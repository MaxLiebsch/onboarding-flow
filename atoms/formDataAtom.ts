import { atom } from "jotai";

import { OnboardingData, OnboardingDataStep } from "@/types/formData";

const onboardingDataAtom = atom<OnboardingData>({
  accountDetails: {
    email: "",
    password: "",
    terms: false,
  },
  basicInfo: {
    name: "",
    phoneNumber: "",
    noOfUnits: "",
    integrationspartner: "",
  },
  phoneConfig: {
    phoneNumber: "",
    announcement: "",
    forwardingTested: false,
  },
});

const updateOnboardingDataAtom = atom(
  null,
  (
    get,
    set,
    { step, data }: { step: OnboardingDataStep; data: Partial<OnboardingData> },
  ) => {
    set(onboardingDataAtom, (prev: OnboardingData) => ({
      ...prev,
      [step]: { ...data[step] },
    }));
  },
);

export { onboardingDataAtom, updateOnboardingDataAtom };

