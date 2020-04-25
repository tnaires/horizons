---
layout: post
title: Gerando um céu estrelado aleatório
author: Tarso
date: 2020-04-25 19:45:00 -0300
section: Mão na massa
excerpt: Implementando um algoritmo básico para pintar estrelas em posições aleatórias em um elemento canvas usando Javascript.
---

Uma vez eu estava programando um jogo 2D que seria uma nave viajando no espaço e atirando em inimigos aliens que apareciam em posições aleatórias na tela. O cenário de fundo seria uma representação bem simples do espaço sideral: um fundo preto com pontos brancos pintados aleatoriamente representando as estrelas (claro que o espaço tem bem mais coisas do que isso, mas para o jogo essa abstração já seria suficiente).

### O algoritmo

Mas eu realmente queria implementar isso da maneira mais simples possível, mas que ainda provesse algum grau de realismo. Então eu acabei pensando em um algoritmo bem simples e óbvio com os seguintes passos:

1. Pinte a tela de preto;
2. Divida a tela em N linhas e N colunas invisíveis;
3. Gere um ponto aleatório (x, y) dentro de cada célula;
4. Pinte cada ponto de branco.

Aqui está um possível resultado para N = 5:

{%
  include image.html
  path = "/assets/images/estrelas/exemplo.png"
  alt = "Estrelas"
  caption = "Exemplo de céu estrelado aleatório gerado com o algoritmo acima, para N = 5."
%}

O algoritmo não é nenhuma novidade, claro. Depois que o implementei eu vi [algumas pessoas sugerindo o mesmo algoritmo](https://stackoverflow.com/a/16508156) para resolver o problema.

Eu implementei esse algoritmo em Javascript e coloquei nesse repositório [aqui](https://github.com/tnaires/estrelas). O link para a página pode ser encontrado no arquivo README.

### Limitações

Esse algoritmo não evita que estrelas sejam geradas muito próximas umas das outras. Podemos ter por exemplo uma estrela gerada à direita de uma célula e outra gerada à esquerda da célula vizinha.

Além disso, para valores de N já a partir da ordem das centenas, o algoritmo pode ficar bem lento.

### O código

O primeiro passo foi criar uma classe que representa uma estrela. Ela tem como atributos apenas suas coordenadas x e y.

{% highlight javascript linenos %}
{% raw %}
const TAMANHO = 1;

class Estrela {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  desenhar(context) {
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, TAMANHO, TAMANHO);
  }
}
{% endraw %}
{% endhighlight %}

Depois eu criei outra classe para representar o espaço. Essa classe acabou encapsulando toda a lógica que calcula as posições das estrelas.

O construtor da classe percorre N linhas e N colunas para determinar a área de cada célula, e então gera uma posição aleatória no eixo X e outra posição aleatória no eixo Y dentro dessa área. As estrelas geradas são armazenadas numa matriz (um array de arrays).

Finalmente, o método que desenha as estrelas apenas percorre a matriz e ordena que cada estrela se desenhe no canvas.

{% highlight javascript linenos %}
{% raw %}
const N = 5;

class Espaco {
  constructor(largura, altura) {
    this.largura = largura;
    this.altura = altura;
    this.estrelas = [];

    this.gerarEstrelas();
  }

  gerarEstrelas() {
    const larguraCelula = Math.floor(this.largura / N);
    const alturaCelula = Math.floor(this.altura / N);

    for (let linha = 0; linha < N; linha++) {
      const estrelasParaLinha = [];

      for (let coluna = 0; coluna < N; coluna++) {
        const posicaoEsquerdaCelula = coluna * larguraCelula;
        const posicaoDireitaCelula = posicaoEsquerdaCelula + larguraCelula - 1;
        const posicaoTopoCelula = linha * alturaCelula;
        const posicaoFundoCelula = posicaoTopoCelula + alturaCelula - 1;

        const posicaoAleatoriaX = Utils.aleatorioEntre(posicaoEsquerdaCelula, posicaoDireitaCelula);
        const posicaoAleatoriaY = Utils.aleatorioEntre(posicaoTopoCelula, posicaoFundoCelula);
        const estrela = new Estrela(posicaoAleatoriaX, posicaoAleatoriaY);
        estrelasParaLinha.push(estrela);
      }

      this.estrelas.push(estrelasParaLinha);
    }
  }

  desenharEstrelas(context) {
    for (let i = 0; i < this.estrelas.length; i++) {
      const estrelasParaLinha = this.estrelas[i];

      for (let j = 0; j < estrelasParaLinha.length; j++) {
        estrelasParaLinha[j].desenhar(context);
      }
    }
  }

  desenhar(context) {
    context.fillStyle = 'black';
    context.fillRect(0, 0, this.largura, this.altura);

    this.desenharEstrelas(context);
  }
}
{% endraw %}
{% endhighlight %}

Com as classes definidas, só é preciso agora instanciá-las e usá-las:

{% highlight javascript linenos %}
{% raw %}
const canvas = document.getElementById('estrelas');
const espaco = new Espaco(canvas.width, canvas.height);

const context = canvas.getContext('2d');
espaco.desenhar(context);
{% endraw %}
{% endhighlight %}

E é isso! Em posts futuros vamos dar uma olhada no código do jogo onde eu usei esse algoritmo. Até lá!