var keys = Array.from(document.querySelectorAll('.cell'));

function play(e) {
    var keys = document.querySelectorAll(`div[data-key="${e.keyCode}"]`);
    keys.forEach((key) => {
        if(!key.classList.contains("checked")) {
            key.classList.add("checked");
        }
        else {
            key.classList.add("overClicked");
            setTimeout(() => {
                key.classList.remove("overClicked")
            }, 100);
        }
    })
}

window.addEventListener("keydown", play);
