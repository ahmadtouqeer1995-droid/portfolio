import { Link } from 'react-router-dom';
import { ArrowLeft, FileDown, Mail } from 'lucide-react';
import QRCode from 'react-qr-code';

import { InteractiveCanvas } from '@/components/ui/interactive-canvas';
import { neoButtonClasses } from '@/components/ui/neo-button';
import { StickyNote } from '@/components/ui/sticky-note';
import { TapedImage } from '@/components/ui/taped-image';
import { useLang, usePageMeta } from '@/i18n';

// Contact, pinboard style like the project pages — no panel: the WhatsApp QR
// taped to the dotted board, and the message on a crooked handwritten
// post-it with the email and CV buttons.

// WhatsApp: +33 6 51 96 47 71
const WHATSAPP_URL = 'https://wa.me/33651964771';

function Contact() {
  const { t } = useLang();
  usePageMeta(
    'Hire an AI Engineer in Paris — Ahmad Touqeer',
    'Email or WhatsApp me about your AI agent, automation, SaaS or website project. Based in Paris, working in English and French.'
  );

  return (
    <div className='relative h-full w-full bg-white'>
      <InteractiveCanvas />

      {/* Back to home */}
      <Link
        to='/'
        className='fixed top-6 left-6 z-50 flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm backdrop-blur-md transition-colors hover:bg-white/80'
      >
        <ArrowLeft className='h-4 w-4' />
        {t('home')}
      </Link>

      {/* Scrolls only if a small phone can't fit both pieces */}
      <div className='absolute inset-0 z-10 overflow-x-hidden overflow-y-auto'>
        <div className='flex min-h-full flex-col items-center justify-center gap-16 px-6 pt-24 pb-16 lg:flex-row lg:gap-24'>
          {/* The WhatsApp QR, taped up like a photo */}
          <a
            href={WHATSAPP_URL}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Chat on WhatsApp'
            className='transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03]'
          >
            <TapedImage tilt={-4} shift={-6}>
              <div className='flex flex-col items-center gap-4 px-8 pt-9 pb-6'>
                <QRCode value={WHATSAPP_URL} size={190} />
                <span className='font-scrawl text-2xl leading-none font-bold text-neutral-800'>{t('scanWhatsapp')}</span>
              </div>
            </TapedImage>
          </a>

          {/* The message, on a post-it */}
          <StickyNote paper='#fff3a3' tilt={2.6} shift={8} className='w-full max-w-[560px]' paperClassName='px-7 pt-8 pb-9 md:px-10'>
            <p className='font-hand text-sm tracking-wider text-neutral-600 uppercase'>{t('contactLabel')}</p>
            <h1 className='mt-2 font-scrawl text-5xl leading-[0.95] font-bold break-words text-neutral-900 md:text-6xl'>
              {t('contactHeading')} <span className='text-neutral-600'>{t('contactHeadingItalic')}</span>
            </h1>
            <p className='mt-5 font-hand text-base leading-relaxed text-neutral-800'>{t('contactText')}</p>

            <div className='mt-7 flex flex-wrap items-center gap-4'>
              <a href='mailto:ahmadtouqeer1995@gmail.com' className={`${neoButtonClasses()} max-w-full`}>
                <Mail />
                <span className='truncate'>ahmadtouqeer1995@gmail.com</span>
              </a>
              {/* CV lives in /public so it is served straight from the deploy */}
              <a
                href={`${import.meta.env.BASE_URL}Ahmad-Touqeer-CV.pdf`}
                target='_blank'
                rel='noopener noreferrer'
                className={neoButtonClasses({ variant: 'neutral' })}
              >
                <FileDown />
                {t('downloadCv')}
              </a>
            </div>
          </StickyNote>
        </div>
      </div>
    </div>
  );
}

export default Contact;
