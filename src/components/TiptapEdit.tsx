"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { GoBold } from "react-icons/go";
import { AiOutlineItalic } from "react-icons/ai";
import { BsTypeStrikethrough } from "react-icons/bs";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";

type Props = {
  newAnswer: string;
  setNewAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const TiptapEdit = ({ newAnswer, setNewAnswer }: Props) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "sm:p-4 p-3 text-sm sm:text-base rounded-2xl bg-gray-100 outline-none w-full cursor-text",
        spellcheck: "false",
      },
    },
    extensions: [
      StarterKit,
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-order list-decimal list-outside pl-6 text-left",
        },
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc list-outside pl-6",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "mb-2 paragraph",
        },
      }),
      Placeholder.configure({
        placeholder: "Answer ...",
      }),
      Link.configure({
        autolink: true,
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-500 hover:underline",
        },
        validate: (href) => true,
      }),
    ],
    content: `${newAnswer}`,
    onUpdate: ({ editor }) => {
      const json = editor.getHTML();
      setNewAnswer(`${json}`);
    },
  });

  editor?.setEditable(true);

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex gap-1 p-2 rounded-md bg-white">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`${
                editor.isActive("bold")
                  ? "bg-slate-900 text-slate-50 "
                  : "hover:bg-gray-100"
              } rounded-md  p-1 relative`}
            >
              <GoBold className="text-xl" />
              <div className="w-full h-full absolute top-0 right-0"></div>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`${
                editor.isActive("italic")
                  ? "bg-slate-900 text-slate-50 "
                  : "hover:bg-gray-100"
              } rounded-md  p-1 relative`}
            >
              <AiOutlineItalic className="text-xl" />
              <div className="w-full h-full absolute top-0 right-0"></div>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`${
                editor.isActive("strike")
                  ? "bg-slate-900 text-slate-50 "
                  : "hover:bg-gray-100"
              } rounded-md  p-1 relative`}
            >
              <BsTypeStrikethrough className="text-xl" />
              <div className="w-full h-full absolute top-0 right-0"></div>
            </button>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};

export default TiptapEdit;
