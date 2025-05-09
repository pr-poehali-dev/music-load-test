
import Card from '@/components/Card';
import AudioPlayer from '@/components/AudioPlayer';
import RequestTool from '@/components/RequestTool';
import JapaneseText from '@/components/JapaneseText';
import GridBackground from '@/components/GridBackground';
import AnimatedSkeleton from '@/components/AnimatedSkeleton';

const Index = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
      {/* Background grid */}
      <GridBackground />

      {/* Dancing skeleton animation */}
      <AnimatedSkeleton 
        imageSrc="/skeleton-dance.gif" 
        alt="Dancing Skeleton" 
      />

      {/* Japanese text */}
      <JapaneseText className="absolute top-4 right-4 z-10" />

      <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-md z-10 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ff0033] mb-8 animate-pulse">
          サイト ローダー
        </h1>
        
        <div className="space-y-6 w-full">
          <Card title="nope your too late i died">
            <AudioPlayer audioSrc="/nope-your-too-late.mp3" />
          </Card>
          
          <Card>
            <RequestTool />
          </Card>
        </div>
        
        <footer className="mt-8 text-[#33c3f0]/70 text-xs text-center">
          <p>サイバー攻撃  デジタル世界  システム侵入</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
