
import React from 'react';
import { FormElement } from '@/utils/xmlParser';
import TextField from './TextField';
import DateField from './DateField';
import RadioField from './RadioField';
import DrawingField from './DrawingField';

const FormElementRenderer: React.FC<{
  element: FormElement;
  onChange: (id: string, value: string) => void;
  values: Record<string, string>;
}> = ({ element, onChange, values }) => {
  const value = values[element.id] || '';
  
  const handleChange = (newValue: string) => {
    onChange(element.id, newValue);
  };
  
  switch (element.type) {
    case 'text':
      return <TextField element={element} onChange={handleChange} value={value} />;
    case 'date':
      return <DateField element={element} onChange={handleChange} value={value} />;
    case 'radio':
      return <RadioField element={element} onChange={handleChange} value={value} />;
    case 'drawing':
      return <DrawingField element={element} onChange={handleChange} value={value} />;
    default:
      return <div>Unsupported field type: {element.type}</div>;
  }
};

export default FormElementRenderer;
