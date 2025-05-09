
import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <div className={`bg-black/80 border border-[#33c3f0]/50 p-6 rounded-md w-full ${className}`}>
      {title && <h2 className="text-[#ff0033] text-xl mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
