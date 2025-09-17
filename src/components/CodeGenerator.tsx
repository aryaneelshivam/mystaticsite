import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Check, Lightbulb, FileText, Palette, Code } from 'lucide-react';
import { WebsiteConfig, SectionType } from '@/types/website';

interface CodeGeneratorProps {
  config: WebsiteConfig;
}

export function CodeGenerator({ config }: CodeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');

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
      
      case 'stats':
        return config.stats.enabled ? `<section class="stats-section" style="background-color: ${config.stats.backgroundColor}; padding: 4rem 2rem; text-align: ${config.stats.alignment === 'center' ? 'center' : config.stats.alignment === 'right' ? 'right' : 'left'};">
        <div class="stats-container" style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: ${config.stats.layout === 'vertical' ? 'column' : 'row'}; gap: ${config.stats.layout === 'vertical' ? '2rem' : '3rem'}; align-items: center; justify-content: ${config.stats.alignment === 'center' ? 'center' : config.stats.alignment === 'right' ? 'flex-end' : 'flex-start'}; flex-wrap: wrap;">
            ${config.stats.items.map(stat => `
                <div class="stat-item" style="display: flex; flex-direction: column; align-items: ${config.stats.alignment === 'center' ? 'center' : config.stats.alignment === 'right' ? 'flex-end' : 'flex-start'}; min-width: ${config.stats.layout === 'vertical' ? '100%' : '200px'}; text-align: ${config.stats.alignment === 'center' ? 'center' : config.stats.alignment === 'right' ? 'right' : 'left'};">
                    <div class="stat-number" style="font-size: ${config.stats.numberSize === 'small' ? '2.5rem' : config.stats.numberSize === 'large' ? '4rem' : '3rem'}; font-weight: bold; color: ${config.stats.numberColor}; line-height: 1; margin-bottom: 0.5rem; font-family: ${config.stats.numberFont || 'inherit'};">
                        ${stat.number}${stat.suffix ? `<span style="font-size: 0.6em; margin-left: 0.2em; color: ${config.stats.suffixColor || config.stats.numberColor};">${stat.suffix}</span>` : ''}
                    </div>
                    <div class="stat-label" style="font-size: ${config.stats.labelSize === 'small' ? '0.875rem' : config.stats.labelSize === 'large' ? '1.25rem' : '1rem'}; color: ${config.stats.labelColor}; font-weight: ${config.stats.labelWeight === 'bold' ? 'bold' : config.stats.labelWeight === 'light' ? '300' : 'normal'}; line-height: 1.4;">
                        ${stat.label}
                    </div>
                    ${stat.description ? `<div class="stat-description" style="font-size: 0.875rem; color: ${config.stats.descriptionColor || config.stats.labelColor}; margin-top: 0.5rem; opacity: 0.8; line-height: 1.4;">${stat.description}</div>` : ''}
                </div>
            `).join('')}
        </div>
    </section>` : '';
      
      case 'maps':
        return config.maps.enabled ? `<section class="maps-section" style="background-color: white; padding: 4rem 0;">
        <div class="max-w-6xl mx-auto px-6">
            ${config.maps.title ? `
                <div class="text-center mb-8" style="text-align: ${config.maps.titleAlignment === 'left' ? 'left' : config.maps.titleAlignment === 'right' ? 'right' : 'center'};">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4" style="font-family: ${config.maps.titleFont};">
                        ${config.maps.title}
                    </h2>
                    ${config.maps.subtitle ? `
                        <p class="text-lg text-gray-600 max-w-2xl mx-auto" style="font-family: ${config.maps.subtitleFont};">
                            ${config.maps.subtitle}
                        </p>
                    ` : ''}
                </div>
            ` : ''}
            
            ${config.maps.embedUrl ? `
            <div class="flex justify-center" style="justify-content: ${config.maps.alignment === 'left' ? 'flex-start' : config.maps.alignment === 'right' ? 'flex-end' : 'center'};">
                <div class="rounded-lg overflow-hidden shadow-lg border border-gray-200" style="width: ${config.maps.width === 'small' ? '400px' : config.maps.width === 'large' ? '800px' : '600px'}; height: ${config.maps.height === 'small' ? '300px' : config.maps.height === 'large' ? '500px' : '400px'};">
                    <iframe
                        src="${config.maps.embedUrl}"
                        width="100%"
                        height="100%"
                        style="border: 0;"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                        title="${config.maps.title || 'Google Maps'}"
                    ></iframe>
                </div>
            </div>
            ` : `
            <div class="flex justify-center" style="justify-content: ${config.maps.alignment === 'left' ? 'flex-start' : config.maps.alignment === 'right' ? 'flex-end' : 'center'};">
                <div class="bg-gray-100 rounded-lg p-8 border-2 border-dashed border-gray-300 text-center" style="width: ${config.maps.width === 'small' ? '400px' : config.maps.width === 'large' ? '800px' : '600px'}; height: ${config.maps.height === 'small' ? '300px' : config.maps.height === 'large' ? '500px' : '400px'};">
                    <div class="text-gray-500 mb-4">
                        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">Google Maps</h3>
                    <p class="text-gray-500">Configure your map settings to display an interactive Google Map</p>
                </div>
            </div>
            `}
            
            ${config.maps.description ? `
                <div class="mt-6" style="text-align: ${config.maps.descriptionAlignment === 'left' ? 'left' : config.maps.descriptionAlignment === 'right' ? 'right' : 'center'};">
                    <p class="text-gray-600 max-w-2xl mx-auto" style="font-family: ${config.maps.descriptionFont};">
                        ${config.maps.description}
                    </p>
                </div>
            ` : ''}
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

  const generateCSS = () => {
    return `/* Reset and Base Styles */
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: cover;
    background-position: center;
    ${config.hero.alignment === 'center' ? 'text-align: center; justify-content: center;' : config.hero.alignment === 'right' ? 'text-align: right; justify-content: flex-end;' : 'text-align: left; justify-content: flex-start;'}
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

.hero p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    font-family: '${config.hero.font}', sans-serif;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    ${config.hero.alignment === 'center' ? 'justify-content: center;' : config.hero.alignment === 'right' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
    flex-wrap: wrap;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    border: 2px solid transparent;
    display: inline-block;
}

.btn-primary {
    background: #8b5cf6;
    color: white;
}

.btn-primary:hover {
    background: #7c3aed;
    transform: translateY(-2px);
}

.btn-outline {
    background: transparent;
    color: white;
    border-color: white;
}

.btn-outline:hover {
    background: white;
    color: #8b5cf6;
}

.btn-secondary {
    background: #6b7280;
    color: white;
}

.btn-secondary:hover {
    background: #4b5563;
}

/* Scrolling Text */
.scrolling-text {
    background: ${config.scrollingText.backgroundColor};
    color: white;
    padding: 1rem 0;
    overflow: hidden;
    white-space: nowrap;
}

.scrolling-content {
    display: inline-block;
    animation: scroll 20s linear infinite;
    font-size: 1.125rem;
    font-weight: 500;
}

@keyframes scroll {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
}

/* Text Section */
.text-section {
    padding: 4rem 1.5rem;
    background: white;
}

.text-content {
    max-width: 64rem;
    margin: 0 auto;
    ${config.textArea.sections[0]?.alignment === 'center' ? 'text-align: center;' : config.textArea.sections[0]?.alignment === 'right' ? 'text-align: right;' : 'text-align: left;'}
}

.text-content h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #1f2937;
}

