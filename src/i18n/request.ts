import fs from 'fs';
import { IntlConfig, Messages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import path from 'path';
import { EnabledLocale, routing } from './routing';


export default getRequestConfig(async ({ requestLocale }) => {
    let locale = (await requestLocale) as EnabledLocale | undefined;
    // Ensure that a valid locale is used
    if (!locale || !routing.locales.includes(locale)) {
        locale = routing.defaultLocale;
    }
    const langs: IntlConfig['messages'] = findLangDir(locale);
    const messages = {
        ...langs
    } as IntlConfig;
    return ({
        messages,
        locale
    });
});

export const findLangDir = (locale: string): IntlConfig['messages'] => {
    
    const dir = path.resolve();
    const langDir = path.join(dir, "src/messages", locale!);
    const allFile = fs.readdirSync(langDir) as string[];
    const messages: IntlConfig['messages'] = {};
    allFile.forEach(async file => {
        const key = path.basename(file, ".json");
        const data = fs.readFileSync(path.join(langDir, file), { encoding: "utf-8" });
        messages[key] = JSON.parse(data) as Messages;
    });
    return messages;

};

