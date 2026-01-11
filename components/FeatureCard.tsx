import React from 'react';
import { FeatureConfig } from '../types';
import { Icon } from './Icon';

interface FeatureCardProps {
  feature: FeatureConfig;
  isSelected: boolean;
  onClick: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-4 transition-all duration-300 group relative flex items-center gap-4
        ${isSelected 
          ? 'bg-white/[0.03]' 
          : 'hover:bg-white/[0.02]'
        }
      `}
    >
      {/* Minimalist Active Indicator Line */}
      <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300 ${isSelected ? 'bg-red-700 h-full' : 'bg-transparent h-0'}`} />

      <div className={`transition-colors duration-300 ${isSelected ? 'text-red-500' : 'text-neutral-500 group-hover:text-neutral-400'}`}>
        <Icon name={feature.icon} size={20} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className={`font-serif text-sm tracking-wide transition-colors duration-300 ${isSelected ? 'text-white font-bold' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
          {feature.name.toUpperCase()}
        </h3>
        {isSelected && (
          <p className="text-[10px] text-neutral-500 mt-1 line-clamp-1 font-light animate-fade-in">
            {feature.description}
          </p>
        )}
      </div>
    </button>
  );
};