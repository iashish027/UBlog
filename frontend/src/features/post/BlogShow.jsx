import DOMPurify from "dompurify";
import { useLocation } from "react-router-dom";

export default function BlogShow() {
  const location = useLocation();
  const { title, content, createdAt, username } = location.state || {};

  return (
    <div className="flex justify-center p-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold mb-6 text-center">{title}</h1>
        <p className="text-sm text-gray-500 mb-4 text-center">
          {createdAt} by {username || "Unknown"}
        </p>
        <div
          className="prose max-w-none mx-auto"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content), }}
        ></div>
      </div>
    </div>
  );
}
