const arrayContainer = document.getElementById('array-container');
const resetButton = document.getElementById('reset-button');
const speedInput = document.getElementById('speed-input');

let array = [];
let bars = [];
let animationspeed = 150 / speedInput.value; // Ініціалізація швидкості

// Слухач для зміни швидкості
speedInput.addEventListener('input', function () {
    animationspeed = 150 / speedInput.value; // Оновлення швидкості
});

function generateRandomArray() {
    array = [];
    for (let i = 0; i < 250; i++) {
        array.push(Math.floor(Math.random() * (500 - 50)) + 50);
    }
}

function createBars() {
    bars = [];
    arrayContainer.innerHTML = ''; // Очищаємо контейнер перед створенням нових стовпців
    let i = 0;
    const interval = setInterval(() => {
        if (i === array.length) {
            clearInterval(interval);
            return;
        }
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${array[i]}px`;
        bars.push(bar);
        arrayContainer.appendChild(bar);
        i++;
    }, 10); // Затримка між появою кожного блоку масиву (у мілісекундах)
}

async function mergeArray(start, mid, end) {
    for (let i = start; i <= end; i++) {
        bars[i].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, animationspeed));
    }
    await merge2Array(start, mid, end);
    for (let i = start; i <= end; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}

async function merge2Array(start, mid, end) {
    let orgarr = [];
    let i = start;
    let j = mid + 1;

    while (i <= mid && j <= end) {
        if (array[i] <= array[j]) {
            orgarr.push(array[i++]);
        } else {
            orgarr.push(array[j++]);
        }
    }

    while (i <= mid) {
        orgarr.push(array[i++]);
    }

    while (j <= end) {
        orgarr.push(array[j++]);
    }

    for (let i = start; i <= end; i++) {
        array[i] = orgarr[i - start];
    }

    for (let i = start; i <= end; i++) {
        bars[i].style.height = `${array[i]}px`;
    }
}

async function mergeSort(start, end) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);

        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await mergeArray(start, mid, end);
    }
}

generateRandomArray();
createBars();

async function visualizeSort() {
    await mergeSort(0, array.length - 1);
}

// Додаємо функціонал для кнопки "Скинути", щоб скинути масив і стовпці
resetButton.addEventListener('click', function () {
    generateRandomArray();
    createBars();
});
