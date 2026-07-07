import { useState } from 'react';
import { Languages } from 'lucide-react';

import { LANGUAGES, useLang } from '@/i18n';

// Glass language selector — lives in the top-right menu on the home page.
export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <button
        type='button'
        aria-label='Choose language'
        onClick={() => setOpen((o) => !o)}
        className='flex items-center gap-2 rounded-full border border-white/50 bg-white/45 px-4 py-2.5 text-sm font-semibold text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/70'
      >
        <Languages className='h-4 w-4' />
        {lang.toUpperCase()}
      </button>

      {open && (
        <>
          {/* click-away backdrop */}
          <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />
          <div className='absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-white/50 bg-white/70 shadow-lg backdrop-blur-md'>
            {LANGUAGES.map((option) => (
              <button
                key={option.code}
                type='button'
                onClick={() => {
                  setLang(option.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-white ${
                  option.code === lang ? 'font-bold text-neutral-900' : 'text-neutral-700'
                }`}
              >
                {option.label}
                <span className='font-mono text-xs text-neutral-400 uppercase'>{option.code}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
