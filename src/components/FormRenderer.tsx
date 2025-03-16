
import React, { useState, useEffect } from 'react';
import { FormDefinition, FormElement, validateFormDefinition } from '@/utils/xmlParser';
import { FormElementRenderer } from './form-elements';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface FormRendererProps {
  formDefinition: FormDefinition | null;
  onSubmit?: (values: Record<string, string>) => void;
  onCancel?: () => void;
}

const FormRenderer: React.FC<FormRendererProps> = ({ 
  formDefinition, 
  onSubmit,
  onCancel
}) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  // Reset form values when form definition changes
  useEffect(() => {
    setFormValues({});
  }, [formDefinition]);

  // Check form validity
  useEffect(() => {
    if (!formDefinition) {
      setIsValid(false);
      return;
    }

    // Basic validation of the form definition
    if (!validateFormDefinition(formDefinition)) {
      setIsValid(false);
      return;
    }

    // Check if all required fields have values
    const requiredFieldsFilled = formDefinition.elements
      .filter(element => element.required)
      .every(element => !!formValues[element.id]);

    setIsValid(requiredFieldsFilled);
  }, [formDefinition, formValues]);

  if (!formDefinition) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-muted-foreground"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
            <path d="m14 9 3 3-3 3" />
          </svg>
        </div>
        <h3 className="text-xl font-medium">No Form Selected</h3>
        <p className="text-muted-foreground max-w-sm">
          Please select a form template or create a new form by entering XML.
        </p>
      </div>
    );
  }

  const handleFieldChange = (id: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check form validity
    if (!isValid) {
      toast({
        title: "Please fill all required fields",
        description: "Some required fields are empty or incomplete.",
        variant: "destructive"
      });
      return;
    }
    
    // Call onSubmit with form values
    if (onSubmit) {
      onSubmit(formValues);
    } else {
      toast({
        title: "Form Submitted",
        description: "Form data has been successfully submitted."
      });
      console.log("Form values:", formValues);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="glass rounded-xl p-6 mb-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            {formDefinition.title}
          </h2>
          {formDefinition.description && (
            <p className="text-muted-foreground">
              {formDefinition.description}
            </p>
          )}
        </div>
        
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {formDefinition.elements.map((element: FormElement, index: number) => (
            <div 
              key={element.id} 
              className={cn(
                "p-4 rounded-lg border border-border/50 bg-white/50 stagger-enter",
                "hover:border-border/80 transition-all duration-200"
              )}
            >
              <FormElementRenderer
                element={element}
                onChange={handleFieldChange}
                values={formValues}
              />
            </div>
          ))}
          
          <div className="flex justify-end space-x-3 pt-4">
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="press-effect"
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={!isValid}
              className={cn(
                "press-effect bg-primary hover:bg-primary/90",
                !isValid && "opacity-50 cursor-not-allowed"
              )}
            >
              Submit Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRenderer;
