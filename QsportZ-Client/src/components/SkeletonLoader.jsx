import React from "react";

function SkeletonLoader({
  rowCount = 3,
  colCount = 1,
  containerClassName = "space-y-4",
  itemClassName = "h-6 bg-gray-200 dark:bg-gray-700 rounded",
}) {
  const rows = Array.from({ length: rowCount });

  return (
    <div className={`${containerClassName}`}>
      {" "}
      {/* Vertical spacing between rows */}
      {rows.map((_, rowIdx) => (
        <div
          key={rowIdx}
          className={`flex space-x-4 animate-pulse ${
            colCount > 1 ? "flex-wrap" : ""
          }`}>
          {Array.from({ length: colCount }).map((__, colIdx) => (
            <div key={colIdx} className={`${itemClassName} flex-1`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;
