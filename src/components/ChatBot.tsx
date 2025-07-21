import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X, Bot, ChevronDown, Calendar, Phone, Mail, Info, User, MessageSquare } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  text: string | JSX.Element;
  sender: "user" | "bot";
  timestamp: Date;
  isLink?: boolean;
};

type UserData = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
};

const QuickActionButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  const { theme } = useTheme();
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-xs p-2 rounded-md border text-left",
        "transition-colors duration-200 hover:bg-primary/10",
        theme === "dark" ? "border-gray-600" : "border-gray-300"
      )}
    >
      {text}
    </button>
  );
};

const createLink = (text: string, url: string) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-primary underline hover:text-primary/80"
  >
    {text}
  </a>
);

const getInitialBotMessage = (handleQuickAction: (action: string) => void): Message => ({
  id: 1,
  text: (
    <div>
      <p>Hello there! 👋 I'm BDS AI, your digital assistant. How can I make your day better?</p>
      <div className="mt-3 space-y-2">
        <p className="font-medium">Quick options to get you started:</p>
        <div className="grid grid-cols-2 gap-2">
          <QuickActionButton 
            text="Our Services" 
            onClick={() => handleQuickAction("services")} 
          />
          <QuickActionButton 
            text="Industries" 
            onClick={() => handleQuickAction("industries")} 
          />
          <QuickActionButton 
            text="Talk to Agent" 
            onClick={() => handleQuickAction("agent")} 
          />
          <QuickActionButton 
            text="Contact Info" 
            onClick={() => handleQuickAction("contact")} 
          />
        </div>
      </div>
    </div>
  ),
  sender: "bot",
  timestamp: new Date(),
});

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState<UserData>({});
  const [isCollectingInfo, setIsCollectingInfo] = useState(false);
  const [infoBeingCollected, setInfoBeingCollected] = useState<"name" | "email" | "phone" | "company" | "">("");
  const [requestedAgent, setRequestedAgent] = useState(false);
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with first message
  useEffect(() => {
    setMessages([getInitialBotMessage(handleQuickAction)]);
  }, []);

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

  const handleQuickAction = (action: string) => {
    let response: string | JSX.Element = "";
    
    switch (action) {
      case "services":
        response = (
          <div>
            <p className="font-medium">Our Services:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Data Analytics & Business Intelligence</li>
              <li>AI & Machine Learning Solutions</li>
              <li>Cloud Data Integration</li>
              <li>Predictive Analytics</li>
              <li>Data Visualization</li>
              <li>Custom Software Development</li>
            </ul>
            <p className="mt-2">
              Learn more: {createLink("Services Page", "/services")}
            </p>
          </div>
        );
        break;
      case "industries":
        response = (
          <div>
            <p className="font-medium">Industries We Serve:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Healthcare & Life Sciences</li>
              <li>Financial Services</li>
              <li>Retail & E-commerce</li>
              <li>Manufacturing</li>
              <li>Telecommunications</li>
              <li>Government</li>
            </ul>
            <p className="mt-2">
              Learn more: {createLink("Industries Page", "/industries")}
            </p>
          </div>
        );
        break;
      case "consultation":
        response = (
          <div>
            <p>We offer free 30-minute consultations with our experts.</p>
            <div className="mt-3 flex items-center space-x-2">
              <Button size="sm" asChild>
                <a href="/book-consultation" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Now
                </a>
              </Button>
            </div>
          </div>
        );
        break;
      case "contact":
        response = (
          <div>
            <p className="font-medium">Contact Information:</p>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@bds.com</span>
              </div>
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                <span>123 Business Ave, Suite 500, San Francisco, CA 94107</span>
              </div>
            </div>
            <p className="mt-3">
              {createLink("Contact Form", "/contact")}
            </p>
          </div>
        );
        break;
      case "agent":
        return initiateAgentRequest();
      default:
        response = "I'm sorry, I didn't understand that request. Could you please rephrase?";
    }
    
    const botResponse: Message = {
      id: messages.length + 1,
      text: response,
      sender: "bot",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, botResponse]);
  };

  const initiateAgentRequest = () => {
    setRequestedAgent(true);
    setIsCollectingInfo(true);
    setInfoBeingCollected("name");
    
    const response: Message = {
      id: messages.length + 1,
      text: "I'd be happy to connect you with one of our team members. First, may I have your name?",
      sender: "bot",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, response]);
  };

  const collectUserInfo = (value: string) => {
    if (!infoBeingCollected) return;

    // Save the collected info
    setUserData(prev => ({ ...prev, [infoBeingCollected]: value }));

    // Determine next step
    if (infoBeingCollected === "name") {
      setInfoBeingCollected("email");
      return "Thank you! Could you please share your email address so we can reach you?";
    } else if (infoBeingCollected === "email") {
      setInfoBeingCollected("phone");
      return "Great! A phone number would help us contact you faster (optional).";
    } else if (infoBeingCollected === "phone") {
      setInfoBeingCollected("company");
      return "Almost done! Which company are you with?";
    } else {
      // Final step - complete info collection
      setIsCollectingInfo(false);
      setInfoBeingCollected("");
      completeAgentRequest();
      return "";
    }
  };

  const completeAgentRequest = () => {
    // In a real app, you would send this data to your backend
    console.log("User data collected:", userData);
    // Simulate sending notification
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 1,
        text: (
          <div>
            <p>Thank you, {userData.name}! Your request has been sent to our team.</p>
            <p className="mt-2">A representative will contact you shortly at {userData.email}.</p>
            <p className="mt-2">In the meantime, is there anything else I can help you with?</p>
          </div>
        ),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

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

    // Handle info collection flow
    if (isCollectingInfo && infoBeingCollected) {
      const nextQuestion = collectUserInfo(input);
      if (nextQuestion) {
        setTimeout(() => {
          const botResponse: Message = {
            id: messages.length + 2,
            text: nextQuestion,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
        }, 800);
      }
      return;
    }

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

  const getBotResponse = (userInput: string): string | JSX.Element => {
    const userInputLower = userInput.toLowerCase();
    
    // Greetings
    if (userInputLower.includes("hello") || userInputLower.includes("hi") || userInputLower.includes("hey")) {
      return "Hello there! 😊 How's your day going so far? What can I help you with today?";
    }
    
    // How are you
    if (userInputLower.includes("how are you") || userInputLower.includes("how's it going")) {
      return "I'm just a bunch of code, but I'm functioning perfectly! 😄 How about you?";
    }
    
    // Name
    if (userInputLower.includes("your name") || userInputLower.includes("who are you")) {
      return "I'm BDS AI, your friendly digital assistant here to help with anything about our services, support, or just general questions!";
    }
    
    // About company
    if (userInputLower.includes("about") || userInputLower.includes("company") || userInputLower.includes("what do you do")) {
      return (
        <div>
          <p>BDS is a technology solutions provider specializing in data analytics and AI solutions. We help businesses transform their operations with cutting-edge technology.</p>
          <p className="mt-2">
            Learn more: {createLink("About BDS", "/about")}
          </p>
        </div>
      );
    }
    
    // Services
    if (userInputLower.includes("service") || userInputLower.includes("offer") || userInputLower.includes("solution") || userInputLower.includes("product")) {
      return handleQuickAction("services");
    }
    
    // Industries
    if (userInputLower.includes("industry") || userInputLower.includes("sector") || userInputLower.includes("vertical") || userInputLower.includes("client")) {
      return handleQuickAction("industries");
    }
    
    // Pricing
    if (userInputLower.includes("price") || userInputLower.includes("cost") || userInputLower.includes("fee") || userInputLower.includes("how much")) {
      return "Our solutions are customized to each client's needs. For accurate pricing, we recommend booking a consultation with our team. Would you like me to help with that?";
    }
    
    // Contact
    if (userInputLower.includes("contact") || userInputLower.includes("support") || userInputLower.includes("reach") || userInputLower.includes("call") || userInputLower.includes("email")) {
      return handleQuickAction("contact");
    }
    
    // Demo/Consultation
    if (userInputLower.includes("demo") || userInputLower.includes("consult") || userInputLower.includes("meeting") || userInputLower.includes("book") || userInputLower.includes("schedule")) {
      return handleQuickAction("consultation");
    }
    
    // Human agent
    if (userInputLower.includes("human") || userInputLower.includes("agent") || userInputLower.includes("representative") || userInputLower.includes("person") || userInputLower.includes("talk to someone")) {
      return initiateAgentRequest();
    }
    
    // Team
    if (userInputLower.includes("team") || userInputLower.includes("people") || userInputLower.includes("expert")) {
      return "Our team consists of 150+ data scientists, engineers, and business analysts with deep industry expertise. We're proud of our talented crew!";
    }
    
    // Careers
    if (userInputLower.includes("job") || userInputLower.includes("career") || userInputLower.includes("hire") || userInputLower.includes("position") || userInputLower.includes("work")) {
      return (
        <div>
          <p>We're always looking for talented individuals to join our team!</p>
          <p className="mt-2">
            {createLink("View current openings", "/careers")}
          </p>
        </div>
      );
    }
    
    // Case studies
    if (userInputLower.includes("case study") || userInputLower.includes("portfolio") || userInputLower.includes("client") || userInputLower.includes("example") || userInputLower.includes("work")) {
      return (
        <div>
          <p>We've helped numerous clients across industries achieve their business goals. Here are some examples:</p>
          <p className="mt-2">
            {createLink("View our case studies", "/case-studies")}
          </p>
        </div>
      );
    }
    
    // Technology
    if (userInputLower.includes("tech") || userInputLower.includes("stack") || userInputLower.includes("tool") || userInputLower.includes("platform") || userInputLower.includes("software")) {
      return "We work with leading technologies including Python, R, TensorFlow, PyTorch, Snowflake, Tableau, Power BI, and more. Is there a specific technology you're interested in?";
    }
    
    // Partners
    if (userInputLower.includes("partner") || userInputLower.includes("collaborate") || userInputLower.includes("reseller") || userInputLower.includes("affiliate")) {
      return (
        <div>
          <p>We partner with technology leaders and system integrators to deliver comprehensive solutions.</p>
          <p className="mt-2">
            {createLink("Learn about our partner program", "/partners")}
          </p>
        </div>
      );
    }
    
    // Thank you
    if (userInputLower.includes("thank") || userInputLower.includes("appreciate") || userInputLower.includes("grateful") || userInputLower.includes("thanks")) {
      return "You're very welcome! 😊 Is there anything else I can help you with today?";
    }
    
    // Goodbye
    if (userInputLower.includes("bye") || userInputLower.includes("goodbye") || userInputLower.includes("see you")) {
      return "Have a wonderful day! Don't hesitate to come back if you have more questions. 😊";
    }
    
    // Default response
    return (
      <div>
        <p>I want to make sure I understand correctly. Could you rephrase that for me?</p>
        <p className="mt-2">Here are some topics I can help with:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Our services and solutions</li>
          <li>Industries we serve</li>
          <li>Company information</li>
          <li>Contact details</li>
          <li>Booking a consultation</li>
          <li>Speaking with a human agent</li>
        </ul>
      </div>
    );
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
            isMinimized ? "h-16" : "h-[500px]"
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
              <span className="font-medium font-[Viga]">BDS AI Assistant</span>
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
              <div className="p-4 h-[380px] overflow-y-auto">
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
                    <div className={typeof message.text === 'string' ? '' : 'space-y-2'}>
                      {message.text}
                    </div>
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
                    placeholder={
                      isCollectingInfo 
                        ? infoBeingCollected === "phone" 
                          ? "Phone number (optional)" 
                          : `Your ${infoBeingCollected}`
                        : "Type your message..."
                    }
                    className="flex-1 px-4 py-2 rounded-full bg-background border border-input focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="rounded-full h-10 w-10 p-2"
                    disabled={!input.trim() && !(isCollectingInfo && infoBeingCollected === "phone")}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-2 text-xs text-muted-foreground text-center">
                  BDS AI Assistant • {new Date().getFullYear()}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
