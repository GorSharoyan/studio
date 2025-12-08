'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { chat } from '@/app/actions';
import { ScrollArea } from './ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const supportTopics = [
    {
        category: "General",
        topics: [
            "What is Solution.am?",
            "Where are you located?",
        ]
    },
    {
        category: "Products",
        topics: [
            "What kind of products do you sell?",
            "Do you sell LED lamps?",
            "What brands do you carry?",
        ]
    },
    {
        category: "Partnership",
        topics: [
            "How to become a dealer?",
            "What are the benefits of being a dealer?",
        ]
    },
    {
        category: "Customer Service",
        topics: [
            "How can I give feedback?",
            "What is your contact information?",
        ]
    },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'bot', text: "Hello! How can I help you today? You can ask me a question or choose from the topics below." }]);
    } else {
      setMessages([]);
      setInput('');
      setIsLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const { response, error } = await chat(messageText);

    setIsLoading(false);
    
    if (error || !response) {
      const errorMessage: Message = { role: 'bot', text: error || "I'm sorry, something went wrong." };
      setMessages(prev => [...prev, errorMessage]);
    } else {
      const botMessage: Message = { role: 'bot', text: response };
      setMessages(prev => [...prev, botMessage]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  }

  const hasUserMessages = messages.some(m => m.role === 'user');

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 z-50"
          >
            <Card className="w-80 h-[500px] flex flex-col shadow-2xl sm:w-96">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bot className="w-5 h-5 text-primary" />
                  Solution.am Assistant
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7">
                    <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex gap-2 text-sm ${
                          message.role === 'bot' ? '' : 'justify-end'
                        }`}
                      >
                        {message.role === 'bot' && (
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-lg px-3 py-2 ${
                            message.role === 'bot'
                              ? 'bg-muted'
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.text}</p>
                        </div>
                        {message.role === 'user' && (
                            <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4" />
                            </div>
                        )}
                      </div>
                    ))}
                     {messages.length === 1 && !hasUserMessages && (
                        <div className="pt-2">
                           <Accordion type="single" collapsible className="w-full">
                                {supportTopics.map(item => (
                                    <AccordionItem value={item.category} key={item.category}>
                                        <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">{item.category}</AccordionTrigger>
                                        <AccordionContent className="pb-2">
                                            <div className="flex flex-wrap gap-2">
                                                {item.topics.map(topic => (
                                                    <Badge 
                                                        key={topic}
                                                        variant="outline"
                                                        className="cursor-pointer hover:bg-accent"
                                                        onClick={() => handleSendMessage(topic)}
                                                    >
                                                        {topic}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}
                    {isLoading && (
                        <div className="flex gap-2 text-sm">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted flex items-center">
                                <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                        </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                  <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    disabled={isLoading}
                    autoComplete="off"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-16 h-16 shadow-lg"
        aria-label="Toggle Chatbot"
      >
        <AnimatePresence>
        {isOpen ? (
            <motion.div
                key="close"
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 180, scale: 0 }}
                transition={{ duration: 0.2 }}
            >
                <X className="w-7 h-7" />
            </motion.div>
        ) : (
            <motion.div
                key="open"
                initial={{ rotate: 180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -180, scale: 0 }}
                transition={{ duration: 0.2 }}
            >
                <MessageCircle className="w-7 h-7" />
            </motion.div>
        )}
        </AnimatePresence>
      </Button>
    </>
  );
}
