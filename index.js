(function() {
  function extractTextContent(element) {
      let textContent = "";

      if (element.nodeType === Node.TEXT_NODE) {
          textContent = element.textContent.trim();
      } else if (element.nodeType === Node.ELEMENT_NODE) {
          textContent = Array.from(element.childNodes).map(child => extractTextContent(child)).join('');
      }

      return textContent;
  }

  const elements = document.querySelectorAll('.card.mugic');

  let outputContent = '';

  elements.forEach((element, index) => {
      const nameSpan = element.querySelector('.left .name .bigger');
      const nameContent = nameSpan ? extractTextContent(nameSpan) : 'Nome não disponível';

      const leftDiv = element.querySelector('.left');
      const leftContent = leftDiv ? Array.from(leftDiv.childNodes)
          .map(child => extractTextContent(child).replace(/\s+/g, ' ').trim())
          .filter(text => text) : [];

      const tipoERaridade = leftContent[1] || 'Tipo e Raridade não disponível';
      const familia = leftContent[3] || 'Família não disponível';

      const icon20Count = leftDiv ? leftDiv.querySelectorAll('img.icon20').length : 0;

      const rightDiv = element.querySelector('.right');
      const descricaoContent = rightDiv ? extractTextContent(rightDiv).replace(/\s+/g, ' ').trim() : 'Descrição não disponível';

      outputContent += `Nome Carta: ${nameContent}\n\nTipo e Raridade: ${tipoERaridade}\n\nFamilia: ${familia}\n\nCusto: ${icon20Count}\n\nDescrição: ${descricaoContent}\n\n\n`;
  });

  console.log(outputContent.trim());
})();
