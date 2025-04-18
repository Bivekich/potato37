import { Suspense } from 'react';
import Image from 'next/image';
import { getAboutPageData } from '../sanity/queries';
import { PortableText } from '@portabletext/react';

export const metadata = {
  title: 'О нас | Картофель 37',
  description:
    'Узнайте больше о компании Картофель 37 и нашей команде. Мы готовим с любовью!',
};

export default async function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <Suspense fallback={<AboutPageSkeleton />}>
        <AboutPageContent />
      </Suspense>
    </div>
  );
}

async function AboutPageContent() {
  const about = await getAboutPageData();

  return (
    <div>
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {about?.title || 'О нас'}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {about?.subtitle || 'История нашей компании'}
        </p>

        {about?.image?.url && (
          <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={about.image.url}
              alt={about.image.alt || 'О нас'}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {about?.description ? (
            <PortableText value={about.description} />
          ) : (
            <p>
              Компания &ldquo;Картофель 37&rdquo; была основана в 2023 году с
              идеей предоставлять жителям Иваново вкусную и качественную еду с
              доставкой на дом. Мы начинали как небольшое семейное предприятие,
              но быстро выросли благодаря качеству нашей продукции и отличному
              сервису.
            </p>
          )}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {about?.teamTitle || 'Наша команда'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {about?.teamMembers && about.teamMembers.length > 0
            ? about.teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl overflow-hidden shadow-sm border"
                >
                  {member.photo?.url && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={member.photo.url}
                        alt={member.photo.alt || member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground">{member.position}</p>
                  </div>
                </div>
              ))
            : // Заглушка, если нет данных
              ['Иван Картофелев', 'Мария Пюрешкина', 'Алексей Фритюров'].map(
                (name, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl overflow-hidden shadow-sm border"
                  >
                    <div className="relative h-64 w-full bg-muted flex items-center justify-center">
                      <span className="text-6xl">🧑‍🍳</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">{name}</h3>
                      <p className="text-muted-foreground">
                        {index === 0
                          ? 'Основатель и шеф-повар'
                          : index === 1
                            ? 'Менеджер по работе с клиентами'
                            : 'Шеф-повар'}
                      </p>
                    </div>
                  </div>
                )
              )}
        </div>
      </div>

      <div className="bg-primary/10 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Присоединяйтесь к нашей команде!
        </h2>
        <p className="text-lg mb-6">
          Мы всегда в поиске талантливых и энергичных людей, которые разделяют
          нашу страсть к еде.
        </p>
        <div className="inline-block">
          <a
            href="mailto:info@potato37.ru"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full font-medium text-lg"
          >
            Отправить резюме
          </a>
        </div>
      </div>
    </div>
  );
}

function AboutPageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="max-w-4xl mx-auto mb-16">
        <div className="h-12 bg-muted rounded mb-4 w-1/3"></div>
        <div className="h-6 bg-muted rounded mb-8 w-2/3"></div>

        <div className="relative w-full h-80 md:h-96 rounded-xl bg-muted mb-8"></div>

        <div className="space-y-4">
          <div className="h-5 bg-muted rounded w-full"></div>
          <div className="h-5 bg-muted rounded w-full"></div>
          <div className="h-5 bg-muted rounded w-5/6"></div>
          <div className="h-5 bg-muted rounded w-3/4"></div>
        </div>
      </div>

      <div className="mb-16">
        <div className="h-10 bg-muted rounded mb-8 w-1/4 mx-auto"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card rounded-xl overflow-hidden shadow-sm border"
            >
              <div className="h-64 w-full bg-muted"></div>
              <div className="p-6">
                <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
