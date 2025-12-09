'use client';

import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contacts() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-12 px-4">
        <h1 className="text-4xl font-headline font-bold mb-8 text-center">{t('contacts.title')}</h1>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('contacts.description')}
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('contacts.location')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.685211831414!2d44.5619374153898!3d40.21173597938883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406a97dd535150e7%3A0x2283226315c1e505!2sMoldovakan%20St%2027a%2C%20Yerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1728100593451!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('contacts.getInTouch')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg">
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{t('contacts.address')}</h3>
                  <p className="text-muted-foreground">{t('home.footer.address')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{t('contacts.phone')}</h3>
                  <a href="tel:+37491989595" className="text-muted-foreground hover:text-primary transition-colors">+37491989595</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">{t('contacts.email')}</h3>
                  <a href="mailto:info@solution.am" className="text-muted-foreground hover:text-primary transition-colors">info@solution.am</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
