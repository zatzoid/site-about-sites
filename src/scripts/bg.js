import $ from "jquery";
const sun = '.bg__sun';
const grid = '.bg__grid';
const city = '.bg__city';
const container = '.bg'

$(function () {
    if (window.innerWidth >= 800) {
        $(document).on('scroll', (evt) => {
            const bodyHeight = evt.currentTarget.body.offsetHeight;
            const scrollPos = window.scrollY;
            const windowHeight = window.screen.height;
            const sunScale = scrollPos <= 800 ? Math.round((1.0 - (0.5 * scrollPos) / 800) * 10) / 10 : 0.5;
            const gridDeg = scrollPos >= 200 ? mapRange(scrollPos, 200, bodyHeight - windowHeight, 0, 35) : 0;
            $(sun).css({ transform: `translate(-50%, -50%)  scale(${sunScale})` })
            $(grid).css({ transform: `perspective(${bodyHeight * 0.24}px)   rotatex(${gridDeg}deg) translateY(90vh)` })
        })
    } else {
        $(sun).empty()
    }

});

function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}


/* var canvas = document.getElementById('graph');
    var ctx = canvas.getContext('2d');

    var progress = 0;
    var points = [
        { x: 50, y: 70 },
        { x: 200, y: 20 },
        { x: 150, y: 150 }
    ];

    function drawTriangle() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Begin drawing path
        ctx.beginPath();
        
        // Move to the initial point of the first line
        ctx.moveTo(points[0].x, points[0].y);

        // Draw lines to each point, adjusting their coordinates based on progress
        for (var i = 1; i < points.length; i++) {
            var p = {
                x: points[i - 1].x + (points[i].x - points[i - 1].x) * progress,
                y: points[i - 1].y + (points[i].y - points[i - 1].y) * progress
            };
            ctx.lineTo(p.x, p.y);
        }

        // Close the path
        ctx.closePath();

        // Apply styling
        ctx.strokeStyle = '#1a2edb';
        ctx.lineWidth = 5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'blue';

        // Stroke the path
        ctx.stroke();

        // Increase progress until it reaches 1
        if (progress < 1) {
            progress += 0.01; // Adjust the speed of animation by changing the increment value
            requestAnimationFrame(drawTriangle);
        }
    }

    // Start the animation
    drawTriangle(); */