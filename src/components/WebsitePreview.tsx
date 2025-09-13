import { WebsiteConfig, SectionType } from '@/types/website';

interface WebsitePreviewProps {
  config: WebsiteConfig;
  viewMode: 'desktop' | 'mobile';
}

export function WebsitePreview({ config, viewMode }: WebsitePreviewProps) {
  const getAlignmentClass = (alignment: 'left' | 'center' | 'right') => {
    switch (alignment) {
      case 'left': return 'text-left justify-start';
      case 'center': return 'text-center justify-center';
      case 'right': return 'text-right justify-end';
    }
  };

  const getFontFamily = (font: string) => {
    return { fontFamily: font };
  };

  const getHeroHeight = (height: 'small' | 'medium' | 'large' | 'full') => {
    switch (height) {
      case 'small': return '300px';
      case 'medium': return '500px';
      case 'large': return '700px';
      case 'full': return '100vh';
    }
  };

  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case 'announcement':
        return config.announcement.enabled ? (
          <div 
            key="announcement"
            className="text-white py-2 px-4 text-center text-sm"
            style={{ backgroundColor: config.announcement.backgroundColor }}
          >
            {config.announcement.text}
          </div>
        ) : null;

      case 'navbar':
        return config.navbar.enabled ? (
          <nav key="navbar" className="bg-white shadow-sm border-b px-6 py-4">
            <div className={`flex items-center ${getAlignmentClass(config.navbar.alignment)}`}>
              {/* Logo */}
              <div className="mr-8">
                {config.navbar.logo.type === 'text' ? (
                  <span className="text-xl font-bold" style={getFontFamily(config.navbar.font)}>
                    {config.navbar.logo.content}
                  </span>
                ) : (
                  <img 
                    src={config.navbar.logo.content} 
                    alt="Logo" 
                    className="h-8 w-auto"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
              
              {/* Navigation Links */}
              <div className="flex space-x-6">
                {config.navbar.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="text-gray-700 hover:text-primary transition-colors"
                    style={getFontFamily(config.navbar.font)}
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        ) : null;

      case 'hero':
        return (
          <section 
            key="hero"
            className="px-6 relative flex items-center"
            style={{
              backgroundImage: config.hero.backgroundImage ? `url(${config.hero.backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: getHeroHeight(config.hero.height),
              minHeight: getHeroHeight(config.hero.height)
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className={`relative max-w-4xl mx-auto ${getAlignmentClass(config.hero.alignment)}`}>
              <h1 
                className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
                style={getFontFamily(config.hero.font)}
              >
                {config.hero.heading}
              </h1>
              
              {config.hero.subtitle && (
                <p 
                  className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
                  style={getFontFamily(config.hero.font)}
                >
                  {config.hero.subtitle}
                </p>
              )}
              
              {config.hero.ctaButtons && config.hero.ctaButtons.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {config.hero.ctaButtons.map((button) => (
                    <a
                      key={button.id}
                      href={button.url}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        button.variant === 'primary' 
                          ? 'bg-white text-gray-900 hover:bg-gray-100' 
                          : button.variant === 'secondary'
                          ? 'bg-gray-600 text-white hover:bg-gray-700'
                          : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
                      }`}
                    >
                      {button.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case 'scrollingText':
        return (
          <div 
            key="scrollingText"
            className="text-white py-4 overflow-hidden"
            style={{ backgroundColor: config.scrollingText.backgroundColor }}
          >
            <div className="animate-scroll whitespace-nowrap text-lg font-medium">
              {config.scrollingText.text}
            </div>
          </div>
        );

      case 'textArea':
        return (
          <section key="textArea" className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg mx-auto">
                {config.textArea.heading && (
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    {config.textArea.heading}
                  </h2>
                )}
                <p className="text-lg leading-relaxed text-gray-700">
                  {config.textArea.content}
                </p>
              </div>
            </div>
          </section>
        );

      case 'cards':
        return (
          <section key="cards" className="py-16 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {config.cards.cards.map((card) => (
                  <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {card.image && (
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                      <p className="text-gray-600">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'footer':
        return (
          <footer key="footer" className="bg-gray-900 text-white py-8 px-6">
            <div className={`max-w-6xl mx-auto ${getAlignmentClass(config.footer.alignment)}`}>
              <div className="space-y-6">
                {/* Logo */}
                {config.footer.logo && (
                  <div className="flex justify-center md:justify-start">
                    {config.footer.logo.type === 'text' ? (
                      <h3 className="text-xl font-bold">{config.footer.logo.content}</h3>
                    ) : (
                      <img 
                        src={config.footer.logo.content} 
                        alt="Logo" 
                        className="h-8 w-auto"
                      />
                    )}
                  </div>
                )}
                
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <p>{config.footer.text}</p>
                  <div className="flex space-x-6">
                    {config.footer.links.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        className="hover:text-gray-300 transition-colors"
                      >
                        {link.text}
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Social Links */}
                {config.footer.socialLinks && config.footer.socialLinks.length > 0 && (
                  <div className="flex justify-center md:justify-start space-x-4">
                    {config.footer.socialLinks.map((socialLink) => (
                      <a
                        key={socialLink.id}
                        href={socialLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                        title={socialLink.platform}
                      >
                        {socialLink.platform === 'custom' && socialLink.customIcon ? (
                          <span className="text-sm">{socialLink.customIcon}</span>
                        ) : (
                          <span className="text-sm font-bold">
                            {socialLink.platform === 'facebook' && 'f'}
                            {socialLink.platform === 'twitter' && 't'}
                            {socialLink.platform === 'instagram' && 'i'}
                            {socialLink.platform === 'linkedin' && 'in'}
                            {socialLink.platform === 'youtube' && 'yt'}
                            {socialLink.platform === 'github' && 'gh'}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </footer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto preview-bg">
      <div className={`bg-white min-h-full transition-all duration-300 ${
        viewMode === 'mobile' 
          ? 'max-w-sm mx-auto shadow-2xl border border-gray-200 rounded-lg overflow-hidden' 
          : 'w-full'
      }`}>
        {viewMode === 'mobile' && (
          <div className="bg-gray-800 h-6 flex items-center justify-center">
            <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
          </div>
        )}
        {config.sectionOrder.map((sectionType) => renderSection(sectionType))}
      </div>
    </div>
  );
}