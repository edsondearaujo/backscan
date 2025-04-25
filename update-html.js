const fs = require('fs');
const axios = require('axios');

async function updateHtml() {
  try {
    // Faz requisição para pegar os túneis ativos do Ngrok
    const res = await axios.get('http://127.0.0.1:4040/api/tunnels');
    const tunnels = res.data.tunnels;

    // Pega o primeiro túnel HTTPS que encontrar
    const publicUrl = tunnels.find(tunnel => tunnel.proto === 'https').public_url;

    console.log(`🌎 URL pública detectada: ${publicUrl}`);

    // Lê o conteúdo do index.html
    let html = fs.readFileSync('public/index.html', 'utf8');

    // Substitui qualquer URL antiga por esta nova
    html = html.replace(/https:\/\/[a-zA-Z0-9\-]+\.ngrok\.io/g, publicUrl);

    // Salva de volta
    fs.writeFileSync('public/index.html', html, 'utf8');

    console.log('✅ index.html atualizado com o novo link Ngrok!');
  } catch (error) {
    console.error('❌ Erro ao atualizar index.html:', error.message);
  }
}

updateHtml();
