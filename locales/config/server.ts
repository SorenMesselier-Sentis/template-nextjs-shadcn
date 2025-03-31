import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import('../translations/en/common'),
  fr: () => import('../translations/fr/common'),
});
