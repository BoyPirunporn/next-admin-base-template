import { defineRouting } from "next-intl/routing";

export const locales = ["en", "th"] as const;
export type EnabledLocale = (typeof locales)[number];

export const routing = defineRouting({
    locales,
    defaultLocale: "th",
    localePrefix: {
        mode: 'always',
        prefixes: {
            'en': '/en',
            'th': '/th'
            // (/zh will be used as-is)
        }
    }
});