import React, { useState, useRef, useEffect } from 'react';

interface Props {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<Props> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <div className="flex items-center space-x-2">
        <button
          className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-1 border rounded-md w-28 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-8 gap-1">
            {[
              '#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80',
              '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080',
              '#ffffff', '#d4d4d4', '#a8a8a8', '#7d7d7d', '#525252', '#000000'
            ].map((presetColor) => (
              <button
                key={presetColor}
                className="w-6 h-6 rounded hover:scale-110 transition-transform"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  onChange(presetColor);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;