import React, { useRef, useState } from "react";
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered,
  Type, Palette, Heading1, Heading2, Heading3, Link
} from "lucide-react";

function TextEditor() {
  const editorRef = useRef(null);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("16px");

  const applyCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    

    
  };
  const applyFontSize = (size) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = size;
    range.surroundContents(span);
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-800 text-white">
          <h3 className="text-xl font-bold">Blog Editor</h3>
        </div>

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

          {/* Font Size */}
          {/* <div className="flex items-center">
            <Type size={18} className="mr-1" />
            <select
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                applyCommand("fontSize", 7); // Temporary large size
                document.execCommand("foreColor", false, textColor); // Retain text color
                const fontTags = document.querySelectorAll("font[size='7']");
                fontTags.forEach((tag) => tag.removeAttribute("size"));
                fontTags.forEach((tag) => (tag.style.fontSize = e.target.value));
              }}
              className="border rounded p-1 text-sm"
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="28px">28px</option>
              <option value="32px">32px</option>
              <option value="36px">36px</option>
            </select>
          </div> */}

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
          className="p-4 min-h-[300px] outline-none text-black"
          style={{ fontSize, color: textColor }}
        ></div>
      </div>
    </div>
  );
}

export default TextEditor;
