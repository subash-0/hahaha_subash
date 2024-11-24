"use client";

import { ICONS } from "@/app/assets/Assets";
import { Edit } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllNotes } from "@/app/auth/note";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import remarkGfm from "remark-gfm"; // Import remark-gfm for extended Markdown support

const Page = () => {
  const [notes, setNotes] = useState([]); // Notes fetched from the API

  // Fetch notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getAllNotes();
        if (!data.error) {
          setNotes(data || []);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-2xl font-semibold text-dark">Your Notes</span>

        {/* Add New Note Button */}
        <button
          className="text-secondary font-medium flex items-center gap-2 p-2 bg-transparent border border-secondary rounded-full hover:bg-secondary/10"
          onClick={() => console.log("Create New Note")}
        >
          <Edit className="text-secondary" />
          Create New Note
        </button>
      </div>

      {/* Notes List Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-lg h-[200px] shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-200"
            >
              {/* Note Content */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-accent size-10 rounded-full shadow-md flex items-center justify-center">
                    <Image src={ICONS.assignmentWhite} alt="note" />
                  </div>
                  <p className="font-medium text-dark">{note.title}</p>
                  <span className="flex-1 mx-auto flex items-center justify-end text-[10px] cursor-pointer">
                    <Edit fontSize="small" />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  {/* Render Markdown content with headers styled as bold */}
                  <ReactMarkdown
                    className="text-sm text-gray-600 line-clamp-3" // Add a line clamp for truncation
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <strong className="text-dark font-bold" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <strong className="text-dark font-bold" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <strong className="text-dark font-bold" {...props} />
                      ),
                      p: ({ node, ...props }) => <p {...props} />, // Default styling for paragraphs
                    }}
                  >
                    {note.content}
                  </ReactMarkdown>
                  <span className="text-xs text-gray-400">
                    Last Edited: {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* View Button */}
              <button
                className="btn btn-secondary font-medium"
                onClick={() => console.log("Open Note:", note._id)}
              >
                Open
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No notes available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;