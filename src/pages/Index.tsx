import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RsvpForm from '@/components/RsvpForm';

const BRIDE = 'Александр';
const GROOM = 'Юлия';
const DATE = '10 октября 2026';

const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShow(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-none`}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const schedule = [
  { time: '13:00', title: 'Сбор гостей', desc: '', icon: 'Wine' },
  { time: '14:00', title: 'Церемония', desc: 'Самый волнительный момент\nнашего дня', icon: 'Heart' },
  { time: '15:00', title: 'Фотосессия', desc: 'Незабываемые кадры этого\nособенного дня', icon: 'Camera' },
  { time: '16:30', title: 'Банкет', desc: 'Ужин, тосты и первый танец', icon: 'Utensils', place: 'Ресторан «Парус»', placeUrl: 'https://yandex.ru/maps/org/parus/1592493403/?ll=43.477512%2C56.225959&z=15.74' },

];

const gifts = [
  { title: 'Путешествие мечты', desc: 'Поможем осуществить наш свадебный вояж', icon: 'Plane' },
  { title: 'Уют в доме', desc: 'Вещи для нашего общего гнёздышка', icon: 'Home' },
];

const gallery = [
  'https://cdn.poehali.dev/projects/f41c6218-6862-440d-a193-7f604335314e/files/1a6a6933-b0bd-4b8d-b5ce-d056923e20dc.jpg',
  'https://cdn.poehali.dev/projects/f41c6218-6862-440d-a193-7f604335314e/files/21dcb505-f0b3-455b-a6c6-4d8e1e6c9a7a.jpg',
  'https://cdn.poehali.dev/projects/f41c6218-6862-440d-a193-7f604335314e/files/6d69b4c6-3a63-4348-bc89-97bbb8931f47.jpg',
];

const nav = [
  { id: 'event', label: 'Событие' },
  { id: 'schedule', label: 'Программа' },
  { id: 'dresscode', label: 'Дресс-код' },
  { id: 'gifts', label: 'Подарки' },
  { id: 'rsvp', label: 'Анкета' },
];

const Index = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-sm bg-background/70 border-b border-border/60">
        <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="font-display text-xl tracking-widest-xl">А <span className="text-accent">&#38;</span> Ю</button>
          <ul className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {nav.map((n) => (
              <li key={n.id}>
                <button onClick={() => scrollTo(n.id)} className="hover:text-foreground transition-colors">
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.poehali.dev/projects/f41c6218-6862-440d-a193-7f604335314e/bucket/180d7504-70de-4546-b28a-55e8064e1b16.jpg"
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at center, transparent 20%, hsl(40,33%,98%) 75%)'}} />
        </div>
        <div className="relative z-10 animate-fade-in">
          <p className="text-xs md:text-sm uppercase tracking-widest-xl text-muted-foreground mb-8">
            Мы женимся
          </p>
          <h1 className="font-display font-light leading-[0.95]">
            <span className="block text-6xl md:text-8xl lg:text-9xl">{BRIDE}</span>
            <span className="block text-3xl md:text-5xl my-3 md:my-5 italic font-light text-[#827a73]">&amp;</span>
            <span className="block text-6xl md:text-8xl lg:text-9xl">{GROOM}</span>
          </h1>
          <div className="mt-10 flex items-center justify-center gap-4 text-muted-foreground">
            <span className="h-px w-12 bg-border" />
            <span className="text-sm md:text-base uppercase tracking-[0.25em]">{DATE}</span>
            <span className="h-px w-12 bg-border" />
          </div>
        </div>
        <button
          onClick={() => scrollTo('event')}
          className="absolute bottom-10 z-10 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Вниз"
        >
          <Icon name="ChevronDown" size={28} className="animate-bounce" />
        </button>
      </section>

      {/* EVENT */}
      <section id="event" className="py-28 md:py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-widest-xl text-accent mb-5">О событии</p>
            <h2 className="font-display text-4xl md:text-6xl font-light mb-6">
              Дорогие гости
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-lg mb-4">
              С большой радостью приглашаем вас разделить с нами день, когда мы станем
              одной семьёй. Будем счастливы видеть вас рядом.
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-lg">
              Наше торжество рассчитано на взрослую аудиторию. Пожалуйста, оставьте малышей дома — так вы сможете полностью погрузиться в атмосферу праздника.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-px bg-border mt-16 border border-border">
            {[
              { icon: 'Calendar', label: 'Дата', value: DATE },
              { icon: 'Clock', label: 'Время', value: 'Сбор в 13:00' },
              { icon: 'MapPin', label: 'Место', value: 'г. Дзержинск, Дворец Культуры Химиков' },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 0.12}>
                <div className="bg-background py-12 px-6 h-full flex flex-col items-center">
                  <Icon name={item.icon} size={28} className="text-accent mb-5" strokeWidth={1.2} />
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{item.label}</p>
                  <p className="font-display text-2xl">{item.value}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-28 md:py-40 px-6 bg-secondary/40">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-20">
            <p className="text-xs uppercase tracking-widest-xl text-accent mb-5">Программа дня</p>
            <h2 className="font-display text-4xl md:text-6xl font-light">Как пройдёт день</h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[27px] md:left-1/2 top-2 bottom-2 w-px bg-border md:-translate-x-1/2" />
            <div className="space-y-12">
              {schedule.map((s, i) => (
                <Reveal key={s.time} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2 md:px-10 flex-shrink-0">
                      <div className={`flex items-center gap-4 ${i % 2 === 0 ? 'md:justify-end md:text-right' : 'md:justify-start'}`}>
                        <div className="relative z-10 w-14 h-14 rounded-full bg-background border border-border flex items-center justify-center md:hidden">
                          <Icon name={s.icon} size={20} className="text-accent" strokeWidth={1.3} />
                        </div>
                        <div>
                          <p className="font-display text-3xl text-accent">{s.time}</p>
                          <h3 className="font-display text-2xl mt-1">{s.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1 whitespace-pre-line">{s.desc}</p>
                          {s.place && s.placeUrl && (
                            <a href={s.placeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-accent hover:underline mt-1">
                              <Icon name="MapPin" size={13} strokeWidth={1.5} />
                              {s.place}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-14 h-14 rounded-full bg-background border border-border items-center justify-center">
                      <Icon name={s.icon} size={20} className="text-accent" strokeWidth={1.3} />
                    </div>
                    <div className="md:w-1/2" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DRESSCODE */}
      <section id="dresscode" className="py-28 md:py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal className="mb-16">
            <p className="text-xs uppercase tracking-widest-xl text-accent mb-5">Дресс-код</p>
            <h2 className="font-display text-4xl md:text-6xl font-light mb-6">Цветовая гамма</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-lg">
              Мы будем рады, если ваши наряды впишутся в общую палитру торжества.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 justify-items-center">
              {[
                { color: '#F5E6C8', name: 'Шампань' },
                { color: '#C8B8A2', name: 'Пыльный беж' },
                { color: '#A89880', name: 'Тёплый тауп' },
                { color: '#7B4F2E', name: 'Коричневый' },
              ].map((c) => (
                <div key={c.color} className="flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 border border-border/50"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-xs text-muted-foreground uppercase tracking-[0.15em]">{c.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="grid sm:grid-cols-2 gap-6 text-left max-w-xl mx-auto">
              <div className="border border-border p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-accent mb-3">Приветствуется</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Нюдовые и бежевые тона</li>
                  <li>Коричневые оттенки</li>
                  <li></li>
                  <li>Классический чёрный</li>
                </ul>
              </div>
              <div className="border border-border p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Лучше избежать</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Рисунков с цветами</li>
                  <li>Яркие неоновые цвета</li>
                  <li>Камуфляж и принты</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GIFTS */}
      <section id="gifts" className="py-28 md:py-40 px-6 bg-secondary/40">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal className="mb-16">
            <p className="text-xs uppercase tracking-widest-xl text-accent mb-5">Реестр подарков</p>
            <h2 className="font-display text-4xl md:text-6xl font-light mb-6">Идеи для подарков</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-lg">
              Самое ценное для нас — ваше присутствие на свадьбе. Если вы захотите сделать подарок, мы будем рады любому вкладу в наш семейный бюджет — эти средства помогут нам осуществить давнюю мечту.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {gifts.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.12}>
                <div className="bg-background border border-border p-10 h-full flex flex-col items-center hover:border-accent transition-colors duration-300">
                  <Icon name={g.icon} size={30} className="text-accent mb-5" strokeWidth={1.2} />
                  <h3 className="font-display text-2xl mb-2">{g.title}</h3>
                  <p className="text-muted-foreground text-sm">{g.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="py-28 md:py-40 px-6">
        <div className="max-w-xl mx-auto">
          <Reveal className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest-xl text-accent mb-5">Подтверждение</p>
            <h2 className="font-display text-4xl md:text-6xl font-light mb-6">Будете ли вы с нами?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Пожалуйста, подтвердите присутствие до 31 августа 2026
            </p>
          </Reveal>
          <RsvpForm />
        </div>
      </section>

      <footer className="py-16 px-6 border-t border-border text-center">
        <p className="font-display text-3xl tracking-widest-xl mb-3">А & Ю
</p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{DATE} · С любовью</p>
      </footer>
    </div>
  );
};

export default Index;