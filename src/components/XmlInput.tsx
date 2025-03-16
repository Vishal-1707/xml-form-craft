
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { parseXml } from '@/utils/xmlParser';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { EMPTY_FORM_TEMPLATE } from '@/data/sampleForm.xml';

interface XmlInputProps {
  onXmlSubmit: (xml: string) => void;
  onCancel: () => void;
}

const XmlInput: React.FC<XmlInputProps> = ({ onXmlSubmit, onCancel }) => {
  const [xmlInput, setXmlInput] = useState(EMPTY_FORM_TEMPLATE);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate XML
    const parsedForm = parseXml(xmlInput);
    if (!parsedForm) {
      // Error is already shown via toast in parseXml
      return;
    }
    
    // Submit valid XML
    onXmlSubmit(xmlInput);
    toast({
      title: "XML Parsed Successfully",
      description: `Form "${parsedForm.title}" with ${parsedForm.elements.length} fields loaded.`
    });
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto glass rounded-xl p-6 animate-slide-up">
      <h2 className="text-2xl font-semibold mb-4 text-center">Custom XML Form</h2>
      <p className="text-muted-foreground mb-6 text-center">
        Enter your XML form definition below or modify the template.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="xml-input" className="text-sm font-medium">
            XML Form Definition
          </Label>
          <Textarea
            id="xml-input"
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            className="font-mono text-sm min-h-[300px] bg-white/70 border-border/50"
            placeholder="Enter form XML here..."
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="press-effect"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="press-effect bg-primary hover:bg-primary/90"
          >
            Parse XML
          </Button>
        </div>
      </form>
    </div>
  );
};

export default XmlInput;
