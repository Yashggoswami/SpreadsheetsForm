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


  async function getSheetFromGoogle(spreadId, sheetTitle) {
    const gsapi = google.sheets({
      version: "v4",
      auth: client,
    });
  
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
    const gsapi = google.sheets({
      version: "v4",
      auth: client,
    });
    await gsapi.spreadsheets.values.batchUpdate({
      appendCells:[{
        title: "Sheet1",
        rows: [
          {
            "values": [
              {
                name:"ys",
                class:"roll",
                roll:25,
                sec:"yas"
              }
            ]
          }
        ],
        // "fields": string
      }]
    }
   )
    // let data = await gsapi.spreadsheets.values.get({
    //   spreadsheetId: spreadId,
    //   range: sheetTitle,
    //   majorDimension: "ROWS",
    //   valueRenderOption: "FORMULA",
    //   dateTimeRenderOption: "FORMATTED_STRING", //'SERIAL_NUMBER',
    //   alt: JSON,
    //   prettyPrint: true,
    // });
  
    // return data;
  }

  
exports.FormCreate=(req,res)=>{
    getSheetFromGoogle(req.params.spreadsheetUrl,req.params.sheetName).then((data)=>{
        res.json(data.data.values[0]);
    })
}

exports.FormCreateAPI=(req,res)=>{
  getSheetFromGoogle(req.params.spreadsheetUrl,req.params.sheetName).then((data)=>{
    var arr = data.data.values[0];
    var AP='<form class="border border-dark rounded"style="padding:10px" >'
    for (i =0; i< arr.length; i++) {
      AP=AP+'<div class="form-group">' + '<p>' + arr[i] + '</p><input type="text" class="border border-primary form-control form-rounded w-100" name="' +
       arr[i] + '" placeholder=" ' + arr[i] + '" id="' + arr[i] + '">' + "</div>"
    }
    AP=AP+'<button  type="submit" class="btn btn-primary "style="margin-top:0px">Submit </button> </form>'
    res.send(AP);
  })
}




exports.demofunc=(req,res)=>{

console.log("aa rha hai");
res.json({yash:"yash"});
}