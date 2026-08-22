import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";

export const metadata = {
  title: "Chat — Legal Setu",
};

export default function ChatPage() {
  return (
    <div className="flex flex-1 min-h-0">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
