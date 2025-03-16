
import React from 'react';
import { FormElement } from '@/utils/xmlParser';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const TextField: React.FC<{
  element: FormElement;
  onChange: (value: string) => void;
  value: string;
}> = ({ element, onChange, value }) => {
  return (
    <div className="space-y-2 animate-slide-up">
      <Label 
        htmlFor={element.id}
        className="text-sm font-medium flex items-center gap-1"
      >
        {element.label}
        {element.required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={element.id}
        placeholder={element.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="transition-all duration-200 focus:ring-2 focus:ring-primary/30"
        required={element.required}
      />
      {element.hint && (
        <p className="text-xs text-muted-foreground">{element.hint}</p>
      )}
    </div>
  );
};

export default TextField;
