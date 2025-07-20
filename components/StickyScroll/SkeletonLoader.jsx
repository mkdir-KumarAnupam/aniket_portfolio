export const SkeletonLoader = ({ height = "200px", borderRadius = "12px" }) => (
  <div
    className="animate-pulse bg-neutral-300 dark:bg-neutral-700 w-full"
    style={{ height, borderRadius }}
  />
);