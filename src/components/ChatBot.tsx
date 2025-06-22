
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X, Bot, ChevronDown } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const initialBotMessage: Message = {
  id: 1,
  text: "Hello! I'm DataSphere AI. How can I assist you today?",
  sender: "bot",
  timestamp: new Date(),
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [input, setInput] = useState("");
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes("hello") || userInputLower.includes("hi")) {
      return "Hello! How can I help you today?";
    } else if (userInputLower.includes("data") || userInputLower.includes("analytics")) {
      return "DataSphere offers cutting-edge data analytics solutions for businesses of all sizes. Would you like to learn more about our specific offerings?";
    } else if (userInputLower.includes("pricing") || userInputLower.includes("cost")) {
      return "Our pricing varies based on your specific needs. Would you like to schedule a demo with our team to discuss a custom solution?";
    } else if (userInputLower.includes("contact") || userInputLower.includes("support")) {
      return "You can reach our support team at support@datasphere.ai or by filling out the contact form. Would you like me to guide you there?";
    } else if (userInputLower.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "That's an interesting question. Our team would be happy to provide you with more detailed information. Would you like to schedule a call with one of our experts?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      if (isMinimized) {
        setIsMinimized(false);
      } else {
        setIsOpen(false);
      }
    }
  };

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center",
          theme === "dark" ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground"
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div
          className={cn(
            "absolute bottom-20 right-0 w-80 sm:w-96 rounded-xl shadow-2xl transition-all duration-300 overflow-hidden",
            "border border-border",
            theme === "dark" ? "bg-card text-card-foreground" : "bg-white",
            isMinimized ? "h-16" : "h-[450px]"
          )}
        >
          {/* Chat header */}
          <div
            className={cn(
              "p-3 flex items-center justify-between cursor-pointer",
              theme === "dark" ? "bg-primary/90 text-primary-foreground" : "bg-primary text-primary-foreground"
            )}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-medium">DataSphere AI</span>
            </div>
            <div className="flex space-x-1">
              {!isMinimized && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-white/20 text-white"
                  onClick={minimizeChat}
                >
                  <ChevronDown className="h-5 w-5" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-white/20 text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat messages */}
              <div className="p-4 h-[330px] overflow-y-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "mb-4 max-w-[85%] p-3 rounded-lg",
                      message.sender === "user"
                        ? "ml-auto bg-primary text-primary-foreground rounded-br-none"
                        : `${theme === "dark" ? "bg-secondary text-secondary-foreground" : "bg-muted"} rounded-bl-none`
                    )}
                  >
                    <p>{message.text}</p>
                    <div
                      className={cn(
                        "text-xs mt-1",
                        message.sender === "user"
                          ? "text-primary-foreground/70"
                          : `${theme === "dark" ? "text-secondary-foreground/70" : "text-muted-foreground"}`
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <div className="p-3 border-t border-border">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-full bg-background border border-input focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="rounded-full h-10 w-10 p-2"
                    disabled={!input.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}