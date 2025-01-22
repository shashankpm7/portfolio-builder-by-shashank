import React from 'react';
import { Settings, Type } from 'lucide-react';
import useStore from '../../store/useStore';
import ColorPicker from './ColorPicker';
import { Section } from '../../types';

interface Props {
  section: Section;
}

const fontFamilies = [
  { value: 'font-sans', label: 'Sans Serif' },
  { value: 'font-serif', label: 'Serif' },
  { value: 'font-mono', label: 'Monospace' },
];

const fontSizes = [
  { value: 'text-sm', label: 'Small' },
  { value: 'text-base', label: 'Normal' },
  { value: 'text-lg', label: 'Large' },
  { value: 'text-xl', label: 'Extra Large' },
  { value: 'text-2xl', label: 'Double Extra Large' },
];

const fontWeights = [
  { value: 'font-normal', label: 'Normal' },
  { value: 'font-medium', label: 'Medium' },
  { value: 'font-semibold', label: 'Semibold' },
  { value: 'font-bold', label: 'Bold' },
];

const SectionEditor: React.FC<Props> = ({ section }) => {
  const { updateSection } = useStore();

  const handleContentChange = (key: string, value: any) => {
    updateSection(section.id, {
      ...section.content,
      [key]: value,
    });
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const experiences = [...(section.content.experiences || [])];
    experiences[index] = { ...experiences[index], [field]: value };
    handleContentChange('experiences', experiences);
  };

  const addExperience = () => {
    const experiences = [...(section.content.experiences || [])];
    experiences.push({
      title: '',
      company: '',
      period: '',
      description: '',
    });
    handleContentChange('experiences', experiences);
  };

  const removeExperience = (index: number) => {
    const experiences = [...(section.content.experiences || [])];
    experiences.splice(index, 1);
    handleContentChange('experiences', experiences);
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const projects = [...(section.content.projects || [])];
    projects[index] = { ...projects[index], [field]: value };
    handleContentChange('projects', projects);
  };

  const addProject = () => {
    const projects = [...(section.content.projects || [])];
    projects.push({
      title: '',
      description: '',
      image: '',
      link: '',
      technologies: [],
    });
    handleContentChange('projects', projects);
  };

  const removeProject = (index: number) => {
    const projects = [...(section.content.projects || [])];
    projects.splice(index, 1);
    handleContentChange('projects', projects);
  };

  const renderTypographySettings = () => (
    <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
      <h4 className="text-sm font-medium flex items-center">
        <Type className="w-4 h-4 mr-2" />
        Typography Settings
      </h4>
      
      <div>
        <label className="block text-sm font-medium mb-1">Font Family</label>
        <select
          value={section.content.fontFamily || 'font-sans'}
          onChange={(e) => handleContentChange('fontFamily', e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          {fontFamilies.map(font => (
            <option key={font.value} value={font.value}>{font.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Font Size</label>
        <select
          value={section.content.fontSize || 'text-base'}
          onChange={(e) => handleContentChange('fontSize', e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          {fontSizes.map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Font Weight</label>
        <select
          value={section.content.fontWeight || 'font-normal'}
          onChange={(e) => handleContentChange('fontWeight', e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        >
          {fontWeights.map(weight => (
            <option key={weight.value} value={weight.value}>{weight.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Text Color</label>
        <ColorPicker
          color={section.content.textColor || '#000000'}
          onChange={(color) => handleContentChange('textColor', color)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Heading Color</label>
        <ColorPicker
          color={section.content.headingColor || '#000000'}
          onChange={(color) => handleContentChange('headingColor', color)}
        />
      </div>
    </div>
  );

  const renderFields = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Heading</label>
              <input
                type="text"
                value={section.content.heading || ''}
                onChange={(e) => handleContentChange('heading', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subheading</label>
              <input
                type="text"
                value={section.content.subheading || ''}
                onChange={(e) => handleContentChange('subheading', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter subheading"
              />
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={section.content.bio || ''}
                onChange={(e) => handleContentChange('bio', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                rows={4}
                placeholder="Enter your bio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Profile Image URL</label>
              <input
                type="text"
                value={section.content.image || ''}
                onChange={(e) => handleContentChange('image', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter image URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Skills (comma-separated)</label>
              <input
                type="text"
                value={section.content.skills?.join(', ') || ''}
                onChange={(e) => handleContentChange('skills', e.target.value.split(',').map(s => s.trim()))}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="React, TypeScript, Node.js"
              />
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Professional Experience"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Experience Items</label>
              {(section.content.experiences || []).map((exp: any, index: number) => (
                <div key={index} className="mb-4 p-4 border rounded-md dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Experience {index + 1}</h4>
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={exp.title || ''}
                      onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Position Title"
                    />
                    <input
                      type="text"
                      value={exp.company || ''}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Company Name"
                    />
                    <input
                      type="text"
                      value={exp.period || ''}
                      onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Period (e.g., Jan 2020 - Present)"
                    />
                    <textarea
                      value={exp.description || ''}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      rows={3}
                      placeholder="Job Description"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addExperience}
                className="w-full mt-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add Experience
              </button>
            </div>
          </div>
        );

      case 'techstack':
        return (
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Technical Skills"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
              <input
                type="text"
                value={section.content.technologies?.join(', ') || ''}
                onChange={(e) => handleContentChange('technologies', e.target.value.split(',').map(s => s.trim()))}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="React, Node.js, Python, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={section.content.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                rows={3}
                placeholder="Brief description of your technical expertise"
              />
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="My Projects"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Projects</label>
              {(section.content.projects || []).map((project: any, index: number) => (
                <div key={index} className="mb-4 p-4 border rounded-md dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">Project {index + 1}</h4>
                    <button
                      onClick={() => removeProject(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={project.title || ''}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Project Title"
                    />
                    <textarea
                      value={project.description || ''}
                      onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      rows={3}
                      placeholder="Project Description"
                    />
                    <input
                      type="text"
                      value={project.image || ''}
                      onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Project Image URL"
                    />
                    <input
                      type="text"
                      value={project.link || ''}
                      onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Project Link"
                    />
                    <input
                      type="text"
                      value={project.technologies?.join(', ') || ''}
                      onChange={(e) => handleProjectChange(index, 'technologies', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Technologies Used (comma-separated)"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addProject}
                className="w-full mt-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Add Project
              </button>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Contact Me"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={section.content.email || ''}
                onChange={(e) => handleContentChange('email', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone (optional)</label>
              <input
                type="tel"
                value={section.content.phone || ''}
                onChange={(e) => handleContentChange('phone', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="+1 (123) 456-7890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={section.content.location || ''}
                onChange={(e) => handleContentChange('location', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Social Links</label>
              <div className="space-y-2">
                <input
                  type="url"
                  value={section.content.linkedin || ''}
                  onChange={(e) => handleContentChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="LinkedIn URL"
                />
                <input
                  type="url"
                  value={section.content.github || ''}
                  onChange={(e) => handleContentChange('github', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="GitHub URL"
                />
                <input
                  type="url"
                  value={section.content.twitter || ''}
                  onChange={(e) => handleContentChange('twitter', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Twitter URL"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Form Message</label>
              <textarea
                value={section.content.formMessage || ''}
                onChange={(e) => handleContentChange('formMessage', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                rows={3}
                placeholder="Message to display above the contact form"
              />
            </div>
          </div>
        );

      case 'custom':
        return (
          <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={section.content.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="Enter subtitle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content (HTML)</label>
              <textarea
                value={section.content.content || ''}
                onChange={(e) => handleContentChange('content', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                rows={6}
                placeholder="Enter HTML content"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center">
          <Settings className="w-4 h-4 mr-2" />
          Section Settings
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Background Style</label>
          <select
            value={section.content.backgroundStyle || 'color'}
            onChange={(e) => handleContentChange('backgroundStyle', e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="color">Solid Color</option>
            <option value="gradient">Gradient</option>
            <option value="image">Image</option>
          </select>
        </div>

        {section.content.backgroundStyle === 'color' && (
          <div>
            <label className="block text-sm font-medium mb-1">Background Color</label>
            <ColorPicker
              color={section.content.backgroundColor || '#ffffff'}
              onChange={(color) => handleContentChange('backgroundColor', color)}
            />
          </div>
        )}

        {section.content.backgroundStyle === 'gradient' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Gradient Start Color</label>
              <ColorPicker
                color={section.content.gradientStart || '#ffffff'}
                onChange={(color) => handleContentChange('gradientStart', color)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gradient End Color</label>
              <ColorPicker
                color={section.content.gradientEnd || '#000000'}
                onChange={(color) => handleContentChange('gradientEnd', color)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gradient Direction</label>
              <select
                value={section.content.gradientDirection || 'to-r'}
                onChange={(e) => handleContentChange('gradientDirection', e.target.value)}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="to-r">Left to Right</option>
                <option value="to-l">Right to Left</option>
                <option value="to-t">Bottom to Top</option>
                <option value="to-b">Top to Bottom</option>
                <option value="to-tr">Bottom Left to Top Right</option>
                <option value="to-tl">Bottom Right to Top Left</option>
                <option value="to-br">Top Left to Bottom Right</option>
                <option value="to-bl">Top Right to Bottom Left</option>
              </select>
            </div>
          </>
        )}

        {section.content.backgroundStyle === 'image' && (
          <div>
            <label className="block text-sm font-medium mb-1">Background Image URL</label>
            <input
              type="text"
              value={section.content.backgroundImage || ''}
              onChange={(e) => handleContentChange('backgroundImage', e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        )}
      </div>

      {renderTypographySettings()}
      {renderFields()}
    </div>
  );
};

export default SectionEditor;