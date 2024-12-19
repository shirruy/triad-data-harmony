import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export const TeamChat = () => {
  const [message, setMessage] = useState("");
  const { userData } = useAuth();
  const queryClient = useQueryClient();

  const { data: messages } = useQuery({
    queryKey: ['chat-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select(`
          *,
          sender:users(email)
        `)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      const { error } = await supabase
        .from('chat_messages')
        .insert([
          { content, sender_id: userData?.id }
        ]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
      setMessage("");
    }
  });

  const handleSend = () => {
    if (message.trim()) {
      sendMessage.mutate(message);
    }
  };

  return (
    <Card className="p-4">
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {messages?.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${msg.sender_id === userData?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] rounded-lg p-3 ${
                msg.sender_id === userData?.id 
                  ? 'bg-primary text-primary-foreground ml-auto' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm font-medium">{msg.sender.email}</p>
                <p>{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex gap-2 mt-4">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} disabled={!message.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};