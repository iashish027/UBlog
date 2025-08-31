import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";

import { useState, useRef, useMemo } from "react"; // Add useRef
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const quillRef = useRef(null); // Ref for ReactQuill editor instance
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure required fields are present
    if (!formData.title || !formData.content) {
      setPublishError("Title and content are required.");
      return;
    }

    // Generate slug from title
    const slug = formData.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .substring(0, 50);

    const postPayload = {
      userId: currentUser.id, // Use userId from Redux
      title: formData.title,
      content: formData.content,
      image: formData.image || undefined,
      category: formData.category || "uncategorized",
      slug,
      published: true,
    };

    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || "Failed to publish post.");
        return;
      }

      // Redirect to the post page after successful creation
      setPublishError(null);
      navigate(`/post/getPost/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong. Please try again.");
    }
  };

  async function handleCoverImage(e) {
    if (!file) {
      setImageUploadError("No file selected for cover image.");
      return;
    }

    let form = new FormData();
    form.append("image", file);

    try {
      const res = await fetch("/api/images/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      setFormData({ ...formData, image: data.imageUrl });
    } catch (err) {
      setImageUploadError("Failed to upload cover image.");
    }
  }

  async function handleQuillImage() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const selectedFile = input.files[0];
      if (!selectedFile) {
        return;
      }

      let form = new FormData();
      form.append("image", selectedFile);

      try {
        const res = await fetch("/api/images/upload", {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range.index, "image", data.imageUrl, "user");
      } catch (err) {
        setImageUploadError("Failed to upload image to Quill editor.");
      }
    };
  }

  // --- QUILL MODULES CONFIGURATION ---
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: handleQuillImage,
        },
      },
    }),
    [] // No dependencies, so it's created only once
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "script",
      "indent",
      "link",
      "image",
      "video",
      "clean",
    ],
    [] // No dependencies, so it's created only once
  );

  // ... return statement
  return (
    <div className="p-3 max-w-5xl mx-auto min-h-screen">
      {" "}
      {/* Increased max width for larger screens */}
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {" "}
        {/* Increased gap for better spacing */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            size="sm"
            outline
            onClick={handleCoverImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover rounded-lg" // Added rounded corners
          />
        )}
        <ReactQuill
          ref={quillRef}
          theme="snow"
          placeholder="Write something..."
          className="h-[500px] mb-12" // Increased height to 500px
          required
          value={formData.content || ""}
          modules={modules}
          formats={formats}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          onClick={handleSubmit}
        >
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
