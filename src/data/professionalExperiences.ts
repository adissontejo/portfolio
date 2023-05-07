type ProfessionalExperience = {
  name: string;
  about: string;
  init: string;
  end: string;
};

export const professionalExperiences: ProfessionalExperience[] = [
  {
    name: 'Estágio no Tribunal de Contas da União',
    about:
      'Atualmente, estagio no Tribunal de Contas da União (TCU) como desenvolvedor Oracle SQL APEX, onde desenvolvo sistemas front-end integrados com bancos de dados SQL para o tribunal.',
    init: '2021',
    end: 'atualmente',
  },
  {
    name: 'Projeto Freelancer Weptek',
    about:
      'Participei do desenvolvimento do projeto freelancer Weptek, site PWA e mobile feito com ReactJS que tem o objetivo de realizar viagens de carro compartilhadas e integrar a comunicação e o agendamento entre os motoristas e passageiros.',
    init: '2021',
    end: '2022',
  },
];
