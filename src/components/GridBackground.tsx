
const GridBackground = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-30">
      <div className="grid grid-cols-6 h-full">
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className="border-[0.5px] border-[#33c3f0]/10"></div>
        ))}
      </div>
    </div>
  );
};

export default GridBackground;
