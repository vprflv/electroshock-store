'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

const Select = SelectPrimitive.Root;

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={`flex h-12 w-full items-center justify-between rounded-2xl border border-zinc-700 
                    bg-zinc-900 px-4 py-3 text-sm text-white focus:outline-none 
                    focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 
                    transition-all ${className}`}
        {...props}
    >
        {children}
        <SelectPrimitive.Icon asChild>
            <ChevronDown className="h-4 w-4 opacity-70" />
        </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectValue = SelectPrimitive.Value;

const SelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={`relative z-50 min-w-[8rem] overflow-hidden rounded-2xl border border-zinc-700 
                        bg-zinc-900 text-white shadow-xl ${className}`}
            position={position}
            {...props}
        >
            <SelectPrimitive.Viewport className="p-1">
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={`relative flex w-full cursor-pointer select-none items-center rounded-xl py-3 pl-8 pr-4 text-sm 
                    outline-none hover:bg-zinc-800 focus:bg-zinc-800 
                    data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
        {...props}
    >
        <span className="absolute left-3 flex h-3.5 w-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
                <Check className="h-4 w-4 text-yellow-400" />
            </SelectPrimitive.ItemIndicator>
        </span>

        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
};