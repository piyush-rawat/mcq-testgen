import { Copy, CopyCheck, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { showSuccessToast } from "@/utils/toast";

const TestGridItem = ({
  title,
  slug,
  onDelete,
}: {
  title: string;
  slug: string;
  onDelete: () => void;
}) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    showSuccessToast("Link Copied To Clipboard");
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 3000);
  };

  return (
    <div className="relative flex flex-col gap-5 p-4 border rounded">
      <h1 className="font-semibold font-2">{title}</h1>
      <Trash2
        onClick={onDelete}
        size={20}
        className="text-red-500 hover:text-red-600 absolute top-2 right-2 cursor-pointer"
      />
      <div className="flex items-center gap-4">
        <p className="text-sm bg-gray-100 p-2 rounded whitespace-nowrap overflow-x-auto">
          {window.location.origin}/test/{slug}
        </p>
        <div className="flex">
          {isLinkCopied ? (
            <CopyCheck size={20} className="text-1" />
          ) : (
            <Copy
              onClick={() =>
                handleCopyLink(`${window.location.origin}/test/${slug}`)
              }
              size={20}
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
            />
          )}
        </div>
      </div>
      <div>
        <Link
          to={`/result/${slug}`}
          className="font-2 bg-2 hover:bg-2/90 transition-colors p-2 rounded text-sm font-semibold text-white"
        >
          View Results
        </Link>
      </div>
    </div>
  );
};

export default TestGridItem;
