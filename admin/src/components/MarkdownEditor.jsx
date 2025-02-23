import React, { useState, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import TurndownService from "turndown";
import { Box, Button, Typography, Paper } from "@mui/material";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const turndownService = new TurndownService();

  const editorConfig = {
    namespace: "BlogEditor",
    theme: {},
    onError(error) {
      console.error(error);
    },
  };

  function onChange(editorState) {
    editorState.read(() => {
      const htmlContent = $getRoot().getTextContent();
      setMarkdown(turndownService.turndown(htmlContent));
    });
  }

  return (
    <Box sx={{ width: "600px", margin: "20px auto" }}>
      <Typography variant="h5" gutterBottom>
        Write Your Blog
      </Typography>
      <LexicalComposer initialConfig={editorConfig}>
        <Paper sx={{ padding: 2, minHeight: "200px" }}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Typography color="text.secondary">Start writing...</Typography>}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onChange} />
        </Paper>
      </LexicalComposer>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={() => console.log(markdown)}
      >
        Log Markdown
      </Button>
    </Box>
  );
};

export default MarkdownEditor;
