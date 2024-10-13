import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type QuestionItem = {
  index: number;
  question: string;
  options: string[];
  onChange: (answer: string) => void;
};

const QuestionItem = ({ index, question, options, onChange }: QuestionItem) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    selectedOption && onChange(selectedOption);
  }, [selectedOption]);

  return (
    <div>
      <p className="text-xl mb-2">
        Q{index + 1}. {question}
      </p>
      <div className="space-y-2">
        {options.map((op, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              onClick={() => setSelectedOption(op)}
              className="size-[20px] rounded-full border-2 border-green-700 cursor-pointer flex justify-center items-center"
            >
              <div
                className={twMerge(
                  "size-[12px] rounded-full",
                  selectedOption === op && "bg-green-700"
                )}
              />
            </div>
            <p>{op}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionItem;
