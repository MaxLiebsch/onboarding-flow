import {
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { Checkbox, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Controller, useForm } from "react-hook-form";

import Terms from "../Terms";
import Button from "../ui/Button";
import Input from "../ui/Input";

import createAccountAction from "@/actions/createAccountAction";
import {
  onboardingDataAtom,
  updateOnboardingDataAtom,
} from "@/atoms/formDataAtom";
import { stepNavigationAtom } from "@/atoms/stepNavigationAtom";
import { accountDetails, AccountDetails } from "@/types/formData";

const CreateAccountForm = ({ selectedTab }: { selectedTab: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  const setSteps = useSetAtom(stepNavigationAtom);
  const data = useAtomValue(onboardingDataAtom);
  const setOnboardingData = useSetAtom(updateOnboardingDataAtom);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [state, formAction, isPending] = useFormState(createAccountAction, {
    message: "",
    success: false,
    errors: {},
  });

  const { control, formState } = useForm<AccountDetails>({
    errors: state.errors,
    mode: "all",
    reValidateMode: "onBlur",
    values: data.accountDetails,
    resolver: zodResolver(accountDetails),
  });
  const { errors } = formState;

  const { email, password } = errors;

  useEffect(() => {
    if (state.success) {
      setOnboardingData({
        step: "accountDetails",
        data: {
          accountDetails: {
            email: control._formValues.email,
            password: "",
            terms: true,
          },
        },
      });
      setSteps("next");
    }
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            {...field}
            isRequired
            errorMessage={email?.message}
            isInvalid={!!email?.message}
            label="E-Mail"
            type="email"
          />
        )}
      />
      {selectedTab === "password" ? (
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              isRequired
              endContent={
                <button
                  aria-label="Passwort anzeigen"
                  className="focus:outline-none h-6 w-6"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? <EyeIcon /> : <EyeSlashIcon />}
                </button>
              }
              errorMessage={password?.message}
              isInvalid={!!password?.message}
              label="Passwort"
              name="password"
              type={isVisible ? "text" : "password"}
            />
          )}
        />
      ) : (
        <input hidden defaultValue="00000000" name="password" />
      )}
      {selectedTab === "magic-link" ? (
        <p className="text-sm text-slate-500 mb-4">
          Wir senden einen sicheren Login-Link an deine E-Mail. Kein Passwort
          benötigt!
        </p>
      ) : null}
      <Controller
        control={control}
        name="terms"
        render={({ field }) => (
          //@ts-expect-error heroui and rhf value types are not compatible
          <Checkbox
            {...field}
            checked={field.value}
            className="z-10"
            color="danger"
            icon={<HeartIcon />}
            isInvalid={!!errors?.terms?.message}
            onValueChange={(checked) => field.onChange(checked)}
          >
            <Terms />
          </Checkbox>
        )}
      />
      <Button
        fullWidth
        className="mt-4"
        endContent={isPending ? null : <ArrowRightIcon />}
        isLoading={isPending}
        type="submit"
      >
        {selectedTab === "password" ? "Account erstellen" : "Magic Link senden"}
      </Button>
      <div className="flex justify-center w-full mt-4">
        <p className="text-slate-500">
          Du hast bereits einen Account?{" "}
          <Link href="/login">Hier gehts zum Login</Link>
        </p>
      </div>
    </form>
  );
};

export default CreateAccountForm;
