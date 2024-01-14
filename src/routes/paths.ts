function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_ONBOARDING = "/onboarding";
const ROOTS_WEBAPP = "/webapp";

export const PATH_AUTH = {
  signIn: "/sign-in",
  signUp: "/sign-up",
};

export const PATH_ONBOARDING = {
  root: ROOTS_ONBOARDING,
  goal: path(ROOTS_ONBOARDING, "/goal"),
  active: path(ROOTS_ONBOARDING, "/active"),
  profile: path(ROOTS_ONBOARDING, "/profile"),
  measures: path(ROOTS_ONBOARDING, "/measures"),
};

export const PATH_WEBAPP = {
  root: ROOTS_WEBAPP,
  menus: path(ROOTS_WEBAPP, "/m"),
};
