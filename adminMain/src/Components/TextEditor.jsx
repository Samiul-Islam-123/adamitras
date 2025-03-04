import React, { useRef, useState, forwardRef, useImperativeHandle } from "react";
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered,
  Type, Palette, Heading1, Heading2, Heading3, Link
} from "lucide-react";

const TextEditor = forwardRef((props, ref) => {
  const editorRef = useRef(null);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("16px");

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    innerHTML: editorRef.current ? editorRef.current.innerHTML : '',
    focus: () => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }
  }));

  const applyCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Toolbar */}
      <div className="p-2 border-b flex flex-wrap gap-2 bg-gray-50">
        <button onClick={() => applyCommand("bold")} className="p-2 hover:bg-gray-200 rounded">
          <Bold size={18} />
        </button>
        <button onClick={() => applyCommand("italic")} className="p-2 hover:bg-gray-200 rounded">
          <Italic size={18} />
        </button>
        <button onClick={() => applyCommand("underline")} className="p-2 hover:bg-gray-200 rounded">
          <Underline size={18} />
        </button>
        <button onClick={() => applyCommand("justifyLeft")} className="p-2 hover:bg-gray-200 rounded">
          <AlignLeft size={18} />
        </button>
        <button onClick={() => applyCommand("justifyCenter")} className="p-2 hover:bg-gray-200 rounded">
          <AlignCenter size={18} />
        </button>
        <button onClick={() => applyCommand("justifyRight")} className="p-2 hover:bg-gray-200 rounded">
          <AlignRight size={18} />
        </button>
        <button onClick={() => applyCommand("justifyFull")} className="p-2 hover:bg-gray-200 rounded">
          <AlignJustify size={18} />
        </button>
        <button onClick={() => applyCommand("insertUnorderedList")} className="p-2 hover:bg-gray-200 rounded">
          <List size={18} />
        </button>
        <button onClick={() => applyCommand("insertOrderedList")} className="p-2 hover:bg-gray-200 rounded">
          <ListOrdered size={18} />
        </button>
        <button onClick={() => applyCommand("formatBlock", "<h1>")} className="p-2 hover:bg-gray-200 rounded">
          <Heading1 size={18} />
        </button>
        <button onClick={() => applyCommand("formatBlock", "<h2>")} className="p-2 hover:bg-gray-200 rounded">
          <Heading2 size={18} />
        </button>
        <button onClick={() => applyCommand("formatBlock", "<h3>")} className="p-2 hover:bg-gray-200 rounded">
          <Heading3 size={18} />
        </button>

        {/* Text Color */}
        <div className="flex items-center">
          <Palette size={18} className="mr-1" />
          <input
            type="color"
            value={textColor}
            onChange={(e) => {
              setTextColor(e.target.value);
              applyCommand("foreColor", e.target.value);
            }}
            className="w-6 h-6 border rounded"
          />
        </div>

        {/* Insert Link */}
        <button
          onClick={() => {
            const url = prompt("Enter URL:", "https://");
            if (url) {
              applyCommand("createLink", url);
            }
          }}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <Link size={18} />
        </button>
      </div>

      {/* Rich Text Editor */}
      <div
        ref={editorRef}
        contentEditable
        placeholder="Write your blog content here..."
        className="p-4 min-h-[300px] outline-none text-black border-t"
        style={{ fontSize, color: textColor }}
      ></div>
    </div>
  );
});

export default TextEditor;