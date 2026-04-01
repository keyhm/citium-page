"use client";
import { Dictionary } from "@/types/types";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function QuickFilters({ dict }: { dict: Dictionary }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // cycle through three values: sale, rent, both (sale_rent)
  const types: Array<"sale" | "rent" | "sale_rent"> = [
    "sale",
    "rent",
    "sale_rent",
  ];
  const currentType =
    (searchParams.get("type") as "sale" | "rent" | "sale_rent") || "sale";
  const toggleType = () => {
      const params = new URLSearchParams(searchParams.toString());
      const idx = types.indexOf(currentType);
      const next = types[(idx + 1) % types.length];

      // always set the requested type; downstream list component will honour it
      params.set("type", next);

      // wipe any price filters that no longer make sense for the selected mode
      if (next === "sale") {
        params.delete("minPriceRent");
        params.delete("maxPriceRent");
      } else if (next === "rent") {
        params.delete("minPriceSale");
        params.delete("maxPriceSale");
      } else if (next === "sale_rent") {
        // going into both mode: clear generic bounds which operate against
        // a single numeric price field (priceNumber) that may not exist for
        // dual‑mode listings. The specialized sale/rent fields can remain.
        params.delete("minPrice");
        params.delete("maxPrice");
      }

      router.push(pathname + "?" + params.toString(), { scroll: false });
    };
  return (
    <div>
      {/* type toggle */}
      <button
        onClick={toggleType}
        className="flex items-center cursor-pointer gap-2 px-3 py-1.5 rounded-full text-primary border border-primary/20 text-sm font-medium transition-colors hover:bg-primary/20"
      >
        <span>
          {currentType === "sale"
            ? dict.properties.quickFilters.forSale
            : currentType === "rent"
              ? dict.properties.quickFilters.forRent ||
                dict.properties.sidebar.rent
              : dict.properties.quickFilters.forSaleRent}
        </span>
        <span className="material-symbols-outlined text-[18px]">swap_vert</span>
      </button>

    </div>
  );
}
