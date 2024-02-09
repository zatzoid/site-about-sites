import $ from "jquery";

$(function () {
    $('.header__logo-main').delay(500).addClass('header__logo-main-active')

    /*  const subData = 'сайт о моих сайтах' 
     const subDataArray = Array.from(subData);
     setTimeout(() => {
         addText()
     }, 2000);
 
     function addText() {
         for (let i = 0; i < subDataArray.length; i++) {
             const delay = Number(i + '00')
             setTimeout(() => {
                 const currentText = $('.header__logo-subData').text()
                 $('.header__logo-subData').text(currentText + subDataArray[i])
             }, delay);
            
            
         }
        
     } */
})

/*  const canvas = document.getElementById('graph');
 const ctx = canvas.getContext('2d');
 
 // Начальные и конечные точки первой линии
 const startPoint1 = { x: 50, y: 50 };
 const endPoint1 = { x: 250, y: 30 };
 
 // Начальные и конечные точки второй линии
 const startPoint2 = { x: 250, y: 30 };
 const endPoint2 = { x: 150, y: 150 };
 
 let progress1 = 0;
 
 function drawLine1() {
     // Вычисление текущих координат точек на основе прогресса
     const currentX = startPoint1.x + (endPoint1.x - startPoint1.x) * progress1;
     const currentY = startPoint1.y + (endPoint1.y - startPoint1.y) * progress1;
 
     // Начать новый путь
     ctx.beginPath();
     // Установить начальную точку линии
     ctx.moveTo(startPoint1.x, startPoint1.y);
     // Нарисовать линию до текущей позиции
     ctx.lineTo(currentX, currentY);
     // Отрисовать линию
     ctx.stroke();
 }
 
 function drawLine2() {
     let progress2 = 0;
 
     function draw() {
         // Отрисовка первой линии
         drawLine1();
 
         // Вычисление текущих координат точек второй линии на основе прогресса
         const currentX = startPoint2.x + (endPoint2.x - startPoint2.x) * progress2;
         const currentY = startPoint2.y + (endPoint2.y - startPoint2.y) * progress2;
 
         // Начать новый путь для второй линии
         ctx.beginPath();
         // Установить начальную точку второй линии
         ctx.moveTo(startPoint2.x, startPoint2.y);
         // Нарисовать вторую линию до текущей позиции
         ctx.lineTo(currentX, currentY);
         // Отрисовать вторую линию
         ctx.stroke();
 
         // Увеличить прогресс второй линии до 1
         if (progress2 < 1) {
             progress2 += 0.01; // Измените скорость анимации, меняя этот параметр
             requestAnimationFrame(draw);
         } else {
             // После завершения анимации второй линии, начать анимацию третьей линии
             drawLine3();
         }
     }
 
     // Запустить анимацию второй линии
     draw();
 }
 
 function drawLine3() {
     let progress3 = 0;
 
     function draw() {
         // Отрисовка первой линии
         drawLine1();
         // Отрисовка второй линии
         drawLine2();
 
         // Вычисление текущих координат точек третьей линии на основе прогресса
         const currentX = endPoint2.x + (startPoint1.x - endPoint2.x) * progress3;
         const currentY = endPoint2.y + (startPoint1.y - endPoint2.y) * progress3;
 
         // Начать новый путь для третьей линии
         ctx.beginPath();
         // Установить начальную точку третьей линии
         ctx.moveTo(endPoint2.x, endPoint2.y);
         // Нарисовать третью линию до текущей позиции
         ctx.lineTo(currentX, currentY);
         // Отрисовать третью линию
         ctx.stroke();
 
         // Увеличить прогресс третьей линии до 1
         if (progress3 < 1) {
             progress3 += 0.01; // Измените скорость анимации, меняя этот параметр
             requestAnimationFrame(draw);
         }
     }
 
     // Запустить анимацию третьей линии
     draw();
 }
 
 // Запустить анимацию первой линии
 function startAnimation() {
     function animate() {
         // Clear canvas
         ctx.clearRect(0, 0, canvas.width, canvas.height);
 
         // Отрисовка первой линии
         drawLine1();
 
         // Увеличить прогресс первой линии до 1
         if (progress1 < 1) {
             progress1 += 0.01; // Измените скорость анимации, меняя этот параметр
             requestAnimationFrame(animate);
         } else {
             // После завершения анимации первой линии, начать анимацию второй линии
             drawLine2();
         }
     }
 
     animate();
 }
 
 startAnimation();
 

}); */