.text-content p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: #4b5563;
    margin-bottom: 1.5rem;
}

/* Cards Section */
.cards-section {
    padding: 4rem 1.5rem;
    background: #f9fafb;
}

.cards-grid {
    max-width: 64rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.card {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.card img {
    width: 100%;
    height: 12rem;
    object-fit: cover;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.card h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1f2937;
}

.card p {
    color: #6b7280;
    line-height: 1.6;
}

/* Statistics Section */
.stats-section {
    background: ${config.stats.backgroundColor};
    padding: 4rem 2rem;
    text-align: ${config.stats.alignment === 'center' ? 'center' : config.stats.alignment === 'right' ? 'right' : 'left'};
}

.stats-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: ${config.stats.layout === 'vertical' ? 'column' : 'row'};
    gap: ${config.stats.layout === 'vertical' ? '2rem' : '3rem'};
    align-items: center;
    justify-content: ${config.stats.alignment === 'center' ? 'center' : config.stats.alignment === 'right' ? 'flex-end' : 'flex-start'};
    flex-wrap: wrap;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: ${config.stats.alignment === 'center' ? 'center' : config.stats.alignment === 'right' ? 'flex-end' : 'flex-start'};
    min-width: ${config.stats.layout === 'vertical' ? '100%' : '200px'};
    text-align: ${config.stats.alignment === 'center' ? 'center' : config.stats.alignment === 'right' ? 'right' : 'left'};
}

.stat-number {
    font-size: ${config.stats.numberSize === 'small' ? '2.5rem' : config.stats.numberSize === 'large' ? '4rem' : '3rem'};
    font-weight: bold;
    color: ${config.stats.numberColor};
    line-height: 1;
    margin-bottom: 0.5rem;
    font-family: ${config.stats.numberFont || 'inherit'};
}

.stat-label {
    font-size: ${config.stats.labelSize === 'small' ? '0.875rem' : config.stats.labelSize === 'large' ? '1.25rem' : '1rem'};
    color: ${config.stats.labelColor};
    font-weight: ${config.stats.labelWeight === 'bold' ? 'bold' : config.stats.labelWeight === 'light' ? '300' : 'normal'};
    line-height: 1.4;
}

.stat-description {
    font-size: 0.875rem;
    color: ${config.stats.descriptionColor || config.stats.labelColor};
    margin-top: 0.5rem;
    opacity: 0.8;
    line-height: 1.4;
}

/* Maps Section */
.maps-section {
    background: white;
    padding: 4rem 0;
}

.maps-section .max-w-6xl {
    max-width: 72rem;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.maps-section h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
}

.maps-section p {
    color: #6b7280;
    line-height: 1.6;
}

.maps-iframe-container {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.maps-iframe-container iframe {
    border: 0;
    width: 100%;
    height: 100%;
}

/* CTA Section */
.cta-section {
    background: ${config.cta.backgroundColor};
    color: ${config.cta.textColor};
    padding: 4rem 1.5rem;
}

.cta-content {
    max-width: 64rem;
    margin: 0 auto;
}

.cta-text {
    ${config.cta.alignment === 'center' ? 'text-align: center;' : config.cta.alignment === 'right' ? 'text-align: right;' : 'text-align: left;'}
}

.cta-text h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    font-family: '${config.cta.font}', sans-serif;
}

.cta-text p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    font-family: '${config.cta.font}', sans-serif;
}

