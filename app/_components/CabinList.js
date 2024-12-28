import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList({ filter }) {
  noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  const filteredCabins =
    filter === "small"
      ? cabins.filter(
          (cabin) => cabin.maxCapacity >= 2 && cabin.maxCapacity < 4
        )
      : filter === "medium"
      ? cabins.filter(
          (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity < 7
        )
      : filter === "large"
      ? cabins.filter(
          (cabin) => cabin.maxCapacity >= 7 && cabin.maxCapacity <= 10
        )
      : cabins;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
