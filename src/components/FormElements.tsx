
import React, { useState } from 'react';
import { FormElement } from '@/utils/xmlParser';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

// Text Field Component
export const TextField: React.FC<{
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

// Date Field Component
export const DateField: React.FC<{
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
        type="date"
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

// Radio Field Component
export const RadioField: React.FC<{
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

// Drawing/Signature Field Component
export const DrawingField: React.FC<{
  element: FormElement;
  onChange: (value: string) => void;
  value: string;
}> = ({ element, onChange, value }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Array<{x: number, y: number}[]>>([]);
  const [currentLine, setCurrentLine] = useState<{x: number, y: number}[]>([]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (value && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
          ctx.drawImage(img, 0, 0);
        }
      };
      img.src = value;
    }
  }, [value]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setLines([]);
        setCurrentLine([]);
        onChange('');
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;
    
    // Check if it's a touch event or mouse event
    if ('touches' in e) {
      // Touch event
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    setCurrentLine([{x, y}]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;
    
    // Check if it's a touch event or mouse event
    if ('touches' in e) {
      // Touch event
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    setCurrentLine(prev => [...prev, {x, y}]);
    
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#000';
    
    if (currentLine.length > 0) {
      ctx.beginPath();
      ctx.moveTo(currentLine[currentLine.length - 1].x, currentLine[currentLine.length - 1].y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    
    if (currentLine.length > 0) {
      setLines(prev => [...prev, currentLine]);
      setCurrentLine([]);
      
      // Convert canvas to data URL and call onChange
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        onChange(dataUrl);
      }
    }
  };

  return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Label className="text-sm font-medium">{element.label}</Label>
          {element.required && <span className="text-destructive">*</span>}
        </div>
        <button
          type="button"
          onClick={clearCanvas}
          className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
        >
          Clear
        </button>
      </div>
      
      <div className="drawing-area w-full h-[150px] relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
          className={cn(
            "w-full h-full border rounded-lg bg-white cursor-crosshair",
            "touch-none" // Prevents scrolling while drawing on mobile
          )}
        />
        {lines.length === 0 && !isDrawing && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm pointer-events-none">
            Draw signature here
          </div>
        )}
      </div>
      
      {element.hint && (
        <p className="text-xs text-muted-foreground">{element.hint}</p>
      )}
    </div>
  );
};

// Dynamic Form Element Renderer
export const FormElementRenderer: React.FC<{
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
