import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Button,
  Typography,
  Chip,
  Stack,
  Divider,
  AppBar,
  Toolbar,
  Tooltip
} from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  Link as LinkIcon,
  Image as ImageIcon,
  Save,
  Code,
  FormatQuote,
  Undo,
  Redo
} from '@mui/icons-material';

import './editor.css'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Paper variant="outlined" sx={{ mb: 2, p: 1 , width : "100%"}}>
      <Stack direction="row" spacing={1}>
        <Tooltip title="Bold">
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          >
            <FormatBold />
          </IconButton>
        </Tooltip>

        <Tooltip title="Italic">
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          >
            <FormatItalic />
          </IconButton>
        </Tooltip>

        <Tooltip title="Bullet List">
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            <FormatListBulleted />
          </IconButton>
        </Tooltip>

        <Tooltip title="Code">
          <IconButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            <Code />
          </IconButton>
        </Tooltip>

        <Tooltip title="Blockquote">
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            <FormatQuote />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        <Tooltip title="Undo">
          <IconButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo />
          </IconButton>
        </Tooltip>

        <Tooltip title="Redo">
          <IconButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo />
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
};

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      Placeholder.configure({
        placeholder: 'Write your blog post content...',
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  const handleSave = () => {
    const post = {
      title,
      content: editor.getHTML(),
      tags,
      lastSaved: new Date().toISOString(),
    };
    console.log('Saving post:', post);
    // Here you would typically save to your backend
  };

  const handleAddTag = (event) => {
    if (event.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Paper elevation={3}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Create New Blog Post
            </Typography>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              color="primary"
            >
              Save Draft
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              sx: { fontSize: '1.5rem', fontWeight: 'bold' }
            }}
          />

          <MenuBar editor={editor} />

          <Paper 
            variant="outlined" 
            sx={{ 
              mb: 3, 
              p: 2,
              minHeight: '400px',
              '& .ProseMirror': {
                minHeight: '380px',
                outline: 'none',
                '&:focus': {
                  outline: 'none',
                }
              }
            }}
          >
            <EditorContent editor={editor} />
          </Paper>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Add tags (press Enter)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              sx={{ mb: 2 }}
            />
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default BlogEditor;