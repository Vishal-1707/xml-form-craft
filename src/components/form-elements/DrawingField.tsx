
import React, { useState, useRef, useEffect } from 'react';
import { FormElement } from '@/utils/xmlParser';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const DrawingField: React.FC<{
  element: FormElement;
  onChange: (value: string) => void;
  value: string;
}> = ({ element, onChange, value }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Array<{x: number, y: number}[]>>([]);
  const [currentLine, setCurrentLine] = useState<{x: number, y: number}[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

export default DrawingField;
