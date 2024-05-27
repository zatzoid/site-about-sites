import $ from "jquery";
const sun = '.bg__sun';
const bright = '.bg__sun-content-bright'
const gradient = '.footer__bg-gradientTop'

$(function () {

    if (window.innerWidth >= 800) {

        $(document).on('scroll', (evt) => {


            const scrollPos = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight; // Высота всего документа
            const pos = (((scrollPos + window.innerHeight) / documentHeight) * 100).toFixed(0); // Высота видимой области окна
            //  стратовый размер 0.5
            // конечный размер 1

            //стартовый top 90%
            // конечный top 55%

            const sunScale = pos > 50 ? pos / 100 : 0.5
            const sunTop = 90 - ((pos - 44) / (100 - 44)) * (90 - 55)
            $(sun).css({ transform: `translate(-50%, -50%)  scale(${sunScale})`, top: `calc(${sunTop}%)` });
            $(bright).css({
                opacity: `${pos / 100}`
            })
            function grad() {
                if (pos <= 90) {
                    return 43;
                } else if (pos >= 100) {
                    return 0;
                } else {
                    // Линейная интерполяция между 90 и 100
                    return 43 - ((pos - 90) / (100 - 90)) * 43;
                }
            }

            $(gradient).css({ transform: `translateY(${grad()}%)` })

        })
    } else {
        $(bright).css({display: 'none'})
    }

});




