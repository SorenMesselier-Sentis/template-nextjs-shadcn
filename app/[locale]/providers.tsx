'use client';

import type { PropsWithChildren } from 'react';
import React from 'react';

import { I18nProviderClient } from '@/locales/config/client';

export function Providers(
  props: PropsWithChildren<{ locale: string }>
): React.JSX.Element {
  return (
    <I18nProviderClient locale={props.locale}>
      {props.children}
    </I18nProviderClient>
  );
}
