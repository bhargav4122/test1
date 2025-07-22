import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  ChevronDown,
  Calendar,
  Phone,
  Mail,
  Info,
  User,
  Briefcase,
  Globe,
  DollarSign,
  Clock,
  HelpCircle,
  Check,
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import axios from "axios"; // For API calls to your backend

type Message = {
  id: number;
  text: string | JSX.Element;
  sender: "user" | "bot";
  timestamp: Date;
  isContactForm?: boolean;
};

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
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

const QuickActionButton = ({
  text,
  onClick,
  icon: Icon,
}: {
  text: string;
  onClick: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={cn(
        "text-xs p-2 rounded-md border text-left flex items-center gap-2 w-full",
        "transition-colors duration-200 hover:bg-primary/10",
        theme === "dark" ? "border-gray-600" : "border-gray-300"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {text}
    </button>
  );
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);

  // Initialize with welcome message and quick actions
  useEffect(() => {
    if (messages.length === 0 && isOpen && !isMinimized) {
      simulateTyping(() => {
        setMessages([
          {
            id: 1,
            text: (
              <div className="space-y-3">
                <p>Hi there! 👋 I'm BDS AI Assistant. How can I help you today?</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <QuickActionButton
                    text="Our Services"
                    onClick={() => handleQuickAction("What services do you offer?")}
                    icon={Briefcase}
                  />
                  <QuickActionButton
                    text="Contact Support"
                    onClick={() => handleQuickAction("How can I contact support?")}
                    icon={Phone}
                  />
                  <QuickActionButton
                    text="Pricing"
                    onClick={() => handleQuickAction("How much does it cost?")}
                    icon={DollarSign}
                  />
                  <QuickActionButton
                    text="Book Consultation"
                    onClick={() => handleQuickAction("How can I book a consultation?")}
                    icon={Calendar}
                  />
                </div>
              </div>
            ),
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      });
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) inputRef.current?.focus();
  }, [isOpen, isMinimized]);

  const simulateTyping = (cb: () => void, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      cb();
      setIsTyping(false);
    }, delay);
  };

  const sendEmailNotification = async (conversation: string, contactInfo?: ContactFormData) => {
    try {
      // Replace with your actual API endpoint
      await axios.post("/api/chatbot-notification", {
        conversation,
        contactInfo,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Failed to send email notification:", error);
    }
  };

  const getBotResponse = (userInput: string): { response: string | JSX.Element; triggerContactForm?: boolean } => {
    const input = userInput.toLowerCase();
    const conversation = [...conversationHistory, `User: ${input}`];
    setConversationHistory(conversation);

    // FAQ Database - Can be moved to a separate file or API call
    const faqs: { 
      keywords: string[];
      response: string | JSX.Element;
      triggerContactForm?: boolean;
    }[] = [
      {
        keywords: ["service", "offer", "provide", "do you have"],
        response: (
          <div>
            <p>We specialize in these services:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>AI & Machine Learning Solutions</li>
              <li>Data Analytics & Business Intelligence</li>
              <li>Cloud Computing & Migration</li>
              <li>Custom Software Development</li>
              <li>IT Consulting & Strategy</li>
            </ul>
            <p className="mt-3">
              {createLink("Explore all services →", "/services")}
            </p>
            <div className="mt-3">
              <Button size="sm" onClick={() => setShowContactForm(true)}>
                <Phone className="h-4 w-4 mr-2" />
                Talk to an expert
              </Button>
            </div>
          </div>
        ),
      },
      {
        keywords: ["industr", "sector", "vertical", "client"],
        response: (
          <div>
            <p>We serve clients across multiple industries:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Healthcare & Life Sciences</li>
              <li>Financial Services & Banking</li>
              <li>Retail & E-commerce</li>
              <li>Manufacturing & Logistics</li>
              <li>Telecommunications</li>
            </ul>
            <p className="mt-3">
              {createLink("See our case studies →", "/case-studies")}
            </p>
          </div>
        ),
      },
      {
        keywords: ["contact", "reach", "email", "phone", "address", "location"],
        response: (
          <div>
            <p>Here's how to reach us:</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>Email: info@bds.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>Phone: +1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                <span>HQ: 123 Tech Park, San Francisco, CA</span>
              </li>
            </ul>
            <div className="mt-4">
              <Button onClick={() => setShowContactForm(true)}>
                <Mail className="h-4 w-4 mr-2" />
                Send us a message
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Our team typically responds within 1 business day.
            </p>
          </div>
        ),
        triggerContactForm: true,
      },
      {
        keywords: ["free", "consultation", "meeting", "demo", "book"],
        response: (
          <div>
            <p>We offer free 45-minute consultations to discuss your needs.</p>
            <div className="mt-3 space-y-2">
              <Button asChild className="w-full">
                <a href="/book-consultation" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book online now
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowContactForm(true)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Schedule via assistant
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Available Monday-Friday, 9am-5pm PST
            </p>
          </div>
        ),
        triggerContactForm: true,
      },
      {
        keywords: ["price", "cost", "fee", "how much"],
        response: (
          <div>
            <p>Our pricing depends on several factors:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Project scope and complexity</li>
              <li>Required technologies</li>
              <li>Timeline and deliverables</li>
            </ul>
            <p className="mt-3">
              We provide transparent quotes after understanding your requirements.
            </p>
            <div className="mt-4">
              <Button onClick={() => setShowContactForm(true)}>
                <DollarSign className="h-4 w-4 mr-2" />
                Get a custom quote
              </Button>
            </div>
          </div>
        ),
        triggerContactForm: true,
      },
      {
        keywords: ["support", "help", "issue", "problem"],
        response: (
          <div>
            <p>We provide multiple support options:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>24/7 critical issue support for enterprise clients</li>
              <li>Business hours support (8am-6pm PST)</li>
              <li>Online knowledge base and documentation</li>
            </ul>
            <div className="mt-4 space-y-2">
              <Button asChild className="w-full">
                <a href="/support" className="flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Visit support portal
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowContactForm(true)}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email support team
              </Button>
            </div>
          </div>
        ),
        triggerContactForm: true,
      },
      {
        keywords: ["human", "agent", "representative", "person", "talk to someone"],
        response: (
          <div>
            <p>I can connect you with a human representative.</p>
            <p className="mt-2">
              Please share your contact details so we can reach out to you:
            </p>
            <div className="mt-4">
              <Button onClick={() => setShowContactForm(true)}>
                <User className="h-4 w-4 mr-2" />
                Share my contact info
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Our team typically responds within 2 hours during business days.
            </p>
          </div>
        ),
        triggerContactForm: true,
      },
      {
        keywords: ["about", "bds", "company", "who are you"],
        response: (
          <div>
            <p>
              BDS is a leading technology solutions provider specializing in AI,
              data analytics, and cloud computing.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Founded in 2010</li>
              <li>200+ employees worldwide</li>
              <li>50+ enterprise clients</li>
              <li>Headquartered in San Francisco</li>
            </ul>
            <p className="mt-3">
              {createLink("Learn more about us →", "/about")}
            </p>
          </div>
        ),
      },
      {
        keywords: ["technology", "stack", "tools", "framework"],
        response: (
          <div>
            <p>Our core technologies include:</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="p-2 rounded-md bg-muted">
                <p className="font-medium">AI/ML</p>
                <p className="text-sm text-muted-foreground">
                  TensorFlow, PyTorch, OpenAI
                </p>
              </div>
              <div className="p-2 rounded-md bg-muted">
                <p className="font-medium">Data</p>
                <p className="text-sm text-muted-foreground">
                  Power BI, Tableau, Snowflake
                </p>
              </div>
              <div className="p-2 rounded-md bg-muted">
                <p className="font-medium">Cloud</p>
                <p className="text-sm text-muted-foreground">
                  AWS, Azure, GCP
                </p>
              </div>
              <div className="p-2 rounded-md bg-muted">
                <p className="font-medium">Development</p>
                <p className="text-sm text-muted-foreground">
                  React, Node.js, Python
                </p>
              </div>
            </div>
            <p className="mt-3">
              {createLink("See our full tech stack →", "/technology")}
            </p>
          </div>
        ),
      },
      {
        keywords: ["case study", "portfolio", "client", "example"],
        response: (
          <div>
            <p>Here are some of our success stories:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Retail: 30% increase in sales with AI recommendations</li>
              <li>Healthcare: Reduced patient wait times by 40%</li>
              <li>Finance: Fraud detection with 99.8% accuracy</li>
            </ul>
            <p className="mt-3">
              {createLink("View all case studies →", "/case-studies")}
            </p>
            <div className="mt-4">
              <Button onClick={() => setShowContactForm(true)}>
                <Briefcase className="h-4 w-4 mr-2" />
                Request specific examples
              </Button>
            </div>
          </div>
        ),
        triggerContactForm: true,
      },
      {
        keywords: ["time", "hours", "open", "availability"],
        response: (
          <div>
            <p>Our standard business hours:</p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Monday-Friday: 8:00 AM - 6:00 PM PST</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Saturday: 10:00 AM - 2:00 PM PST</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Sunday: Closed</span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Emergency support available 24/7 for enterprise clients
            </p>
          </div>
        ),
      },
    ];

    // Try to find a matching FAQ
    const matchedFaq = faqs.find(faq => 
      faq.keywords.some(keyword => input.includes(keyword))
    );

    if (matchedFaq) {
      return {
        response: matchedFaq.response,
        triggerContactForm: matchedFaq.triggerContactForm,
      };
    }

    // Default response for unmatched queries
    return {
      response: (
        <div>
          <p>I'm not sure I understood. Here are some things I can help with:</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <QuickActionButton
              text="Services"
              onClick={() => handleQuickAction("What services do you offer?")}
              icon={Briefcase}
            />
            <QuickActionButton
              text="Pricing"
              onClick={() => handleQuickAction("How much does it cost?")}
              icon={DollarSign}
            />
            <QuickActionButton
              text="Contact"
              onClick={() => handleQuickAction("How can I contact you?")}
              icon={Phone}
            />
            <QuickActionButton
              text="Consultation"
              onClick={() => handleQuickAction("Book a consultation")}
              icon={Calendar}
            />
          </div>
          <p className="mt-3">
            Or you can {createLink("visit our help center", "/help")} for more information.
          </p>
        </div>
      ),
    };
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    handleSendMessage(action);
  };

  const handleSendMessage = (customInput?: string) => {
    const messageText = customInput || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customInput) setInput("");

    simulateTyping(() => {
      const botResponse = getBotResponse(messageText);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse.response,
        sender: "bot",
        timestamp: new Date(),
        isContactForm: botResponse.triggerContactForm,
      };
      setMessages((prev) => [...prev, botMessage]);

      // Update conversation history
      const updatedHistory = [...conversationHistory, `User: ${messageText}`, `Bot: ${typeof botResponse.response === 'string' ? botResponse.response : 'JSX response'}`];
      setConversationHistory(updatedHistory);

      // If the response suggests contacting, send email notification
      if (botResponse.triggerContactForm) {
        sendEmailNotification(updatedHistory.join('\n'));
      }
    });
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!contactForm.name || !contactForm.email) {
      simulateTyping(() => {
        setMessages(prev => [...prev, {
          id: messages.length + 1,
          text: "Please provide at least your name and email address so we can contact you.",
          sender: "bot",
          timestamp: new Date(),
        }]);
      });
      return;
    }

    // Submit form data
    simulateTyping(() => {
      setContactFormSubmitted(true);
      
      // Send email with conversation history and contact info
      sendEmailNotification(
        conversationHistory.join('\n'),
        contactForm
      );

      // Add confirmation message
      setMessages(prev => [...prev, {
        id: messages.length + 1,
        text: (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-4 w-4" />
              <span>Thank you, {contactForm.name}! We've received your information.</span>
            </div>
            <p>Our team will contact you at {contactForm.email} within 24 hours.</p>
            <p className="text-sm text-muted-foreground">
              Reference: #{Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div>
        ),
        sender: "bot",
        timestamp: new Date(),
      }]);

      // Reset form
      setShowContactForm(false);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      if (isMinimized) setIsMinimized(false);
      else setIsOpen(false);
    }
  };

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  // WhatsApp integration suggestion
  const connectToWhatsApp = () => {
    simulateTyping(() => {
      setMessages(prev => [...prev, {
        id: messages.length + 1,
        text: (
          <div>
            <p>You can continue this conversation on WhatsApp:</p>
            <Button asChild className="mt-3 w-full">
              <a 
                href="https://wa.me/15551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Continue on WhatsApp
              </a>
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">
              Standard messaging rates may apply
            </p>
          </div>
        ),
        sender: "bot",
        timestamp: new Date(),
      }]);
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center",
          theme === "dark"
            ? "bg-primary text-primary-foreground"
            : "bg-primary text-primary-foreground"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "absolute bottom-20 right-0 w-80 sm:w-96 rounded-xl shadow-2xl overflow-hidden border flex flex-col",
            theme === "dark" ? "bg-card text-card-foreground" : "bg-white",
            isMinimized ? "h-16" : "h-[500px]"
          )}
        >
          {/* Header */}
          <div
            className={cn(
              "p-3 flex items-center justify-between cursor-pointer",
              theme === "dark"
                ? "bg-primary/90 text-primary-foreground"
                : "bg-primary text-primary-foreground"
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
              {/* Messages */}
              <div className="p-4 flex-1 overflow-y-auto">
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
                    {message.text}
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center text-sm italic text-muted-foreground">
                    <div className="flex space-x-1 mr-2">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    BDS AI is typing...
                  </div>
                )}
                {showContactForm && !contactFormSubmitted && (
                  <div className={cn(
                    "mb-4 p-3 rounded-lg",
                    theme === "dark" ? "bg-secondary text-secondary-foreground" : "bg-muted"
                  )}>
                    <form onSubmit={handleContactFormSubmit}>
                      <div className="space-y-3">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name*
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            className="w-full px-3 py-2 rounded-md bg-background border border-input"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email*
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            className="w-full px-3 py-2 rounded-md bg-background border border-input"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                            className="w-full px-3 py-2 rounded-md bg-background border border-input"
                          />
                        </div>
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-1">
                            How can we help?
                          </label>
                          <textarea
                            id="message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                            rows={3}
                            className="w-full px-3 py-2 rounded-md bg-background border border-input"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" className="flex-1">
                            Submit
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowContactForm(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-border">
                {!showContactForm && (
                  <>
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
                        onClick={() => handleSendMessage()}
                        className="rounded-full h-10 w-10 p-2"
                        disabled={!input.trim()}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        BDS AI Assistant • {new Date().getFullYear()}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs"
                        onClick={connectToWhatsApp}
                      >
                        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
