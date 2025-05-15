import { atom } from "jotai";

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

export const stepsAtom = atom(steps);
