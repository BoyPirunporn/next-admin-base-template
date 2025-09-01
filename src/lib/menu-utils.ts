import { EnabledLocale } from "@/i18n/routing";
import { MenuPermissionNode } from "@/model";
export const MapLocalMenu: Record<EnabledLocale, keyof Pick<MenuPermissionNode, "nameTH" | "nameEN">> = {
    "en": "nameEN",
    "th": "nameTH"
};


export type MenuLabelKey = 'nameTH' | 'nameEN';