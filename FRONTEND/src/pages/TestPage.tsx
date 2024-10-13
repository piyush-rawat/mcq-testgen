import AlertModal from "@/components/AlertModal";
import CountdownTimer from "@/components/Countdown";
import QuestionItem from "@/components/QuestionItem";
import { Button } from "@/components/ui/button";
import { getTest, submitTest } from "@/network/testRequests";
import { Test } from "@/types";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import testNotFoundSvg from "../assets/TestNotFound.svg";

const TestPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [test, setTest] = useState<Test | null>(null);

  const [formData, setFormData] = useState<{ [key: string]: string | null }>(
    {}
  );

  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);

  const [isAlreadySubmitted, setIsAlreadySubmitted] = useState(false);
  const [isBeforeTime, setIsBeforeTime] = useState(false);
  const [isAfterTime, setIsAfterTime] = useState(false);
  const [testNotFound, setTestNotFound] = useState(false);

  const [startTime, setStartTime] = useState<string | null>(null);
  // const [endTime, setEndTime] = useState<string | null>(null);

  useEffect(() => {
    if (slug)
      getTest(slug).then(
        (data: {
          test: Test;
          startTime: string;
          endTime: string;
          status: string;
        }) => {
          if (data.status)
            switch (data.status) {
              case "SUBMITTED":
                setIsAlreadySubmitted(true);
                return;
              case "BEFORE":
                setStartTime(data.startTime);
                setIsBeforeTime(true);
                return;
              case "AFTER":
                // setEndTime(data.endTime);
                setIsAfterTime(true);
                return;
              case "ONGOING":
                setTest(data.test);

                const obj: { [key: string]: null } = {};

                data.test.questions.map((item) => {
                  obj[item.question] = null;
                });
                setFormData(obj);
                return;
              case "NOT FOUND":
                setTestNotFound(true);
                return;
            }
        }
      );
  }, [slug]);

  const handleSubmit = () => {
    console.log(formData);

    test &&
      submitTest(test.slug, { answers: formData }).then(() => {
        navigate("/", { replace: true });
      });
  };

  if (isAlreadySubmitted) {
    return (
      <div className="flex h-screen">
        <div className="mx-auto flex items-center gap-4 translate-y-[-70px]">
          <FaCheckCircle size={120} className="text-green-700" />
          <div>
            <h1 className="mb-4 text-2xl font-bold">Test Submitted</h1>
          </div>
        </div>
      </div>
    );
  }

  if (isBeforeTime) {
    return (
      <div className="flex h-screen">
        <div className="mx-auto flex items-center gap-4 translate-y-[-70px]">
          <Clock size={120} className="text-green-700" />
          <div>
            <h1 className="mb-4 text-2xl font-bold">Test starting in</h1>
            {startTime && <CountdownTimer endTime={startTime} />}
          </div>
        </div>
      </div>
    );
  }

  if (isAfterTime) {
    return (
      <div className="flex h-screen">
        <div className="mx-auto flex items-center gap-4 translate-y-[-70px]">
          <FaExclamationCircle size={120} className="text-orange-500" />
          <div>
            <h1 className="mb-4 text-2xl font-bold">This test is over.</h1>
          </div>
        </div>
      </div>
    );
  }

  if (testNotFound) {
    return (
      <div className="flex pointer-events-none">
        <div className="mx-auto text-center">
          <img src={testNotFoundSvg} className="w-[200px] sm:w-[400px]" />
          <h1 className="text-lg mt-5">Test Not Found</h1>
          <p className="text-sm">Test link is invalid.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 mt-10 max-w-xl mx-auto">
      <div className="flex gap-4 justify-end">
        <p>Time Remaining</p>
        {test && <CountdownTimer endTime={test?.endTime} />}
      </div>
      <h1 className="text-3xl mb-5">{test?.title}</h1>

      <div className="space-y-6">
        {test?.questions.map((q, index) => (
          <QuestionItem
            key={index}
            {...q}
            index={index}
            onChange={(answer) => {
              setFormData({
                ...formData,
                [q.question]: answer,
              });
            }}
          />
        ))}
      </div>

      <div className="flex mt-10">
        <Button
          className="mx-auto"
          onClick={() => setShowSubmitConfirmation(true)}
        >
          Submit
        </Button>
      </div>

      <AlertModal
        open={showSubmitConfirmation}
        onCancel={() => setShowSubmitConfirmation(false)}
        onConfirm={handleSubmit}
      />
    </div>
  );
};

export default TestPage;
