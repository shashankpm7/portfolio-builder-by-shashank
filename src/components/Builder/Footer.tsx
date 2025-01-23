import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 text-center">
      <div className="flex justify-center items-center space-x-6 mb-2">
        <a
          href="https://github.com/shashankpm7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/shashank-moharir-65349b341"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="mailto:moharirshashank@gmail.com"
          className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <Mail className="w-5 h-5" />
        </a>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Made with <Heart className="inline-block w-4 h-4 text-red-500 mx-1" fill="currentColor" /> by Shashank Moharir
      </div>
    </div>
  );
};

export default Footer;
