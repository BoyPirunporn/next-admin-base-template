import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { cn, EachElement } from '@/lib/utils';
import { ResponseApiWithPayload } from '@/model';
import { useQuery } from '@tanstack/react-query';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import React, { useState } from 'react';
import { Control, ControllerRenderProps, FieldPath, FieldPathValue, FieldValues, Path } from 'react-hook-form';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface Option {
  label: string;
  value: string | number;
}
interface BaseProps<T extends FieldValues, TName extends FieldPath<T> = FieldPath<T>> {
  control: Control<T>;
  name: TName;
  label: string;
  placeholder?: string;
  rows?: number;
  defaultValue?: FieldPathValue<T, TName>;
  readonly?: boolean;

}

interface InputVariantProps<T extends FieldValues> extends BaseProps<T> {
  variant?: "input" | "textarea";
  customSelectChildren?: React.ReactNode;
  type?: React.ComponentProps<"input">['type'];

}
interface SelectVariantProps<T extends FieldValues> extends BaseProps<T> {
  variant: "select";
  options: Option[];
  customSelectChildren?: React.ReactNode; // 👈 เพิ่มตรงนี้

}
interface CheckboxVariantProps<T extends FieldValues> extends BaseProps<T> {
  variant: "checkbox";
  items: Option[];
  customSelectChildren?: React.ReactNode; // 👈 เพิ่มตรงนี้

}
interface AutocompleteVariantProps<T extends FieldValues, TItem = any> extends BaseProps<T> {
  variant: "autocomplete";
  customSelectChildren?: React.ReactNode; // 👈 เพิ่มตรงนี้
  uri: string;
  transformFn: (data: T[]) => Option[];
  mapValueBeforSet: (data: T[], value: string) => T;
}

type FormInputFieldProps<T extends FieldValues> = InputVariantProps<T> | SelectVariantProps<T> | CheckboxVariantProps<T> | AutocompleteVariantProps<T>;


export function FormInputField<T extends FieldValues>(props: FormInputFieldProps<T>) {
  const {
    control,
    name,
    label,
    placeholder,
    readonly = false,
    variant = 'input',
    rows = 3,
    customSelectChildren,
    defaultValue,
  } = props;
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, ...propsForm }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {variant === 'textarea' ? (
              <textarea readOnly={readonly} {...field} placeholder={placeholder} rows={rows} className="w-full rounded border p-2" />
            ) : variant === "checkbox" ? (
              renderCheckbox()
            ) : variant === 'select' ? (
              renderSelect(field)
            ) : variant === "autocomplete" ? (
              <FormAutocomplete
                value={field.value}
                disabled={readonly}
                onChange={(data, value) => {
                  const mapValue = (props as AutocompleteVariantProps<T>).mapValueBeforSet(data, value);
                  field.onChange(mapValue);
                }}
                name={name}
                transformFn={(props as AutocompleteVariantProps<T>).transformFn}
                uri={(props as AutocompleteVariantProps<T>).uri}
              />
            ) : (
              <Input {...field} autoComplete='off' readOnly={readonly} placeholder={placeholder} type={(props as InputVariantProps<T>).type} className='w-full' />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  function renderSelect(field: ControllerRenderProps<T, Path<T>>): React.ReactNode {
    const { options } = props as SelectVariantProps<T>;
    const [open, setOpen] = useState(false);
    return (
      <Select value={field.value.toString()} onValueChange={field.onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {customSelectChildren ??
            options?.map((option) => {
              return (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    );
  }

  function renderCheckbox(): React.ReactNode {
    const { items } = props as CheckboxVariantProps<T>;
    return <EachElement
      of={items}
      render={(item) => (
        <FormField
          key={item.value as string}
          control={control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem
                key={item.value as string}
                className="flex flex-row items-center gap-2"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item.value)}
                    onCheckedChange={readonly ? undefined : (checked) => {
                      return checked
                        ? field.onChange([...field.value, item])
                        : field.onChange(
                          field.value?.filter(
                            (value: Option) => value !== item
                          )
                        );
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {item.label}
                </FormLabel>
              </FormItem>
            );
          }} />
      )} />;
  }
}

type FormAutocompleteProps<T> = {
  value: string | undefined;
  onChange: (data: T[], value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name: string;
  uri: string;
  transformFn: (data: T[]) => Option[];
};

export function FormAutocomplete<T>({
  value,
  name,
  onChange,
  placeholder = "Select...",
  disabled = false,
  transformFn,
  uri
}: FormAutocompleteProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [commandInput, setCommandInput] = useState<string>("");
  const [selected, setSelected] = useState("");
  const debouncedValue = useDebounce(commandInput, 500);

  const { data: originalData } = useQuery<ResponseApiWithPayload<T[]>, Error>({
    queryKey: ["autocomplete" + name, debouncedValue],
    queryFn: async ({ signal }) => {
      try {
        const res = await fetch(uri, {
          method: "POST",
          signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            value: debouncedValue
          })
        });

        return res.json() as Promise<ResponseApiWithPayload<T[]>>;
      } catch (error) {
        // logger.debug(error);
        return null as unknown as ResponseApiWithPayload<T[]>;
      }
    },
    // select: (data) => transformFn?.(data.payload) ?? [],
    enabled: debouncedValue.length > 3,
    retry: false
  });
  // original payload
  const payload = originalData?.payload ?? [];

  // mapped options
  const items = React.useMemo(
    () => transformFn?.(payload) ?? [],
    [payload, transformFn]
  );

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          role="combobox"
          variant="outline"
          aria-expanded={open && !disabled}
          disabled={disabled}
          className="w-full min-w-0 justify-between"
        >
          {selected.length ? selected : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search..." onValueChange={setCommandInput} />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            {items && items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.label}
                onSelect={() => {
                  onChange(originalData?.payload!, item.value as string);
                  setSelected(item.label);
                  setOpen(false);
                }}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    item.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

