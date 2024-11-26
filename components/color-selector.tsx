'use client'

import { cn } from "@/lib/utils"

interface ColorOption {
  name: string
  color: string
  size: 'sm' | 'md' | 'lg'
}

const colors: ColorOption[] = [
  { name: 'Navy', color: '#1a365d', size: 'sm' },
  { name: 'Orange', color: '#FFA500', size: 'md' },
  { name: 'Red', color: '#FF0000', size: 'lg' },
  { name: 'Beige', color: '#d6cfc7', size: 'md' },
  { name: 'Charcoal', color: '#36454f', size: 'sm' },
]

interface ColorSelectorProps {
  onColorSelect: (color: string) => void
  selectedColor: string
}

export function ColorSelector({ onColorSelect, selectedColor }: ColorSelectorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <h2 className="customize-gnx-text text-2xl font-bold mb-4 text-center font-['Gotham_Circular',_'Helvetica_Neue',_'Arial',_sans-serif]">Customize Your GNX</h2>
      <div className="relative">
        {/* Curved line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 transform -translate-y-1/2" 
             style={{ 
               borderRadius: '100%',
               transform: 'translateY(-50%) perspective(100px) rotateX(5deg)'
             }} 
        />
        
        {/* Color circles */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => onColorSelect(color.color)}
              className={cn(
                "rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
                color.size === 'sm' && "w-8 h-8 md:w-12 md:h-12",
                color.size === 'md' && "w-12 h-12 md:w-16 md:h-16",
                color.size === 'lg' && "w-16 h-16 md:w-24 md:h-24",
                selectedColor === color.color && "ring-2 ring-offset-2 ring-gray-500"
              )}
              style={{ backgroundColor: color.color }}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      </div>
      <div className="color-picker-container-image mt-8 flex justify-center">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/is-there-any-meaning-behind-the-stylised-a-on-the-pglang-v0-c58kpvpfocad1-8SSWe0C442Aexwxpezyu1A9FxRfGnA.webp"
          alt="pgLang"
          className="h-12 w-auto object-contain"
        />
      </div>
    </div>
  )
}

