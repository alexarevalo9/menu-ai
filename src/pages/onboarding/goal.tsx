import OnboardingLayout from "@/layouts/onboarding/OnboardingLayout";
import { useForm } from "react-hook-form";
import React from "react";
import FormProvider from "@/components/RHF/FormProvider";
import RadioGroupComponent from "@/components/RHF/RadioGroup/RadioGroup";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useRouter } from "next/router";
import { PATH_ONBOARDING } from "@/routes/paths";

type FormGoalProps = {
  goal: string;
};

// TODO: Add i18next
export default function GoalPage() {
  const { onboardingData, setOnboardingData } = useOnboardingStore();
  const router = useRouter();
  const methods = useForm<FormGoalProps>({
    defaultValues: {
      goal: onboardingData.goal,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: FormGoalProps) => {
    setOnboardingData({ ...onboardingData, goal: data.goal });
    void router.push(PATH_ONBOARDING.active);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <OnboardingLayout>
        <RadioGroupComponent
          name="goal"
          alignCenter
          options={[
            {
              label: "Lose Weight",
              value: "lose",
            },
            {
              label: "Maintain Weight",
              value: "maintain",
            },
            {
              label: "Gain Weight",
              value: "gain",
            },
          ]}
        />
      </OnboardingLayout>
    </FormProvider>
  );
}
