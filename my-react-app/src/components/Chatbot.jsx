import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Chatbot() {
  return (
    <aside className="col-span-3 bg-gray-100 p-4 rounded-2xl flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Chatbot</h2>
      <Card className="flex-grow mb-4 overflow-auto">
        <CardContent className="p-4 text-sm text-gray-600">Chatbot messages appear here.</CardContent>
      </Card>
      <div className="flex gap-2">
        <Input placeholder="Type a message..." className="flex-grow" />
        <Button>Send</Button>
      </div>
    </aside>
  );
}
