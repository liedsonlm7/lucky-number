// Função para gerar números aleatórios
function generateNumbers() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const numbersSet = new Set();

    // Gera números únicos aleatórios
    while (numbersSet.size < quantity) {
        const randomNum = Math.floor(Math.random() * 60) + 1;
        numbersSet.add(randomNum);
    }

    // Organiza os números em ordem crescente
    const numbersArray = Array.from(numbersSet).sort((a, b) => a - b);
    return numbersArray;
}

// Função para salvar as 10 sequências no histórico
function generateTenSequences() {
    const historyKey = 'numberGeneratorHistory';
    const history = [];

    // Gera 10 sequências
    for (let i = 0; i < 10; i++) {
        const sequence = generateNumbers();
        history.push(sequence.join(' - '));
    }

    // Atualiza o LocalStorage e a exibição
    localStorage.setItem(historyKey, JSON.stringify(history));
    updateHistoryDisplay(history);
}

// Função para exibir o histórico
function updateHistoryDisplay(history) {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = '';

    history.forEach(sequence => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = sequence;
        historyDiv.appendChild(div);
    });

    // Exibe o botão para adicionar mais sequências
    document.getElementById('addMoreBtn').style.display = 'block';
}

// Função para limpar as sequências e permitir novas
function clearHistory() {
    localStorage.removeItem('numberGeneratorHistory');
    document.getElementById('history').innerHTML = '';
    document.getElementById('addMoreBtn').style.display = 'none';
}

// Carregamento inicial da página
document.addEventListener('DOMContentLoaded', () => {
    const historyKey = 'numberGeneratorHistory';
    const history = JSON.parse(localStorage.getItem(historyKey)) || [];
    if (history.length > 0) {
        updateHistoryDisplay(history);
    }
});
