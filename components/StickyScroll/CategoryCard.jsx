import { cn } from "@/lib/utils";

const CategoryCard = ({ item, darkMode, refCallback, index }) => (
  <div
    ref={refCallback}
    className={cn(
      "snap-start sm:w-[100%] md:w-[270%] lg:w-[75%] p-4 rounded-xl border text-center font-bold text-lg shadow-md backdrop-blur-sm !mb-0 ml-5 mb-0",
      index !== 0 && "mt-5", // Only add top margin if not first
      darkMode
        ? "bg-neutral-900 text-white border-white/10"
        : "bg-neutral-100 text-black border-black/10",
    )}
  >
    {item.category}
  </div>
);

export default CategoryCard;
