function generateGame() {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);


    const player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 20,
        color: 'blue',
        speed: 5,
        dx: 0,
        dy: 0
    };

    const enemies = [];

    function spawnEnemies() {
        setInterval(() => {
            const enemy = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: 30,
                color: 'red',
                speed: 3,
                dx: Math.random() - 0.5,
                dy: Math.random() - 0.5
            };
            enemies.push(enemy);
        }, 2000);
    }

    function drawPlayer() {
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
        ctx.fillStyle = player.color;
        ctx.fill();
        ctx.closePath();
    }

    function drawEnemies() {
        enemies.forEach(enemy => {
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
            ctx.fillStyle = enemy.color;
            ctx.fill();
            ctx.closePath();
        });
    }

    function updatePlayer() {
        player.x += player.dx;
        player.y += player.dy;

        if (player.x + player.radius > canvas.width || player.x - player.radius < 0) {
            player.dx *= -1;
        }

        if (player.y + player.radius > canvas.height || player.y - player.radius < 0) {
            player.dy *= -1;
        }
    }

    function updateEnemies() {
        enemies.forEach(enemy => {
            enemy.x += enemy.dx * enemy.speed;
            enemy.y += enemy.dy * enemy.speed;

            if (enemy.x + enemy.radius > canvas.width || enemy.x - enemy.radius < 0) {
                enemy.dx *= -1;
            }

            if (enemy.y + enemy.radius > canvas.height || enemy.y - enemy.radius < 0) {
                enemy.dy *= -1;
            }
        });
    }

    function collisionDetection() {
        enemies.forEach((enemy, enemyIndex) => {
            const distance = Math.sqrt(Math.pow(player.x - enemy.x, 2) + Math.pow(player.y - enemy.y, 2));
            if (distance < player.radius + enemy.radius) {
                enemies.splice(enemyIndex, 1);
            }
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawEnemies();
    }

    function update() {
        updatePlayer();
        updateEnemies();
        collisionDetection();
    }

    function gameLoop() {
        draw();
        update();
        requestAnimationFrame(gameLoop);
    }

    spawnEnemies();
    gameLoop();
}

generateGame();

function additionalFunctionality() {

    document.addEventListener('keydown', event => {
        switch (event.keyCode) {
            case 37:
                player.dx = -player.speed;
                break;
            case 39:
                player.dx = player.speed;
                break;
            case 38:
                player.dy = -player.speed;
                break;
            case 40:
                player.dy = player.speed;
                break;
        }
    });

    document.addEventListener('keyup', event => {
        switch (event.keyCode) {
            case 37:
            case 39:
                player.dx = 0;
                break;
            case 38:
            case 40:
                player.dy = 0;
                break;
        }
    });
}

additionalFunctionality();

function powerUps() {
    const powerUps = [];

    function spawnPowerUps() {
        setInterval(() => {
            const powerUp = {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: 10,
                color: 'yellow',
                speed: 2,
                dx: Math.random() - 0.5,
                dy: Math.random() - 0.5
            };
            powerUps.push(powerUp);
        }, 5000);
    }

    function drawPowerUps() {
        powerUps.forEach(powerUp => {
            ctx.beginPath();
            ctx.arc(powerUp.x, powerUp.y, powerUp.radius, 0, Math.PI * 2);
            ctx.fillStyle = powerUp.color;
            ctx.fill();
            ctx.closePath();
        });
    }

    function updatePowerUps() {
        powerUps.forEach(powerUp => {
            powerUp.x += powerUp.dx * powerUp.speed;
            powerUp.y += powerUp.dy * powerUp.speed;

            if (powerUp.x + powerUp.radius > canvas.width || powerUp.x - powerUp.radius < 0) {
                powerUp.dx *= -1;
            }

            if (powerUp.y + powerUp.radius > canvas.height || powerUp.y - powerUp.radius < 0) {
                powerUp.dy *= -1;
            }
        });
    }

    function collectPowerUps() {
        powerUps.forEach((powerUp, powerUpIndex) => {
            const distance = Math.sqrt(Math.pow(player.x - powerUp.x, 2) + Math.pow(player.y - powerUp.y, 2));
            if (distance < player.radius + powerUp.radius) {
                powerUps.splice(powerUpIndex, 1);
       
            }
        });
    }

    function gameLoop() {
        draw();
        update();
        drawPowerUps();
        updatePowerUps();
        collectPowerUps();
        requestAnimationFrame(gameLoop);
    }

    spawnPowerUps();
    gameLoop();
}

powerUps();


