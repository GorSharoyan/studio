'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { chat } from '@/app/actions';
import { ScrollArea } from './ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ role: 'bot', text: "Hello! How can I help you today? Ask me anything about Solution.am." }]);
    } else {
      setMessages([]);
      setInput('');
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const { response, error } = await chat(input);

    setIsLoading(false);
    
    if (error || !response) {
      const errorMessage: Message = { role: 'bot', text: error || "I'm sorry, something went wrong." };
      setMessages(prev => [...prev, errorMessage]);
    } else {
      const botMessage: Message = { role: 'bot', text: response };
      setMessages(prev => [...prev, botMessage]);
    }
  };

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
            <Card className="w-80 h-[500px] flex flex-col shadow-2xl">
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
                <ScrollArea className="h-full p-6" ref={scrollAreaRef}>
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
                          className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            message.role === 'bot'
                              ? 'bg-muted'
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          {message.text}
                        </div>
                        {message.role === 'user' && (
                            <div className="w-6 h-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4" />
                            </div>
                        )}
                      </div>
                    ))}
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
                <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
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
