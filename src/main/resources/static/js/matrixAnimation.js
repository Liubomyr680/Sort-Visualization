window.addEventListener('DOMContentLoaded', function() {
    const matrixContainer = document.querySelector('.matrix-container');
    const symbolCount =200;
    const symbols = ['0', '1']; // Add more symbols if needed

    for (let i = 0; i < symbolCount; i++) {
        const symbol = document.createElement('div');
        symbol.classList.add('symbol');
        symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
        symbol.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random falling speed
        matrixContainer.appendChild(symbol);
    }
});