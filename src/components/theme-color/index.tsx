'use client';
import { cn, EachElement } from '@/lib/utils';
import { COLOR_THEMES, ColorTheme, useThemeStore } from '@/stores/store-theme';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

const mapThemeToClass: Record<ColorTheme, { primary: string; secondary: string; accent: string; destructive: string }> = {
    "default": {
        primary: "bg-default-primary",
        secondary: "bg-default-secondary",
        accent: "bg-default-accent",
        destructive: "bg-default-destructive",
    },
    "neo": {
        primary: "bg-neo-primary",
        secondary: "bg-neo-secondary",
        accent: "bg-neo-accent",
        destructive: "bg-neo-destructive",
    },
    "material": {
        primary: "bg-material-primary",
        secondary: "bg-material-secondary",
        accent: "bg-material-accent",
        destructive: "bg-material-destructive",
    },
    "pastel": {
        primary: "bg-pastel-primary",
        secondary: "bg-pastel-secondary",
        accent: "bg-pastel-accent",
        destructive: "bg-pastel-destructive",
    },
    "spotify": {
        primary: "bg-spotify-primary",
        secondary: "bg-spotify-secondary",
        accent: "bg-spotify-accent",
        destructive: "bg-spotify-destructive",
    },
    "summer": {
        primary: "bg-summer-primary",
        secondary: "bg-summer-secondary",
        accent: "bg-summer-accent",
        destructive: "bg-summer-destructive",
    },
    "vscode": {
        primary: "bg-vscode-primary",
        secondary: "bg-vscode-secondary",
        accent: "bg-vscode-accent",
        destructive: "bg-vscode-destructive",
    },
};

const ThemeColor = () => {
    const { color, setColor } = useThemeStore();
    return (
        <div className='' >
            <Select defaultValue={color} onValueChange={setColor}>
                <SelectTrigger className="md:min-w-32 cursor-pointer" defaultValue={color}>
                    <SelectValue defaultValue={color} />
                </SelectTrigger>
                <SelectContent defaultValue={color}>
                    <SelectGroup>
                        <SelectLabel>{color.toUpperCase()}</SelectLabel>
                        <EachElement
                            of={COLOR_THEMES}
                            render={(theme) => (
                                <SelectItem className='cursor-pointer' key={theme} value={theme}>
                                    <div className="flex flex-row gap-2 items-center">
                                        {/* box preview ใช้ data-theme แทน */}
                                        <div data-theme={theme} className="bg-background relative size-[26px] rounded border p-1">
                                            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-[2px]">
                                                <div className={cn(
                                                    "rounded-[2px]",
                                                    mapThemeToClass[theme].primary
                                                )} />
                                                <div className={cn(
                                                    "rounded-[2px]",
                                                    mapThemeToClass[theme].secondary
                                                )} />
                                                <div className={cn(
                                                    "rounded-[2px]",
                                                    mapThemeToClass[theme].accent
                                                )} />
                                                <div className={cn(
                                                    "rounded-[2px]",
                                                    mapThemeToClass[theme].destructive
                                                )} />
                                            </div>
                                        </div>
                                        <span>{theme}</span>
                                    </div>
                                </SelectItem>
                            )}
                        />
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default ThemeColor;