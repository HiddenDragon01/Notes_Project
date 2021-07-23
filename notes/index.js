
const title = document.getElementById('title');
const description = document.getElementById('description');

const save = document.getElementById('save');
const notes = document.getElementById('notes');
const table = document.getElementById("myTable");
const textCount = document.getElementById('textcount');
const errmsg = document.getElementById('errmsg');
const delete_all = document.getElementById('delete_all');
const select_all = document.getElementById('select_all');

const searchInput = document.getElementById('search');


let edit = 0;



save.onclick = function() {


	if (localStorage.length >= 15) {
		return;
	}
	
	const titleval = title.value;

	let replaced = titleval.replace(/(<([^>]+)>)/ig, "");


	const descriptionval = description.value;

	let replaced_desk = descriptionval.replace(/(<([^>]+)>)/ig, "")

	if (!replaced) {
		return;
	}

	if (localStorage.getItem(replaced) === null || edit == 1) {

		localStorage.setItem(replaced, replaced_desk);
		location.reload();
		edit = 0;

	} else {

		errmsg.innerHTML = "Sorry, that note has already been written.";

	}
	return false;

	
};


function charCount(textarea) {
	var length = textarea.value.length;
	textCount.innerHTML = length;

}

var index;




for (let i = 0; i < localStorage.length; i++) {

		const key = localStorage.key(i);
		const value = localStorage.getItem(key);
		var row = table.insertRow(0);
  		var cell1 = row.insertCell(0);
  		var cell2 = row.insertCell(1);
  		var cell3 = row.insertCell(2);
  		var cell4 = row.insertCell(3);
  		cell1.innerHTML = key;
 	    cell2.innerHTML = `<textarea id="description" rows="10" cols="30" maxlength="500" onkeyup="charCount(this)" readonly>${value}</textarea>`;
 	    cell3.innerHTML += `<button class="edit_btn">Edit</button>`;
 	    cell3.innerHTML += `</br><button class="delete_btn">Delete</button>`;
		cell4.innerHTML += `<input type="checkbox" class="check">`;


	


		
}

var row = table.insertRow(0);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
cell1.innerHTML += "<h1> Title </h1>";
cell2.innerHTML += "<h1> Description </h1>"



const tableEl = document.querySelector('table');

function onEditRow(e) {

	if (!e.target.classList.contains("edit_btn")) {
		return;
	}

	const btn = e.target;
	var key = btn.closest("tr").cells[0].textContent;
	var value= btn.closest("tr").cells[1].textContent;

	title.value = key;
	description.value = value;

	edit = 1;

	
}

function onDeleteRow(e) {

	if (!e.target.classList.contains("delete_btn")) {
		return;
	}


	var proceed = confirm("Are you sure you want to delete this note?");

	if (proceed) {

		const btn = e.target;

		var key = btn.closest("tr").cells[0].textContent;

		localStorage.removeItem(key);
		location.reload();


	
	} 

	
}


const rows = document.querySelectorAll('tr');
let checkboxes = document.getElementsByTagName('input');


searchInput.addEventListener("keyup", function (event) {



	// Uncheck boxes every search



    for (var i=0; i<checkboxes.length; i++)  {

        if (checkboxes[i].type == 'checkbox')   {

        	
        	checkboxes[i].checked = false;
        	


        }
    }


	const q = event.target.value.toLowerCase();
	rows.forEach(row => {
		row.querySelector('td:nth-child(2)').textContent.toLowerCase().indexOf(q) !== -1 ? row.style.display = "" : row.style.display = 'none';
	});

	select_all.value = "Select all";




});




tableEl.addEventListener('click', onEditRow);
tableEl.addEventListener('click', onDeleteRow);









function onSelectAll() {

	

	let allSelected = 1;

    for (var i=0; i<checkboxes.length; i++)  {

        if (checkboxes[i].type == 'checkbox')   {

        	var row = checkboxes[i].closest("tr");

        	if (row.style.display !== 'none') {

        		if (checkboxes[i].checked != true) {
        			allSelected = 0;
        			checkboxes[i].checked = true;
        		}
        
        	}


        }
    }

    if (allSelected) {


    	select_all.value = "Select all";

    	for (var i = 0; i < checkboxes.length; i++) {


    		if (checkboxes[i].type == 'checkbox') {

    			var row = checkboxes[i].closest("tr");

        		if (row.style.display !== 'none') {

        			checkboxes[i].checked = false;
        			
        
        		}

    		}


    	}




    } else {
    	select_all.value = "Deselect all";
    }



}





select_all.addEventListener('click', onSelectAll);


delete_all.onclick = function() {



    for (var i=0; i<checkboxes.length; i++)  {

        if (checkboxes[i].checked == true)   {

        	
        	var row = checkboxes[i].closest("tr");

        	let key = row.cells[0].textContent;

        	localStorage.removeItem(key);
        	location.reload();
        	

        }
    }




};


const checkbox = document.getElementsByClassName("check");


var cbs = document.querySelectorAll('[type="checkbox"]');
[].forEach.call(cbs, function (cb) {
    cb.addEventListener("click", function(){
        if (event.currentTarget.checked) {

	  	let checked = 1;

		for (var i=0; i<checkboxes.length; i++)  {

	        if (checkboxes[i].type == 'checkbox')   {

	        	var row = checkboxes[i].closest("tr");

	        	if (row.style.display !== 'none') {

	        		if (checkboxes[i].checked != true) {
	        			checked = 0;

	        		}
	        
	        	}


	        }

		}	

	

		if (checked) {
			select_all.value = "Deselect all";
		}
	    
	  } else {
	    select_all.value = "Select all";
	  }
    });
});

/*
checkbox.forEach (checkrow =>
	checkrow.addEventListener('change', (event) => {

	  if (event.currentTarget.checked) {

	  	let checked = 1;

		for (var i=0; i<checkboxes.length; i++)  {

	        if (checkboxes[i].type == 'checkbox')   {

	        	var row = checkboxes[i].closest("tr");

	        	if (row.style.display !== 'none') {

	        		if (checkboxes[i].checked != true) {
	        			checked = 0;

	        		}
	        
	        	}


	        }

		}	

		console.log(checked);

		if (checked) {
			select_all.value = "Deselect all";
		}
	    
	  } else {
	    select_all.value = "Select all";
	  }
	})


)
*/
