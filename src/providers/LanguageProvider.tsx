"use client";
import { EnabledLocale } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { DeepPartial } from 'react-hook-form';

const LanguageProvider = ({
    children,
    messages,
    locale
}: {
    children: React.ReactNode;
    messages: DeepPartial<Record<string, any>> | null | undefined;
    locale: string;
}) => {
    return (
        <NextIntlClientProvider locale={locale as EnabledLocale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
};

export default LanguageProvider;