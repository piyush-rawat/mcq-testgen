import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { showErrorToast } from "@/utils/toast";
import { useEffect, useState } from "react";

const QuestionInputField = ({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: (data: any) => void;
}) => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const [answer, setAnswer] = useState("");

  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(true);

  useEffect(() => {
    if (question && option1 && option2 && option3 && option4 && answer) {
      setIsSubmitBtnDisabled(false);
    } else {
      setIsSubmitBtnDisabled(true);
    }
  }, [question, option1, option2, option3, option4, answer]);

  const handleSubmit = () => {
    if (answer === "Choose an option") {
      return showErrorToast("Please choose an option.");
    }

    const data = {
      question: question,
      options: [option1, option2, option3, option4],
      answer: answer,
    };

    onSubmit(data);
  };

  return (
    <div className="flex flex-col gap-4 border p-2 rounded">
      <Input
        title="Question"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <Input
        title="Option 1"
        placeholder="Option 1"
        value={option1}
        onChange={(e) => setOption1(e.target.value)}
      />
      <Input
        title="Option 2"
        placeholder="Option 2"
        value={option2}
        onChange={(e) => setOption2(e.target.value)}
      />
      <Input
        title="Option 3"
        placeholder="Option 3"
        value={option3}
        onChange={(e) => setOption3(e.target.value)}
      />
      <Input
        title="Option 4"
        placeholder="Option 4"
        value={option4}
        onChange={(e) => setOption4(e.target.value)}
      />

      {option1 && option2 && option3 && option4 && (
        <div className="flex flex-col gap-2">
          <h1>Answer</h1>
          <select
            className="border p-2"
            value={answer}
            onChange={(e) => {
              console.log(e.target.value);
              setAnswer(e.target.value);
            }}
          >
            <option selected>Choose an option</option>
            <option value={option1}>{option1}</option>
            <option value={option2}>{option2}</option>
            <option value={option3}>{option3}</option>
            <option value={option4}>{option4}</option>
          </select>
        </div>
      )}

      <div className="flex flex-row gap-4">
        <Button
          className="w-full bg-green-700 hover:bg-green-800"
          size="sm"
          onClick={handleSubmit}
          disabled={isSubmitBtnDisabled}
        >
          Add
        </Button>
        <Button className="w-full" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default QuestionInputField;
