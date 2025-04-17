import { Skeleton } from "./skeleton";

const SkeletonProducts = ({ count = 3 }: { count?: number }) =>
  Array.from({ length: count }, (_, i) => i).map((key) => (
    <div key={key} className="flex flex-col space-y-3">
      <Skeleton className="h-52 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-56" />
      </div>
    </div>
  ));

export { SkeletonProducts };
