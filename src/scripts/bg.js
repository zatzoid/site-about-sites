import $ from "jquery";
const sun = '.bg__sun';
const grid = '.bg__grid';
const city = '.bg__city';
const container = '.bg'

$(function () {
/*     const documentHeight = $(document).height() */
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

