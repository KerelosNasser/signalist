import React from 'react'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";

const InputField = ({name, label, placeholder, register, type = 'text', error, validation, disabled, value}: FormInputProps) => {
    return (
        <div className='space-y-2'>
            <Label htmlFor={name} className='form-label'>
                {label}
            </Label>
            <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className={cn('form-input', { 'opacity-50 cursor-not-allowed': disabled })}
                {...register(name, validation)}
                disabled={disabled}
                value={value}
            />
            {error && <p className='text-red-500 text-sm'>{error.message}</p>}
        </div>
    )
}
export default InputField
