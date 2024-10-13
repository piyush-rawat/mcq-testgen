import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TestGridItem from "@/components/TestGridItem";
import { Button } from "@/components/ui/button";
import { deleteTest, getAllTests } from "@/network/testRequests";

import { Plus } from "lucide-react";

import noTestsFound from "@/assets/NoTestsFound.svg";
import AlertModal from "@/components/AlertModal";
import { showSuccessToast } from "@/utils/toast";

type Test = {
  _id: string;
  title: string;
  slug: string;
};

const DashboardPage = () => {
  const [tests, setTests] = useState<Test[]>([]);

  const [selectedTestForDeletion, setSelectedTestForDeletion] =
    useState<Test | null>(null);

  useEffect(() => {
    getAllTests().then((tests) => {
      setTests(tests);
    });
  }, []);

  const handleDeleteTest = () => {
    selectedTestForDeletion &&
      deleteTest(selectedTestForDeletion._id).then(() => {
        showSuccessToast("Test Deleted Successfully");
        setTests((prev) =>
          prev.filter((item) => item._id !== selectedTestForDeletion._id)
        );
        setSelectedTestForDeletion(null);
      });
  };

  return (
    <div className="w-full h-screen p-4">
      <div className="flex mb-10">
        <Link to="/create">
          <Button size="sm" className="flex gap-1 bg-1 hover:bg-2 font-2">
            <Plus size={20} />
            Create
          </Button>
        </Link>
      </div>

      {tests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tests.map((test) => (
            <TestGridItem
              key={test._id}
              {...test}
              onDelete={() => setSelectedTestForDeletion(test)}
            />
          ))}
        </div>
      ) : (
        <div className="flex pointer-events-none">
          <div className="mx-auto text-center">
            <img src={noTestsFound} className="w-[200px] sm:w-[400px]" />
            <h1 className="text-lg mt-5">No Tests Created</h1>
            <p className="text-sm">Click create to create a new test.</p>
          </div>
        </div>
      )}

      <AlertModal
        open={!!selectedTestForDeletion}
        onCancel={() => setSelectedTestForDeletion(null)}
        onConfirm={handleDeleteTest}
      />
    </div>
  );
};

export default DashboardPage;
