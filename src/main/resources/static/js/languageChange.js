// Функція для зміни мови
const descriptionTitle = document.getElementById('description-title');
const descriptionText = document.getElementById('description-text');
const algorithmStepsTitle = document.getElementById('algorithm-steps-title');
const stepsList = document.getElementById('steps-list');
const exampleText = document.getElementById('example-text');
const complexityText = document.getElementById('complexity-text');
const advantagesText = document.getElementById('advantages-text');
const summaryText = document.getElementById('summary-text');
let currentLanguage = 'ua'; // Початкова мова - українська

function toggleLanguage() {
    if (currentLanguage === 'ua') {
        // Змінюємо мову на англійську
        descriptionTitle.innerText = "Merge Sort Algorithm";
        descriptionText.innerText = "Merge Sort is one of the most efficient sorting methods that works on the principle of 'divide and conquer'. It splits the array into smaller parts, sorts those parts individually, and then merges them into one sorted array.";

        algorithmStepsTitle.innerText = "How does the algorithm work:";

        stepsList.innerHTML = `
                <li><strong>Divide:</strong> The array is divided into two equal parts until each sub-array is of size one. A size of one is considered sorted.</li>
                <li><strong>Recursion:</strong> The sorting function is recursively called for each part, continuing to split until all parts are small enough.</li>
                <li><strong>Merge:</strong> The two sorted parts are merged into one sorted array by comparing elements and placing them in ascending order.</li>
            `;

        exampleText.innerText = "Example: If you have an array of numbers [8, 3, 1, 7, 0, 10, 2], the algorithm will first split it into sub-arrays: [8, 3, 1] and [7, 0, 10, 2]. Each sub-array is then further divided until only individual elements remain. Then, the merging process occurs, where individual elements are combined, forming sorted sub-arrays, and ultimately a completely sorted array [0, 1, 2, 3, 7, 8, 10].";

        complexityText.innerText = "Merge Sort has a time complexity of O(n log n) for the worst, best, and average cases, making it very powerful for working with large datasets. Its main advantage is that it has stable performance regardless of whether the data is almost sorted or not.";

        advantagesText.innerText = "This algorithm is suitable for large datasets but requires additional memory to store sub-arrays, so for smaller arrays, it might be less efficient compared to other sorting algorithms like Bubble Sort or Insertion Sort.";

        summaryText.innerText = "The essence of the Merge Sort algorithm is to recursively divide the array into smaller sub-arrays and gradually merge them into a sorted result, keeping the elements in the correct order.";

        currentLanguage = 'en';
        document.getElementById('language-toggle-button').innerText = 'Change to Ukrainian';
    } else {
        // Змінюємо мову на українську
        descriptionTitle.innerText = "Алгоритм сортування злиттям";
        descriptionText.innerText = "Алгоритм сортування злиттям (Merge Sort) є одним із найефективніших методів сортування, який працює за принципом \"розділяй та володарюй\". Він ділить масив на менші частини, сортує ці частини окремо, а потім об'єднує їх у один відсортований масив.";

        algorithmStepsTitle.innerText = "Як працює алгоритм:";

        stepsList.innerHTML = `
                <li><strong>Поділ:</strong> Масив розбивається на дві рівні частини, доки кожен підмасив не стане розміром один елемент. Елемент розміром один вважається вже відсортованим.</li>
                <li><strong>Рекурсія:</strong> Рекурсивно викликається функція сортування для кожної з частин, продовжуючи поділ доти, доки всі частини не стануть достатньо малими.</li>
                <li><strong>Злиття:</strong> Дві відсортовані частини зливаються в один відсортований масив, порівнюючи елементи між собою і розташовуючи їх у порядку зростання.</li>
            `;

        exampleText.innerText = "Приклад: Якщо у вас є масив чисел [8, 3, 1, 7, 0, 10, 2], алгоритм спочатку розділить його на підмасиви: [8, 3, 1] та [7, 0, 10, 2]. Потім кожен підмасив знову буде розбитий, доки не залишаться окремі елементи. Після цього відбувається процес злиття, де окремі елементи об'єднуються, утворюючи відсортовані підмасиви, і зрештою повністю відсортований масив [0, 1, 2, 3, 7, 8, 10].";

        complexityText.innerText = "Сортування злиттям має ефективність O(n log n) для найгіршого, найкращого і середнього випадків, що робить його дуже потужним для роботи з великими наборами даних. Його основна перевага в тому, що він має стабільну складність незалежно від того, чи дані майже впорядковані, чи ні.";

        advantagesText.innerText = "Цей алгоритм підходить для великих обсягів даних, але потребує додаткової пам'яті для зберігання підмасивів, тому для невеликих масивів може бути менш ефективним у порівнянні з іншими алгоритмами сортування, такими як Bubble Sort або Insertion Sort.";

        summaryText.innerText = "Суть роботи алгоритму полягає в тому, щоб рекурсивно розділяти масив на менші підмасиви і поступово з'єднувати їх у відсортований результат, зберігаючи елементи в належному порядку.";

        currentLanguage = 'ua';
        document.getElementById('language-toggle-button').innerText = 'Змінити мову';
    }
}