
"use client";

import { Home, Users, GraduationCap, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab?: "home" | "candidates" | "members" | "profile";
  onTabChange?: (tab: "home" | "candidates" | "members" | "profile") => void;
}

export function BottomNavigation({ 
  activeTab = "home", 
  onTabChange 
}: BottomNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Inicio" },
    { id: "candidates", icon: Users, label: "Candidatos" },
    { id: "members", icon: GraduationCap, label: "Miembros" },
    { id: "profile", icon: User, label: "Perfil" },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border safe-area-pb">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.map(({ id, icon: Icon, label }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange?.(id)}
                className="flex flex-col items-center py-2 px-3 min-w-0 transition-colors"
              >
                <Icon 
                  className={`w-6 h-6 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`} 
                />
                <span 
                  className={`text-xs font-medium ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}