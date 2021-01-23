$(document).ready(function () {
    $(".formcreatebutton").click(function () {
        var spreadsheeturl = $("#spreadsheetUrl").val();
        var sheetName = $("#sheetName").val();
        alert(spreadsheeturl + " " + sheetName);
    });


    $("#generated_form").hide();
    $("#form_btn1").click(function () {

       var arra;
       $.ajax( {
          method:`POST`,
          url:'http://localhost:5000/Spreadsheet/CreateForm',
          dataType:"json"
       }).done(function (data){
          arra=data
          console.log(arra)
       })


        $("#form_btn").hide();
        $("#generated_form").show();
        $("#code").text(function (i, oritext) {
            return '<form class="border border-dark rounded"style="padding:10px" >'
        })
        var arr = ["c1", "c2", "c3"];
        for (i = arr.length - 1; i >= 0; i--) {
            var st = '<div class="form-group">' + '<p>' + arr[i] +
                ' </p><input type="text" class="border border-primary form-control form-rounded w-100" name="' +
                arr[i] +
                '" placeholder=" ' +
                arr[i] +
                '" id="' + arr[i] + '">' +
                "</div>"
            $("#cform").after(st);
            $("#code").text(function (i, oritext) {
                return oritext + st
            });

        }
        $("#code").text(function (i, oritext) {
            return oritext + '<button  type="submit" class="btn btn-primary "style="margin-top:0px">Submit </button> </form>'
        })
    });
});
