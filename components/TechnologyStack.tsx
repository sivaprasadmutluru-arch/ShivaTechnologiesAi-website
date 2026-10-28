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

const integrations = [
  { name: 'Twilio', role: 'Communications', logo: '/assets/technology/twilio.svg' },
  { name: 'Firebase', role: 'Cloud services', logo: '/assets/technology/firebase.svg' },
  { name: 'Stripe', role: 'Payments', logo: '/assets/technology/stripe.svg' },
  { name: 'Razorpay', role: 'Payments', logo: '/assets/technology/razorpay.svg' },
];

type StackItem = (typeof technologies)[number] | (typeof integrations)[number];

function Stack({ items, label }: { items: StackItem[]; label: string }) {
  return <div className="technology-stack" aria-label={label}>{items.map((item) => <article className="technology-card" key={item.name}><img alt="" aria-hidden="true" className={'wordmark' in item && item.wordmark ? 'technology-logo technology-logo-wordmark' : 'technology-logo'} src={item.logo} /><div><h3>{item.name}</h3><small>{item.role}</small></div></article>)}</div>;
}

export default function TechnologyStack() {
  return <div id="technology-stack"><Stack items={technologies} label="Technology stack" /></div>;
}

export function IntegrationStack() {
  return <Stack items={integrations} label="Third-party integrations" />;
}
