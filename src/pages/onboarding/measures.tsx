import Input from "@/components/RHF/Input/Input";
import FormProvider from "@/components/RHF/FormProvider";
import OnboardingLayout from "@/layouts/onboarding/OnboardingLayout";
import React from "react";
import { useForm } from "react-hook-form";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useRouter } from "next/router";
import useLocales from "@/locales/useLocales";

type FormMeasuresProps = {
  height: string;
  weight: string;
};

export default function MeasuresPage() {
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
    void router.push("/");
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <OnboardingLayout>
        <div>
          <div className="my-7 w-full text-center">
            <label className="text-2xl font-bold" htmlFor="height">
              {translate("onboarding.measures.tall.title")}
            </label>
          </div>
          <Input
            fullWidth
            id="height"
            name="height"
            className="px-6 py-4"
            placeholder="170 cm"
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
            placeholder="60 kg"
            className="px-6 py-4"
            required
          />
        </div>
      </OnboardingLayout>
    </FormProvider>
  );
}
