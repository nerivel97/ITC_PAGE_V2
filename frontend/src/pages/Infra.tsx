import React from 'react';
import HeroInfa from '../components/InstitutoComponents/HeroInfra/HeroInfra';
import ContenidoInfra from '../components/InstitutoComponents/ContenidoInfra/ContenidoInfra';
import Tecnm from '../components/InstitutoComponents/Tecnm/Tecnm';

const Infra: React.FC = () => {
  return (
    <div>
        <HeroInfa />
        <ContenidoInfra />
      <Tecnm/> 
    </div>
  );
};

export default Infra;