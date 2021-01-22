

exports.mainfunction=(req,res)=>{
    console.log("helllo")
}

exports.FormCreate=(req,res)=>{
    var patt = new RegExp("d/(.*)/");
    var ress = patt.exec(req.body.spreadsheetUrl);
    var spreadId = ress ? ress[1] : req.body.spreadsheetUrl;
    res.send({"request":spreadId})
}