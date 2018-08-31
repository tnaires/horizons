---
layout: post
title: Usando um quadro Kanban para organizar o backlog de jogos
author: Tarso
date: 2018-08-30 22:30:00 -0300
section: Off topic
excerpt: Aqui mostro a maneira como eu organizo os jogos que compõem meu backlog.
---

Os jogos que eu adquiro se acumulam absurdamente porque eu compro muito mais jogos do que finalizo. Isso acontece por duas razões:

- Promoções acontecem toda semana, e por causa disso eu estou sempre comprando muitos jogos. O bom é que eu fico com muitas opções disponíveis quando quero começar a jogar um novo jogo.
- [Complecionista como sou]({{ site.baseurl }}{% post_url 2017-08-14-o-que-e-ser-um-complecionista %}), demoro muito tempo jogando o mesmo jogo. Passo semanas ou até meses pra poder pegar todos os troféus.

A grande consequência disso é que eu nunca vou conseguir jogar tudo, e isso pra mim é uma batalha perdida. Mas há outras questões, por exemplo: como lembrar no futuro de jogar aquele jogo fuderoso que acabei de comprar mas não posso jogar agora? Como considerar o máximo de opções possíveis na hora de decidir qual o próximo jogo pra jogar? Como cuidar da prioridade dos jogos de acordo com o que tô a fim de jogar no futuro?

Nesse post eu mostro a abordagem que eu uso para gerenciar o conjunto de jogos que tenho para jogar - daqui pra frente vou chamar esse conjunto de **backlog**.

### Quadros Kanban

Eu sou um [desenvolvedor de software](https://pt.wikipedia.org/wiki/Programador). Gerenciar as atividades de desenvolvimento e as entregas de um produto de software constituem um desafio por si só. Existem muitas metodologias, técnicas e ferramentas disponíveis para cuidar disso, mas eu quero falar especificamente de uma ferramenta que faz parte do meu dia a dia: o [quadro Kanban](https://en.wikipedia.org/wiki/Kanban_board). Ele pode ser usado para qualquer coisa que possa ser modelada como um fluxo de trabalho, e por isso não está necessariamente restrito ao mundo do software.

Para ilustrar isso, vamos pegar aqui um cenário hipotético com um backlog de 3 jogos:

- [Sonic the Hedgehog](https://pt.wikipedia.org/wiki/Sonic_the_Hedgehog)
- [Super Mario 3](https://pt.wikipedia.org/wiki/Super_Mario_Bros._3)
- [Crash Bandicoot](https://pt.wikipedia.org/wiki/Crash_Bandicoot_(jogo_eletr%C3%B4nico))

Eu quero visualizar a situação de cada jogo de uma maneira fácil, então vou criar um quadro dessa forma:

| A comprar | A jogar | Jogando | Finalizados |
|-----------|---------|---------|-------------|
| | Sonic the Hedgehog | | |
| | Super Mario 3 | | |
| | Crash Bandicoot | | |

Os nomes das colunas são auto explicativos. A coluna "A comprar" representa sua lista de desejos, enquanto a coluna "A jogar" contém os jogos já comprados (sendo, portanto, seu backlog).

Vamos supor que eu quero jogar Crash antes de todos os outros. Posso então reordenar a segunda coluna conforme minhas prioridades. A ideia é colocar os jogos que quero jogar primeiro no topo.

| A comprar | A jogar | Jogando | Finalizados |
|-----------|---------|---------|-------------|
| | Crash Bandicoot | | |
| | Sonic the Hedgehog | | |
| | Super Mario 3 | | |

Finalmente comecei a jogar Crash: já posso atualizar o quadro. Ao mesmo tempo, ouvi falar do jogo [Silent Hill](https://pt.wikipedia.org/wiki/Silent_Hill_(jogo_eletr%C3%B4nico)) e me interessei em comprar.

| A comprar | A jogar | Jogando | Finalizados |
|-----------|---------|---------|-------------|
| Silent Hill | Sonic the Hedgehog | Crash Bandicoot | |
| | Super Mario 3 | | |

Nesse meio tempo, comecei a jogar Sonic em paralelo e também comprei Silent Hill.

| A comprar | A jogar | Jogando | Finalizados |
|-----------|---------|---------|-------------|
| | Super Mario 3 | Crash Bandicoot | |
| | Silent Hill | Sonic the Hedgehog | |

E findou que acabei terminando Sonic antes de Crash (apesar de ter começado a jogar Crash antes).

| A comprar | A jogar | Jogando | Finalizados |
|-----------|---------|---------|-------------|
| | Super Mario 3 | Crash Bandicoot | Sonic the Hedgehog |
| | Silent Hill | | |

Acho que já deu pra ter uma ideia. O negócio é ir atualizando o quadro conforme os jogos vão mudando de situação.

### Ferramentas

Acho que a ferramenta mais popular atualmente que implementa um quadro Kanban é o [Trello](https://trello.com/). Você pode se cadastrar gratuitamente e começar a criar seus quadros. E tem uma versão para celular também.

Veja na imagem abaixo como ficaria nosso quadro de jogos no Trello:

{%
  include image.html
  class = "wider-included-image"
  path = "/assets/images/trello/quadro_jogos.png"
  alt = "Quadro de jogos"
  caption = "Nosso quadro de jogos montado no Trello."
%}

O Trello tem vários recursos interessantes, entre eles a opção de usar etiquetas coloridas para marcar os cartões. No nosso caso, podemos usar um código de cores para indicar as plataformas que os jogos rodam.

{%
  include image.html
  class = "included-image"
  path = "/assets/images/trello/etiquetas.png"
  alt = "Etiquetas"
  caption = "Usando etiquetas para indicar as plataformas dos jogos."
%}

E assim ficou nosso quadro depois de aplicar as etiquetas aos respectivos jogos:

{%
  include image.html
  class = "wider-included-image"
  path = "/assets/images/trello/quadro_etiquetado.png"
  alt = "Quadro de jogos"
  caption = "Jogos marcados com suas respectivas etiquetas."
%}

O Trello tem muito mais recursos. Fique à vontade para explorá-los e utilizá-los conforme suas próprias ideias :) Por exemplo, você pode usar as cores para designar o gênero do jogo (aventura, ação, RPG, corrida, etc). E aí nesse caso você pode criar um quadro para cada plataforma que você tiver.

### Conclusão

Bom, eu usei o Trello por algum tempo até que meu backlog cresceu acima dos 100 jogos, ao mesmo tempo que a quantidade de plataformas que eu jogo aumentou.

Daí então eu resolvi migrar tudo pra uma planilha no [Google Docs](https://docs.google.com/). Basicamente eu tenho uma aba dentro da planilha para cada console que eu costumo jogar, e gerencio os backlogs separadamente. Mas funciona da mesma forma: cada estado do jogo é uma coluna diferente, e eu fico movendo células de uma coluna pra outra. Também aproveitei a flexibilidade que uma planilha oferece pra indicar o gênero de cada jogo usando uma caixa de seleção.

Mas, independentemente da ferramenta que você usar, um quadro Kanban é uma boa maneira de organizar os jogos. E você? Como você gerencia seu backlog? Tem alguma sugestão diferente?
