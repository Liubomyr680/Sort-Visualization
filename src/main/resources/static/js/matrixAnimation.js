// matrixAnimation.js

window.addEventListener('DOMContentLoaded', function() {
    const matrixContainer = document.querySelector('.matrix-container');
    const symbols = ['0', '1']; // Символи, які будуть використовуватись
    const maxSymbolsOnScreen = 500; // Обмеження кількості символів одночасно на екрані
    let currentSymbolsCount = 0;

    // Використовуємо CSS-анімації для оптимізації
    function createSymbol() {
        if (currentSymbolsCount >= maxSymbolsOnScreen) {
            return; // Не створюємо більше символів, якщо досягнуто максимум
        }

        const symbol = document.createElement('div');
        symbol.classList.add('symbol');
        symbol.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.left = Math.random() * 100 + 'vw'; // Випадкова горизонтальна позиція
        symbol.style.animationDuration = Math.random() * 5 + 3 + 's'; // Випадкова швидкість падіння (більший діапазон для меншої частоти)
        symbol.style.opacity = Math.random() * 0.5 + 0.5; // Задаємо прозорість для меншого навантаження

        matrixContainer.appendChild(symbol);
        currentSymbolsCount++;

        // Видаляємо символ після завершення анімації
        symbol.addEventListener('animationend', () => {
            symbol.remove();
            currentSymbolsCount--;
        });
    }

    // Додаємо символи поступово
    function graduallyAddSymbols() {
        createSymbol(); // Створюємо новий символ
        setTimeout(graduallyAddSymbols, 10); // Додаємо наступний символ з інтервалом
    }

    // Розпочинаємо додавання символів
    graduallyAddSymbols();



    // Відбиття символів від зайця
    const rabbit = document.getElementById('runningRabbit');

    function updatePositions() {
        const rabbitRect = rabbit.getBoundingClientRect();
        const symbolsElements = document.querySelectorAll('.symbol'); // Переміщено сюди, щоб врахувати нові символи

        symbolsElements.forEach(symbol => {
            const symbolRect = symbol.getBoundingClientRect();

            // Перевірка на зіткнення символу з зайцем зверху і коли символ зайшов на анімацію на 25 пікселів
            if (
                symbolRect.right > rabbitRect.left && symbolRect.left < rabbitRect.right &&
                symbolRect.bottom > rabbitRect.top + 17 && symbolRect.top < rabbitRect.top
            ) {
                // Зупинити падіння символу на поточній позиції і змусити його відскочити на 10 пікселів назад
                symbol.style.animationPlayState = 'paused';
                const originalTop = symbol.offsetTop;
                symbol.style.position = 'absolute';
                symbol.style.top = originalTop + 'px';

                // Повернути символ до нормального падіння після відскоку
                setTimeout(() => {
                    symbol.style.top = (originalTop) + 'px'; // Повертаємо до 10 пікселів нижче від початкового положення
                    setTimeout(() => {
                        symbol.style.animationPlayState = 'running';
                        symbol.style.transition = '';
                    }, 20);
                }, 20);
            }
        });
        requestAnimationFrame(updatePositions);
    }

    requestAnimationFrame(updatePositions);
});