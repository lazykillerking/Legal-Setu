export default function AssistantMessage({ text }) {
  return (
    <div className="assistant-message-row">
      <div className="assistant-message-card">{text}</div>
    </div>
  );
}
