import Button from "@/components/Button/Button";
import Steps from "@/components/Steps/Steps";
import { PATH_ONBOARDING } from "@/routes/paths";
import { useRouter } from "next/router";
import React from "react";

type OnboardingLayoutProps = {
  children: React.ReactNode;
};

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const router = useRouter();

  const getStepStatus = (href: string) => {
    if (false) {
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
      <Steps
        steps={[
          {
            id: "01",
            name: "Goal",
            href: PATH_ONBOARDING.goal,
            status: getStepStatus(PATH_ONBOARDING.goal),
          },
          {
            id: "02",
            name: "Active",
            href: PATH_ONBOARDING.active,
            status: getStepStatus(PATH_ONBOARDING.active),
          },
          {
            id: "03",
            name: "Profile",
            href: PATH_ONBOARDING.profile,
            status: getStepStatus(PATH_ONBOARDING.profile),
          },
          {
            id: "04",
            name: "Measures",
            href: PATH_ONBOARDING.measures,
            status: getStepStatus(PATH_ONBOARDING.measures),
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
            onClick={() => router.push(getBackHref())}
          >
            Back
          </Button>
        )}
        <Button type="submit" fullWidth>
          Next
        </Button>
      </div>
    </div>
  );
}
