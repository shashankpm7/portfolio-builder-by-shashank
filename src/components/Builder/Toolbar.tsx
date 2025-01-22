import React, { useState } from 'react';
import { Plus, Monitor, Tablet, Smartphone, Download, Sun, Moon, ChevronDown } from 'lucide-react';
import useStore from '../../store/useStore';
import { DeviceType } from '../../types';
import { downloadPortfolio } from '../../utils/portfolioExporter';

const Toolbar: React.FC = () => {
  const { portfolio, updateTheme, addSection, setPreviewDevice } = useStore();
  const { darkMode } = portfolio.theme;
  const { previewDevice } = portfolio;
  const [showSectionMenu, setShowSectionMenu] = useState(false);

  const toggleTheme = () => {
    updateTheme({ darkMode: !darkMode });
    document.documentElement.classList.toggle('dark');
  };

  const handleAddSection = (type: 'hero' | 'about' | 'portfolio' | 'contact' | 'techstack' | 'experience' | 'custom') => {
    let initialContent = {};

    switch (type) {
      case 'experience':
        initialContent = {
          title: 'Professional Experience',
          description: '',
          experiences: [],
          backgroundStyle: 'color',
          backgroundColor: '#ffffff'
        };
        break;
      case 'custom':
        initialContent = {
          title: 'Custom Section',
          subtitle: '',
          content: '',
          backgroundStyle: 'color',
          backgroundColor: '#ffffff'
        };
        break;
      default:
        initialContent = {};
    }

    addSection({
      id: crypto.randomUUID(),
      type,
      content: initialContent,
    });
    setShowSectionMenu(false);
  };

  const handleDeviceChange = (device: DeviceType) => {
    setPreviewDevice(device);
  };

  const handleDownload = () => {
    downloadPortfolio(portfolio);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-50">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            className="btn-primary flex items-center"
            onClick={() => setShowSectionMenu(!showSectionMenu)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Section
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>

          {showSectionMenu && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleAddSection('hero')}
              >
                Hero Section
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleAddSection('about')}
              >
                About Section
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleAddSection('experience')}
              >
                Experience Section
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleAddSection('techstack')}
              >
                Tech Stack Section
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleAddSection('portfolio')}
              >
                Portfolio Section
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleAddSection('contact')}
              >
                Contact Section
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleAddSection('custom')}
              >
                Custom Section
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 border-r border-gray-200 dark:border-gray-700 pr-4">
          <button 
            className={`p-2 rounded transition-colors ${
              previewDevice === 'desktop' 
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => handleDeviceChange('desktop')}
          >
            <Monitor className="w-5 h-5" />
          </button>
          <button 
            className={`p-2 rounded transition-colors ${
              previewDevice === 'tablet' 
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => handleDeviceChange('tablet')}
          >
            <Tablet className="w-5 h-5" />
          </button>
          <button 
            className={`p-2 rounded transition-colors ${
              previewDevice === 'mobile' 
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => handleDeviceChange('mobile')}
          >
            <Smartphone className="w-5 h-5" />
          </button>
        </div>
        
        <button 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          onClick={handleDownload}
        >
          <Download className="w-5 h-5" />
        </button>
        
        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          onClick={toggleTheme}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

export default Toolbar;