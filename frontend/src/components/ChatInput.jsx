import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import LegalIcon from './LegalIcon.jsx';

const ChatInput = forwardRef(function ChatInput(
  { value, onChange, onSend, disabled, placeholder },
  ref
) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  useImperativeHandle(ref, () => ({
    focus: () => textareaRef.current?.focus(),
  }));

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  useEffect(() => {
    if (!file || progress >= 100) return;
    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + 12, 100));
    }, 120);
    return () => clearInterval(timer);
  }, [file, progress]);

  function handleFileSelect(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setProgress(0);
    e.target.value = '';
  }

  function removeFile() {
    setFile(null);
    setProgress(0);
  }

  function handleSend() {
    if (disabled || !value.trim()) return;
    onSend({ text: value.trim(), file: file ? { name: file.name } : null });
    removeFile();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-input-box">
      {file && (
        <div className="chat-input-file-chip">
          <LegalIcon name="paperclip" size={14} strokeWidth={2} />
          <span>{file.name}</span>
          <div className="chat-input-file-progress">
            <div className="chat-input-file-progress-bar" style={{ width: `${progress}%` }} />
          </div>
          <button
            type="button"
            className="chat-input-file-remove"
            aria-label="Remove attached file"
            onClick={removeFile}
          >
            <LegalIcon name="x" size={14} strokeWidth={2} />
          </button>
        </div>
      )}
      <div className="chat-input-row">
        <button
          type="button"
          className="chat-input-icon-btn"
          aria-label="Upload document"
          onClick={() => fileInputRef.current?.click()}
        >
          <LegalIcon name="upload" size={17} strokeWidth={1.9} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="visually-hidden"
          onChange={handleFileSelect}
        />
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          rows={1}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Describe your legal problem"
        />
        <button
          type="button"
          className="chat-send-btn"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
        >
          <LegalIcon name="send" size={16} strokeWidth={1.8} />
        </button>
      </div>
      <div className="chat-input-hint">Enter to send · Shift + Enter for a new line</div>
    </div>
  );
});

export default ChatInput;
