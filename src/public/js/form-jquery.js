$(document).ready(function () {
   $(".formcreatebutton").click(function () {
      var spreadsheeturl = $("#spreadsheetUrl").val();
      var sheetName = $("#sheetName").val();
      alert(spreadsheeturl + " " + sheetName);
   });

   $("#generated_form").hide();
   var clickable=true;
   $("#add-sheet-form-button").click(function () {
       if(clickable){
          clickable=false
          var spreadsheetUrl = $("#spreadsheetUrl").val();
          var sheetName = $("#sheetName").val();
          var re = new RegExp("d/(.*)/");
          var resArray = re.exec(spreadsheetUrl);
          let spreadId = resArray ? resArray[1] : spreadsheetUrl;
          var generatedAPIURL = `/API/r/Spreadsheet/CreateForm/${spreadId}/${sheetName}`;
           var generatedWAPIURL = `/API/w/Spreadsheet/CreateForm/${spreadId}/${sheetName}`;

          $.ajax({ url: generatedAPIURL,
              success: function (result) {
                  $('#generatedApi').attr('type', 'text');
                  $('#generatedwApi').attr('type', 'text');

                  $("#add-sheet-form-button").hide();
                  $("#generated_form").show();
                  $('#code').text(result)
                  $('#cform').after(result)
                  if (location.hostname === "localhost") {
                      $("#generatedApi").val(
                          `${location.protocol}//${location.hostname}:${location.port}${generatedAPIURL}`
                      );
                      $("#generatedwApi").val(
                          `${location.protocol}//${location.hostname}:${location.port}${generatedWAPIURL}`
                      );
                  } else {
                      $("#generatedApi").val(`${location.hostname}${generatedAPIURL}`);
                      $("#generatedwApi").val(
                          `${location.protocol}//${location.hostname}:${location.port}${generatedWAPIURL}`
                      );
                  }
                  if (response.redirect) {
                      window.location = response.redirect;
                  }


              },

              error: function (xhr) {
                  console.error(xhr);
              },
          });
       }
  });
   
   $("#form_btn").click(function () {
   });
});
