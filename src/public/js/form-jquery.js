$(document).ready(function () {
   $(".formcreatebutton").click(function () {
      var spreadsheeturl = $("#spreadsheetUrl").val();
      var sheetName = $("#sheetName").val();
      alert(spreadsheeturl + " " + sheetName);
   });
    var callable =true;
   $("#generated_form").hide();
   $("#add-sheet-form-button").click(function () {
       if (callable) {
           callable=false;
           var spreadsheetUrl = $("#spreadsheetUrl").val();
           var sheetName = $("#sheetName").val();
           var re = new RegExp("d/(.*)/");
           var resArray = re.exec(spreadsheetUrl);
           let spreadId = resArray ? resArray[1] : spreadsheetUrl;
           var generatedUrl = `/Spreadsheet/CreateForm/${spreadId}/${sheetName}`;

           $.ajax({
               url: generatedUrl,
               success: function (result) {
                   $('#generatedApi').attr('type', 'text');
                   $("#generatedApi").val(generatedUrl);
                   $("#add-sheet-form-button").hide();
                   $("#generated_form").show();
                   $("#code").text(function (i, oritext) {
                       return '<form class="border border-dark rounded"style="padding:10px" >'
                   })
                   var arr = result;

                   for (i = arr.length - 1; i >= 0; i--) {
                       var st = '<div class="form-group">' + '<p>' + arr[i] +
                           ' </p><input type="text" class="border border-primary form-control form-rounded w-100" name="' +
                           arr[i] + '" placeholder=" ' + arr[i] + '" id="' + arr[i] + '">' + "</div>"
                       $("#cform").after(st);
                       $("#code").text(function (i, oritext) {
                           return oritext + st
                       });
                   }

                   $("#code").text(function (i, oritext) {
                       return oritext + '<button  type="submit" class="btn btn-primary "style="margin-top:0px">Submit </button> </form>'
                   })


                   if (location.hostname === "localhost") {
                       $("#generatedApi").val(
                           `${location.protocol}//${location.hostname}:${location.port}/API${generatedUrl}`
                       );
                   } else {
                       $("#generatedApi").val(`${location.hostname}/API${generatedUrl}`);
                   }
                   if (response.redirect) {
                       window.location = response.redirect;
                   }


               },


               error: function (xhr) {
                   console.error(xhr);
               },
           });
       }});

});
