document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("pingpongCanvas");
    const ctx = canvas.getContext("2d");

    const paddleHeight = 100; // Adjust as needed

    const paddleA = {
        x: 10,
        y: canvas.height / 2 - paddleHeight / 2,
        width: 10,
        height: paddleHeight,
        dy: 5 // Adjust the paddle speed
    };

    const paddleB = {
        x: canvas.width - 20,
        y: canvas.height / 2 - paddleHeight / 2,
        width: 10,
        height: paddleHeight,
        dy: 5 // Adjust the paddle speed
    };

    const ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        dx: 2,
        dy: 2
    };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "black";
        ctx.fillRect(paddleA.x, paddleA.y, paddleA.width, paddleA.height);
        ctx.fillRect(paddleB.x, paddleB.y, paddleB.width, paddleB.height);

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    function updatePaddlePosition(paddle, targetY) {
        if (paddle.y < targetY) {
            paddle.y += paddle.dy;
        } else if (paddle.y > targetY) {
            paddle.y -= paddle.dy;
        }
        // Limit paddle movement within canvas boundaries
        paddle.y = Math.max(0, Math.min(canvas.height - paddle.height, paddle.y));
    }

    function gameLoop() {
        draw();

        // Update paddle positions based on the ball's position
        updatePaddlePosition(paddleA, ball.y);
        updatePaddlePosition(paddleB, ball.y);

        // Update ball position
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Ball collision with top and bottom
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.dy *= -1;
        }

        // Ball collision with paddles
        if (
            ball.x - ball.radius < paddleA.x + paddleA.width &&
            ball.y > paddleA.y &&
            ball.y < paddleA.y + paddleA.height
        ) {
            ball.dx *= -1;
        }

        if (
            ball.x + ball.radius > paddleB.x &&
            ball.y > paddleB.y &&
            ball.y < paddleB.y + paddleB.height
        ) {
            ball.dx *= -1;
        }

        // Ball collision with paddles
if (
    ball.x - ball.radius < paddleA.x + paddleA.width &&
    ball.y > paddleA.y &&
    ball.y < paddleA.y + paddleA.height
) {
    ball.dx = Math.abs(ball.dx); // Change the ball's direction
    ball.x = paddleA.x + paddleA.width + ball.radius + 1; // Add an offset
}

if (
    ball.x + ball.radius > paddleB.x &&
    ball.y > paddleB.y &&
    ball.y < paddleB.y + paddleB.height
) {
    ball.dx = -Math.abs(ball.dx); // Change the ball's direction
    ball.x = paddleB.x - ball.radius - 1; // Add an offset
}


        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
