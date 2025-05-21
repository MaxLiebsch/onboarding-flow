import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import { OnboardingData, OnboardingDataStep } from "@/types/formData";

const storage = createJSONStorage<OnboardingData>(() => sessionStorage);
const onboardingDataAtom = atomWithStorage<OnboardingData>(
  "onboardingData",
  {
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
  },
  storage,
);

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

