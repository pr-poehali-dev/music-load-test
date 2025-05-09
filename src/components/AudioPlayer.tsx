
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer = ({ audioSrc }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audioRef.current = audio;
    
    // Cleanup on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

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

  return (
    <div className="flex items-center gap-4">
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
  );
};

export default AudioPlayer;
