// script.js
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
startScreen.addEventListener('click', start);
let player = { speed: 5, score: 0, attempts: 3 };
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

// Array de preguntas
const questions = [
    {
        question: "El renglón de efectivo disponible está constituido por:",
        options: [
            "A) Fondo de caja chica, depósitos bancarios e inversiones a corto plazo.",
            "B) Depósitos bancarios, giros postales y cheques posfechados.",
            "C) Inversiones a corto plazo y aportaciones de los socios.",
            "D) Fondo de caja chica, aportaciones de socios y depósitos bancarios."
        ],
        answer: "A"
    },
    {
        question: "La administración del efectivo generalmente se centra alrededor de dos áreas:",
        options: [
            "A) El fondo de caja chica y la cuenta bancaria de cheques.",
            "B) El presupuesto de efectivo.",
            "C) Las inversiones a corto plazo de gran liquidez.",
            "D) El control contable del efectivo.",
            "E) Todas las anteriores.",
            "F) Sólo B y D."
        ],
        answer: "F"
    },
    {
        question: "Es uno de los propósitos de los mecanismos de control interno en las empresas:",
        options: [
            "A) Proteger los recursos contra el desperdicio, fraudes e insuficiencias.",
            "B) Estimular el cumplimiento de las políticas de la empresa.",
            "C) Promover y evaluar la eficiencia operativa de la compañía.",
            "D) Asegurar registros contables exactos y confiables.",
            "E) Todas las anteriores."
        ],
        answer: "E"
    },
    {
        question: "El momento de recibir el dinero debe clasificarse como:",
        options: [
            "A) Cuentas por pagar.",
            "B) Efectivo.",
            "C) Deudores diversos.",
            "D) Gastos pagados por anticipado."
        ],
        answer: "B"
    },
    {
        question: "Los depósitos bancarios deben clasificarse como:",
        options: [
            "A) Efectivo.",
            "B) Cuentas por cobrar.",
            "C) Deudores diversos.",
            "D) Gastos pagados por anticipado.",
            "E) Ninguna de las anteriores."
        ],
        answer: "A"
    },
    {
        question: "Los cheques posfechados deben clasificarse como:",
        options: [
            "A) Gastos pagados por anticipado.",
            "B) Efectivo.",
            "C) Deudores diversos.",
            "D) Cuentas por pagar."
        ],
        answer: "B"
    },
    {
        question: "Las inversiones disponibles deben cumplir al menos con dos requisitos para que sean consideradas como parte del efectivo de un negocio:",
        options: [
            "A) Sólo B y D (Representar bonos del gobierno y tener el objetivo de convertirlas a efectivo en el ciclo normal de operaciones).",
            "B) Representar bonos del gobierno.",
            "C) Cantidad de cubrir efectivo.",
            "D) Tener el objetivo de convertirlas a efectivo en el ciclo normal de operaciones.",
            "E) Todas las anteriores."
        ],
        answer: "A"
    },
    {
        question: "Las inversiones disponibles se deben clasificar dentro de los activos circulantes justo después de la cuenta de:",
        options: [
            "A) Deudores diversos.",
            "B) Caja chica.",
            "C) Inventarios.",
            "D) Efectivo.",
            "E) Ninguna de las anteriores."
        ],
        answer: "D"
    },
    {
        question: "Las inversiones disponibles deben valuarse a:",
        options: [
            "A) Valor neto de realización.",
            "B) Precio de venta menos gastos necesarios para su venta.",
            "C) Valor de mercado.",
            "D) Todas las anteriores son correctas.",
            "E) Sólo A y B."
        ],
        answer: "E"
    },
    {
        question: "Es una opción de instrumentos a corto plazo para el público inversionista:",
        options: [
            "A) Bonos con vencimiento mayor a un año.",
            "B) Sociedades de inversión.",
            "C) Instrumentos gubernamentales.",
            "D) Sólo D y B son correctas (Sociedades de inversión e instrumentos gubernamentales).",
            "E) Todas son correctas."
        ],
        answer: "D"
    }
];

// Función para manejar los controles de flechas en móvil
function moveCar(direction) {
    keys[direction] = true;
    setTimeout(() => keys[direction] = false, 100); // Desactiva el movimiento después de un instante
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

// Función de detección de colisiones
function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top > bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    );
}

function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        if (item.y >= 650) {
            item.y -= 740;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Fin del juego <br> Puntuación final: " + player.score + "<br>Pulsa de nuevo para volver a empezar";
}

// Función para mostrar una pregunta al chocar
function checkAnswer() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randomIndex];
    
    let attemptsLeft = player.attempts;

    while (attemptsLeft > 0) {
        let answer = prompt(
            `${selectedQuestion.question}\n${selectedQuestion.options.join('\n')}`
        );

        if (answer && answer.toUpperCase() === selectedQuestion.answer) {
            alert("¡Respuesta correcta! Continúa jugando.");
            repositionCar(); // Reposiciona el coche si responde correctamente
            window.requestAnimationFrame(gamePlay); // Continúa el juego sin perder puntaje
            return true;
        } else {
            attemptsLeft--;
            alert("Incorrecto. Intentos restantes: " + attemptsLeft);
        }
    }

    alert("Se acabaron los intentos. Fin del juego.");
    endGame();
    return false;
}

function repositionCar() {
    const car = document.querySelector('.car');
    const roadWidth = gameArea.offsetWidth - car.offsetWidth;
    player.x = Math.floor(Math.random() * roadWidth);
    player.y = gameArea.offsetHeight - car.offsetHeight - 20;
    car.style.left = player.x + "px";
    car.style.top = player.y + "px";
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {
        if (isCollide(car, item)) {
            console.log("Bang!");
            if (!checkAnswer()) return;
        }
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top + 70)) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 85)) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed;
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerText = "Score: " + (player.score - 1);
    }
}

function start() {
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    player.attempts = 3;
    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}
