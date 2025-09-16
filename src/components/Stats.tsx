import React from 'react';
import { WebsiteConfig } from '@/types/website';

interface StatsProps {
  config: WebsiteConfig;
}

export function Stats({ config }: StatsProps) {
  if (!config.stats.enabled || !config.stats.items.length) {
    return null;
  }

  return (
    <section className="stats-section" style={{
      backgroundColor: config.stats.backgroundColor,
      padding: '4rem 2rem',
      textAlign: config.stats.alignment === 'center' ? 'center' : 
                 config.stats.alignment === 'right' ? 'right' : 'left'
    }}>
      <div className="stats-container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: config.stats.layout === 'vertical' ? 'column' : 'row',
        gap: config.stats.layout === 'vertical' ? '2rem' : '3rem',
        alignItems: 'center',
        justifyContent: config.stats.alignment === 'center' ? 'center' : 
                       config.stats.alignment === 'right' ? 'flex-end' : 'flex-start',
        flexWrap: 'wrap'
      }}>
        {config.stats.items.map((stat, index) => (
          <div key={index} className="stat-item" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: config.stats.alignment === 'center' ? 'center' : 
                       config.stats.alignment === 'right' ? 'flex-end' : 'flex-start',
            minWidth: config.stats.layout === 'vertical' ? '100%' : '200px',
            textAlign: config.stats.alignment === 'center' ? 'center' : 
                      config.stats.alignment === 'right' ? 'right' : 'left'
          }}>
            <div className="stat-number" style={{
              fontSize: config.stats.numberSize === 'small' ? '2.5rem' : 
                       config.stats.numberSize === 'large' ? '4rem' : '3rem',
              fontWeight: 'bold',
              color: config.stats.numberColor,
              lineHeight: 1,
              marginBottom: '0.5rem',
              fontFamily: config.stats.numberFont || 'inherit'
            }}>
              {stat.number}
              {stat.suffix && (
                <span style={{ 
                  fontSize: '0.6em',
                  marginLeft: '0.2em',
                  color: config.stats.suffixColor || config.stats.numberColor
                }}>
                  {stat.suffix}
                </span>
              )}
            </div>
            <div className="stat-label" style={{
              fontSize: config.stats.labelSize === 'small' ? '0.875rem' : 
                       config.stats.labelSize === 'large' ? '1.25rem' : '1rem',
              color: config.stats.labelColor,
              fontWeight: config.stats.labelWeight === 'bold' ? 'bold' : 
                         config.stats.labelWeight === 'light' ? '300' : 'normal',
              lineHeight: 1.4
            }}>
              {stat.label}
            </div>
            {stat.description && (
              <div className="stat-description" style={{
                fontSize: '0.875rem',
                color: config.stats.descriptionColor || config.stats.labelColor,
                marginTop: '0.5rem',
                opacity: 0.8,
                lineHeight: 1.4
              }}>
                {stat.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
