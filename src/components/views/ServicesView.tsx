import React from 'react';
import { useApp } from '../../context/AppContext';
import { ServicesBento } from '../home/ServicesBento';
import { ProcessTimeline } from '../home/ProcessTimeline';
import { GuaranteeSection } from '../home/GuaranteeSection';
import { ComparisonSection } from '../home/ComparisonSection';

export const ServicesView: React.FC = () => {
  return (
    <div className="pt-24">
      <ServicesBento />
      <ComparisonSection />
      <ProcessTimeline />
      <GuaranteeSection />
    </div>
  );
};