.cta-buttons {
    display: flex;
    gap: 1rem;
    ${config.cta.buttonAlignment === 'center' ? 'justify-content: center;' : config.cta.buttonAlignment === 'right' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
    flex-wrap: wrap;
}

/* Footer */
.footer {
    background: #1f2937;
    color: white;
    padding: 3rem 1.5rem 1.5rem;
}

.footer-content {
    max-width: 64rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    ${config.footer.alignment === 'center' ? 'text-align: center; align-items: center;' : config.footer.alignment === 'right' ? 'text-align: right; align-items: flex-end;' : 'text-align: left; align-items: flex-start;'}
}

.footer-logo {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.footer-links {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    ${config.footer.alignment === 'center' ? 'justify-content: center;' : config.footer.alignment === 'right' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
}

.footer-links a {
    color: #d1d5db;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: white;
}

.social-links {
    display: flex;
    gap: 1rem;
    ${config.footer.alignment === 'center' ? 'justify-content: center;' : config.footer.alignment === 'right' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
}

.social-links a {
    color: #d1d5db;
    text-decoration: none;
    transition: color 0.3s;
}

.social-links a:hover {
    color: white;
}

.footer-text {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #374151;
    color: #9ca3af;
    font-size: 0.875rem;
    ${config.footer.alignment === 'center' ? 'text-align: center;' : config.footer.alignment === 'right' ? 'text-align: right;' : 'text-align: left;'}
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero {
        padding: 2rem 1rem;
        height: auto;
        min-height: 400px;
    }
    
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: ${config.hero.alignment === 'center' ? 'center' : config.hero.alignment === 'right' ? 'flex-end' : 'flex-start'};
    }
    
    .cards-grid {
        grid-template-columns: 1fr;
    }
    
    .stats-container {
        flex-direction: column;
        text-align: center;
    }
    
    .maps-section .max-w-6xl {
        padding: 0 1rem;
    }
    
    .maps-section h2 {
        font-size: 1.75rem;
    }
    
    .cta-buttons {
        flex-direction: column;
        align-items: ${config.cta.buttonAlignment === 'center' ? 'center' : config.cta.buttonAlignment === 'right' ? 'flex-end' : 'flex-start'};
    }
    
    .footer-content {
        text-align: center;
        align-items: center;
    }
    
    .footer-links {
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
    }
    
    .social-links {
        justify-content: center;
    }
    
    .navbar-content {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-links {
        justify-content: space-between;
        width: 100%;
        ${config.footer.alignment === 'center' ? 'justify-content: center;' : ''}
    }
}`;
  };

  const generateJavaScript = () => {
    return `// Website JavaScript Functionality

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'white';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // Animate statistics on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent.replace(/[^0-9]/g, '');
                const suffix = target.textContent.replace(/[0-9]/g, '');
                
                if (finalNumber && !isNaN(finalNumber)) {
                    animateNumber(target, 0, parseInt(finalNumber), suffix, 2000);
                }
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });

    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Button click animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Number animation function
function animateNumber(element, start, end, suffix, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = \`
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
\`;
document.head.appendChild(style);`;
  };

  const generateHTMLOnly = () => {
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
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    ${config.sectionOrder.map(sectionType => generateSectionHTML(sectionType)).join('\n    ')}
    <script src="script.js"></script>
</body>
</html>`;
  };

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'html':
        return generateHTMLOnly();
      case 'css':
        return generateCSS();
      case 'js':
        return generateJavaScript();
      default:
        return generateHTML();
    }
  };

  const copyToClipboard = async () => {
    const code = getCurrentCode();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const code = getCurrentCode();
    const extensions = {
      html: 'html',
      css: 'css',
      js: 'js'
    };
    const extension = extensions[activeTab];
    const mimeTypes = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript'
    };
    const mimeType = mimeTypes[activeTab];
    
    const blob = new Blob([code], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `website.${extension}`;
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
            <CardTitle>Generated Code</CardTitle>
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
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'html' | 'css' | 'js')} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="html" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                CSS
              </TabsTrigger>
              <TabsTrigger value="js" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                JavaScript
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="html" className="flex-1 mt-4">
              {/* Image Notice for HTML */}
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
                      In the generated HTML, all images are replaced with empty containers. After copying the code, 
                      you'll need to manually replace the empty <code className="bg-amber-100 px-1 rounded">src=""</code> attributes 
                      with your actual image URLs.
                    </p>
                  </div>
                </div>
              </div>
              
              <Textarea
                value={getCurrentCode()}
                readOnly
                className="h-full font-mono text-sm resize-none"
                placeholder="Generated HTML code will appear here..."
              />
            </TabsContent>
            
            <TabsContent value="css" className="flex-1 mt-4">
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Palette className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">
                      CSS Styles
                    </h4>
                    <p className="text-sm text-blue-700">
                      This CSS file contains all the styling for your website. Save it as <code className="bg-blue-100 px-1 rounded">styles.css</code> and link it in your HTML file.
                    </p>
                  </div>
                </div>
              </div>
              
              <Textarea
                value={getCurrentCode()}
                readOnly
                className="h-full font-mono text-sm resize-none"
                placeholder="Generated CSS code will appear here..."
              />
            </TabsContent>
            
            <TabsContent value="js" className="flex-1 mt-4">
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-green-800 mb-1">
                      JavaScript Functionality
                    </h4>
                    <p className="text-sm text-green-700">
                      This JavaScript file adds interactive features like smooth scrolling, animations, and hover effects. Save it as <code className="bg-green-100 px-1 rounded">script.js</code> and link it in your HTML file.
                    </p>
                  </div>
                </div>
              </div>
              
              <Textarea
                value={getCurrentCode()}
                readOnly
                className="h-full font-mono text-sm resize-none"
                placeholder="Generated JavaScript code will appear here..."
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}