// components/ComboBox.tsx
"use client";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import RenderIcon, { IconName } from "./render-icon";
type Option = { label: string; value: string; };

interface ComboBoxProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    // next: () => void;
    // prevent: () => void;
    // disabledNext: boolean;
    // disabledPrevent: boolean;
    inputValue: string;
    onInputChange: (s: string) => void;
}

export function ComboBoxIcon(
    {
        options,
        value,
        onChange,
        placeholder = "Select...",
        label,
        // next,
        // prevent,
        // disabledNext,
        // disabledPrevent,
        onInputChange,
        inputValue
    }: ComboBoxProps) {
    const [open, setOpen] = useState(false);
    
    const selectedLabel = options.find((o) => o.value === value)?.label;

    
    return (
        <div className="w-full">
            {label && <label className="mb-1 block text-sm font-medium">{label}</label>}
            <Button variant="outline" onClick={() => setOpen(true)} type="button" className="w-full justify-between">
                <div className="flex items-center gap-2">
                    {value && <RenderIcon name={value as IconName} />}
                    <span>{selectedLabel ?? placeholder}</span>
                </div>
                <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    value={inputValue}
                    onValueChange={onInputChange}
                    placeholder="Search icons..." />
                <CommandList className="max-h-60 overflow-auto">
                    <CommandEmpty>No results found</CommandEmpty>
                    {options.map((option) => {
                        return (
                            <CommandItem
                                key={option.value}
                                value={option.label}
                                onSelect={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                            >
                                <CheckIcon className={`mr-2 h-4 w-4 ${value === option.value ? "opacity-100" : "opacity-0"}`} />
                                <RenderIcon name={option.value.substring(0,1).toUpperCase() + option.value.substring(1) as IconName} />
                                {option.label}
                            </CommandItem>
                        );
                    })}
                </CommandList>
                {/* <div className="flex gap-2 justify-end items-center">
                    <Button disabled={disabledPrevent} variant="outline" onClick={prevent} type="button" className="w-10">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button disabled={disabledNext} variant="outline" onClick={next} type="button" className="w-10">
                        <ChevronRight className=" h-4 w-4" />
                    </Button>
                </div> */}
            </CommandDialog>
        </div>
    );
}
