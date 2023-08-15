var btnProjectEl = document.querySelector('.btn-project');
var projectCardEl = document.querySelector('.project-card');
var contEl = document.querySelector('.cont');

btnProjectEl.addEventListener('click', (e) => {
    contEl.style.display = 'none';
    projectCardEl.style.display = 'block';
})