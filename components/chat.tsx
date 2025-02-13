"use client";

import { scrollToBottom, initialMessages } from "@/lib/utils";
import { useChat, Message } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import { ChatLine } from "./chat-line";
import { Loader2 } from "lucide-react";

export function Chat() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages,
  });

  useEffect(() => {
      setTimeout(() => scrollToBottom(containerRef), 100);  
  }, [messages]);

  return (
    <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto" ref={containerRef}>
        {messages.map(({ id, role, content }: Message) => (
          <ChatLine
            key={id}
            role={role}
            content={content}
            // Start from the third message of the assistant
            sources={[]}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex clear-both">
        <Input
          value={input}
          placeholder={"Type to chat with AI..."}
          onChange={handleInputChange}
          className="mr-2"
        />

        {isLoading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button type="submit" className="w-24">
            Ask
          </Button>
        )}
      </form>
    </div>
  );
}
