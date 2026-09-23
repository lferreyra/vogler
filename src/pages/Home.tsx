import React from 'react';
import { Hero } from '../components/home/Hero';
import { ValueProp } from '../components/home/ValueProp';
import { ServicesBento } from '../components/home/ServicesBento';
import { SolutionTransition } from '../components/home/SolutionTransition';
import { GuaranteeSection } from '../components/home/GuaranteeSection';
import { ProcessTimeline } from '../components/home/ProcessTimeline';
import { HowToBook } from '../components/home/HowToBook';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { FAQSection } from '../components/home/FAQSection';
import { FinalCTA } from '../components/home/FinalCTA';

export const Home: React.FC = () => {
  return (
    <div className="space-y-0">
      <Hero />
      <ValueProp />
      <ServicesBento />
      <SolutionTransition />
      <GuaranteeSection />
      <ProcessTimeline />
      <HowToBook />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </div>
  );
};
