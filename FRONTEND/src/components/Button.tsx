import { ReactNode } from "react";

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-2 hover:bg-2/90 transition-colors px-2 py-1 rounded-xl text-white font-2 text-sm"
    >
      {children}
    </button>
  );
};

export default Button;
