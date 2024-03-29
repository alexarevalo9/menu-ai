import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IOnboarding {
  goal: string;
  active: string;
  profile: {
    gender: string;
    birthdate: string;
    country: string;
  };
  measures: {
    weight: string;
    height: string;
  };
}

interface IOnboardingState {
  onboardingData: IOnboarding;
  setOnboardingData: (onboarding: IOnboarding) => void;
}

const initialState: IOnboarding = {
  goal: "",
  active: "",
  profile: {
    birthdate: "",
    country: "",
    gender: "",
  },
  measures: {
    height: "",
    weight: "",
  },
};

export const useOnboardingStore = create(
  persist<IOnboardingState>(
    (set) => ({
      onboardingData: initialState,
      setOnboardingData: (onboarding) => {
        set((state) => ({
          ...state,
          onboardingData: onboarding,
        }));
      },
    }),
    {
      name: "onboardingState",
    }
  )
);
