
interface AnimatedSkeletonProps {
  imageSrc: string;
  alt?: string;
  className?: string;
}

const AnimatedSkeleton = ({ 
  imageSrc, 
  alt = "Animation", 
  className = "" 
}: AnimatedSkeletonProps) => {
  return (
    <div className={`absolute right-10 bottom-10 w-64 h-64 z-0 animate-pulse opacity-60 ${className}`}>
      <img 
        src={imageSrc} 
        alt={alt} 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default AnimatedSkeleton;
