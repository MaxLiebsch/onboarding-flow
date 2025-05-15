import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button as StandardButton, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { Controller, FormProvider, useForm } from "react-hook-form";

import TestPhoneforwarding from "../TestPhoneforwarding";
import Button from "../ui/Button";

import configPhoneAction from "@/actions/configPhoneAction";
import {
  onboardingDataAtom,
  updateOnboardingDataAtom,
} from "@/atoms/formDataAtom";
import { stepNavigationAtom } from "@/atoms/stepNavigationAtom";
import { PhoneConfig, phoneConfig } from "@/types/formData";

const PhoneConfigForm = () => {
  const setSteps = useSetAtom(stepNavigationAtom);
  const data = useAtomValue(onboardingDataAtom);
  const setOnboardingData = useSetAtom(updateOnboardingDataAtom);

  const [state, formAction, isPending] = useFormState(configPhoneAction, {
    message: "",
    success: false,
    errors: {},
  });

  const methods = useForm<PhoneConfig>({
    errors: state.errors,
    mode: "onBlur",
    values: data.phoneConfig,
    resolver: zodResolver(phoneConfig),
  });
  const { control, formState, reset, getValues, register } = methods;

  useEffect(() => {
    if (state.success) {
      const formValues = getValues();

      setOnboardingData({
        step: "phoneConfig",
        data: {
          phoneConfig: {
            ...formValues,
          },
        },
      });
      setSteps("next");
    }
  }, [state.success]);

  useEffect(() => {
    if (!state.success && data.phoneConfig.announcement !== "") {
      reset(data.phoneConfig);
    }
  }, [data.phoneConfig]);

  return (
    <FormProvider {...methods}>
      <form action={formAction} className="flex flex-col gap-4">
        <Controller
          control={control}
          name="announcement"
          render={({ field }) => (
            <Textarea
              {...field}
              isRequired
              errorMessage={formState.errors.announcement?.message}
              label="Ansage"
              placeholder="Hallo, vielen Dank, dass Sie ttsss anrufen. Unser KI-Assistent ist bereit, Ihnen bei Ihrer Anfrage zu helfen oder Sie mit einem Teammitglied zu verbinden."
              radius="none"
              type="text"
            />
          )}
        />
        <TestPhoneforwarding />
        <input hidden type="checkbox" {...register("forwardingTested")} />
        <div className="flex gap-2 items-center mt-4">
          <StandardButton
            fullWidth
            disabled={isPending}
            radius="none"
            startContent={<ArrowLeftIcon />}
            variant="bordered"
            onPress={() => setSteps("prev")}
          >
            Zurück
          </StandardButton>
          <Button
            fullWidth
            endContent={isPending ? null : <ArrowRightIcon />}
            isLoading={isPending}
            type="submit"
          >
            Weiter
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PhoneConfigForm;
