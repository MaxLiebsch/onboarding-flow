import { atom } from "jotai";

import { currentStepAtom } from "./currentStepAtom";
import { stepsAtom } from "./stepsAtom";

import { Steps } from "@/types/step";

const steps: Steps = {
  1: {
    id: 1,
    name: "Account erstellen",
    href: "#",
    status: "current",
  },
  2: {
    id: 2,
    name: "Basisdaten",
    href: "#",
    status: "upcoming",
  },
  3: {
    id: 3,
    name: "Telefonannahme konfiguieren",
    href: "#",
    status: "upcomingcod",
  },
  4: {
    id: 4,
    name: "Abschluss",
    href: "#",
    status: "upcoming",
  },
};

export const stepNavigationAtom = atom(
  steps,
  (get, set, action: "next" | "prev") => {
    const currentStepId = get(currentStepAtom);

    const steps = get(stepNavigationAtom);

    let newStepId: number;

    if (action === "next") {
      newStepId = Math.min(currentStepId + 1, Object.keys(steps).length);
    } else if (action === "prev") {
      newStepId = Math.max(currentStepId - 1, 1);
    } else {
      newStepId = 1;
    }

    set(currentStepAtom, newStepId);

    const updatedSteps = {
      ...steps,
    };

    // Update status of current and previous steps
    if (currentStepId !== newStepId) {
      // Update all previous steps to complete
      for (let i = 1; i < newStepId; i++) {
        updatedSteps[i].status = "complete";
      }
      updatedSteps[newStepId].status = "current";
    }

    // Update status of all steps after the current step
    for (let i = newStepId + 1; i <= Object.keys(steps).length; i++) {
      updatedSteps[i].status = "upcoming";
    }

    set(stepsAtom, updatedSteps);
  },
);
