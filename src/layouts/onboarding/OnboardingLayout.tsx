import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import Steps from "@/components/Steps/Steps";
import { PATH_ONBOARDING } from "@/routes/paths";
import { useOnboardingStore } from "@/store/onboardingStore";
import { isEmptyObject } from "@/utils/object";
import { useRouter } from "next/router";
import React from "react";
import { LanguageIcon } from "@heroicons/react/20/solid";
import useLocales from "@/locales/useLocales";

type OnboardingLayoutProps = {
  children: React.ReactNode;
  isLoading?: boolean;
};

export default function OnboardingLayout({
  children,
  isLoading,
}: OnboardingLayoutProps) {
  const router = useRouter();
  const { onboardingData } = useOnboardingStore();
  const { onChangeLang, currentLang, allLangs, translate } = useLocales();
  const langItems = allLangs.map((lang) => ({
    id: lang.value,
    name: lang.label,
    value: lang.value,
  }));

  const getStepStatus = (href: string, isComplete: boolean) => {
    if (isComplete) {
      return "complete";
    }
    if (href === router.pathname) {
      return "current";
    }
    return "upcoming";
  };

  const getBackHref = () => {
    console.log(router.pathname);
    if (router.pathname === PATH_ONBOARDING.active) {
      return PATH_ONBOARDING.goal;
    }
    if (router.pathname === PATH_ONBOARDING.profile) {
      return PATH_ONBOARDING.active;
    }
    if (router.pathname === PATH_ONBOARDING.measures) {
      return PATH_ONBOARDING.profile;
    }
    return "";
  };

  return (
    <div className="m-auto max-w-4xl p-4 lg:pt-8">
      <div className="mb-5">
        <Select
          selectedValue={
            langItems.find((item) => item.value === currentLang.value) ||
            langItems[0]
          }
          onChange={(item) => {
            onChangeLang(item.value);
          }}
          items={langItems}
          size="medium"
          mainIcon={<LanguageIcon width={20} height={20} />}
        />
      </div>
      <Steps
        steps={[
          {
            id: "01",
            name: translate("onboarding.steps.goal"),
            href: PATH_ONBOARDING.goal,
            status: getStepStatus(PATH_ONBOARDING.goal, !!onboardingData.goal),
          },
          {
            id: "02",
            name: translate("onboarding.steps.active"),
            href: PATH_ONBOARDING.active,
            status: getStepStatus(
              PATH_ONBOARDING.active,
              !!onboardingData.active
            ),
          },
          {
            id: "03",
            name: translate("onboarding.steps.profile"),
            href: PATH_ONBOARDING.profile,
            status: getStepStatus(
              PATH_ONBOARDING.profile,
              !isEmptyObject(onboardingData.profile)
            ),
          },
          {
            id: "04",
            name: translate("onboarding.steps.measures"),
            href: PATH_ONBOARDING.measures,
            status: getStepStatus(
              PATH_ONBOARDING.measures,
              !isEmptyObject(onboardingData.measures)
            ),
          },
        ]}
      />
      <div className="my-8">{children}</div>
      <div className="flex gap-2">
        {router.pathname !== PATH_ONBOARDING.goal && (
          <Button
            fullWidth
            type="button"
            intent="secondary"
            disabled={isLoading}
            onClick={() => router.push(getBackHref())}
          >
            {translate("onboarding.controls.back")}
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          fullWidth
        >
          {router.pathname === PATH_ONBOARDING.measures
            ? translate("onboarding.controls.finish")
            : translate("onboarding.controls.next")}
        </Button>
      </div>
    </div>
  );
}
