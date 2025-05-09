
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

const Index = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [requestsCount, setRequestsCount] = useState(10);
  const [isAttacking, setIsAttacking] = useState(false);
  const [completedRequests, setCompletedRequests] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/nope-your-too-late.mp3');
    audio.loop = true;
    audioRef.current = audio;
    
    // Cleanup on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio play failed:", error);
          toast({
            title: "Ошибка воспроизведения",
            description: "Взаимодействуйте со страницей для воспроизведения звука",
            variant: "destructive",
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const startAttack = async () => {
    if (!targetUrl) {
      toast({
        title: "Ошибка",
        description: "Введите URL сайта для нагрузки",
        variant: "destructive",
      });
      return;
    }

    try {
      // Validate URL format
      new URL(targetUrl);
    } catch (e) {
      toast({
        title: "Ошибка",
        description: "Введите корректный URL",
        variant: "destructive",
      });
      return;
    }

    setIsAttacking(true);
    setCompletedRequests(0);
    
    // Simulate requests - in a real app, this would be done differently
    // but for demonstration we'll simulate it
    for (let i = 0; i < requestsCount; i++) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setCompletedRequests(prev => prev + 1);
    }
    
    toast({
      title: "Завершено",
      description: `Отправлено ${requestsCount} запросов на ${targetUrl}`,
    });
    
    setIsAttacking(false);
  };

  const stopAttack = () => {
    setIsAttacking(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="grid grid-cols-6 h-full">
          {Array.from({ length: 30 }).map((_, index) => (
            <div key={index} className="border-[0.5px] border-[#33c3f0]/10"></div>
          ))}
        </div>
      </div>

      {/* Dancing skeleton animation (would be replaced with actual image in implementation) */}
      <div className="absolute right-10 bottom-10 w-64 h-64 z-0 animate-pulse opacity-60">
        <img 
          src="/skeleton-dance.gif" 
          alt="Dancing Skeleton" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Japanese text */}
      <div className="absolute top-4 right-4 text-xl sm:text-2xl text-[#ff0033] font-bold z-10">
        <div>システム侵入</div>
        <div>サイバー攻撃</div>
        <div>デジタル</div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-md z-10 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#ff0033] mb-8 animate-pulse">
          サイト ローダー
        </h1>
        
        <div className="space-y-6 w-full">
          <div className="bg-black/80 border border-[#33c3f0]/50 p-6 rounded-md w-full">
            <h2 className="text-[#ff0033] text-xl mb-4">nope your too late i died</h2>
            
            <div className="flex items-center gap-4 mb-4">
              <Button 
                onClick={togglePlay}
                variant="outline" 
                size="icon"
                className="border-[#33c3f0] text-[#33c3f0] hover:bg-[#33c3f0]/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <Button 
                onClick={toggleMute}
                variant="outline" 
                size="icon"
                className="border-[#33c3f0] text-[#33c3f0] hover:bg-[#33c3f0]/20"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <div className="flex-1">
                <Slider
                  value={[volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) => setVolume(value)}
                  className="[&>.absolute]:bg-[#33c3f0]"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-black/80 border border-[#33c3f0]/50 p-6 rounded-md w-full">
            <div className="space-y-4">
              <div>
                <label htmlFor="url" className="block text-[#ff0033] mb-2">URL сайта</label>
                <Input
                  id="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="bg-black text-white border-[#33c3f0]/50 focus-visible:ring-[#33c3f0]"
                  disabled={isAttacking}
                />
              </div>
              
              <div>
                <label htmlFor="requests" className="block text-[#ff0033] mb-2">
                  Количество запросов: {requestsCount}
                </label>
                <Slider
                  id="requests"
                  value={[requestsCount]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={([value]) => setRequestsCount(value)}
                  disabled={isAttacking}
                  className="[&>.absolute]:bg-[#33c3f0]"
                />
              </div>
              
              {isAttacking ? (
                <div className="space-y-4">
                  <div className="w-full bg-gray-900 rounded-full h-2.5">
                    <div 
                      className="bg-[#ff0033] h-2.5 rounded-full animate-pulse" 
                      style={{ width: `${(completedRequests / requestsCount) * 100}%` }}
                    ></div>
                  </div>
                  
                  <Button
                    variant="destructive"
                    onClick={stopAttack}
                    className="w-full bg-[#ff0033] hover:bg-[#ff0033]/80"
                  >
                    Остановить ({completedRequests}/{requestsCount})
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={startAttack}
                  className="w-full bg-[#ff0033] hover:bg-[#ff0033]/80 text-white"
                >
                  Начать нагрузку
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <footer className="mt-8 text-[#33c3f0]/70 text-xs text-center">
          <p>サイバー攻撃  デジタル世界  システム侵入</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
