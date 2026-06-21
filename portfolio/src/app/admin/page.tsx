"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data || []);
      }
      setLoading(false);
    }

    fetchMessages();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Badge variant="outline" className="text-sm px-4 py-1">
          {messages.length} Messages
        </Badge>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading messages...</p>
      ) : messages.length === 0 ? (
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <p>No messages yet.</p>
            <p className="text-sm">When someone contacts you via the portfolio, it will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <Card key={msg.id} className="flex flex-col">
              <CardHeader className="bg-muted/30 border-b pb-4">
                <CardTitle className="text-lg">{msg.name}</CardTitle>
                <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">
                  {msg.email}
                </a>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {msg.message}
                </p>
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
