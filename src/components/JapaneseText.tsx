
interface JapaneseTextProps {
  className?: string;
}

const JapaneseText = ({ className = "" }: JapaneseTextProps) => {
  return (
    <div className={`text-xl sm:text-2xl text-[#ff0033] font-bold ${className}`}>
      <div>システム侵入</div>
      <div>サイバー攻撃</div>
      <div>デジタル</div>
    </div>
  );
};

export default JapaneseText;
