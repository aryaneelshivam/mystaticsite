import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, Check, Lightbulb } from 'lucide-react';
import { WebsiteConfig, SectionType } from '@/types/website';

interface CodeGeneratorProps {
  config: WebsiteConfig;
}

export function CodeGenerator({ config }: CodeGeneratorProps) {
  const [copied, setCopied] = useState(false);

  const generateSectionHTML = (sectionType: SectionType) => {
    const getAlignmentClass = (alignment: 'left' | 'center' | 'right') => {
      switch (alignment) {
        case 'left': return 'text-left justify-start';
        case 'center': return 'text-center justify-center';
        case 'right': return 'text-right justify-end';
      }
    };

    switch (sectionType) {
      case 'announcement':
        return config.announcement.enabled ? `<div class="announcement">${config.announcement.text}</div>` : '';
      
      case 'navbar':
        return config.navbar.enabled ? `<nav class="navbar">
        <div class="navbar-content">
            <div class="logo">
                ${config.navbar.logo.type === 'text' ? config.navbar.logo.content : `<img src="" alt="Your logo here" style="height: 2rem;">`}
            </div>
            <div class="nav-links">
                ${config.navbar.links.map(link => `<a href="${link.url}">${link.text}</a>`).join('')}
            </div>
        </div>
    </nav>` : '';
      
      case 'hero':
        return `<section class="hero">
        <div class="hero-content">
            <h1>${config.hero.heading}</h1>
            ${config.hero.subtitle ? `<p class="hero-subtitle">${config.hero.subtitle}</p>` : ''}
            ${config.hero.ctaButtons && config.hero.ctaButtons.length > 0 ? `
                <div class="hero-buttons">
                    ${config.hero.ctaButtons.map(button => `
                        <a href="${button.url}" class="hero-btn hero-btn-${button.variant}">${button.text}</a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    </section>`;
      
      case 'scrollingText':
        return `<div class="scrolling-text">
        <div class="scrolling-content">${config.scrollingText.text}</div>
    </div>`;
      
      case 'textArea':
        return `<section class="text-section">
        <div class="text-content">
            ${config.textArea.sections.map(section => `
                <div class="text-section-item">
                    ${section.heading ? `<h2 class="text-section-heading">${section.heading}</h2>` : ''}
                    <p>${section.content}</p>
                    ${section.layout !== 'text-only' ? `
                        <div class="text-section-image">
                            <img src="" alt="Your image here" style="width: 100%; height: auto; border-radius: 8px;">
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    </section>`;
      
      case 'cards':
        return config.cards.enabled ? `<section class="cards-section">
        <div class="cards-grid">
            ${config.cards.cards.map(card => `
                <div class="card">
                    <img src="" alt="Your image here" style="width: 100%; height: 12rem; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;">
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                </div>
            `).join('')}
        </div>
    </section>` : '';
      
      case 'cta':
        return `<section class="cta-section" style="background-color: ${config.cta.backgroundColor}; color: ${config.cta.textColor}; padding: 4rem 1.5rem;">
        <div class="cta-content" style="max-width: 64rem; margin: 0 auto;">
            ${config.cta.layout === 'text-only' ? `
                <div class="cta-text" style="text-align: ${config.cta.alignment};">
                    <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">${config.cta.heading}</h2>
                    ${config.cta.subtitle ? `<p style="font-size: 1.25rem; margin-bottom: 2rem;">${config.cta.subtitle}</p>` : ''}
                    <div class="cta-buttons" style="display: flex; gap: 1rem; justify-content: ${config.cta.buttonAlignment === 'left' ? 'flex-start' : config.cta.buttonAlignment === 'right' ? 'flex-end' : 'center'};">
                        ${config.cta.ctaButtons.map(button => `
                            <a href="${button.url}" class="cta-btn cta-btn-${button.variant}" style="padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: inline-block;">
                                ${button.text}
                            </a>
                        `).join('')}
                    </div>
                </div>
            ` : config.cta.layout === 'image-left' ? `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
                    <div class="cta-image">
                        <img src="" alt="Your image here" style="width: 100%; height: auto; border-radius: 8px;">
                    </div>
                    <div class="cta-text" style="text-align: ${config.cta.alignment};">
                        <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">${config.cta.heading}</h2>
                        ${config.cta.subtitle ? `<p style="font-size: 1.25rem; margin-bottom: 2rem;">${config.cta.subtitle}</p>` : ''}
                        <div class="cta-buttons" style="display: flex; gap: 1rem; justify-content: ${config.cta.buttonAlignment === 'left' ? 'flex-start' : config.cta.buttonAlignment === 'right' ? 'flex-end' : 'center'};">
                            ${config.cta.ctaButtons.map(button => `
                                <a href="${button.url}" class="cta-btn cta-btn-${button.variant}" style="padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: inline-block;">
                                    ${button.text}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            ` : config.cta.layout === 'image-right' ? `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
                    <div class="cta-text" style="text-align: ${config.cta.alignment};">
                        <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">${config.cta.heading}</h2>
                        ${config.cta.subtitle ? `<p style="font-size: 1.25rem; margin-bottom: 2rem;">${config.cta.subtitle}</p>` : ''}
                        <div class="cta-buttons" style="display: flex; gap: 1rem; justify-content: ${config.cta.buttonAlignment === 'left' ? 'flex-start' : config.cta.buttonAlignment === 'right' ? 'flex-end' : 'center'};">
                            ${config.cta.ctaButtons.map(button => `
                                <a href="${button.url}" class="cta-btn cta-btn-${button.variant}" style="padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: inline-block;">
                                    ${button.text}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    <div class="cta-image">
                        <img src="" alt="Your image here" style="width: 100%; height: auto; border-radius: 8px;">
                    </div>
                </div>
            ` : config.cta.layout === 'image-top' ? `
                <div style="display: flex; flex-direction: column; gap: 2rem;">
                    <div class="cta-image">
                        <img src="" alt="Your image here" style="width: 100%; height: auto; border-radius: 8px;">
                    </div>
                    <div class="cta-text" style="text-align: ${config.cta.alignment};">
                        <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">${config.cta.heading}</h2>
                        ${config.cta.subtitle ? `<p style="font-size: 1.25rem; margin-bottom: 2rem;">${config.cta.subtitle}</p>` : ''}
                        <div class="cta-buttons" style="display: flex; gap: 1rem; justify-content: ${config.cta.buttonAlignment === 'left' ? 'flex-start' : config.cta.buttonAlignment === 'right' ? 'flex-end' : 'center'};">
                            ${config.cta.ctaButtons.map(button => `
                                <a href="${button.url}" class="cta-btn cta-btn-${button.variant}" style="padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: inline-block;">
                                    ${button.text}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>
            ` : config.cta.layout === 'image-bottom' ? `
                <div style="display: flex; flex-direction: column; gap: 2rem;">
                    <div class="cta-text" style="text-align: ${config.cta.alignment};">
                        <h2 style="font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem;">${config.cta.heading}</h2>
                        ${config.cta.subtitle ? `<p style="font-size: 1.25rem; margin-bottom: 2rem;">${config.cta.subtitle}</p>` : ''}
                        <div class="cta-buttons" style="display: flex; gap: 1rem; justify-content: ${config.cta.buttonAlignment === 'left' ? 'flex-start' : config.cta.buttonAlignment === 'right' ? 'flex-end' : 'center'};">
                            ${config.cta.ctaButtons.map(button => `
                                <a href="${button.url}" class="cta-btn cta-btn-${button.variant}" style="padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 500; display: inline-block;">
                                    ${button.text}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    <div class="cta-image">
                        <img src="" alt="Your image here" style="width: 100%; height: auto; border-radius: 8px;">
                    </div>
                </div>
            ` : ''}
        </div>
    </section>`;
      
      case 'footer':
        return `<footer class="footer">
        <div class="footer-content">
            ${config.footer.logo ? `
                <div class="footer-logo">
                    ${config.footer.logo.type === 'text' 
                        ? `<h3>${config.footer.logo.content}</h3>` 
                        : `<img src="" alt="Your logo here" class="footer-logo-img">`
                    }
                </div>
            ` : ''}
            
            <div class="footer-main">
                <p>${config.footer.text}</p>
                <div class="footer-links">
                    ${config.footer.links.map(link => `<a href="${link.url}">${link.text}</a>`).join('')}
                </div>
            </div>
            
            ${config.footer.socialLinks && config.footer.socialLinks.length > 0 ? `
                <div class="footer-social">
                    ${config.footer.socialLinks.map(socialLink => `
                        <a href="${socialLink.url}" target="_blank" rel="noopener noreferrer" class="social-link" title="${socialLink.platform}">
                            ${socialLink.platform === 'custom' && socialLink.customIcon 
                                ? socialLink.customIcon 
                                : socialLink.platform === 'facebook' ? 'f' 
                                : socialLink.platform === 'twitter' ? 't'
                                : socialLink.platform === 'instagram' ? 'i'
                                : socialLink.platform === 'linkedin' ? 'in'
                                : socialLink.platform === 'youtube' ? 'yt'
                                : socialLink.platform === 'github' ? 'gh'
                                : socialLink.platform
                            }
                        </a>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    </footer>`;
      
      default:
        return '';
    }
  };

  const generateHTML = () => {
    const getAlignmentClass = (alignment: 'left' | 'center' | 'right') => {
      switch (alignment) {
        case 'left': return 'text-left justify-start';
        case 'center': return 'text-center justify-center';
        case 'right': return 'text-right justify-end';
      }
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="${config.seo?.viewport || 'width=device-width, initial-scale=1.0'}">
    <title>${config.seo?.title || 'Generated Website'}</title>
    ${config.seo?.description ? `<meta name="description" content="${config.seo.description}">` : ''}
    ${config.seo?.keywords ? `<meta name="keywords" content="${config.seo.keywords}">` : ''}
    ${config.seo?.author ? `<meta name="author" content="${config.seo.author}">` : ''}
    ${config.seo?.robots ? `<meta name="robots" content="${config.seo.robots}">` : ''}
    ${config.seo?.themeColor ? `<meta name="theme-color" content="${config.seo.themeColor}">` : ''}
    ${config.seo?.canonicalUrl ? `<link rel="canonical" href="${config.seo.canonicalUrl}">` : ''}
    ${config.seo?.favicon ? `<link rel="icon" href="${config.seo.favicon}">` : ''}
    
    <!-- Open Graph / Facebook -->
    ${config.seo?.ogTitle ? `<meta property="og:type" content="website">` : ''}
    ${config.seo?.ogTitle ? `<meta property="og:title" content="${config.seo.ogTitle}">` : ''}
    ${config.seo?.ogDescription ? `<meta property="og:description" content="${config.seo.ogDescription}">` : ''}
    ${config.seo?.ogImage ? `<meta property="og:image" content="${config.seo.ogImage}">` : ''}
    ${config.seo?.ogUrl ? `<meta property="og:url" content="${config.seo.ogUrl}">` : ''}
    
    <!-- Twitter -->
    ${config.seo?.twitterCard ? `<meta name="twitter:card" content="${config.seo.twitterCard}">` : ''}
    ${config.seo?.twitterSite ? `<meta name="twitter:site" content="${config.seo.twitterSite}">` : ''}
    ${config.seo?.twitterCreator ? `<meta name="twitter:creator" content="${config.seo.twitterCreator}">` : ''}
    ${config.seo?.ogTitle ? `<meta name="twitter:title" content="${config.seo.ogTitle}">` : ''}
    ${config.seo?.ogDescription ? `<meta name="twitter:description" content="${config.seo.ogDescription}">` : ''}
    ${config.seo?.ogImage ? `<meta name="twitter:image" content="${config.seo.ogImage}">` : ''}
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Navbar Styles */
        .navbar {
            background: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border-bottom: 1px solid #e5e7eb;
            padding: 1rem 1.5rem;
        }
        
        .navbar-content {
            display: flex;
            align-items: center;
            ${config.navbar.alignment === 'center' ? 'justify-content: center;' : config.navbar.alignment === 'right' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
        }
        
        .logo {
            margin-right: 2rem;
            font-size: 1.25rem;
            font-weight: 700;
            font-family: '${config.navbar.font}', sans-serif;
        }
        
        .nav-links {
            display: flex;
            gap: 1.5rem;
        }
        
        .nav-links a {
            color: #374151;
            text-decoration: none;
            font-family: '${config.navbar.font}', sans-serif;
            transition: color 0.3s;
        }
        
        .nav-links a:hover {
            color: #8b5cf6;
        }
        
        /* Announcement Bar */
        .announcement {
            background: ${config.announcement.backgroundColor};
            color: white;
            padding: 0.5rem 1rem;
            text-align: center;
            font-size: 0.875rem;
        }
        
        /* Hero Section */
        .hero {
            padding: 1.5rem;
            position: relative;
            /* Replace the gradient below with your own background image: background: url('your-image-url.jpg'); */
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-size: cover;
            background-position: center;
            ${getAlignmentClass(config.hero.alignment)};
            display: flex;
            align-items: center;
            height: ${config.hero.height === 'small' ? '300px' : config.hero.height === 'medium' ? '500px' : config.hero.height === 'large' ? '700px' : '100vh'};
            min-height: ${config.hero.height === 'small' ? '300px' : config.hero.height === 'medium' ? '500px' : config.hero.height === 'large' ? '700px' : '100vh'};
        }
        
        .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
        }
        
        .hero-content {
            position: relative;
            max-width: 64rem;
            margin: 0 auto;
        }
        
        .hero h1 {
            font-size: clamp(2rem, 5vw, 3.75rem);
            font-weight: 700;
            color: white;
            line-height: 1.2;
            margin-bottom: 1rem;
            font-family: '${config.hero.font}', sans-serif;
        }
        
        .hero-subtitle {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 2rem;
            max-width: 32rem;
            font-family: '${config.hero.font}', sans-serif;
        }
        
        .hero-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
        }
        
        .hero-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s;
            display: inline-block;
        }
        
        .hero-btn-primary {
            background: white;
            color: #1f2937;
        }
        
        .hero-btn-primary:hover {
            background: #f3f4f6;
        }
        
        .hero-btn-secondary {
            background: #4b5563;
            color: white;
        }
        
        .hero-btn-secondary:hover {
            background: #374151;
        }
        
        .hero-btn-outline {
            border: 2px solid white;
            color: white;
            background: transparent;
        }
        
        .hero-btn-outline:hover {
            background: white;
            color: #1f2937;
        }
        
        /* Scrolling Text */
        .scrolling-text {
            background: ${config.scrollingText.backgroundColor};
            color: white;
            padding: 1rem 0;
            overflow: hidden;
        }
        
        .scrolling-content {
            animation: scroll 20s linear infinite;
            white-space: nowrap;
            font-size: 1.125rem;
            font-weight: 500;
        }
        
        @keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        
        /* Cards Section */
        .cards-section {
            padding: 4rem 1.5rem;
            background: #f9fafb;
        }
        
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: 72rem;
            margin: 0 auto;
        }
        
        .card {
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            transition: all 0.3s;
        }
        
        .card:hover {
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        }
        
        .card img {
            width: 100%;
            height: 12rem;
            object-fit: cover;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .card p {
            color: #6b7280;
        }
        
        /* Text Area Section */
        .text-section {
            padding: 4rem 1.5rem;
        }
        
        .text-content {
            max-width: 64rem;
            margin: 0 auto;
            font-size: 1.125rem;
            line-height: 1.75;
            color: #374151;
        }
        
        .text-section-heading {
            font-size: 1.875rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 1.5rem;
            text-align: center;
        }
        
        /* Footer */
        .footer {
            background: #111827;
            color: white;
            padding: 2rem 1.5rem;
        }
        
        .footer-content {
            max-width: 72rem;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            ${config.footer.alignment === 'left' ? 'align-items: flex-start;' : config.footer.alignment === 'right' ? 'align-items: flex-end;' : ''}
        }
        
        .footer-logo h3 {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0;
        }
        
        .footer-logo-img {
            height: 2rem;
            width: auto;
        }
        
        .footer-main {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            ${config.footer.alignment === 'left' ? 'align-items: flex-start;' : config.footer.alignment === 'right' ? 'align-items: flex-end;' : ''}
        }
        
        .footer-links {
            display: flex;
            gap: 1.5rem;
        }
        
        .footer-links a {
            color: white;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .footer-links a:hover {
            color: #d1d5db;
        }
        
        .footer-social {
            display: flex;
            gap: 1rem;
            justify-content: center;
            ${config.footer.alignment === 'left' ? 'justify-content: flex-start;' : config.footer.alignment === 'right' ? 'justify-content: flex-end;' : ''}
        }
        
        .social-link {
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #374151;
            border-radius: 50%;
            color: white;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.875rem;
            transition: background-color 0.3s;
        }
        
        .social-link:hover {
            background: #4b5563;
        }
        
        /* CTA Section Styles */
        .cta-btn-primary {
            background: white;
            color: #1f2937;
        }
        
        .cta-btn-primary:hover {
            background: #f3f4f6;
        }
        
        .cta-btn-secondary {
            background: #4b5563;
            color: white;
        }
        
        .cta-btn-secondary:hover {
            background: #374151;
        }
        
        .cta-btn-outline {
            border: 2px solid white;
            color: white;
            background: transparent;
        }
        
        .cta-btn-outline:hover {
            background: white;
            color: #1f2937;
        }
        
        @media (min-width: 768px) {
            .footer-main {
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
                ${config.footer.alignment === 'center' ? 'justify-content: center;' : ''}
            }
        }
    </style>
</head>
<body>
    ${config.sectionOrder.map(sectionType => generateSectionHTML(sectionType)).join('\n    ')}
</body>
</html>`;
  };

  const copyToClipboard = async () => {
    const code = generateHTML();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const code = generateHTML();
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full p-6 bg-gray-50">
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Generated HTML Code</CardTitle>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={copyToClipboard}
                className="transition-smooth"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={downloadCode}
                className="transition-smooth"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-full pb-6">
          {/* Image Notice */}
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">💡</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-amber-800 mb-1">
                  Important: Image Links
                </h4>
                <p className="text-sm text-amber-700">
                  In the generated code, all images are replaced with empty containers. After copying the code, 
                  you'll need to manually replace the empty <code className="bg-amber-100 px-1 rounded">src=""</code> attributes 
                  with your actual image URLs.
                </p>
              </div>
            </div>
          </div>
          
          <Textarea
            value={generateHTML()}
            readOnly
            className="h-full font-mono text-sm resize-none"
            placeholder="Generated HTML code will appear here..."
          />
        </CardContent>
      </Card>
    </div>
  );
}