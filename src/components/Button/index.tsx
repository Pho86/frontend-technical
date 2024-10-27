import React from "react";

export default function Button({
  children,
  onClick = () => {},
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="p-[3px] font-semibold rounded-xl bg-gradient-to-b from-[#F472B7] to-primary-dark hover:from-[#EC4899] hover:to-[#BE185D] group"
      onClick={onClick}
    >
      <span className="flex w-full bg-primary group-hover:bg-[#DB2777] text-white rounded-lg py-2 px-5">
        {children}
      </span>
    </button>
  );
}
