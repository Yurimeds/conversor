async function getExchangeRate() {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/BRL');
      const data = await response.json();
      return data.rates.USD;
    } catch (error) {
      console.error('Erro ao buscar a taxa de câmbio:', error);
      return null;
    }
  }
  
  async function convertToDolar() {
    const real = document.getElementById('real').value;
    if (real === '') {
      alert('Por favor, insira um valor em Real.');
      return;
    }
  
    const exchangeRate = await getExchangeRate();
    if (exchangeRate) {
      const dolar = real * exchangeRate;
      document.getElementById('dolar').value = dolar.toFixed(2);
      document.getElementById('rate').textContent = `Taxa de câmbio: 1 BRL = ${exchangeRate.toFixed(4)} USD`;
    } else {
      alert('Não foi possível obter a taxa de câmbio. Tente novamente mais tarde.');
    }
  }
  
  // Atualiza a taxa de câmbio quando a página é carregada
  document.addEventListener('DOMContentLoaded', async () => {
    const exchangeRate = await getExchangeRate();
    if (exchangeRate) {
      document.getElementById('rate').textContent = `Taxa de câmbio atual: 1 BRL = ${exchangeRate.toFixed(4)} USD`;
    }
  });
  