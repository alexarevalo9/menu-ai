import en from "../locales/langs/en";

module.exports = {
  useTranslation: () => ({
    t: (key: string) => {
      if (!key) {
        return "";
      }

      const keys = key.split(".");
      const translation = keys.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc: any, currKey: string) => acc?.[currKey] ?? "",
        en
      );

      return translation;
    },
  }),
};
