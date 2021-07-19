let clear = document.getElementById('clear');
let titleSelector = document.querySelectorAll('input');
let descriptionSelector = document.querySelectorAll('textarea');
const title = document.getElementById('title');
const description = document.getElementById('description');

const save = document.getElementById('save');
const notes = document.getElementById('notes');
const title_delete = document.getElementById('title_delete');
const delete_btn = document.getElementById('delete_btn');
const textCount = document.getElementById('textcount');


clear.addEventListener('click', () => {
	titleSelector.forEach(input => input.value = '');
	descriptionSelector.forEach(input => input.value = '');
});

save.onclick = function() {

	if (localStorage.length >= 15) {
		return;
	}
	
	const titleval = title.value;

	const descriptionval = description.value;

	if (titleval && descriptionval) {
		localStorage.setItem(titleval, descriptionval);
		location.reload();
	}

	
};

delete_btn.addEventListener('click', () => {
	let delete_title = title_delete.value;
	localStorage.removeItem(delete_title);
	location.reload();
});

function charCount(textarea) {
	var length = textarea.value.length;
	textCount.innerHTML = length;



}

for (let i = 0; i < localStorage.length; i++) {

		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		notes.innerHTML += `${key}: ${value} <br />`

}

