import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, Check } from 'lucide-react';
import { WebsiteConfig } from '@/types/website';

interface CodeGeneratorProps {
  config: WebsiteConfig;
}

export function CodeGenerator({ config }: CodeGeneratorProps) {
  const [copied, setCopied] = useState(false);

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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Website</title>
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
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            color: white;
            padding: 0.5rem 1rem;
            text-align: center;
            font-size: 0.875rem;
        }
        
        /* Hero Section */
        .hero {
            padding: 1.5rem;
            position: relative;
            background: ${config.hero.backgroundImage ? `url('${config.hero.backgroundImage}')` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
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
            font-family: '${config.hero.font}', sans-serif;
        }
        
        /* Scrolling Text */
        .scrolling-text {
            background: #111827;
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
        
        @media (min-width: 768px) {
            .footer-content {
                flex-direction: row;
                justify-content: space-between;
                ${config.footer.alignment === 'center' ? 'justify-content: center;' : ''}
            }
        }
    </style>
</head>
<body>
    ${config.announcement.enabled ? `<div class="announcement">${config.announcement.text}</div>` : ''}
    
    ${config.navbar.enabled ? `<nav class="navbar">
        <div class="navbar-content">
            <div class="logo">
                ${config.navbar.logo.type === 'text' ? config.navbar.logo.content : `<img src="${config.navbar.logo.content}" alt="Logo" style="height: 2rem;">`}
            </div>
            <div class="nav-links">
                ${config.navbar.links.map(link => `<a href="${link.url}">${link.text}</a>`).join('')}
            </div>
        </div>
    </nav>` : ''}
    
    <section class="hero">
        <div class="hero-content">
            <h1>${config.hero.heading}</h1>
        </div>
    </section>
    
    <div class="scrolling-text">
        <div class="scrolling-content">${config.scrollingText.text}</div>
    </div>
    
    <section class="cards-section">
        <div class="cards-grid">
            ${config.cards.cards.map(card => `
                <div class="card">
                    ${card.image ? `<img src="${card.image}" alt="${card.title}">` : ''}
                    <h3>${card.title}</h3>
                    <p>${card.description}</p>
                </div>
            `).join('')}
        </div>
    </section>
    
    <section class="text-section">
        <div class="text-content">
            <p>${config.textArea.content}</p>
        </div>
    </section>
    
    <footer class="footer">
        <div class="footer-content">
            <p>${config.footer.text}</p>
            <div class="footer-links">
                ${config.footer.links.map(link => `<a href="${link.url}">${link.text}</a>`).join('')}
            </div>
        </div>
    </footer>
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