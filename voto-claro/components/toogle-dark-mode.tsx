'use client';
import { MonitorDot, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 rounded-full bg-secondary/50 p-1">
        <div className="h-9 w-9" />
        <div className="h-9 w-9" />
        <div className="h-9 w-9" />
      </div>
    );
  }

  const modes = [
    { value: 'light', icon: Sun, label: 'Claro' },
    { value: 'dark', icon: Moon, label: 'Oscuro' },
    { value: 'system', icon: MonitorDot, label: 'Sistema' }
  ];

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-secondary/50 p-1 backdrop-blur-sm">
      {modes.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value;
        
        return (
          <Button
            key={value}
            onClick={() => setTheme(value)}
            variant="ghost"
            size="icon"
            className={`
              relative h-9 w-9 rounded-full transition-all duration-300 ease-in-out
              hover:bg-secondary
              ${isActive 
            ? 'bg-background shadow-md scale-105' 
            : 'hover:scale-105'
          }
            `}
            aria-label={label}
          >
            <Icon 
              className={`
                h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-in-out
                ${isActive 
            ? 'text-foreground scale-110 rotate-0' 
            : value === 'system' 
              ? 'text-muted-foreground scale-90 rotate-0' 
              : 'text-muted-foreground scale-90 rotate-90'
          }
              `}
            />
          </Button>
        );
      })}
    </div>
  );
}