
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

const RequestTool = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [requestsCount, setRequestsCount] = useState(10);
  const [isAttacking, setIsAttacking] = useState(false);
  const [completedRequests, setCompletedRequests] = useState(0);

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
  );
};

export default RequestTool;
