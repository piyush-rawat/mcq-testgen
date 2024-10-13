import { getResults } from "@/network/resultsRequests";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Results = {
  name: string;
  email: string;
  marksObtained: string;
  marksInPercent: string;
};

const ResultsPage = () => {
  const { slug } = useParams();

  const [title, setTitle] = useState("");
  const [results, setResults] = useState<Results[]>([]);

  useEffect(() => {
    slug &&
      getResults(slug).then(({ title, results }) => {
        setTitle(title);
        setResults(results);
      });
  }, []);

  return (
    <div className="p-4 mt-10">
      <h1 className="mb-5 text-lg">Results for {title}</h1>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Marks Obtained
                </th>
                <th scope="col" className="px-6 py-3">
                  %
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {r.name}
                  </th>
                  <td className="px-6 py-4">{r.email}</td>
                  <td className="px-6 py-4">{r.marksObtained}</td>
                  <td className="px-6 py-4">{r.marksInPercent}%</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
