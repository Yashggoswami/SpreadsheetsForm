$(document).ready(function () {
   $(".formcreatebutton").click(function () {
      var spreadsheeturl = $("#spreadsheetUrl").val();
      var sheetName = $("#sheetName").val();
      alert(spreadsheeturl + " " + sheetName);
   });
   $("#generated_form").hide();
   $("#form_btn").click(function () {
      $("#form_btn").hide();
      $("#generated_form").show();
      var arr = ["c1", "c2", "c3"];
      for (i = arr.length - 1; i >= 0; i--) {
         var st ='<div class="form-group">' + '<p>' + arr[i] + ' </p><input type="text" class="border border-primary form-control form-rounded w-100" name="' +
         arr[i] +
         '" placeholder=" ' +
         arr[i] +
         '" id="' + arr[i] + '">' +
         "</div>"
         $("#cform").after(st);
         $("#code").text(st);
         
      }
   });
});
