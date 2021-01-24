const { google } = require("googleapis");
const keys = require("assets/client_secret.json");

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  client.authorize((err, tokens) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("connected!");
    }
  });


  const gsapi = google.sheets({
    version: "v4",
    auth: client,
  });

  async function getSheetFromGoogle(spreadId, sheetTitle) {
  
    let data = await gsapi.spreadsheets.values.get({
      spreadsheetId: spreadId,
      range: sheetTitle,
      majorDimension: "ROWS",
      valueRenderOption: "FORMULA",
      dateTimeRenderOption: "FORMATTED_STRING", //'SERIAL_NUMBER',
      alt: JSON,
      prettyPrint: true,
    });
  
    return data;
  }

  async function updateSheetFromGoogle(spreadId, sheetTitle,data) {
    console.log("request accepted")

    await gsapi.spreadsheets.values.append({
      "spreadsheetId": spreadId,
      "range": "A1:A65356",
      "includeValuesInResponse": false,
      "insertDataOption": "INSERT_ROWS",
      "valueInputOption": "RAW",
      "resource": {
        "majorDimension": "ROWS",
        "range": "A1:A65356",
        "values": [data]
      }
    }).then(function(response) {
          // Handle the results here (response.result has the parsed body).
          // console.log("Response", response);
        },
        function(err) {
      // console.error("Execute error", err);
    });

  
  }


exports.addData=(req,res)=>{
    const temp = req.body;
    var data=[];
    for(const id in temp){data.push(temp[id])}
    updateSheetFromGoogle(req.params.spreadsheetUrl, req.params.sheetName,data).then((data)=>{
      res.send("dada ab kuch kar do yaha par ki return kar de last site pe");
    })
}



exports.FormCreateAPI=(req,res)=>{
  getSheetFromGoogle(req.params.spreadsheetUrl,req.params.sheetName).then((data)=>{
    const arr = data.data.values[0];
    const url = 'http://localhost:5000/API/w/Spreadsheet/WriteForm/' + req.params.spreadsheetUrl + '/' + req.params.sheetName;
    var AP='<form class="border border-info rounded"style="padding:10px" method="post" action='+ url +'>'
    for (i =0; i< arr.length; i++) {
      AP=AP+'<div class="form-group">' + '<p>' + arr[i] + '</p><input type="text" class="border border-primary form-control form-rounded w-100" name="' +
       i + '" placeholder=" ' + arr[i] + '" id="' + arr[i] + '">' + "</div>"
    }
    AP=AP+'<br><button  type="submit" class="btn btn-primary "style="margin-top:0px">Submit </button> </form> '
    res.send(AP);
  })
}




exports.demofunc=(req,res)=>{

console.log("aa rha hai");
res.json({yash:"yash"});
}