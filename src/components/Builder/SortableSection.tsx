import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Section } from '../../types';
import useStore from '../../store/useStore';
import SectionEditor from './SectionEditor';

interface Props {
  section: Section;
}

const SortableSection: React.FC<Props> = ({ section }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { removeSection } = useStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getBackgroundStyle = () => {
    const { content } = section;
    if (content.backgroundStyle === 'gradient' && content.gradientStart && content.gradientEnd) {
      return {
        background: `linear-gradient(${content.gradientDirection === 'to-r' ? '90deg' : 
          content.gradientDirection === 'to-l' ? '270deg' : 
          content.gradientDirection === 'to-t' ? '0deg' : 
          content.gradientDirection === 'to-b' ? '180deg' : 
          content.gradientDirection === 'to-tr' ? '45deg' :
          content.gradientDirection === 'to-tl' ? '315deg' :
          content.gradientDirection === 'to-br' ? '135deg' : '225deg'
        }, ${content.gradientStart}, ${content.gradientEnd})`,
      };
    }
    if (content.backgroundStyle === 'color' && content.backgroundColor) {
      return { backgroundColor: content.backgroundColor };
    }
    if (content.backgroundStyle === 'image' && content.backgroundImage) {
      return {
        backgroundImage: `url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return {};
  };

  const getTypographyClasses = () => {
    const { content } = section;
    return `${content.fontFamily || 'font-sans'} ${content.fontSize || 'text-base'} ${content.fontWeight || 'font-normal'}`;
  };

  const getTextStyle = () => {
    const { content } = section;
    return {
      color: content.textColor || 'inherit',
    };
  };

  const getHeadingStyle = () => {
    const { content } = section;
    return {
      color: content.headingColor || 'inherit',
    };
  };

  const renderSectionContent = () => {
    const typographyClasses = getTypographyClasses();
    const textStyle = getTextStyle();
    const headingStyle = getHeadingStyle();

    switch (section.type) {
      case 'hero':
        return (
          <div className={`text-center py-8 ${typographyClasses}`}>
            {section.content.heading && (
              <h2 className="text-3xl font-bold mb-2" style={headingStyle}>{section.content.heading}</h2>
            )}
            {section.content.subheading && (
              <p className="text-lg" style={textStyle}>{section.content.subheading}</p>
            )}
          </div>
        );
      
      case 'about':
        return (
          <div className={`py-6 px-4 ${typographyClasses}`}>
            {section.content.title && (
              <h2 className="text-2xl font-bold mb-4 text-center" style={headingStyle}>{section.content.title}</h2>
            )}
            {section.content.bio && (
              <div className="max-w-2xl mx-auto">
                <p className="text-base mb-4 whitespace-pre-wrap" style={textStyle}>{section.content.bio}</p>
              </div>
            )}
            {section.content.image && (
              <div className="flex justify-center mb-4">
                <img 
                  src={section.content.image} 
                  alt="Profile" 
                  className="w-48 h-48 rounded-full object-cover shadow-lg"
                />
              </div>
            )}
            {section.content.skills && section.content.skills.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3 text-center" style={headingStyle}>Key Skills</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {section.content.skills.map((skill: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900 rounded-full text-sm"
                      style={textStyle}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'experience':
        return (
          <div className={`py-6 px-4 ${typographyClasses}`}>
            {section.content.title && (
              <h2 className="text-2xl font-bold mb-6 text-center" style={headingStyle}>{section.content.title}</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {(section.content.experiences || []).map((exp: any, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-semibold mb-2" style={headingStyle}>{exp.title}</h3>
                  <p className="text-lg mb-1">{exp.company}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{exp.period}</p>
                  <p className="whitespace-pre-wrap" style={textStyle}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'techstack':
        return (
          <div className={`py-6 px-4 ${typographyClasses}`}>
            {section.content.title && (
              <h2 className="text-2xl font-bold mb-6 text-center" style={headingStyle}>{section.content.title}</h2>
            )}
            {section.content.description && (
              <p className="text-center mb-8 max-w-2xl mx-auto" style={textStyle}>{section.content.description}</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {(section.content.technologies || []).map((tech: string, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center hover:shadow-lg transition-shadow">
                  <span className="text-lg font-medium" style={textStyle}>{tech}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className={`py-6 px-4 ${typographyClasses}`}>
            {section.content.title && (
              <h2 className="text-2xl font-bold mb-6 text-center" style={headingStyle}>{section.content.title}</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {(section.content.projects || []).map((project: any, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2" style={headingStyle}>{project.title}</h3>
                    <p className="mb-4" style={textStyle}>{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech: string, techIndex: number) => (
                          <span key={techIndex} className="px-2 py-1 bg-primary-100 dark:bg-primary-900 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className={`py-6 px-4 ${typographyClasses}`}>
            {section.content.title && (
              <h2 className="text-2xl font-bold mb-6 text-center" style={headingStyle}>{section.content.title}</h2>
            )}
            {section.content.formMessage && (
              <p className="text-center mb-8 max-w-2xl mx-auto" style={textStyle}>{section.content.formMessage}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {section.content.email && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2" style={headingStyle}>Email</h3>
                  <a href={`mailto:${section.content.email}`} className="text-primary-600 hover:text-primary-700 transition-colors">
                    {section.content.email}
                  </a>
                </div>
              )}
              {section.content.phone && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2" style={headingStyle}>Phone</h3>
                  <a href={`tel:${section.content.phone}`} className="text-primary-600 hover:text-primary-700 transition-colors">
                    {section.content.phone}
                  </a>
                </div>
              )}
              {section.content.location && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2" style={headingStyle}>Location</h3>
                  <p style={textStyle}>{section.content.location}</p>
                </div>
              )}
            </div>
            <div className="flex justify-center space-x-6">
              {section.content.linkedin && (
                <a
                  href={section.content.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {section.content.github && (
                <a
                  href={section.content.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  GitHub
                </a>
              )}
              {section.content.twitter && (
                <a
                  href={section.content.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-3 group"
    >
      <div className="py-2 px-3 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <button
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-move"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
        <span className="ml-2 font-medium capitalize text-sm">{section.type} Section</span>
        <div className="ml-auto flex items-center space-x-1">
          <button
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <button
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => removeSection(section.id)}
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <SectionEditor section={section} />
        </div>
      )}

      <div className="rounded-b-lg overflow-hidden" style={getBackgroundStyle()}>
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default SortableSection;