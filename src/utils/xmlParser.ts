
/**
 * XML Parser Utility
 * 
 * This utility provides functions for parsing XML form definitions
 * with robust error handling and type validation.
 */

import { toast } from "@/components/ui/use-toast";

// Define types for our form elements
export type FormElementType = 'text' | 'date' | 'radio' | 'drawing';

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // For radio buttons
  defaultValue?: string;
  hint?: string;
}

export interface FormDefinition {
  id: string;
  title: string;
  description?: string;
  elements: FormElement[];
}

/**
 * Parse XML string into FormDefinition
 */
export function parseXml(xmlString: string): FormDefinition | null {
  try {
    // Basic XML validation
    if (!xmlString.trim().startsWith('<')) {
      throw new Error('Invalid XML: Document must start with "<"');
    }

    // Create a DOMParser to parse the XML string
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    // Check for parsing errors
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('XML Parsing Error: ' + parseError.textContent);
    }

    // Get the root form element
    const formElement = xmlDoc.querySelector('form');
    if (!formElement) {
      throw new Error('XML Error: Missing root <form> element');
    }

    // Extract basic form information
    const id = formElement.getAttribute('id') || generateId();
    const title = formElement.getAttribute('title') || 'Untitled Form';
    const description = formElement.getAttribute('description') || '';

    // Extract form elements
    const elements: FormElement[] = [];
    const fieldElements = formElement.querySelectorAll('field');
    
    if (fieldElements.length === 0) {
      throw new Error('XML Error: Form must contain at least one <field> element');
    }

    fieldElements.forEach((field) => {
      const fieldId = field.getAttribute('id') || generateId();
      const fieldType = field.getAttribute('type') as FormElementType;
      const fieldLabel = field.getAttribute('label') || 'Untitled Field';
      
      // Validate field type
      if (!['text', 'date', 'radio', 'drawing'].includes(fieldType)) {
        throw new Error(`XML Error: Invalid field type "${fieldType}" for field "${fieldId}"`);
      }

      // Create base form element
      const formElement: FormElement = {
        id: fieldId,
        type: fieldType,
        label: fieldLabel,
        required: field.getAttribute('required') === 'true',
        placeholder: field.getAttribute('placeholder') || undefined,
        hint: field.getAttribute('hint') || undefined,
        defaultValue: field.getAttribute('default') || undefined,
      };

      // Handle radio options
      if (fieldType === 'radio') {
        const options: string[] = [];
        field.querySelectorAll('option').forEach((option) => {
          options.push(option.textContent || '');
        });
        
        if (options.length === 0) {
          throw new Error(`XML Error: Radio field "${fieldId}" must contain at least one <option>`);
        }
        
        formElement.options = options;
      }

      elements.push(formElement);
    });

    return {
      id,
      title,
      description,
      elements
    };
  } catch (error) {
    toast({
      title: "XML Parsing Error",
      description: error instanceof Error ? error.message : "Unknown error parsing XML",
      variant: "destructive"
    });
    console.error("XML Parsing Error:", error);
    return null;
  }
}

/**
 * Generate a simple unique ID
 */
function generateId(): string {
  return 'id_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Validate a FormDefinition object
 */
export function validateFormDefinition(form: FormDefinition): boolean {
  if (!form.id || !form.title || !form.elements || form.elements.length === 0) {
    return false;
  }
  
  // Validate each element
  for (const element of form.elements) {
    if (!element.id || !element.label || !element.type) {
      return false;
    }
    
    // Validate radio buttons have options
    if (element.type === 'radio' && (!element.options || element.options.length === 0)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Sample XML form definition for testing
 */
export const DEFAULT_FORM_XML = `
<form id="sample-form" title="Equipment Inspection" description="Complete this form to document equipment inspection">
  <field id="inspector_name" type="text" label="Inspector Name" required="true" placeholder="Enter your full name" />
  <field id="inspection_date" type="date" label="Inspection Date" required="true" />
  <field id="equipment_status" type="radio" label="Equipment Status" required="true">
    <option>Operational</option>
    <option>Needs Maintenance</option>
    <option>Out of Service</option>
  </field>
  <field id="inspector_signature" type="drawing" label="Inspector Signature" required="true" hint="Please sign to verify inspection" />
</form>
`;
