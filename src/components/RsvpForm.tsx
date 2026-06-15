import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const RSVP_URL = 'https://functions.poehali.dev/61ec734c-bdc5-4b52-96ff-969b3b1c5788';

const SALADS = [
  'Тёплый салат с баклажанами',
  'Салат с морепродуктами и сливочно-устричным соусом',
  'Цезарь с курицей',
  '«Почти оливье» с копчёным цыплёнком',
];

const DISHES = [
  'Филе судака с жасминовым рисом',
  'Куриное филе гриль с картофелем шато',
  'Телятина с овощами и паназиатским соусом',
  'Буженина в горчичном соусе с картофелем по-деревенски',
];

export default function RsvpForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | null>(null);
  const [salad, setSalad] = useState('');
  const [dish, setDish] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attending) {
      setError('Пожалуйста, заполните имя и укажите присутствие');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(RSVP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, attending, salad, dish }),
      });
      if (!res.ok) throw new Error('Ошибка отправки');
      setSent(true);
    } catch {
      setError('Не удалось отправить. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="font-display text-3xl font-light">Спасибо!</p>
        <p className="text-muted-foreground text-sm">Ваш ответ получен. Мы очень рады!</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input
        placeholder="Ваше имя и фамилия"
        className="h-12 bg-secondary/40 border-border rounded-none"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="tel"
        placeholder="Телефон для связи"
        className="h-12 bg-secondary/40 border-border rounded-none"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        {(['yes', 'no'] as const).map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => setAttending(val)}
            className={`h-12 border text-sm uppercase tracking-[0.15em] transition-colors ${
              attending === val
                ? 'border-accent text-accent bg-accent/10'
                : 'border-border bg-secondary/40 hover:border-accent hover:text-accent'
            }`}
          >
            {val === 'yes' ? 'Буду' : 'Не смогу'}
          </button>
        ))}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Выбор салата</p>
        <div className="space-y-2">
          {SALADS.map((item) => (
            <label key={item} className="flex items-center gap-3 p-3 border border-border bg-secondary/40 cursor-pointer hover:border-accent transition-colors group">
              <input
                type="radio"
                name="salad"
                value={item}
                checked={salad === item}
                onChange={() => setSalad(item)}
                className="accent-current"
              />
              <span className="text-sm group-hover:text-accent transition-colors">{item}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Выбор основного блюда</p>
        <div className="space-y-2">
          {DISHES.map((item) => (
            <label key={item} className="flex items-center gap-3 p-3 border border-border bg-secondary/40 cursor-pointer hover:border-accent transition-colors group">
              <input
                type="radio"
                name="dish"
                value={item}
                checked={dish === item}
                onChange={() => setDish(item)}
                className="accent-current"
              />
              <span className="text-sm group-hover:text-accent transition-colors">{item}</span>
            </label>
          ))}
        </div>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-none text-sm uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        {loading ? 'Отправляем...' : 'Отправить ответ'}
      </Button>
    </form>
  );
}
