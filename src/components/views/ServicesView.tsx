import React from 'react';
import { useApp } from '../../context/AppContext';
import { ServicesBento } from '../home/ServicesBento';
import { ProcessTimeline } from '../home/ProcessTimeline';
import { GuaranteeSection } from '../home/GuaranteeSection';

export const ServicesView: React.FC = () => {
  return (
    <div className="pt-24">
      <ServicesBento />
      <ProcessTimeline />
      <GuaranteeSection />
    </div>
  );
};
