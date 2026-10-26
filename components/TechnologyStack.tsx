const technologies = [
  { name: 'Java', role: 'Backend', logo: '/assets/technology/java.svg' },
  { name: 'React', role: 'Web', logo: '/assets/technology/react.svg' },
  { name: 'React Native', role: 'Cross-platform', logo: '/assets/technology/react.svg' },
  { name: 'Android', role: 'Mobile', logo: '/assets/technology/android.svg' },
  { name: 'iOS', role: 'Mobile', logo: '/assets/technology/apple.svg' },
  { name: 'AWS', role: 'Cloud', logo: '/assets/technology/aws.svg', wordmark: true },
  { name: 'Hostinger', role: 'Hosting', logo: '/assets/technology/hostinger.svg' },
  { name: 'Docker', role: 'DevOps', logo: '/assets/technology/docker.svg' },
];

export default function TechnologyStack() {
  return <div className="technology-stack" id="technology-stack" aria-label="Technology stack">{technologies.map((technology) => <article className="technology-card" key={technology.name}><img alt="" aria-hidden="true" className={technology.wordmark ? 'technology-logo technology-logo-wordmark' : 'technology-logo'} src={technology.logo} /><div><h3>{technology.name}</h3><small>{technology.role}</small></div></article>)}</div>;
}
