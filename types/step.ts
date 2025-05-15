export type Step = {
  id: number;
  name: string;
  href: string;
  status: string;
};

export type Steps = {
  [key: number]: Step;
};
