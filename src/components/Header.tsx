
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "XML Form Renderer", 
  subtitle = "Create and render dynamic forms from XML definitions",
  className 
}) => {
  return (
    <header className={cn(
      "w-full py-6 mb-8 text-center animate-fade-in", 
      className
    )}>
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </header>
  );
};

export default Header;
