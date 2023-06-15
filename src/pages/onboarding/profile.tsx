import OnboardingLayout from "@/layouts/onboarding/OnboardingLayout";
import { useForm } from "react-hook-form";
import FormProvider from "@/components/RHF/FormProvider";
import RadioGroupComponent from "@/components/RHF/RadioGroup/RadioGroup";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useRouter } from "next/router";
import { PATH_ONBOARDING } from "@/routes/paths";
import DateInput from "@/components/RHF/DateInput/DateInput";
import Input from "@/components/RHF/Input/Input";

type FormProfileProps = {
  gender: string;
  birthdate: string;
  country: string;
};

export default function ProfilePage() {
  const { onboardingData, setOnboardingData } = useOnboardingStore();
  const router = useRouter();
  const methods = useForm<FormProfileProps>({
    defaultValues: {
      gender: onboardingData.profile.gender,
      birthdate: onboardingData.profile.birthdate,
      country: onboardingData.profile.country,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: FormProfileProps) => {
    setOnboardingData({
      ...onboardingData,
      profile: {
        birthdate: data.birthdate,
        country: data.country,
        gender: data.gender,
      },
    });
    void router.push(PATH_ONBOARDING.measures);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <OnboardingLayout>
        <div className="mb-7 text-center text-2xl font-bold">I am</div>
        <RadioGroupComponent
          name="gender"
          alignCenter
          flexRow
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
          ]}
        />
        <div>
          <div className="my-7 w-full text-center">
            <label className="text-2xl font-bold" htmlFor="birthdate">
              When were you born?
            </label>
          </div>
          <DateInput id="birthdate" name="birthdate" fullWidth required />
        </div>
        <div>
          <div className="my-7 w-full text-center">
            <label className="text-2xl font-bold" htmlFor="country">
              When are you from?
            </label>
          </div>
          <Input
            fullWidth
            id="country"
            name="country"
            className="px-6 py-4"
            placeholder="Ecuador"
            required
          />
        </div>
      </OnboardingLayout>
    </FormProvider>
  );
}
