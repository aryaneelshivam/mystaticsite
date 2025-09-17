import { MapsConfig } from '@/types/website';

interface MapsProps {
  config: MapsConfig;
}

export function Maps({ config }: MapsProps) {
  if (!config.enabled) {
    return null;
  }

  if (!config.embedUrl) {
    return (
      <div className="maps-section bg-gray-100 p-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 border-2 border-dashed border-gray-300">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Google Maps</h3>
            <p className="text-gray-500">Configure your map settings to display an interactive Google Map</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="maps-section bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        {config.title && (
          <div className={`text-center mb-8 ${config.titleAlignment === 'left' ? 'text-left' : config.titleAlignment === 'right' ? 'text-right' : 'text-center'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: config.titleFont }}>
              {config.title}
            </h2>
            {config.subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: config.subtitleFont }}>
                {config.subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={`${config.alignment === 'left' ? 'flex justify-start' : config.alignment === 'right' ? 'flex justify-end' : 'flex justify-center'}`}>
          <div 
            className="rounded-lg overflow-hidden shadow-lg border border-gray-200"
            style={{ 
              width: config.width === 'small' ? '400px' : config.width === 'large' ? '800px' : '600px',
              height: config.height === 'small' ? '300px' : config.height === 'large' ? '500px' : '400px'
            }}
          >
            <iframe
              src={config.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={config.title || "Google Maps"}
            />
          </div>
        </div>
        
        {config.description && (
          <div className={`mt-6 ${config.descriptionAlignment === 'left' ? 'text-left' : config.descriptionAlignment === 'right' ? 'text-right' : 'text-center'}`}>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: config.descriptionFont }}>
              {config.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
