
/**
 * A reusable Skeleton component for UI loading states.
 * Supports custom width, height, and border radius.
 */
const Skeleton = ({ className = "", width, height, borderRadius = "0.5rem" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 ${className}`}
      style={{
        width: width || "100%",
        height: height || "1rem",
        borderRadius: borderRadius,
      }}
    >
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
    </div>
  );
};

export default Skeleton;
