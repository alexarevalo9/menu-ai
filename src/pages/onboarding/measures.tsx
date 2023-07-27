import Input from "@/components/RHF/Input/Input";
import FormProvider from "@/components/RHF/FormProvider";
import OnboardingLayout from "@/layouts/onboarding/OnboardingLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useRouter } from "next/router";
import useLocales from "@/locales/useLocales";
import { api } from "@/utils/api";

type FormMeasuresProps = {
  height: string;
  weight: string;
};

export default function MeasuresPage() {
  const { mutate, isLoading } = api.user.createOnBoarding.useMutation({
    onSuccess: () => {
      void router.push("/");
    },
  });
  const { onboardingData, setOnboardingData } = useOnboardingStore();
  const { translate } = useLocales();
  const router = useRouter();
  const methods = useForm<FormMeasuresProps>({
    defaultValues: {
      height: onboardingData.measures.height,
      weight: onboardingData.measures.weight,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormMeasuresProps) => {
    setOnboardingData({
      ...onboardingData,
      measures: {
        height: data.height,
        weight: data.weight,
      },
    });

    mutate({
      active: onboardingData.active,
      birthdate: new Date(onboardingData.profile.birthdate),
      country: onboardingData.profile.country,
      gender: onboardingData.profile.gender,
      goal: onboardingData.goal,
      height: Number(data.height),
      weight: Number(data.weight),
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <OnboardingLayout isLoading={isLoading}>
        <div>
          <div className="my-7 w-full text-center">
            <label className="text-2xl font-bold" htmlFor="height">
              {translate("onboarding.measures.height.title")}
            </label>
          </div>
          <Input
            fullWidth
            id="height"
            name="height"
            className="px-6 py-4"
            placeholder="170 cm"
            type="number"
            required
          />
        </div>
        <div>
          <div className="my-7 w-full text-center">
            <label className="text-2xl font-bold" htmlFor="weight">
              {translate("onboarding.measures.weight.title")}
            </label>
          </div>
          <Input
            fullWidth
            id="weight"
            name="weight"
            type="number"
            placeholder="60 kg"
            className="px-6 py-4"
            required
          />
        </div>
      </OnboardingLayout>
    </FormProvider>
  );
}
