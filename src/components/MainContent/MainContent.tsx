import React, { useEffect } from "react";
import FormProvider from "../RHF/FormProvider";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import TextArea from "../RHF/TextArea/TextArea";
import { useCompletion } from "ai/react";
import MenuCard from "../MenuCard/MenuCard";
import {
  getFromLocalStorage,
  localStorageAvailable,
  saveInLocalStorage,
} from "@/utils/localStorage";
import { type IMenu } from "@/@types/common";

type FormProps = {
  prompt: string;
};

//TODO: Premium feature save menu in db with prisma (move Menu type to prisma)
export default function MainContent() {
  const [recipes, setRecipes] = React.useState<IMenu[]>([]);
  const storageAvailable = localStorageAvailable();
  const { completion, complete, isLoading } = useCompletion();
  const methods = useForm<FormProps>({
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = (data: FormProps) => {
    void complete(data.prompt);
  };

  useEffect(() => {
    // useCompletion updates `completion` while the response is streaming.
    // Only parse after the final chunk has arrived.
    if (!completion || isLoading) return;

    let recipe: IMenu;
    try {
      recipe = JSON.parse(completion) as IMenu;
    } catch {
      // Ignore incomplete streamed JSON; the next update may contain the rest.
      return;
    }

    setRecipes((previousRecipes) => {
      const newRecipes = [...previousRecipes, recipe];

      if (storageAvailable) {
        // Generated GPT images are large base64 strings and do not belong in
        // localStorage. Keep the image in memory, but persist recipe metadata.
        const recipesForStorage = newRecipes.map((storedRecipe) => ({
          ...storedRecipe,
          image: storedRecipe.image.startsWith("data:") ? "" : storedRecipe.image,
        }));
        saveInLocalStorage("recipes", JSON.stringify(recipesForStorage));
      }

      return newRecipes;
    });
  }, [completion, isLoading, storageAvailable]);

  useEffect(() => {
    if (storageAvailable) {
      const recipes = getFromLocalStorage("recipes");
      if (recipes) {
        setRecipes(JSON.parse(recipes) as IMenu[]);
      }
    }
  }, []);

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
            {recipes.map((recipe) => (
              <MenuCard key={recipe.slug} {...recipe} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
