---
---
{% assign background_images = site.static_files | where: "background", true %}
let backgroundImages = [];

{% for background_image in background_images %}
  backgroundImages.push('{{ background_image.path | relative_url }}');
{% endfor %}

let header = document.querySelector('header');
let randomBackground = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
header.style.backgroundImage = `url(${randomBackground})`;
