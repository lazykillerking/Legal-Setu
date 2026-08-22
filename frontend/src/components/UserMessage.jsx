import LegalIcon from './LegalIcon.jsx';

export default function UserMessage({ text, file }) {
  return (
    <div className="user-message-row">
      <div className="user-message-card">
        <div>{text}</div>
        {file && (
          <div className="user-message-file">
            <LegalIcon name="paperclip" size={13} strokeWidth={2} />
            {file.name}
          </div>
        )}
      </div>
    </div>
  );
}
