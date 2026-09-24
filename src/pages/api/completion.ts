import { Configuration, OpenAIApi, type ResponseTypes } from "openai-edge";
import { type NextRequest } from "next/server";
import { type IMenu } from "@/@types/common";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAIConfig);

export const config = {
  runtime: "edge",
};

// TODO: Create Spanish version
const recipeSample: IMenu = {
  slug: "fish-tacos",
  name: "Fish Tacos with Pickled Onion",
  type: "Main Meal",
  duration: 60,
  image: "images/original/fish-tacos-with-pickled-onion.png",
  description:
    "Delicious fish tacos made with crispy breaded fish, fresh cilantro, and tangy pickled onions wrapped in a soft flour tortilla.",
  ingredients: {
    "Red onion": "1",
    Water: "1 cup",
    Vinegar: "1 cup",
    Sugar: "1 tablespoon",
    Salt: "1 teaspoon",
    "White fish fillets": "1 pound",
    Flour: "1 cup",
    Egg: "1",
    Breadcrumbs: "1 cup",
    "Vegetable oil": "for frying",
    "Flour tortillas": "8",
    Cilantro: "1 bunch",
    Lime: "1",
  },
  steps: [
    {
      name: "Pickle Onions",
      description: "Thinly slice the red onion and set aside.",
    },
    {
      name: "Prepare Pickling Liquid",
      description:
        "In a small saucepan, combine the water, vinegar, sugar, and salt. Bring to a simmer, then remove from heat.",
      timer: 5,
    },
    {
      name: "Pickle Onions",
      description:
        "Add the sliced onions to the pickling liquid and let sit for at least 30 minutes.",
      timer: 30,
    },
    {
      name: "Prepare Fish",
      description: "Cut the fish fillets into 2-inch wide strips.",
    },
    {
      name: "Bread Fish",
      description:
        "Set up a breading station with three shallow dishes: one with flour, one with a beaten egg, and one with breadcrumbs. Coat each fish strip in flour, dip in egg, and then coat with breadcrumbs.",
    },
    {
      name: "Fry Fish",
      description:
        "Heat vegetable oil in a deep skillet over medium-high heat. Fry the breaded fish strips until golden brown and cooked through, about 3-4 minutes per side. Drain on paper towels.",
    },
    {
      name: "Assemble Tacos",
      description:
        "Place a piece of fried fish on a flour tortilla, top with pickled onions, chopped cilantro, and a squeeze of lime. Fold and serve.",
    },
  ],
};

export default async function handler(req: NextRequest) {
  const { prompt } = (await req.json()) as { prompt: string };

  const completePrompt = `
  Create a recipe with the list of ingredients: ${prompt}
  You can include typical ingredients found in a kitchen, such as salt, pepper, condiments, and water.
  
  If the list of ingredients is empty if you can't find ingredients inside, just answer with
  "false" without any other character.

  If you've found a recipe, send the output in JSON format as the following sample in *** 

  ${JSON.stringify(recipeSample)}

  Return only valid JSON. Do not wrap it in Markdown, code fences, or asterisks.
  `;

  if (req.method === "POST") {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      stream: false,
      messages: [
        {
          role: "system",
          content: "You are a cooking expert that creates recipes.",
        },
        { role: "user", content: completePrompt },
      ],
    });

    const data: ResponseTypes["createChatCompletion"] = await completion.json();
    const recipeString = data.choices[0]?.message?.content;

    if (!recipeString) {
      return new Response("No recipe generated", {
        status: 404,
        headers: {
          "content-type": "text/plain",
        },
      });
    }

    console.log(recipeString);

    // Models sometimes wrap JSON in Markdown/code fences or the *** markers
    // from the old example prompt. Extract only the JSON object before parsing.
    const jsonStart = recipeString.indexOf("{");
    const jsonEnd = recipeString.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd <= jsonStart) {
      return new Response("The model did not return a valid recipe JSON object", {
        status: 502,
        headers: { "content-type": "text/plain" },
      });
    }

    let recipe: IMenu;
    try {
      recipe = JSON.parse(recipeString.slice(jsonStart, jsonEnd + 1)) as IMenu;
    } catch (error) {
      console.error("Invalid recipe JSON returned by the model", error, recipeString);
      return new Response("The model returned invalid recipe JSON", {
        status: 502,
        headers: { "content-type": "text/plain" },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const imageResponse = await openai.createImage({
      model: "gpt-image-1",
      prompt: `A high-quality photograph of the meal ${recipe.name}: ${recipe.description}`,
      n: 1,
      size: "1024x1024",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const imageData: ResponseTypes["createImage"] = await imageResponse.json();
    console.log(imageData);
    if (!imageData.data?.[0]) {
      return new Response("Image generation failed", {
        status: 502,
        headers: { "content-type": "text/plain" },
      });
    }

    // GPT image models return base64 data instead of a hosted URL.
    const imageUrl =
      imageData.data[0].url ??
      (imageData.data[0].b64_json
        ? `data:image/png;base64,${imageData.data[0].b64_json}`
        : undefined);

    if (!imageUrl) {
      return new Response("Image generation returned no image data", {
        status: 502,
        headers: { "content-type": "text/plain" },
      });
    }

    const recipeWithImage = {
      ...recipe,
      image: imageUrl,
    };

    return new Response(JSON.stringify(recipeWithImage), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
