import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { Controller, useForm } from "react-hook-form";

import Button from "../ui/Button";
import Input from "../ui/Input";

import saveBasicInfoAction from "@/actions/saveBasicInfoAction";
import {
  onboardingDataAtom,
  updateOnboardingDataAtom,
} from "@/atoms/formDataAtom";
import { stepNavigationAtom } from "@/atoms/stepNavigationAtom";
import { BasicInfo, basicInfo } from "@/types/formData";

const integrationsPartner = [
  {
    key: "no-integration",
    label: "Kein CRM oder Ticketsystem",
  },
  {
    key: "casavi",
    label: "casavi",
  },
  {
    key: "facilioo",
    label: "facilioo",
  },
  {
    key: "idwell",
    label: "idwell",
  },
  {
    key: "fluks",
    label: "fluks",
  },
  {
    key: "aareon-connect",
    label: "Aareon Connect",
  },
  {
    key: "wowi-port",
    label: "Wowi Port",
  },
  {
    key: "etg24",
    label: "etg24",
  },
  {
    key: "humbee",
    label: "humbee",
  },
  {
    key: "ivm-pro",
    label: "IVM Pro",
  },
  {
    key: "immomio",
    label: "Immomio",
  },
  {
    key: "other-system",
    label: "Anderes System",
  },
];

const BasicInfoForm = () => {
  const setSteps = useSetAtom(stepNavigationAtom);
  const data = useAtomValue(onboardingDataAtom);
  const setOnboardingData = useSetAtom(updateOnboardingDataAtom);

  const [state, formAction, isPending] = useFormState(saveBasicInfoAction, {
    message: "",
    success: false,
    errors: {},
  });

  const { control, formState, reset, getValues } = useForm<BasicInfo>({
    errors: state.errors,
    mode: "onBlur",
    values: data.basicInfo,
    resolver: zodResolver(basicInfo),
  });

  useEffect(() => {
    if (state.success) {
      const formValues = getValues();

      setOnboardingData({
        step: "basicInfo",
        data: {
          basicInfo: {
            ...formValues,
          },
        },
      });
      setSteps("next");
    }
  }, [state.success]);

  useEffect(() => {
    if (!state.success && data.basicInfo.name !== "") {
      reset(data.basicInfo);
    }
  }, [data.basicInfo]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            {...field}
            isRequired
            errorMessage={formState.errors.name?.message}
            isInvalid={!!formState.errors.name?.message}
            label="Name"
            type="text"
          />
        )}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <Input
            {...field}
            isRequired
            errorMessage={formState.errors.phoneNumber?.message}
            isInvalid={!!formState.errors.phoneNumber?.message}
            label="Telefonnummer"
            type="tel"
          />
        )}
      />
      <Controller
        control={control}
        name="noOfUnits"
        render={({ field }) => (
          <Input
            {...field}
            isRequired
            errorMessage={formState.errors.noOfUnits?.message}
            isInvalid={!!formState.errors.noOfUnits?.message}
            label="Anzahl der Einheiten"
            min={1}
            type="number"
          />
        )}
      />
      <Controller
        control={control}
        name="integrationspartner"
        render={({ field }) => (
          <Select
            {...field}
            isRequired
            errorMessage={formState.errors.integrationspartner?.message}
            isInvalid={!!formState.errors.integrationspartner?.message}
            items={integrationsPartner}
            label="Integrationspartner"
            placeholder="Integrationspartner auswählen"
            radius="none"
            selectedKeys={field.value ? [field.value] : []}
            onChange={(e) => {
              if (e.target.value !== "") {
                field.onChange(e.target.value);
              }
            }}
          >
            {(integrationPartner) => (
              <SelectItem key={integrationPartner.key}>
                {integrationPartner.label}
              </SelectItem>
            )}
          </Select>
        )}
      />
      <Button
        fullWidth
        className="mt-4"
        endContent={isPending ? null : <ArrowRightIcon />}
        isLoading={isPending}
        type="submit"
      >
        Weiter
      </Button>
    </form>
  );
};

export default BasicInfoForm;
