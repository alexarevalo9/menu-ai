import OnboardingLayout from "@/layouts/onboarding/OnboardingLayout";
import { useForm } from "react-hook-form";
import React from "react";
import FormProvider from "@/components/RHF/FormProvider";
import RadioGroupComponent from "@/components/RHF/RadioGroup/RadioGroup";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useRouter } from "next/router";
import { PATH_ONBOARDING } from "@/routes/paths";
import useLocales from "@/locales/useLocales";

type FormGoalProps = {
  goal: string;
};

// TODO: Add testing
export default function GoalPage() {
  const { onboardingData, setOnboardingData } = useOnboardingStore();
  const router = useRouter();
  const { translate } = useLocales();
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
        <h1 className="my-7 w-full text-center text-2xl font-bold">
          {translate("onboarding.goal.title")}
        </h1>
        <RadioGroupComponent
          name="goal"
          alignCenter
          options={[
            {
              label: translate("onboarding.goal.loseWeight"),
              value: "lose",
            },
            {
              label: translate("onboarding.goal.maintainWeight"),
              value: "maintain",
            },
            {
              label: translate("onboarding.goal.gainWeight"),
              value: "gain",
            },
          ]}
        />
      </OnboardingLayout>
    </FormProvider>
  );
}
