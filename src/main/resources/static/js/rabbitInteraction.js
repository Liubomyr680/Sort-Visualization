//
// document.addEventListener('DOMContentLoaded', function () {
//     const rabbit = document.getElementById('runningRabbit');
//     const symbols = document.querySelectorAll('.symbol');
//
//     function updatePositions() {
//         const rabbitRect = rabbit.getBoundingClientRect();
//         const rabbitLeft = rabbitRect.left;
//         const rabbitRight = rabbitRect.right;
//         const rabbitTop = rabbitRect.top;
//         const rabbitBottom = rabbitRect.bottom;
//
//         symbols.forEach(symbol => {
//             const symbolRect = symbol.getBoundingClientRect();
//             const symbolLeft = symbolRect.left;
//             const symbolRight = symbolRect.right;
//             const symbolTop = symbolRect.top;
//             const symbolBottom = symbolRect.bottom;
//
//             // Перевірка, чи стикається символ із зайцем
//             if (
//                 symbolRight > rabbitLeft && symbolLeft < rabbitRight &&
//                 symbolBottom > rabbitTop && symbolTop < rabbitBottom
//             ) {
//                 // Змінюємо напрямок падіння символу
//                 symbol.style.animation = 'bounce 1s ease-out';
//             } else {
//                 // Повернути звичайний напрямок
//                 symbol.style.animation = 'fall 5s linear infinite';
//             }
//         });
//         requestAnimationFrame(updatePositions);
//     }
//
//     requestAnimationFrame(updatePositions);
// });