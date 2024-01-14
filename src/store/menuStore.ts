import { type IChatMenu, type IMenu } from "@/@types/common";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as uuidGenerator from "uuid";

interface IMenuStore {
  chatsMenu: IChatMenu[];
  menus: IMenu[];
  uuid: string;
}

interface IMenuState {
  menuData: IMenuStore;
  addNewChatMenu: (completion: string) => void;
  setMenuData: (menuData: IMenuStore) => void;
}

const initialState: IMenuStore = {
  chatsMenu: [],
  menus: [],
  uuid: "",
};

export const useMenuStore = create(
  persist<IMenuState>(
    (set) => ({
      menuData: initialState,
      addNewChatMenu: (completion: string) => {
        set((state) => {
          if (!completion) return state;

          const newRecipes = [
            ...state.menuData.menus,
            JSON.parse(completion),
          ] as IMenu[];

          const id = uuidGenerator.v4();

          const chatMenu = {
            id,
            title: "Menu",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            menu: newRecipes,
          };

          const newChats = [...state.menuData.chatsMenu, chatMenu];

          return {
            ...state,
            menuData: {
              menus: newRecipes,
              chatsMenu: newChats,
              uuid: id,
            },
          };
        });
      },
      setMenuData: (menuData: IMenuStore) => {
        set((state) => ({
          ...state,
          menuData,
        }));
      },
    }),
    {
      name: "menuState",
    }
  )
);
