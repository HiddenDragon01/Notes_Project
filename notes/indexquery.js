let edit = 0;
let numVisible = 0;

$("#save").click(function(){


    if (localStorage.length >= 15) {
        return;
    }

    var $title = $("#title").val();

    var $description = $("#description").val();

    if (!$title) {
        return;
    }

    if (localStorage.getItem($title) === null || edit == 1) {

        localStorage.setItem($title, $description);
        location.reload();
        edit = 0;

    } else {

        $("#errmsg").html("Sorry, that note has already been written.");

    }
      

    return false;

}); 


function charCount(textarea) {

        var length = textarea.value.length;
        $("#textcount").html(length);

}

let $table = $("#myTable tbody");

$table.append(`<tr>
    <td><h1> Title </h1></td>
    <td> <h1> Description </h1> </td>
    <td> </td>
    <td> </td>
    <td> </td>
    </tr>`);


for (let i = 0; i < localStorage.length; i++) {

        numVisible++;
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        $table.append(`<tr>
            <td>${key}</td> 
            <td><textarea id="description" rows="10" cols="30" maxlength="500" readonly>${value}</textarea></td>
            <td><button class="edit_btn">Edit</button></td>
            <td><button class="delete_btn">Delete</button></td>
            <td><input type="checkbox" class="visiblecheck"></td><
            /tr>`)

    
}
 

$("table :button").click(function() {


  var className = $(this).attr('class');

  var key = $(this).closest('tr').find('td:first').text();

  if (className === 'edit_btn') {

    var value = $(this).closest('tr').find('td:first').next().text();

    $("#title").val(key);
    $("#description").val(value);

    edit = 1;

  }

  if (className === 'delete_btn') {

    var proceed = confirm("Are you sure you want to delete this note?");

    if (proceed) {
        
        localStorage.removeItem(key);
        location.reload();
    
    } 

    
  }


});
 

$("#search").keyup(function() {

    numVisible = 0;

    // Uncheck all boxes

    $("table :input").each(function() {
        $(this).prop('checked', false);
    });

    $("#select_all").val('Select All');

    let text = $("#search").val().toLowerCase();

    //Skip first row
    let skip = 0;

    $("table tbody tr").each(function() {

       if (skip == 0) {
            skip = 1;
            return;
       }

      var description = $(this).closest('tr').find('td:first').next().text();
      description.toLowerCase().indexOf(text) !== -1 ? 

      ( $(this).css("display", "") , numVisible++) 

      : ( $(this).css("display", 'none') );

    });

    
});


$("#select_all").click(function() {

    if ($("#select_all").val() === 'Select All') {

        $("table :input").each(function() {
        $(this).prop('checked', true);

    });
        $("#select_all").val('Deselect All');

    } else {

        $("table :input").each(function() {
        $(this).prop('checked', false);
    });

        $("#select_all").val('Select All');

    }


});

$(".visiblecheck").change(function(){

    // If all checkboxes are selected
    if ($('.visiblecheck:checked').length == numVisible) {
       $("#select_all").val('Deselect All');
    } else {
        $("#select_all").val('Select All');
    }
});


$("#delete_all").click(function() {

    var proceed = confirm("Are you sure you want to delete these notes?");

    if (proceed) {
        
        $("table :input").each(function() {


        if ($(this).is(':checked')) {

            var key = $(this).closest('tr').find('td:first').text();
            localStorage.removeItem(key);
            location.reload();

        }
        
    });
    
    } 

    
});


