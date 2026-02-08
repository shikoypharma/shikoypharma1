import OperationCard from "./OperationCard";
import { OPERATIONS_DATA } from "@/data/infrastructure/operations.data";

export default function OperationsGrid() {
  return (
    <section className="py-4 pb-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OPERATIONS_DATA.operations.map((operation) => (
            <OperationCard
              key={operation.id}
              operation={operation}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
