import create from "zustand";

export enum LayoutEnum {
  Default,
  ShowingMenu,
}

type LayoutStore = {
  currentScreen: LayoutEnum;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
  currentScreen: LayoutEnum.Default,
}));
