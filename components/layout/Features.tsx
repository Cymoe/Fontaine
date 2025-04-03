'use client';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="feature-card">
    <div className="feature-icon">
      {icon}
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V9M13 3L19 9M13 3V9H19" stroke="#FF90BC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LightningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.75 13.25H6.75L13.75 2.75V10.75H17.75L10.75 21.25V13.25Z" stroke="#FF90BC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 12H9M12 9V15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#FF90BC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Features() {
  const features = [
    {
      id: 1,
      title: 'Brand DNA Analysis',
      description: 'Upload your brand assets and let our AI analyze your brand\'s typography DNA.',
      icon: <DocumentIcon />
    },
    {
      id: 2,
      title: 'Instant Generation',
      description: 'Create custom font variations in seconds with our advanced AI generation engine.',
      icon: <LightningIcon />
    },
    {
      id: 3,
      title: 'Web-Ready Export',
      description: 'Download production-ready font files in multiple formats (OTF, TTF, WOFF, WOFF2).',
      icon: <PlusCircleIcon />
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <h2>Why choose Fontaine?</h2>
        
        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 