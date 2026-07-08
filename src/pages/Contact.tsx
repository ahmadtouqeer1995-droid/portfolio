import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import QRCode from 'react-qr-code';

import FluidCursor from '@/components/FluidCursor';
import { useLang, usePageMeta } from '@/i18n';

// WhatsApp: +33 6 51 96 47 71
const WHATSAPP_URL = 'https://wa.me/33651964771';

function Contact() {
  const { t } = useLang();
  usePageMeta(
    'Hire a Shopify Developer in Paris — Ahmad Touqeer',
    'Email or WhatsApp me about your store, web app or automation project. Based in Paris, working in English and French.'
  );

  return (
    <div className='relative h-full w-full bg-white'>
      {/* Reactive fluid background — orange / gold / magenta mix */}
      <FluidCursor hues={[0.08, 0.14, 0.9]} />

      {/* Back to home */}
      <Link
        to='/'
        className='absolute top-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/70'
      >
        <ArrowLeft className='h-4 w-4' />
        {t('home')}
      </Link>

      <div className='relative z-10 flex h-full w-full items-center justify-center px-4'>
        <section className='w-full max-w-[820px] rounded-[2.5rem] border border-white/60 bg-white/30 p-8 shadow-lg shadow-black/5 backdrop-blur-md md:p-12'>
          {/* WhatsApp QR — top of the grid */}
          <div className='flex justify-center pb-8'>
            <a
              href={WHATSAPP_URL}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Chat on WhatsApp'
              className='flex flex-col items-center gap-3 rounded-2xl border border-white/60 bg-white p-5 shadow-sm transition-transform hover:scale-[1.03]'
            >
              <QRCode value={WHATSAPP_URL} size={180} />
              <span className='font-mono text-xs tracking-widest text-neutral-500 uppercase'>
                {t('scanWhatsapp')}
              </span>
            </a>
          </div>

          <p className='font-mono text-xs tracking-widest text-neutral-500 uppercase'>
            {t('contactLabel')}
          </p>
          <h1 className='mt-3 text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl'>
            {t('contactHeading')}{' '}
            <span className='italic font-light'>{t('contactHeadingItalic')}</span>
          </h1>
          <p className='mt-8 leading-relaxed text-neutral-600'>{t('contactText')}</p>

          <div className='mt-8'>
            <a
              href='mailto:ahmadtouqeer2011@gmail.com'
              className='inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700'
            >
              <Mail className='h-4 w-4' />
              ahmadtouqeer2011@gmail.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contact;
