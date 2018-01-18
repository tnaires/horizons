---
layout: post
title: Projeto base de um jogo - primeiros conceitos
date: 2018-01-18 01:00:00 -0300
section: Mão na massa
excerpt: Vamos escrever o código base de um jogo simples 2D em Javascript que poderá ser usado para futuros projetos, ao mesmo tempo em que aprenderemos alguns conceitos iniciais.
---

Aqui inicia-se uma série de artigos onde vamos juntos usar [Javascript](https://pt.wikipedia.org/wiki/JavaScript) para escrever um jogo 2D simples que será executado ao abrir-se uma página HTML num navegador web - especificamente nas versões mais novas do [Chrome](https://pt.wikipedia.org/wiki/Google_Chrome) e do [Firefox](https://pt.wikipedia.org/wiki/Mozilla_Firefox). Neste primeiro post vamos construir um projeto que poderá ser usado como base para criar jogos com essas especificações. Vai ser um texto longo, então vamos começar logo!

(Antes de mais nada: o código-fonte do projeto que vamos construir pode ser encontrado [aqui](https://github.com/tnaires/base_game_project)).

### Nota

Esta série de posts sobre desenvolvimento de jogos pressupõe que você já sabe programar e que você já tem pelo menos um entendimento básico da linguagem de programação Javascript. Se esse não for o seu caso, eu posso recomendar o livro Eloquent Javascript (originalmente escrito em [inglês](http://eloquentjavascript.net/), e aqui traduzido para o [português](http://braziljs.github.io/eloquente-javascript/)) como uma excelente introdução à programação usando Javascript.

### Estrutura básica

{%
  include image.html
  path = "/assets/images/mao_na_massa/base_project.png"
  alt = "Projeto base"
  caption = "Estrutura de arquivos do nosso projeto base."
%}

O projeto contém os seguintes arquivos/diretórios:

- `css`: contém os arquivos de [estilo em cascata](https://pt.wikipedia.org/wiki/Cascading_Style_Sheets).
- `index.html`: página inicial através da qual será possível jogar o jogo.
- `js`: contém todos os arquivos de código Javascript.
- `README.md`: este arquivo é útil para compartilhar informações sobre o jogo: comandos, link de acesso, funcionalidades, [roadmap](https://pt.wikipedia.org/wiki/Roadmap), etc.
- `res`: contém as imagens que serão usadas no jogo.

### O arquivo `index.html`

Segue abaixo o código da página inicial do projeto:

{% highlight html linenos %}
<!DOCTYPE html>
<html>
  <head>
    <title>Base game</title>
    <link rel='stylesheet' type='text/css' href='css/game.css' />
  </head>
  <body>
    <main>
      <canvas id='background'></canvas>
      <canvas id='foreground'></canvas>
    </main>

    <script src='js/graphics/canvas.js'></script>
    <script src='js/game.js'></script>
    <script src='js/main.js'></script>
  </body>
</html>
{% endhighlight %}

Note que estamos usando dois elementos [`<canvas>`](https://www.w3schools.com/html/html5_canvas.asp) aqui. A finalidade é sobrepor esses elementos para renderizar os objetos da tela em camadas: um canvas será utilizado para desenhar objetos no primeiro plano, e o outro será utilizado para desenhar objetos do cenário.

Podemos ver também, nas linhas 13 a 15, os arquivos de código Javascript anexados à página. Vamos discutí-los daqui a pouco.

### O arquivo `game.css`

Temos também um arquivo CSS que ajusta estilos básicos para a página inicial:

{% highlight css linenos %}
{% raw %}
main {
  width: 800px;
  margin-left: auto;
  margin-right: auto;
}

canvas {
  width: 800px;
  height: 600px;


  position: absolute;
  top: 0px;


  border: 3px solid black;
  background: transparent;
}

#foreground {
  z-index: 0;
}

#background {
  z-index: -1;
}
{% endraw %}
{% endhighlight %}

Alguns pontos a serem considerados:

- Ajustamos a área do canvas para 800 pixels de largura e 600 pixels de altura nas linhas 8 e 9. Devemos mudar esses valores aqui caso queiramos uma resolução diferente.
- A linha 17 torna transparentes os elementos canvas para que um não fique opaco sobre o outro.
- As linhas 21 e 25 sobrepõem os canvas para implementar a renderização em camadas descrita anteriormente.

### O código Javascript

Conforme vimos anteriormente, as linhas 13 a 15 do arquivo `index.html` incluem os arquivos Javascript do projeto para serem executados na ordem em que foram declarados. Essa ordem de declaração é importante para que a dependência entre as entidades do código seja respeitada. Os arquivos `canvas.js` e `game.js` declaram algumas dessas entidades, enquanto que o arquivo `main.js` é o ponto de partida do jogo.

Vamos começar analisando o arquivo `canvas.js`:

{% highlight javascript linenos %}
{% raw %}
class Canvas {
  constructor(id) {
    this.objects = [];

    const canvas = document.getElementById(id);
    this.context = canvas.getContext('2d');
  }

  add(object) {
    this.objects.push(object);
  }

  clear() {
    this.objects.forEach(object => object.clear(this.context));
  }

  update() {
    this.objects.forEach(object => object.update());
  }

  draw() {
    this.objects.forEach(object => object.draw(this.context));
  }
}
{% endraw %}
{% endhighlight %}

Esse arquivo define a classe `Canvas`, cujo propósito é representar um elemento `<canvas>` declarado na página HTML. Note que o construtor recebe um parâmetro contendo o identificador do elemento. De posse dele, podemos recuperá-lo no [DOM](https://pt.wikipedia.org/wiki/Modelo_de_Objeto_de_Documentos) e obter um objeto `context`, que é usado para desenhar na tela.

Podemos pensar em um `Canvas` como uma coleção de objetos que precisam ser atualizados e desenhados na página - armazenamos essa coleção no atributo `objects`. Temos então o método `add()` que adiciona um objeto ao array. Por fim, temos os métodos `clear()`, `update()` e `draw()` que apenas executam os métodos homônimos definidos para cada um dos objetos armazenados na coleção. Esses métodos serão úteis mais à frente.

Vamos agora analisar o arquivo `game.js`:

{% highlight javascript linenos %}
{% raw %}
const FOREGROUND_CANVAS_ID = 'foreground';
const BACKGROUND_CANVAS_ID = 'background';
const ONE_SECOND = 1000;

class Game {
  constructor(fps) {
    this.fps = fps;
    this.foreground = new Canvas(FOREGROUND_CANVAS_ID);
    this.background = new Canvas(BACKGROUND_CANVAS_ID);
  }

  start() {
    const tick = () => {
      this.foreground.clear();
      this.foreground.update();
      this.foreground.draw();
    };

    setInterval(tick, ONE_SECOND / this.fps);
  }
}
{% endraw %}
{% endhighlight %}

Esse arquivo define a classe `Game`, cujo parâmetro no construtor contém a quantidade de [quadros por segundo](https://pt.wikipedia.org/wiki/Quadros_por_segundo) que queremos usar para executar o jogo. Esse valor representa quantas vezes por segundo os objetos do jogo serão desenhados em seus respectivos elementos `<canvas>`. Note também que nas linhas 8 e 9 criamos os objetos `Canvas` que representam o primeiro plano e o plano de fundo do jogo, respectivamente.

O método `start()` cria e executa um laço através da função [`setInterval()`](https://www.w3schools.com/jsref/met_win_setinterval.asp), e esse laço ficará rodando eternamente até que o jogador feche o jogo: isso é o que chamamos de **game loop**. O primeiro parâmetro de `setInterval()` é a função que será repetida, e o segundo parâmetro é o intervalo de repetição da função em milissegundos. Vamos analisar o cálculo do segundo parâmetro mais adiante.

A função `tick()` declarada localmente na linha 13 define aquilo que o jogo fará a cada repetição do laço. Nesse caso programamos o jogo para, nessa ordem: limpar todos os objetos do primeiro plano, atualizar seu estado e redesenhá-los.

Por fim, segue abaixo o código do arquivo `main.js`:

{% highlight javascript linenos %}
{% raw %}
const FPS = 60;

const game = new Game(FPS);
game.start();
{% endraw %}
{% endhighlight %}

Aqui criamos um objeto `Game` passando como parâmetro para seu construtor uma constante `FPS` cujo valor é 60 (ou seja, vamos rodar o jogo a 60 quadros por segundo). Dessa forma, o intervalo de repetição pode ser calculado dividindo-se 1000 milissegundos (que equivale a um segundo) por 60, o que dá aproximadamente 16,7. Isso significa que nosso laço será executado uma vez a cada 16,7 milissegundos.

E, finalmente, iniciamos a execução do jogo na linha 4.

### Conclusão

Você pode abrir o arquivo `index.html` no navegador para perceber que, visualmente, o código não faz nada ainda hehe.

{%
  include image.html
  path = "/assets/images/troll.png"
  alt = "Troll face"
  caption = ""
%}

Por favor não fique desapontado :) O código que escrevemos hoje é apenas o ponto de partida para criar novos jogos. Sozinho, ele não faz nada útil... Ainda. Se você quiser visualizar a execução do laço, pode adicionar algumas instruções `console.log()` à função `tick()` definida na classe `Game`.

No próximo post vamos começar a criar um jogo básico para ver na prática o que aprendemos e desenvolvemos hoje. Até lá!
