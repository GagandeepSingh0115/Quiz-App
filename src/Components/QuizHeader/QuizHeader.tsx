import { useEffect, useState } from "react";

export const QuizHeader: React.FC<{ currentQuestion: number }> = ({
  currentQuestion,
}) => {
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="flex">
      <h1 className="w-1/2 text-lg sm:text-xl md:text-3xl font-bold text-left">
        0:{timer}
      </h1>
      <h1 className="w-1/2 text-lg sm:text-xl md:text-3xl font-bold text-right">
        {currentQuestion}/10
      </h1>
    </div>
  );
};
