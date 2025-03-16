
import React from 'react';
import { FormElement } from '@/utils/xmlParser';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const RadioField: React.FC<{
  element: FormElement;
  onChange: (value: string) => void;
  value: string;
}> = ({ element, onChange, value }) => {
  return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-center gap-1">
        <Label className="text-sm font-medium">{element.label}</Label>
        {element.required && <span className="text-destructive">*</span>}
      </div>
      
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="flex flex-col space-y-2"
      >
        {element.options?.map((option, index) => (
          <div 
            key={`${element.id}-option-${index}`} 
            className="flex items-center space-x-2 press-effect rounded-md p-2 hover:bg-secondary/50 transition-colors"
          >
            <RadioGroupItem value={option} id={`${element.id}-option-${index}`} />
            <Label 
              htmlFor={`${element.id}-option-${index}`}
              className="cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      {element.hint && (
        <p className="text-xs text-muted-foreground">{element.hint}</p>
      )}
    </div>
  );
};

export default RadioField;
