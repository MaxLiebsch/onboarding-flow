import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<number>(() => sessionStorage);

export const currentStepAtom = atomWithStorage<number>(
  "currentStep",
  1,
  storage,
);
