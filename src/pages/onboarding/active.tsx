import OnboardingLayout from "@/layouts/onboarding/OnboardingLayout";
import { useForm } from "react-hook-form";
import React from "react";
import FormProvider from "@/components/RHF/FormProvider";
import RadioGroupComponent from "@/components/RHF/RadioGroup/RadioGroup";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useRouter } from "next/router";
import { PATH_ONBOARDING } from "@/routes/paths";
import useLocales from "@/locales/useLocales";

type FormActiveProps = {
  active: string;
};

export default function ActivePage() {
  const { onboardingData, setOnboardingData } = useOnboardingStore();
  const { translate } = useLocales();
  const router = useRouter();
  const methods = useForm<FormActiveProps>({
    defaultValues: {
      active: onboardingData.active,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: FormActiveProps) => {
    setOnboardingData({ ...onboardingData, active: data.active });
    void router.push(PATH_ONBOARDING.profile);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <OnboardingLayout>
        <h1 className="my-7 w-full text-center text-2xl font-bold">
          {translate("onboarding.active.title")}
        </h1>
        <RadioGroupComponent
          name="active"
          options={[
            {
              label: translate("onboarding.active.first.title"),
              description: translate("onboarding.active.first.description"),
              value: "not-very-active",
            },
            {
              label: translate("onboarding.active.second.title"),
              description: translate("onboarding.active.second.description"),
              value: "active",
            },
            {
              label: translate("onboarding.active.third.title"),
              description: translate("onboarding.active.third.description"),
              value: "lightly-active",
            },
            {
              label: translate("onboarding.active.fourth.title"),
              description: translate("onboarding.active.fourth.description"),
              value: "very-active",
            },
          ]}
        />
      </OnboardingLayout>
    </FormProvider>
  );
}
