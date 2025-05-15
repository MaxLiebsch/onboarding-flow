import { CheckIcon } from "@heroicons/react/24/solid";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import Button from "./ui/Button";
import Input from "./ui/Input";

import testForwardingAction from "@/actions/testForwardingAction";
import { onboardingDataAtom } from "@/atoms/formDataAtom";

const TestPhoneforwarding = () => {
  const phoneConfig = useAtomValue(onboardingDataAtom).phoneConfig;
  const [isLoading, setIsLoading] = useState(false);
  const [forwardingTested, setForwardingTested] = useState(
    phoneConfig.forwardingTested,
  );
  const { control, formState, getValues, setValue } = useFormContext();

  const phoneNumber = useWatch({ control, name: "phoneNumber" });

  const handleTestForwarding = async () => {
    setIsLoading(true);
    const state = await testForwardingAction({
      phoneNumber: getValues("phoneNumber"),
    });

    console.log("state:", state);

    if (state.success) {
      setForwardingTested(true);
      setValue("forwardingTested", true);
    } else {
      setForwardingTested(false);
      setValue("forwardingTested", false);
    }

    setIsLoading(false);
  };

  // Reset forwardingTested when phoneNumber is empty
  useEffect(() => {
    const phoneNumber = getValues("phoneNumber");

    if (!phoneNumber) {
      setForwardingTested(false);
      setValue("forwardingTested", false);
    }
  }, [phoneNumber]);

  return (
    <div className="flex flex-col gap-4 bg-zinc-100 p-2">
      <div className="">Test Weiterleitung</div>
      <div>
        <div className="flex flex-col gap-2">
          <div>
            Überprüfen Sie, ob Ihr Telefonsystem so konfiguriert ist, dass es
            Anrufe an unseren KI-Assistenten weiterleitet.
          </div>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                defaultValue={phoneConfig.phoneNumber}
                errorMessage={formState.errors.phoneNumber?.message as string}
                label="Telefonnummer"
                name="phoneNumber"
                type="tel"
              />
            )}
          />
          <Button
            endContent={forwardingTested && !isLoading ? <CheckIcon /> : null}
            isDisabled={!getValues("phoneNumber")}
            isLoading={isLoading}
            radius="none"
            onPress={handleTestForwarding}
          >
            {forwardingTested
              ? "Weiterleitung getestet"
              : "Weiterleitung testen"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestPhoneforwarding;
