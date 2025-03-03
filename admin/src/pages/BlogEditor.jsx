import { Button } from "@mui/material";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuButtonUnderline,
  MenuButtonStrike,
  MenuButtonLink,
  MenuButtonUndo,
  MenuButtonRedo,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  MenuButtonBulletList,
  MenuButtonOrderedList,
  MenuButtonAlignLeft,
  MenuButtonAlignCenter,
  MenuButtonAlignRight,
  MenuButtonAlignJustify,
  RichTextEditor
} from "mui-tiptap";
import { useRef } from "react";

const BlogEditor = () => {
  const rteRef = useRef(null);

  return (
    <div>
      <RichTextEditor
        ref={rteRef}
        extensions={[StarterKit, Underline, Link, TextAlign]}
        content="<p>Hello world</p>"
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonUnderline />
            <MenuButtonStrike />
            <MenuDivider />
            <MenuButtonLink />
            <MenuButtonUndo />
            <MenuButtonRedo />
            <MenuDivider />
            <MenuButtonBulletList />
            <MenuButtonOrderedList />
            <MenuDivider />
            <MenuButtonAlignLeft />
            <MenuButtonAlignCenter />
            <MenuButtonAlignRight />
            <MenuButtonAlignJustify />
          </MenuControlsContainer>
        )}
      />
      <Button onClick={() => console.log(rteRef.current?.editor?.getHTML())}>
        Log HTML
      </Button>
    </div>
  );
};

export default BlogEditor;
