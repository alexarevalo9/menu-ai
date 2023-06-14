import OnboardingLayout from "@/layouts/onboarding/OnboardingLayout";
import { useForm } from "react-hook-form";
import React from "react";
import FormProvider from "@/components/RHF/FormProvider";
import RadioGroupComponent from "@/components/RHF/RadioGroup/RadioGroup";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useRouter } from "next/router";
import { PATH_ONBOARDING } from "@/routes/paths";

type FormActiveProps = {
  active: string;
};

export default function ActivePage() {
  const { onboardingData, setOnboardingData } = useOnboardingStore();
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
        <RadioGroupComponent
          name="active"
          options={[
            {
              label: "Not very Active",
              description:
                "Spend most of the day sitting (e.g. bank teller, desk job)",
              value: "not-very-active",
            },
            {
              label: "Active",
              description:
                "Spend a good part of the day doing some physical activity (e.g food server postal carrier)",
              value: "active",
            },
            {
              label: "Lightly Active",
              description:
                "Spend a good part of the day on your feet (e.g. teacher, salesperson)",
              value: "lightly-active",
            },
            {
              label: "Very Active",
              description:
                "Spend most of the day doing heavy physical activity (e.g bike messenger, carpenter)",
              value: "very-active",
            },
          ]}
        />
      </OnboardingLayout>
    </FormProvider>
  );
}
