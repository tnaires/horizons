---
layout: post
title: Criando um labirinto 2.5D com Spec-Driven Development
author: Tarso
date: 2026-02-19 01:30:00 -0300
section: Mão na massa
excerpt: Fazendo vibe-coding de um labirinto 2.5D no melhor estilo protetor de tela do Windows 98.
---

Durante o ano passado, os [agentes de IA](https://en.wikipedia.org/wiki/AI_agent) ganharam bastante popularidade entre desenvolvedores. Seu uso adequado no dia a dia do desenvolvimento pode possibilitar um substancial ganho de produtividade. A experiência com agentes mostra que, quanto mais detalhadas forem as tarefas enumeradas para eles, melhor é o código gerado por eles; logo, cada vez mais busca-se estruturar da melhor forma possível o contexto que o agente precisa para trabalhar.

Ultimamente eu tenho me interessado bastante por [Spec-Driven Development](https://en.wikipedia.org/wiki/Spec-driven_development), que eu vejo como uma forma bacana de estruturar o contexto para o agente. Usando essa técnica, nós partimos da definição de uma especificação detalhada em alto nível para gerar os artefatos de implementação. O fluxo do SDD é tipicamente composto de quatro etapas:

1. Specify: a funcionalidade que precisa ser feita é definida em alto nível (sem entrar em detalhes técnicos)
2. Plan: aqui a gente começa a identificar as decisões técnicas e de arquitetura que queremos seguir
3. Task: o plano é decomposto em unidades de trabalho atômicas e executáveis
4. Implement: a lista de tarefas é implementada e validada

Ao final das 3 primeiras etapas do SDD, temos um conjunto de arquivos que definem claramente tudo o que precisa ser feito pelo agente, geralmente em forma de tarefas e regras que devem ser seguidas para desenvolver o produto final. No último passo, simplesmente pedimos para o agente executar as tarefas para gerar os artefatos de código.

### O que vamos fazer?

Bom, eu, assim como muita gente, tenho feito pequenas aplicações de brincadeira só para validar e aprender o fluxo do SDD. Os resultados tem sido bem interessantes, mas eu tava a fim de fazer alguma experiência relacionada a jogos.

Então pensei que eu poderia tentar criar uma página que renderizasse um labirinto semelhante àquele antigo protetor de tela do Windows 95 composto por um labirinto 3D.

{%
  include image.html
  path = "/assets/images/sdd/labirinto_win_95.png"
  alt = "Labirinto Windows 95"
  caption = "Protetor de tela do labirinto no Windows 95."
%}

Eu vou definir esse labirinto da seguinte forma:
* O labirinto deve ter uma entrada e uma saída e deve ser gerado aleatoriamente;
* A câmera vai começar na entrada e vai andar até a saída usando a regra da mão esquerda, que consiste em manter a mão esquerda encostada na parede até encontrar a saída;
* Quando a câmera encontrar a saída, ela deve pausar por 3 segundos. Após isso, um novo labirinto aleatório deve ser gerado e o processo recomeça;
* Não vou me preocupar com texturas das paredes, do chão e do teto. E não vou também exibir objetos no labirinto. O intuito vai ser simplesmente navegar a câmera da entrada até a saída.

Você pode dar uma olhada em como ficou a versão final [aqui](https://tnaires.github.io/labyrinth/).

{%
  include image.html
  path = "/assets/images/sdd/labirinto_final.png"
  alt = "Labirinto 2.5D versão 1.0"
  caption = "Veja como ficou a versão 1.0 do labirinto 2.5D."
%}

### Ferramentas e convenções

Já existem várias ferramentas de SDD, mas a que eu tenho usado mais é o [spec-kit](https://github.com/github/spec-kit) e é com ela que vou seguir nesse post. Como agente de codificação eu vou usar o [Codex](https://openai.com/pt-BR/codex/). O spec-kit é interessante porque em sua versão atual ele adiciona mais alguns passos automatizados ao fluxo SDD que mencionei acima, conforme veremos em breve.

Não é objetivo desse post ensinar a usar o spec-kit, a documentação da ferramenta é suficiente pra dar os primeiros passos. Mas vou enumerar os comandos que eu usei em ordem e comentar um pouco sobre o contexto que passei pra eles (quando relevante) e os efeitos de cada um.

Como último ponto, vou escrever os prompts em inglês.

### Começando

#### specify init

Após instalar o spec-kit, a primeira coisa a fazer é dar o comando `init` para iniciar um novo projeto:

```
specify init labyrinth
```

Isso vai criar o diretório indicado como um repositório Git. Durante esse processo, o spec-kit pergunta qual agente queremos usar. Aqui indicamos o Codex.

#### speckit.constitution

Agora, o primeiro passo indicado pela documentação do spec-kit é definir um arquivo `constitution.md` que vai manter todas as regras de boas práticas que o agente deve seguir ao implementar sua solução nas tecnologias escolhidas. Parece trabalhoso compilar todas essas regras agora né? Mas podemos passar uma descrição breve do que queremos ao rodar o comando, e a IA vai tentar derivar essas regras a partir da descrição dada.

```
/prompts:speckit.constitution Use only the most recent versions of HTML, plain CSS and plain Javascript. Use the best practices related to these technologies.
```

Pronto, queremos usar apenas HTML, CSS e Javascript puros para implementar a página e indicamos isso para o spec-kit. Você pode dar uma olhada em como ficou o arquivo [aqui](https://github.com/tnaires/labyrinth/blob/master/.specify/memory/constitution.md).

#### speckit.specify

Agora chegou a hora de definir a funcionalidade que queremos implementar, porém sem citar ainda detalhes técnicos.

```
/prompts:speckit.specify Create a page that renders a 3D labyrinth. The labyrinth should be generated randomly and it must have an entry and an exit. The camera should start from the entry and follow the labyrinth until the exit. When the camera reaches the exit, the screen freezes for 3 seconds, another labyrinth is randomly generated and the process starts again. When the camera finds more than one path to follow, it should always turn to the left.
```

O artefato resultante desse comando pode ser visto [aqui](https://github.com/tnaires/labyrinth/blob/master/specs/001-3d-labyrinth-camera/spec.md).

#### speckit.clarify

Esse passo aqui é bem interessante. Ele vai analisar pontos na spec criada que ficaram ambíguos ou mal elucidados, e vai enumerar esses pontos dando opções sobre como lidar com cada um deles e recomendando uma delas.

No caso da spec acima, essa etapa levantou várias questões relevantes:
* Perguntou qual deveria ser a visão da câmera. Sugeriu 3 opções: primeira pessoa, terceira pessoa com a câmera seguindo um marcador visível, ou um ângulo elevado que segue o caminho de cima. Recomendou a opção de primeira pessoa e eu aceitei;
* Perguntou qual deveria ser o tamanho do labirinto. Ofereceu 3 opções: pequeno, médio (de 1 a 3 minutos pra percorrer) ou grande (maior que 3 minutos). Recomendou a segunda opção e eu aceitei;
* Perguntou como exibir a entrada e a saída do labirinto. Deu 3 sugestões: marcadores sutis, rótulos proeminentes, ou sem marcadores. Recomendou a primeira opção e eu aceitei;
* Perguntou qual deveria ser o comportamento da câmera ao chegar em um caminho sem saída. Deu 3 sugestões: parar por um tempo e dar meia volta, voltar imediatamente sem pausa, ou evitar gerar caminhos sem saída. Ele recomendou a segunda opção e eu aceitei;
* Perguntou o que fazer caso um labirinto sem saída seja gerado. Ofereceu 3 opções: regenerar outro imediatamente, manter o labirinto gerado e mostrar um erro, ou tentar corrigir o labirinto gerado. Recomendou a primeira opção e eu aceitei.

Todas as dúvidas resolvidas, hora de ir pro próximo passo.

#### speckit.plan

Nessa etapa já começamos a entrar em questões um pouco mais técnicas. Levando isso em conta, passei o seguinte contexto:

```
/prompts:speckit.plan Use the 2D context object provided by the canvas element to render the labyrinth. Use the ray casting algorithm to render the scene.
```

Aqui eu tô dizendo explicitamente ao spec-kit que não quero usar nenhuma tecnologia 3D (como o [WebGL](https://pt.wikipedia.org/wiki/WebGL)) para renderizar o labirinto. Quero usar exclusivamente o algoitmo de [ray casting](https://pt.wikipedia.org/wiki/Ray_casting), que ficou conhecido em jogos como [Wolf 3D](https://pt.wikipedia.org/wiki/Wolfenstein_3D).

#### speckit.tasks

Sem segredo aqui. Vamos rodar esse comando para fazer o spec-kit gerar a lista de tarefas executáveis a partir de todos os artefatos criados.

```
/prompts:speckit.tasks
```

As tasks geradas podem ser visualizadas [aqui](https://github.com/tnaires/labyrinth/blob/master/specs/001-3d-labyrinth-camera/tasks.md).

#### speckit.analysis

Agora é hora de rodar um comando que eu achei bastante útil e interessante. Ele analisa todas as tarefas criadas no passo anterior, procurando inconsistências e possíveis pontos não totalmente elucidados. Depois ele mesmo sugere as correções a serem aplicadas e você aceita se quiser, ou caso não aceite pode dar suas próprias sugestões.

```
/prompts:speckit.analysis
```

No caso do nosso projeto, o analysis encontrou alguns problemas relacionados ao uso intermitente das palavras maze e labyrinth, dentre outras coisas. Rodei várias vezes e fui aceitando as sugestões de correção até mostrar a mensagem dizendo que não havia mais inconsistências:

```
## Specification Analysis Report

No inconsistencies, ambiguities, or coverage gaps detected.
```

#### speckit.implement

Finalmente chegou a hora da verdade. Com tudo definido, hora de mandar o agente executar as tarefas uma a uma.

```
/prompts:speckit.implement
```

O agente gerou bastante código, mas o resultado final ainda teve problemas que eu precisei revisar. Links para os arquivos Javascript não funcionando no código HTML, problemas de exibição das paredes do labirinto, etc. A partir daqui já não usei mais o spec-kit, fui conversando diretamente com o agente para resolver os problemas um a um.

Também tive coisas no resultado final que eu pedi para o agente mudar. O labirinto tava sendo renderizado sempre com as paredes cinzas e o teto preto. Aí pedi pro agente criar um código que randomizasse as cores das paredes e do teto (o chão continuou preto). Além disso, o mapinha tava muito pequeno e eu pedi pra ele aumentar. O resultado no fim ficou bem bacana.

Já mandei aqui o link do resultado, mas [tá aí de novo](https://tnaires.github.io/labyrinth/) pra você não ter que subir a página pra acessar.

### Conclusão

É importante lembrar que é perfeitamente possível chegar a resultados semelhantes interagindo diretamente com o agente, sem o spec-kit como intermediário. Mas eu pessoalmente acho muito interessante os benefícios que ferramentas como o spec-kit trazem, tanto em termos de estrutura do contexto quanto em termos de automação das etapas do SDD.

Espero em breve fazer mais experiências com jogos, tentando implementar jogos incrementalmente mais complexos pra ver os resultados. Caso você tenha feito alguma experiência nesse sentido também, fico feliz se você resolver compartilhar aqui :)