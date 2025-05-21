import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";

import Button from "../ui/Button";
import StepHeader from "../ui/StepHeader";

import { onboardingDataAtom } from "@/atoms/formDataAtom";

const bulletPoints = [
  {
    title: "AI-Assistent ist aktiv",
    subTitle: "Ihr Telefonsystem ist jetzt mit unserer KI verbunden",
  },
  {
    title: "E-Mail-Bestätigung gesendet",
    subTitle: "Überprüfen Sie ihr Postfach",
  },
  {
    title: "Zugang zum Dashboard",
    subTitle: "Sie haben nun vollen Zugriff auf Ihr Admin-Dashboard",
  },
];

const Completion = () => {
  const { basicInfo } = useAtomValue(onboardingDataAtom);

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        initial={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid place-items-center">
          <CheckBadgeIcon className="w-12 h-12 text-primary-500" />
        </div>
      </motion.div>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 20, opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <StepHeader
          description="Ihr KI-Assistent für die Immobilienverwaltung ist nun bereit, Kundenanfragen zu bearbeiten."
          title={`Sie sind bereit, ${basicInfo.name}`}
        />
      </motion.div>
      <div className="flex flex-col gap-4 bg-zinc-100 p-6">
        <p className="text-center">Wie geht es jetzt weiter?</p>
        <ul className="flex flex-col gap-3">
          {bulletPoints.map((bulletPoint) => (
            <li key={bulletPoint.title}>
              <div className="flex flex-row gap-3">
                <div>
                  <CheckBadgeIcon className="w-6 h-6 text-primary-500" />
                </div>
                <div className="flex flex-col">
                  <div>{bulletPoint.title}</div>
                  <div className=" text-gray-500">{bulletPoint.subTitle}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button
        fullWidth
        data-testid="dashboard-button"
        onPress={() => {
          sessionStorage.clear();
          window.location.reload();
        }}
      >
        Zum Dashboard gehen
      </Button>
    </div>
  );
};

export default Completion;
