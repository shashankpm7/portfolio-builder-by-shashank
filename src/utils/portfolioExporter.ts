import { Section, Portfolio } from '../types';

const generateSectionHTML = (section: Section): string => {
  const getBackgroundStyle = () => {
    const { content } = section;
    if (content.backgroundStyle === 'gradient' && content.gradientStart && content.gradientEnd) {
      return `background: linear-gradient(${
        content.gradientDirection === 'to-r' ? '90deg' : 
        content.gradientDirection === 'to-l' ? '270deg' : 
        content.gradientDirection === 'to-t' ? '0deg' : 
        content.gradientDirection === 'to-b' ? '180deg' : 
        content.gradientDirection === 'to-tr' ? '45deg' :
        content.gradientDirection === 'to-tl' ? '315deg' :
        content.gradientDirection === 'to-br' ? '135deg' : '225deg'
      }, ${content.gradientStart}, ${content.gradientEnd});`;
    }
    if (content.backgroundStyle === 'color' && content.backgroundColor) {
      return `background-color: ${content.backgroundColor};`;
    }
    if (content.backgroundStyle === 'image' && content.backgroundImage) {
      return `
        background-image: url(${content.backgroundImage});
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
      `;
    }
    return '';
  };

  const getTypographyStyle = () => {
    const { content } = section;
    return `
      font-family: ${content.fontFamily?.replace('font-', '') || 'sans'}-serif;
      font-size: ${
        content.fontSize === 'text-sm' ? '0.875rem' :
        content.fontSize === 'text-lg' ? '1.125rem' :
        content.fontSize === 'text-xl' ? '1.25rem' :
        content.fontSize === 'text-2xl' ? '1.5rem' :
        '1rem'
      };
      font-weight: ${
        content.fontWeight === 'font-medium' ? '500' :
        content.fontWeight === 'font-semibold' ? '600' :
        content.fontWeight === 'font-bold' ? '700' :
        '400'
      };
      color: ${content.textColor || 'inherit'};
    `;
  };

  const getHeadingStyle = () => {
    const { content } = section;
    return `color: ${content.headingColor || 'inherit'};`;
  };

  const renderSectionContent = () => {
    switch (section.type) {
      case 'hero':
        return `
          <div style="text-align: center; padding: 2rem;" data-aos="fade-up" data-aos-duration="1000">
            ${section.content.heading ? 
              `<h1 style="font-size: 2.25rem; font-weight: bold; margin-bottom: 0.5rem; ${getHeadingStyle()}" data-aos="zoom-in" data-aos-delay="200">${section.content.heading}</h1>` : 
              ''}
            ${section.content.subheading ? 
              `<p style="font-size: 1.125rem;" data-aos="fade-up" data-aos-delay="400">${section.content.subheading}</p>` : 
              ''}
          </div>
        `;

      case 'about':
        return `
          <div style="padding: 1.5rem 1rem;" data-aos="fade-up" data-aos-duration="1000">
            ${section.content.title ? 
              `<h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; text-align: center; ${getHeadingStyle()}" data-aos="fade-down">${section.content.title}</h2>` : 
              ''}
            ${section.content.image ? 
              `<div style="text-align: center; margin-bottom: 1rem;" data-aos="zoom-in" data-aos-delay="200">
                <img src="${section.content.image}" alt="Profile" style="width: 12rem; height: 12rem; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease-in-out;" class="hover-rotate">
              </div>` : 
              ''}
            ${section.content.bio ? 
              `<div style="max-width: 42rem; margin: 0 auto;" data-aos="fade-up" data-aos-delay="400">
                <p style="margin-bottom: 1rem; white-space: pre-wrap;">${section.content.bio}</p>
              </div>` : 
              ''}
            ${section.content.skills?.length ? 
              `<div style="margin-top: 1.5rem;" data-aos="fade-up" data-aos-delay="600">
                <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem; text-align: center; ${getHeadingStyle()}">Key Skills</h3>
                <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem;">
                  ${section.content.skills.map((skill, index) => 
                    `<span style="padding: 0.25rem 0.75rem; background-color: rgba(59, 130, 246, 0.1); border-radius: 9999px; font-size: 0.875rem; transition: transform 0.3s ease, background-color 0.3s ease;" class="skill-badge" data-aos="zoom-in" data-aos-delay="${200 + index * 100}">${skill}</span>`
                  ).join('')}
                </div>
              </div>` : 
              ''}
          </div>
        `;

      case 'experience':
        return `
          <div style="padding: 1.5rem 1rem;" data-aos="fade-up" data-aos-duration="1000">
            ${section.content.title ? 
              `<h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; text-align: center; ${getHeadingStyle()}" data-aos="fade-down">${section.content.title}</h2>` : 
              ''}
            <div style="max-width: 42rem; margin: 0 auto;">
              ${(section.content.experiences || []).map((exp: any, index: number) => `
                <div style="margin-bottom: 2rem; padding: 1.5rem; border-radius: 0.5rem; transition: transform 0.3s ease, box-shadow 0.3s ease;" class="experience-card" data-aos="fade-up" data-aos-delay="${200 * index}">
                  <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.25rem; ${getHeadingStyle()}">${exp.title}</h3>
                  <p style="font-size: 1.125rem; margin-bottom: 0.25rem;">${exp.company}</p>
                  <p style="color: #666; margin-bottom: 0.5rem;">${exp.period}</p>
                  <p style="white-space: pre-wrap;">${exp.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'techstack':
        return `
          <div style="padding: 1.5rem 1rem;" data-aos="fade-up" data-aos-duration="1000">
            ${section.content.title ? 
              `<h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; text-align: center; ${getHeadingStyle()}" data-aos="fade-down">${section.content.title}</h2>` : 
              ''}
            ${section.content.description ? 
              `<p style="text-align: center; margin-bottom: 1.5rem; max-width: 42rem; margin-left: auto; margin-right: auto;" data-aos="fade-up" data-aos-delay="200">${section.content.description}</p>` : 
              ''}
            ${section.content.technologies?.length ? 
              `<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; max-width: 48rem; margin: 0 auto;">
                ${section.content.technologies.map((tech: string, index: number) => 
                  `<span style="padding: 0.5rem 1rem; background-color: rgba(59, 130, 246, 0.1); border-radius: 0.5rem; font-size: 1rem; transition: transform 0.3s ease, background-color 0.3s ease;" class="tech-badge" data-aos="zoom-in" data-aos-delay="${100 * index}">${tech}</span>`
                ).join('')}
              </div>` : 
              ''}
          </div>
        `;

      case 'portfolio':
        return `
          <div style="padding: 1.5rem 1rem;" data-aos="fade-up" data-aos-duration="1000">
            ${section.content.title ? 
              `<h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; text-align: center; ${getHeadingStyle()}" data-aos="fade-down">${section.content.title}</h2>` : 
              ''}
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 64rem; margin: 0 auto;">
              ${(section.content.projects || []).map((project: any, index: number) => `
                <div style="border: 1px solid #e5e7eb; border-radius: 0.5rem; overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;" class="project-card" data-aos="fade-up" data-aos-delay="${200 * index}">
                  ${project.image ? 
                    `<div style="overflow: hidden;">
                      <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover; transition: transform 0.3s ease;" class="project-image">
                    </div>` : 
                    ''}
                  <div style="padding: 1rem;">
                    <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; ${getHeadingStyle()}">${project.title}</h3>
                    <p style="margin-bottom: 1rem;">${project.description}</p>
                    ${project.technologies?.length ? 
                      `<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                        ${project.technologies.map((tech: string) => 
                          `<span style="padding: 0.25rem 0.5rem; background-color: rgba(59, 130, 246, 0.1); border-radius: 9999px; font-size: 0.75rem; transition: transform 0.3s ease;" class="tech-badge">${tech}</span>`
                        ).join('')}
                      </div>` : 
                      ''}
                    ${project.link ? 
                      `<a href="${project.link}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 0.5rem 1rem; background-color: #3b82f6; color: white; border-radius: 0.375rem; text-decoration: none; transition: transform 0.3s ease, background-color 0.3s ease;" class="project-link">View Project</a>` : 
                      ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 'contact':
        return `
          <div style="padding: 1.5rem 1rem;" data-aos="fade-up" data-aos-duration="1000">
            ${section.content.title ? 
              `<h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; text-align: center; ${getHeadingStyle()}" data-aos="fade-down">${section.content.title}</h2>` : 
              ''}
            <div style="max-width: 42rem; margin: 0 auto;">
              ${section.content.formMessage ? 
                `<p style="text-align: center; margin-bottom: 1.5rem;" data-aos="fade-up" data-aos-delay="200">${section.content.formMessage}</p>` : 
                ''}
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                ${section.content.email ? 
                  `<div style="text-align: center;" data-aos="zoom-in" data-aos-delay="300">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; ${getHeadingStyle()}">Email</h3>
                    <a href="mailto:${section.content.email}" style="color: #3b82f6; text-decoration: none; transition: color 0.3s ease;" class="contact-link">${section.content.email}</a>
                  </div>` : 
                  ''}
                ${section.content.phone ? 
                  `<div style="text-align: center;" data-aos="zoom-in" data-aos-delay="400">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; ${getHeadingStyle()}">Phone</h3>
                    <a href="tel:${section.content.phone}" style="color: #3b82f6; text-decoration: none; transition: color 0.3s ease;" class="contact-link">${section.content.phone}</a>
                  </div>` : 
                  ''}
                ${section.content.location ? 
                  `<div style="text-align: center;" data-aos="zoom-in" data-aos-delay="500">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; ${getHeadingStyle()}">Location</h3>
                    <p>${section.content.location}</p>
                  </div>` : 
                  ''}
              </div>
              <div style="display: flex; justify-content: center; gap: 1.5rem;" data-aos="fade-up" data-aos-delay="600">
                ${section.content.linkedin ? 
                  `<a href="${section.content.linkedin}" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: none; transition: transform 0.3s ease, color 0.3s ease;" class="social-link">LinkedIn</a>` : 
                  ''}
                ${section.content.github ? 
                  `<a href="${section.content.github}" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: none; transition: transform 0.3s ease, color 0.3s ease;" class="social-link">GitHub</a>` : 
                  ''}
                ${section.content.twitter ? 
                  `<a href="${section.content.twitter}" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: none; transition: transform 0.3s ease, color 0.3s ease;" class="social-link">Twitter</a>` : 
                  ''}
              </div>
            </div>
          </div>
        `;

      case 'custom':
        return `
          <div style="padding: 1.5rem 1rem;" data-aos="fade-up" data-aos-duration="1000">
            ${section.content.title ? 
              `<h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem; text-align: center; ${getHeadingStyle()}" data-aos="fade-down">${section.content.title}</h2>` : 
              ''}
            ${section.content.subtitle ? 
              `<p style="text-align: center; margin-bottom: 1.5rem;" data-aos="fade-up" data-aos-delay="200">${section.content.subtitle}</p>` : 
              ''}
            ${section.content.content ? 
              `<div style="max-width: 42rem; margin: 0 auto;" data-aos="fade-up" data-aos-delay="400">${section.content.content}</div>` : 
              ''}
          </div>
        `;

      default:
        return '';
    }
  };

  return `
    <section style="${getBackgroundStyle()} ${getTypographyStyle()}">
      ${renderSectionContent()}
    </section>
  `;
};

export const generatePortfolioHTML = (portfolio: Portfolio): string => {
  const { sections, theme } = portfolio;
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Portfolio</title>
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: system-ui, -apple-system, sans-serif;
          line-height: 1.5;
          color: ${theme.darkMode ? '#f3f4f6' : '#1f2937'};
          background-color: ${theme.darkMode ? '#111827' : '#f9fafb'};
        }

        .hover-rotate:hover {
          transform: rotate(5deg) scale(1.05);
        }

        .skill-badge:hover {
          transform: translateY(-2px);
          background-color: rgba(59, 130, 246, 0.2);
        }

        .tech-badge:hover {
          transform: translateY(-2px);
          background-color: rgba(59, 130, 246, 0.2);
        }

        .experience-card {
          background-color: ${theme.darkMode ? '#1f2937' : '#ffffff'};
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .experience-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .project-card {
          background-color: ${theme.darkMode ? '#1f2937' : '#ffffff'};
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .project-image:hover {
          transform: scale(1.05);
        }

        .project-link:hover {
          transform: translateY(-2px);
          background-color: #2563eb;
        }

        .contact-link:hover {
          color: #2563eb;
        }

        .social-link:hover {
          transform: translateY(-2px);
          color: #2563eb;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }
      </style>
    </head>
    <body>
      ${sections.map(section => generateSectionHTML(section)).join('\n')}
      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      <script>
        AOS.init({
          duration: 1000,
          once: false,
          mirror: true
        });
      </script>
    </body>
    </html>
  `;
};

export const downloadPortfolio = (portfolio: Portfolio) => {
  const html = generatePortfolioHTML(portfolio);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};