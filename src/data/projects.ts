import { StaticImageData } from 'next/image';
import letmeask from 'public/projects/letmeask.png';
import memoryGame from 'public/projects/memory-game.png';
import myUbuntu from 'public/projects/my-ubuntu.png';
import podcastMe from 'public/projects/podcast-me.png';
import robit from 'public/projects/robit.png';
import vampiro from 'public/projects/vampiro.png';

type Project = {
  name: string;
  about: string;
  src: StaticImageData;
};

export const projects: Project[] = [
  {
    name: 'letmeask',
    about:
      'O letmeask foi um projeto desenvolvido durante o evento Next Level Week na trilha de ReactJS. O site tem o intuito de fornecer salas de perguntas e respostas em tempo real para facilitar os momentos de Q&A. O site possui integração com o firebase para a conexão em tempo real e com o google para log-in.',
    src: letmeask,
  },
  {
    name: 'Podcast ME',
    about:
      'O site Podcast ME foi feito como um projeto universitário para servir como guia para a disciplina Matemática Elementar do curso de Tecnologia da Informação da UFRN, onde encontra-se disponível a entrevista com o lecionador da disciplina e também outras informações importantes. O site foi feito utilizando HTML, CSS, Javascript e jQuery e integrado com o Firebase para avaliações e perguntas sobre a disciplina.',
    src: podcastMe,
  },
  {
    name: 'My Ubuntu',
    about:
      'O My Ubuntu é um site feito em NextJS que simula um ambiente simples baseado no sistema operacional Ubuntu, misturando os elementos do sistema com informações sobre mim e redes sociais.',
    src: myUbuntu,
  },
  {
    name: 'Vampiro',
    about:
      'O Vampiro é um jogo mobile e local em desenvolvimento baseado no jogo de grupo "Cidade Dorme", onde são atribuídas classes secretas com diferentes objetivos e times para os jogadores. O jogo atualmente é desenvolvido com React Native.',
    src: vampiro,
  },
  {
    name: 'Memory Game',
    about:
      'O Memory Game é um jogo simples de memória que pode ser jogado tanto individualmente quanto em tempo real com os amigos. O jogo foi feito com o framework VueJS com intenções de aprendizado.',
    src: memoryGame,
  },
  {
    name: 'ROBIT',
    about:
      'ROBIT foi um projeto de pesquisa realizado com o intuito de providenciar kits de robótica para as escolas de fácil utilização e baixo custo. O kit foi criado utilizando a placa de prototipagem Arduino, junto com uma biblioteca em C++ para sua IDE para auxiliar na programação.',
    src: robit,
  },
];
