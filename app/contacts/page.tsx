import { Suspense } from 'react';
import { getContactsPageData } from '../sanity/queries';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Globe,
} from 'lucide-react';

// Добавляем конфигурацию для ISR
export const revalidate = 3600; // Ревалидация каждый час

export const metadata = {
  title: 'Контакты | Картофель 37',
  description:
    'Свяжитесь с нами, чтобы заказать вкусную еду с доставкой или задать вопрос. Мы всегда рады помочь!',
};

export default async function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <Suspense fallback={<ContactsPageSkeleton />}>
        <ContactsPageContent />
      </Suspense>
    </div>
  );
}

async function ContactsPageContent() {
  const contacts = await getContactsPageData();

  // Получаем название соцсети и соответствующую иконку
  const getSocialIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('facebook')) return <Facebook className="w-5 h-5" />;
    if (lowerName.includes('instagram'))
      return <Instagram className="w-5 h-5" />;
    if (lowerName.includes('twitter')) return <Twitter className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  // Получаем координаты из строки "широта,долгота"
  const getMapCoordinates = (locationString: string) => {
    if (!locationString) return { lat: 57.005, lon: 40.9756 }; // Дефолтные координаты (Иваново)
    const [lat, lon] = locationString
      .split(',')
      .map((coord) => parseFloat(coord.trim()));
    return { lat: lat || 57.005, lon: lon || 40.9756 };
  };

  const coords = contacts?.mapLocation
    ? getMapCoordinates(contacts.mapLocation)
    : { lat: 57.005, lon: 40.9756 };

  return (
    <div>
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {contacts?.title || 'Контакты'}
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          {contacts?.subtitle || 'Свяжитесь с нами, чтобы заказать вкусную еду'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <PhoneCall className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Телефон</h3>
              <a
                href={`tel:${contacts?.phone || '+78005553535'}`}
                className="text-xl hover:text-primary transition-colors"
              >
                {contacts?.phone || '+7 (800) 555-35-35'}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Email</h3>
              <a
                href={`mailto:${contacts?.email || 'info@potato37.ru'}`}
                className="text-xl hover:text-primary transition-colors"
              >
                {contacts?.email || 'info@potato37.ru'}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">Адрес</h3>
              <p className="text-xl">
                {contacts?.address || 'г. Иваново, ул. Примерная, д. 37'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Время работы</h3>
              {contacts?.workHours && contacts.workHours.length > 0 ? (
                <ul className="space-y-1">
                  {contacts.workHours.map((item, index) => (
                    <li key={index} className="flex">
                      <span className="font-medium min-w-24">{item.days}:</span>
                      <span>{item.hours}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-1">
                  <li className="flex">
                    <span className="font-medium min-w-24">Пн-Пт:</span>
                    <span>10:00 - 22:00</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium min-w-24">Сб-Вс:</span>
                    <span>11:00 - 23:00</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium min-w-24">Доставка:</span>
                    <span>ежедневно с 10:00 до 21:30</span>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6">Мы на карте</h3>
          <div className="aspect-square md:aspect-auto md:h-[400px] bg-muted rounded-xl overflow-hidden shadow-sm border relative">
            <iframe
              src={`https://yandex.ru/map-widget/v1/?ll=${coords.lon},${coords.lat}&z=16&pt=${coords.lon},${coords.lat},org`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Мы в социальных сетях</h2>
        <div className="flex flex-wrap gap-4">
          {contacts?.socialLinks && contacts.socialLinks.length > 0 ? (
            contacts.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-card hover:bg-muted border rounded-full px-6 py-3 transition-colors"
              >
                {getSocialIcon(link.name)}
                <span>{link.name}</span>
              </a>
            ))
          ) : (
            <>
              <a
                href="#"
                className="flex items-center gap-2 bg-card hover:bg-muted border rounded-full px-6 py-3 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-card hover:bg-muted border rounded-full px-6 py-3 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-card hover:bg-muted border rounded-full px-6 py-3 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactsPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="max-w-4xl mx-auto mb-12">
        <div className="h-12 bg-muted rounded mb-4 w-1/3"></div>
        <div className="h-6 bg-muted rounded mb-12 w-2/3"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="bg-muted p-3 rounded-full h-12 w-12"></div>
              <div className="flex-1">
                <div className="h-5 bg-muted rounded mb-2 w-1/4"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="h-8 bg-muted rounded mb-6 w-1/3"></div>
          <div className="aspect-square md:aspect-auto md:h-[400px] bg-muted rounded-xl"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="h-8 bg-muted rounded mb-6 w-1/3"></div>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-muted rounded-full w-32"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
