var dateEl = document.querySelector('.question input');
var contEl = document.querySelector('.container');
var rsEl = document.querySelector('.restart button');

rsEl.addEventListener('click', () => {
    location.reload();
});

function format(n) {
    if(n < 10 && n >= 0) return `0${n}`;
    return n;
}

dateEl.onchange = (e) => {
    var date = new Date(e.target.value);
    if (Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date.getTime())) {
        function setTime() {
            var now = new Date();
            var mSec = (date - now) / 1000;
            var days = Math.floor(mSec / 60 / 60 / 24);
            var hours = Math.floor((mSec / 60 / 60) % 24);
            var minutes = Math.floor((mSec / 60) % 60);
            var seconds = Math.floor(mSec % 60);
            var array = document.querySelectorAll('.col');

            array[0].innerHTML = `<h2>${format(days)} <br> days</h2>`;
            array[1].innerHTML = `<h2>${format(hours)} <br> hours</h2>`;
            array[2].innerHTML = `<h2>${format(minutes)} <br> mins</h2>`;
            array[3].innerHTML = `<h2>${format(seconds)} <br> secs</h2>`;
        }
        contEl.style.display = 'block';
        rsEl.style.display = 'block';
        dateEl.style.display = 'none';
        setInterval(setTime, 1);
    }
    else {
        var qs = document.querySelector('.question');
        qs.innerHTML = '<h1>May deo co quyen ! <br> Restart lai di thang cho</h1>';
        rsEl.style.display = 'block';
    }
}