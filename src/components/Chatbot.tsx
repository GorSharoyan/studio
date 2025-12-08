'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageCircle, X, Bot, User, ArrowLeft } from 'lucide-react';
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
            { key: 'what-is', question: "What is Solution.am?"},
            { key: 'location', question: "Where are you located?"},
        ]
    },
    {
        category: "Products",
        topics: [
            { key: 'products', question: "What kind of products do you sell?"},
            { key: 'led-lamps', question: "Do you sell LED lamps?"},
            { key: 'brands', question: "What brands do you carry?"},
        ]
    },
    {
        category: "Partnership",
        topics: [
            { key: 'become-dealer', question: "How to become a dealer?"},
            { key: 'dealer-benefits', question: "What are the benefits of being a dealer?"},
        ]
    },
    {
        category: "Customer Service",
        topics: [
            { key: 'feedback', question: "How can I give feedback?"},
            { key: 'contact', question: "What is your contact information?"},
        ]
    },
];

const supportAnswers: Record<string, string> = {
    'what-is': 'Solution.am, established in 2015, is a leading reseller and importer of high-quality automobile parts in Armenia. Our slogan is "Creative Solutions for Modern Problems".',
    'location': "We are located at Hakob Hakobyan St., 3 Building, Yerevan, Armenia. You can find a map on our '/contacts' page.",
    'products': "We sell a wide variety of car parts, including lamps (halogen, LED, xenon), filters, brake parts, and engine components. You can see our full catalog on the '/shop' page.",
    'led-lamps': "Yes, we sell a wide variety of lamps, including LED, xenon, and halogen types. You can find them in our '/shop' section.",
    'brands': "We carry many top brands, including NAITE, Bosch, Hella, and Nissens. You can see a full list of our partner brands on our home page.",
    'become-dealer': "To become a dealer, interested parties can fill out the application form on our '/dealer' page on the website. As a dealer, you get access to our extensive catalog of high-quality parts at competitive prices, a dedicated support team, and inclusion in our network, which can help grow your business. We'd love to hear from you!",
    'dealer-benefits': "As a dealer, you get access to our extensive catalog of high-quality parts at competitive prices, a dedicated support team, and inclusion in our network, which can help grow your business.",
    'feedback': "We value your opinion! Customers can use the form on the '/feedback' page to share their thoughts and help us improve.",
    'contact': "You can reach us at info@solution.am or call us at +37491989595. Our office is at Hakob Hakobyan St., 3 Building, Yerevan, Armenia."
};

const initialMessage: Message = { role: 'bot', text: "Hello! How can I help you today? You can ask me a question or choose from the topics below." };

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const hasUserMessages = messages.some(m => m.role === 'user');

  useEffect(() => {
    if (isOpen) {
      handleBackToTopics();
    } else {
      setMessages([]);
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

  const handleTopicClick = (question: string, answerKey: string) => {
    const userMessage: Message = { role: 'user', text: question };
    const botMessage: Message = { role: 'bot', text: supportAnswers[answerKey] || "I'm sorry, I don't have an answer for that." };
    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleBackToTopics = () => {
    setMessages([initialMessage]);
  }
  
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
                  <User className="w-5 h-5 text-primary" />
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
                     {!hasUserMessages && (
                        <div className="pt-2">
                           <Accordion type="single" collapsible className="w-full">
                                {supportTopics.map(item => (
                                    <AccordionItem value={item.category} key={item.category}>
                                        <AccordionTrigger className="text-sm font-semibold hover:no-underline py-2">{item.category}</AccordionTrigger>
                                        <AccordionContent className="pb-2">
                                            <div className="flex flex-wrap gap-2">
                                                {item.topics.map(topic => (
                                                    <Badge 
                                                        key={topic.key}
                                                        variant="outline"
                                                        className="cursor-pointer hover:bg-accent"
                                                        onClick={() => handleTopicClick(topic.question, topic.key)}
                                                    >
                                                        {topic.question}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}
                    {hasUserMessages && (
                      <div className="pt-4 flex justify-center">
                        <Button variant="outline" onClick={handleBackToTopics}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Back to Topics
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
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
