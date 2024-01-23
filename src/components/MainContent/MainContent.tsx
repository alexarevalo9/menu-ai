import React, { useEffect } from "react";
import FormProvider from "../RHF/FormProvider";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import TextArea from "../RHF/TextArea/TextArea";
import { useCompletion } from "ai/react";
import MenuCard from "../MenuCard/MenuCard";
import { useMenuStore } from "@/store/menuStore";
import { useRouter } from "next/router";
import { PATH_WEBAPP } from "@/routes/paths";
import withIsClient from "@/hocs/renderInClient";

type FormProps = {
  prompt: string;
};

//TODO: Premium feature save menu in db with prisma (move Menu type to prisma)
//TODO: Create function in zustand to append chatmenu when already exist a conversation
//TODO: Save image (from the backend) inhttps://cloudinary.com/pricing
//TODO: Create a select function to select the type of menu (breakfast, lunch, dinner, etc)
const MainContent = () => {
  const { completion, complete, isLoading } = useCompletion();
  const { addNewChatMenu, menuData, setMenuData } = useMenuStore();
  const router = useRouter();
  const chatId = router.query?.index?.[1] || "";

  const methods = useForm<FormProps>({
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = (data: FormProps) => {
    void complete(data.prompt);
  };

  useEffect(() => {
    if (completion) {
      addNewChatMenu(completion);
    }
  }, [completion]);

  useEffect(() => {
    if (menuData.uuid) {
      void router.replace(`${PATH_WEBAPP.menus}/${menuData.uuid}`);
      setMenuData({ ...menuData, uuid: "", menus: [] });
    }
  }, [menuData]);

  const getMenuFromChat = (chatId: string) => {
    if (!chatId) return;
    return menuData.chatsMenu.find((chat) => chat.id === chatId);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500">
            <label htmlFor="prompt" className="sr-only">
              Menu
            </label>
            <TextArea
              rows={3}
              name="prompt"
              id="prompt"
              intent="menu"
              placeholder="Enter here the ingredients you have at home"
              fullWidth
            />
            <div aria-hidden="true">
              <div className="py-2">
                <div className="h-4" />
              </div>
              <div className="h-px" />
              <div className="py-2">
                <div className="py-px">
                  <div className="h-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-px bottom-0">
            <div className="flex items-center border-t border-gray-200 px-2 py-2">
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                Generate Menu
              </Button>
            </div>
          </div>
        </div>
      </FormProvider>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mt-7 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {getMenuFromChat(chatId)?.menu.map((menu) => (
              <MenuCard key={menu.slug} {...menu} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default withIsClient(MainContent);
