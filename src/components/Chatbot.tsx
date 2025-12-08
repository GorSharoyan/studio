'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageCircle, X, Bot, User, ArrowLeft } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useLanguage } from '@/hooks/use-language';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const supportTopics = [
      {
          category: t('chatbot.topics.general.category'),
          topics: [
              { key: 'what-is', question: t('chatbot.topics.general.what-is.question')},
              { key: 'location', question: t('chatbot.topics.general.location.question')},
          ]
      },
      {
          category: t('chatbot.topics.products.category'),
          topics: [
              { key: 'products', question: t('chatbot.topics.products.products.question')},
              { key: 'led-lamps', question: t('chatbot.topics.products.led-lamps.question')},
              { key: 'brands', question: t('chatbot.topics.products.brands.question')},
          ]
      },
      {
          category: t('chatbot.topics.partnership.category'),
          topics: [
              { key: 'become-dealer', question: t('chatbot.topics.partnership.become-dealer.question')},
              { key: 'dealer-benefits', question: t('chatbot.topics.partnership.dealer-benefits.question')},
          ]
      },
      {
          category: t('chatbot.topics.customer-service.category'),
          topics: [
              { key: 'feedback', question: t('chatbot.topics.customer-service.feedback.question')},
              { key: 'contact', question: t('chatbot.topics.customer-service.contact.question')},
          ]
      },
  ];

  const supportAnswers: Record<string, string> = {
      'what-is': t('chatbot.topics.general.what-is.answer'),
      'location': t('chatbot.topics.general.location.answer'),
      'products': t('chatbot.topics.products.products.answer'),
      'led-lamps': t('chatbot.topics.products.led-lamps.answer'),
      'brands': t('chatbot.topics.products.brands.answer'),
      'become-dealer': t('chatbot.topics.partnership.become-dealer.answer'),
      'dealer-benefits': t('chatbot.topics.partnership.dealer-benefits.answer'),
      'feedback': t('chatbot.topics.customer-service.feedback.answer'),
      'contact': t('chatbot.topics.customer-service.contact.answer')
  };
  
  const initialMessage: Message = { role: 'bot', text: t('chatbot.initialMessage') };
  const hasUserMessages = messages.some(m => m.role === 'user');

  useEffect(() => {
    if (isOpen) {
      handleBackToTopics();
    } else {
      setMessages([]);
    }
  }, [isOpen, t]);

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
                  {t('chatbot.title')}
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
                          {t('chatbot.backToTopics')}
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
