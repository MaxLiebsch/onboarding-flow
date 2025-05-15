import { CheckIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { Step } from "@/types/step";

const StepIndicator = ({ step }: { step: Step }) => {
  return (
    <div>
      {step.status === "complete" ? (
        <div className="group flex w-full items-center">
          <span className="flex items-center px-6 py-4 text-sm font-medium">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-600 group-hover:bg-primary-700">
              <motion.div animate={{ scale: 1 }} initial={{ scale: 0.8 }}>
                <CheckIcon aria-hidden="true" className="size-6 text-white" />
              </motion.div>
            </span>
            <motion.span
              animate={{ scale: 1 }}
              className="ml-4 text-sm font-medium text-gray-900"
              initial={{ scale: 0.8 }}
            >
              {step.name}
            </motion.span>
          </span>
        </div>
      ) : step.status === "current" ? (
        <div className="group flex w-full items-center">
          <span className="flex items-center px-6 py-4 text-sm font-medium">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary-600">
              <span className="text-primary-600">{step.id}</span>
            </span>
            <span className="ml-4 text-sm font-medium text-primary-600">
              {step.name}
            </span>
          </span>
        </div>
      ) : (
        <div className="group flex w-full items-center">
          <span className="flex items-center px-6 py-4 text-sm font-medium">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
              <span className="text-gray-500 group-hover:text-gray-900">
                {step.id}
              </span>
            </span>
            <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
              {step.name}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default StepIndicator;
