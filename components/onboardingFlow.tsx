"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";

import StepIndicator from "./StepIndicator";
import BasicInfo from "./steps/BasicInfo";
import Completion from "./steps/Completion";
import CreateAccount from "./steps/CreateAccount";
import PhoneConfig from "./steps/PhoneConfig";

import { currentStepAtom } from "@/atoms/currentStepAtom";
import { stepsAtom } from "@/atoms/stepsAtom";
export default function OnboardingFlow() {
  const currentStep = useAtomValue(currentStepAtom);
  const steps = useAtomValue(stepsAtom);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CreateAccount />;
      case 2:
        return <BasicInfo />;
      case 3:
        return <PhoneConfig />;
      case 4:
        return <Completion />;
    }
  };

  return (
    <div>
      <nav aria-label="Progress">
        <ol className="divide-y divide-gray-300 border border-gray-300 md:flex md:divide-y-0">
          {Object.values(steps).map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              <StepIndicator step={step} />
              {stepIdx !== Object.values(steps).length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    aria-hidden="true"
                    className="absolute top-0 right-0 hidden h-full w-5 md:block"
                  >
                    <svg
                      className="size-full text-gray-300"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 22 80"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4 max-w-xl w-full mx-auto">
              {renderStep()}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
      {/* <div className="flex justify-between">
        <Button onPress={() => setSteps("prev")}>Zurück</Button>
        <Button onPress={() => setSteps("next")}>Weiter</Button>
      </div> */}
    </div>
  );
}
