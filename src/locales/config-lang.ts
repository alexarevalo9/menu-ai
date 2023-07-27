interface ILang {
  label: string;
  value: string;
  icon: string;
}

export const allLangs: ILang[] = [
  {
    label: "English",
    value: "en",
    icon: "",
  },
  {
    label: "Español",
    value: "es",
    icon: "",
  },
];

export const defaultLang = allLangs[0] as ILang;
