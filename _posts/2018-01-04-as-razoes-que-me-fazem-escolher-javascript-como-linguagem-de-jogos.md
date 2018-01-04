---
layout: post
title: As razões que me fazem escolher Javascript como linguagem de jogos
date: 2018-01-04 00:10:00 -0300
section: Mão na massa
excerpt: Aqui explico os motivos pelos quais Javascript é minha escolha número um para programar pequenos jogos 2D hoje em dia.
---

Como [já falei por aqui]({{ site.baseurl }}{% post_url 2017-08-11-tudo-comecou-com-o-atari %}), comecei a jogar video games desde criança, quando ganhei um Atari. Já adulto aprendi a programar, e pelas circunstâncias a primeira linguagem de programação que aprendi foi [QuickBASIC](https://pt.wikipedia.org/wiki/QuickBASIC) (mais sobre isso [aqui](https://tnaires.github.io/)). Depois de um tempo descobri que QuickBASIC tinha um conjunto de funções e procedimentos que serviam para desenhar coisas na tela: pontos, linhas, formas geométricas, cores. A partir daí já comecei a tentar aprender a criar pequenos jogos.

Depois lembro que consegui com um amigo meu uma apostila de [C](https://pt.wikipedia.org/wiki/C_(linguagem_de_programa%C3%A7%C3%A3o)) e [Allegro](http://liballeg.org/), que me ensinou muitos conceitos básicos de jogos que ainda uso até hoje. Daí terminei um curso técnico de programação onde aprendi [Delphi](https://pt.wikipedia.org/wiki/Embarcadero_Delphi) e [Java](https://pt.wikipedia.org/wiki/Java_(linguagem_de_programa%C3%A7%C3%A3o)), e continuei fazendo experiências com essas duas linguagens. Alguns exemplos de jogos que eu (re)desenvolvi ao longo dessas experiências foram:

- [PONG](https://pt.wikipedia.org/wiki/Pong): fiz em Java, como atividade de uma disciplina de Programação Distribuída que paguei na faculdade. Ele tinha uma [arquitetura cliente-servidor](https://pt.wikipedia.org/wiki/Cliente-servidor) que permitia que duas pessoas jogassem em rede através do protocolo [UDP](https://pt.wikipedia.org/wiki/User_Datagram_Protocol).

- [Batalha Naval](https://pt.wikipedia.org/wiki/Batalha_naval_(jogo)): foi feito em Java também. Eu tinha a intenção de permitir que duas pessoas jogassem em rede uma contra a outra, assim como em PONG. Porém acabei implementando uma experiência single-player mesmo.

- [Trilha](https://pt.wikipedia.org/wiki/Trilha_(jogo)): esse jogo eu fiz em Delphi para uma discipina de Programação Avançada da faculdade. Basicamente a IA do jogo implementava o algoritmo [Minimax](https://pt.wikipedia.org/wiki/Minimax) com [alfa-beta pruning](https://pt.wikipedia.org/wiki/Minimax), e o resultado ficou muito bom na época.

{%
  include image.html
  path = "/assets/images/trilha.svg"
  alt = "Trilha"
  caption = "Trilha era aquele jogo que vinha embaixo do tabuleiro de Damas que a gente comprava na venda da esquina."
%}

### Tá, mas onde entra Javascript nisso?

Bom, não faz muito tempo que eu ainda tava usando Java pra essas brincadeiras. Mas a partir de um certo momento passei a usar [Javascript](https://pt.wikipedia.org/wiki/JavaScript) para escrever jogos que rodam em uma página [HTML](https://pt.wikipedia.org/wiki/HTML), e tenho ficado bastante satisfeito com essa decisão pelas seguintes razões:

1. **Eu adoro Javascript!** Hehe... Sim, verdade. Desde que vi Javascript pela primeira vez - quando ainda estava copiando e colando código pronto da web pra poder colocar efeitos em sites HTML - me senti atraído pela linguagem. Sei que Javascript tem muitas características e funcionalidades que a fazem ser bastante odiada por desenvolvedores aí afora, e eu entendo completamente o porquê. Mas sei lá, eu simplesmente consigo ignorar toda essa parte ruim e focar apenas na parte que eu acho legal.

2. **O elemento `<canvas>`.** Quando eu ouvi falar que [a versão 5 do HTML](https://pt.wikipedia.org/wiki/HTML5) incluiria uma tag que renderizaria uma área na página para desenho livre usando um objeto com uma API sólida de desenho 2D, um alerta ligou na minha cabeça. Comecei a ler artigos e a fazer pequenas experiências, e percebi que esse novo recurso me atenderia perfeitamente.

3. **Praticidade.** Todo computador/tablet/celular hoje em dia tem um programa capaz de rodar jogos em Javascript, que é o [navegador web](https://pt.wikipedia.org/wiki/Navegador_web). E o fluxo de desenvolvimento é muito prático: muda o arquivo, salva, dá refresh. Fora que navegadores como o [Chrome](https://pt.wikipedia.org/wiki/Google_Chrome) e o [Firefox](https://pt.wikipedia.org/wiki/Mozilla_Firefox) hoje em dia fornecem um excelente ferramental de desenvolvimento para depurar código, fazer modificações on-the-fly, dentre outras coisas.

4. **Github pages!** Se o jogo roda em uma página HTML estática, lançá-lo no [Github Pages](https://pages.github.com/) é uma ótima maneira de disponibilizá-lo para outras pessoas jogarem. Basta criar um repositório [Git](https://pt.wikipedia.org/wiki/GIT) para o código do jogo, fazer pull pro [Github](https://pt.wikipedia.org/wiki/GitHub) e configurar uma página do projeto que vai rodar o jogo. Daí é só distribuir o link pra galera jogar. E é de graça!

No meu [Github](https://github.com/tnaires) tem um joguinho 2D que fiz chamado [Rescue Landing](https://github.com/tnaires/rescue_landing). Basicamente você controla uma navezinha para resgatar pessoas perdidas em cavernas, e precisa otimizar o combustível da nave de maneira que seja possível entrar e sair do estágio com todas as pessoas resgatadas. Em posts futuros vou discutir alguns conceitos e técnicas que aprendi e usei no desenvolvimento desse jogo.

E quanto a você? Também se interessa pelo assunto? Tem alguma coisa interessante pra mostrar?
