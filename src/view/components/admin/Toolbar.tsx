import { Editor } from '@tiptap/react';
import {
  FaBold, FaItalic, FaStrikethrough,
  FaHeading, FaListUl, FaListOl, FaQuoteLeft,
  FaCode, FaLink, FaUnlink, FaMinus, FaImage,
  FaUndo, FaRedo,
} from 'react-icons/fa';

interface ToolbarProps {
  editor: Editor | null;
}

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      title={title}
      className={`editor-toolbar-btn${active ? ' is-active' : ''}`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="editor-toolbar-sep" aria-hidden />;
}

export default function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  function handleLink() {
    if (editor!.isActive('link')) {
      editor!.chain().focus().unsetLink().run();
    } else {
      const url = window.prompt('URL:');
      if (url) editor!.chain().focus().setLink({ href: url, target: '_blank' }).run();
    }
  }

  function handleImage() {
    const url = window.prompt('Image URL:');
    if (url) editor!.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div className="editor-toolbar" role="toolbar" aria-label="Text formatting">

      {/* History */}
      <Btn onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()} title="Undo">
        <FaUndo />
      </Btn>
      <Btn onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()} title="Redo">
        <FaRedo />
      </Btn>

      <Sep />

      {/* Inline format */}
      <Btn onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')} title="Bold">
        <FaBold />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')} title="Italic">
        <FaItalic />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')} title="Strikethrough">
        <FaStrikethrough />
      </Btn>

      <Sep />

      {/* Headings */}
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive('heading', { level: 2 })} title="Heading 2">
        <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '-0.02em' }}>H2</span>
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive('heading', { level: 3 })} title="Heading 3">
        <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '-0.02em' }}>H3</span>
      </Btn>

      <Sep />

      {/* Lists + blockquote */}
      <Btn onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')} title="Bullet list">
        <FaListUl />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')} title="Ordered list">
        <FaListOl />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')} title="Blockquote">
        <FaQuoteLeft />
      </Btn>

      <Sep />

      {/* Code */}
      <Btn onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')} title="Inline code">
        <FaCode />
      </Btn>
      <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive('codeBlock')} title="Code block">
        <span style={{ fontSize: '0.65rem', fontWeight: 700, fontFamily: 'monospace' }}>{'</>'}</span>
      </Btn>

      <Sep />

      {/* Link */}
      <Btn onClick={handleLink}
        active={editor.isActive('link')} title={editor.isActive('link') ? 'Remove link' : 'Add link'}>
        {editor.isActive('link') ? <FaUnlink /> : <FaLink />}
      </Btn>

      {/* Image */}
      <Btn onClick={handleImage} title="Insert image">
        <FaImage />
      </Btn>

      {/* HR */}
      <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">
        <FaMinus />
      </Btn>

    </div>
  );
}
