import { type IMenu } from "@/@types/common";

export default function MenuCard(menu: IMenu) {
  const totalIngredients = Object.keys(menu.ingredients).length;

  return (
    <article
      key={menu.slug}
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={menu.image}
        alt={menu.name}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        <div className="mr-8">{`${menu.type} · ${totalIngredients} ingredients · ${menu.duration} min`}</div>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <a href={menu.slug}>
          <span className="absolute inset-0" />
          {menu.name}
        </a>
      </h3>
    </article>
  );
}
