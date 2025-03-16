
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TextareaFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  placeholder = 'Enter text here...',
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="resize-y min-h-[120px]"
      />
    </div>
  );
};

export default TextareaField;
