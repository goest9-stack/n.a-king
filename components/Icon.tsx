import React from 'react';
import {
  Crown,
  Sword,
  Code,
  Feather,
  Languages,
  TrendingUp,
  Moon,
  Utensils,
  Scale,
  Mail,
  Brain,
  Music,
  FileText,
  Sparkles,
  ChevronRight,
  Bot
} from 'lucide-react';

export const IconMap: Record<string, React.FC<any>> = {
  Crown,
  Sword,
  Code,
  Feather,
  Languages,
  TrendingUp,
  Moon,
  Utensils,
  Scale,
  Mail,
  Brain,
  Music,
  FileText,
  Sparkles,
  ChevronRight,
  Bot
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24, strokeWidth }) => {
  const IconComponent = IconMap[name] || Sparkles;
  return <IconComponent className={className} size={size} strokeWidth={strokeWidth} />;
};