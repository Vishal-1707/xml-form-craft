
import React, { useState } from 'react';
import Header from '@/components/Header';
import FormRenderer from '@/components/FormRenderer';
import XmlInput from '@/components/XmlInput';
import { parseXml, FormDefinition } from '@/utils/xmlParser';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { SAMPLE_FORMS } from '@/data/sampleForm.xml';
import { cn } from '@/lib/utils';

// View states
type AppView = 'welcome' | 'template-form' | 'custom-xml' | 'form-preview';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>('welcome');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [formDefinition, setFormDefinition] = useState<FormDefinition | null>(null);

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const template = SAMPLE_FORMS.find(form => form.id === templateId);
    if (template) {
      const parsedForm = parseXml(template.xml);
      setFormDefinition(parsedForm);
      setCurrentView('form-preview');
    }
  };

  // Handle custom XML input
  const handleXmlSubmit = (xml: string) => {
    const parsedForm = parseXml(xml);
    if (parsedForm) {
      setFormDefinition(parsedForm);
      setCurrentView('form-preview');
    }
  };

  // Handle form submission
  const handleFormSubmit = (values: Record<string, string>) => {
    // In a real app, you would send this data to a server
    console.log('Form submitted with values:', values);
    console.log('Form definition:', formDefinition);
    
    // Reset to welcome screen
    setCurrentView('welcome');
    setFormDefinition(null);
  };

  // Render welcome screen
  const renderWelcomeScreen = () => (
    <div className="max-w-3xl mx-auto text-center animate-fade-in">
      <div className="mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">
          XML Form Renderer
        </h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          Create and render dynamic forms from XML definitions. Choose from our templates or create your own.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card 
          className={cn(
            "p-6 flex flex-col items-center hover-lift cursor-pointer",
            "border border-border/50 glass hover:border-primary/30"
          )}
          onClick={() => setCurrentView('template-form')}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
              className="text-primary"
            >
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="m9 14 2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Use Template</h3>
          <p className="text-muted-foreground text-center">
            Choose from our pre-designed form templates
          </p>
        </Card>
        
        <Card 
          className={cn(
            "p-6 flex flex-col items-center hover-lift cursor-pointer",
            "border border-border/50 glass hover:border-primary/30"
          )}
          onClick={() => setCurrentView('custom-xml')}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
              className="text-primary"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M8 13h2" />
              <path d="M8 17h2" />
              <path d="M14 13h2" />
              <path d="M14 17h2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Custom XML</h3>
          <p className="text-muted-foreground text-center">
            Create your own form by entering XML
          </p>
        </Card>
      </div>
    </div>
  );

  // Render template selection screen
  const renderTemplateScreen = () => (
    <div className="max-w-lg mx-auto glass rounded-xl p-6 animate-slide-up">
      <h2 className="text-2xl font-semibold mb-4 text-center">Choose a Template</h2>
      <p className="text-muted-foreground mb-6 text-center">
        Select a pre-defined form template to get started quickly.
      </p>
      
      <div className="space-y-6">
        <Select
          value={selectedTemplate}
          onValueChange={setSelectedTemplate}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a form template" />
          </SelectTrigger>
          <SelectContent>
            {SAMPLE_FORMS.map((form) => (
              <SelectItem key={form.id} value={form.id}>
                {form.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex justify-end space-x-3 pt-2">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('welcome')}
            className="press-effect"
          >
            Back
          </Button>
          <Button 
            onClick={() => handleTemplateSelect(selectedTemplate)}
            disabled={!selectedTemplate}
            className={cn(
              "press-effect bg-primary hover:bg-primary/90",
              !selectedTemplate && "opacity-50 cursor-not-allowed"
            )}
          >
            Load Template
          </Button>
        </div>
      </div>
    </div>
  );

  // Render appropriate view based on current state
  const renderView = () => {
    switch (currentView) {
      case 'welcome':
        return renderWelcomeScreen();
      case 'template-form':
        return renderTemplateScreen();
      case 'custom-xml':
        return (
          <XmlInput 
            onXmlSubmit={handleXmlSubmit} 
            onCancel={() => setCurrentView('welcome')}
          />
        );
      case 'form-preview':
        return (
          <FormRenderer 
            formDefinition={formDefinition} 
            onSubmit={handleFormSubmit}
            onCancel={() => setCurrentView('welcome')}
          />
        );
      default:
        return renderWelcomeScreen();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 px-4 py-12 overflow-x-hidden">
      <Header />
      {renderView()}
    </div>
  );
};

export default Index;
