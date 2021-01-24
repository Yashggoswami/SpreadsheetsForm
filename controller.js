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

    await gsapi.spreadsheets.batchUpdate({
      "spreadsheetId": "1EXv02bhTmTAqWRfPKz1Qbz4kf2BqFyPgrkJ4WijI7eg",
      "resource": {
        "requests": [
          {
            "appendCells": {
              "fields":"*",
              "sheetId": 0,
              "rows": [
                {
                  "values": [
                    {
                      "userEnteredValue": {
                        "stringValue": "abcd"
                      }
                    },
                    {
                      "userEnteredValue": {
                        "stringValue": "qwerty"
                      }
                    },
                    {
                      "userEnteredValue": {
                      }
                    }
                  ]
                }
              ],

            },

          }

        ]
      }

    })

  
  }
exports.addData=(req,res)=>{
  updateSheetFromGoogle("", "","").then((data)=>{
    res.send(data)
  })
}

exports.FormCreate=(req,res)=>{
    getSheetFromGoogle(req.params.spreadsheetUrl,req.params.sheetName).then((data)=>{
      console.log(data);
      res.json(data.data.values[0]);
    })
}

exports.FormCreateAPI=(req,res)=>{
  getSheetFromGoogle(req.params.spreadsheetUrl,req.params.sheetName).then((data)=>{
    var arr = data.data.values[0];
    var AP='<form class="border border-info rounded"style="padding:10px" >'
    for (i =0; i< arr.length; i++) {
      AP=AP+'<div class="form-group">' + '<p>' + arr[i] + '</p><input type="text" class="border border-primary form-control form-rounded w-100" name="' +
       arr[i] + '" placeholder=" ' + arr[i] + '" id="' + arr[i] + '">' + "</div>"
    }
    AP=AP+'<br><button  type="submit" class="btn btn-primary "style="margin-top:0px">Submit </button> </form> '
    res.send(AP);
  })
}




exports.demofunc=(req,res)=>{

console.log("aa rha hai");
res.json({yash:"yash"});
}