const btn = document.querySelector('.j-btn-test');
const btn_svg1 = document.querySelectorAll('.bi')[0];
const btn_svg2 = document.querySelectorAll('.bi')[1];

btn.addEventListener('click', () => {
	btn_svg1.classList.toggle('svg--off');
    btn_svg2.classList.toggle('svg--off');
});