export interface IChatMenu {
  id: string;
  title: string;
  menu: IMenu[];
  createdAt: string;
  updatedAt: string;
}

export interface IMenu {
  slug: string;
  name: string;
  type: string;
  duration: number;
  image: string;
  description: string;
  ingredients: Record<string, string>;
  steps: Step[];
}

interface Step {
  name: string;
  description: string;
  timer?: number;
}
