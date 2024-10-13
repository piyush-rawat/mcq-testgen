import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import QuestionInputField from "./QuestionInputField";
import moment from "moment";
import AlertModal from "@/components/AlertModal";
import { Trash2 } from "lucide-react";
import { createTest } from "@/network/testRequests";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const CreateTestPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [showQuestionInputField, setShowQuestionInputField] = useState(false);

  const [showDeleteQuestionModal, setShowDeleteQuestionModal] =
    useState<Question | null>(null);

  const [showDiscardConfirmationModal, setShowDiscardConfirmationModal] =
    useState(false);

  const handleAddQuestion = () => {
    setShowQuestionInputField(true);
  };

  const handleDeleteQuestion = (question: Question) => {
    setQuestions((prev) =>
      prev.filter((q) => q.question !== question.question)
    );
  };

  const handleCreateTest = () => {
    if (!title) {
      return showErrorToast("Title is required");
    }

    if (!startTime) {
      return showErrorToast("Start Time is required.");
    }

    if (!endTime) {
      return showErrorToast("End Time is required.");
    }

    // Check if end time is before start time
    if (
      moment(endTime, "MMMM Do hh:mm:00 a").isBefore(
        moment(startTime, "MMMM Do hh:mm:00 a")
      )
    ) {
      return showErrorToast("End Time cannot be before Start Time");
    }

    // Check if there is atleast 1 question
    if (questions.length === 0) {
      return showErrorToast("Atleast 1 question is required.");
    }

    const data = {
      title: title,
      startTime: startTime,
      endTime: endTime,
      questions: questions,
    };

    console.log(data);

    createTest(data).then(() => {
      showSuccessToast("Test Created Successfully");
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="p-4 mt-10">
      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        <h1 className="text-2xl mb-2">Create a new test</h1>

        <div>
          <p>Title</p>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <p>Start Time</p>
          <Input
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
            placeholder="Start Time"
            // value={startTime}
            onChange={(e) => {
              const date = e.target.value;
              // setStartTime(date);
              setStartTime(
                moment(date).format("MMMM Do hh:mm:00 a").toString()
              );
            }}
          />
        </div>

        <div>
          <p>End Time</p>
          <Input
            type="datetime-local"
            min={new Date().toISOString().slice(0, 16)}
            placeholder="End Time"
            // value={endTime}

            onChange={(e) => {
              const date = e.target.value;
              setEndTime(moment(date).format("MMMM Do hh:mm:00 a").toString());
              // setEndTime(date);
            }}
          />
        </div>

        {questions.map((q, index) => (
          <div className="relative border p-2 rounded-md">
            <Trash2
              size={20}
              className="text-red-500 absolute top-2 right-2"
              onClick={() => setShowDeleteQuestionModal(q)}
            />
            <p>
              Q{index + 1}. {q.question}
            </p>

            <div>
              {q.options.map((op, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox value={op} checked={op === q.answer} />
                  <p>{op}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {showQuestionInputField && (
          <QuestionInputField
            onCancel={() => setShowQuestionInputField(false)}
            onSubmit={(data) => {
              setShowQuestionInputField(false);
              console.log(data);
              setQuestions((prev) => [...prev, data]);
            }}
          />
        )}

        {!showQuestionInputField && (
          <Button onClick={handleAddQuestion}>Add a question</Button>
        )}

        <div className="flex flex-col gap-4 justify-around mt-10">
          <Button onClick={handleCreateTest}>Create Test</Button>
          <Button
            onClick={() => setShowDiscardConfirmationModal(true)}
            variant="destructive"
          >
            Discard
          </Button>
        </div>
      </div>

      <AlertModal
        open={!!showDeleteQuestionModal}
        title=""
        body=""
        onCancel={() => {
          setShowDeleteQuestionModal(null);
        }}
        onConfirm={() => {
          showDeleteQuestionModal &&
            handleDeleteQuestion(showDeleteQuestionModal);
          setShowDeleteQuestionModal(null);
        }}
      />

      <AlertModal
        open={showDiscardConfirmationModal}
        title=""
        body=""
        onCancel={() => {
          setShowDiscardConfirmationModal(false);
        }}
        onConfirm={() => {
          setShowDiscardConfirmationModal(false);
          navigate("/", { replace: true });
        }}
      />
    </div>
  );
};

export default CreateTestPage;
