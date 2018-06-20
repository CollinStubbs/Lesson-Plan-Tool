function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Lesson Planning Tool')
  .addItem('Create Data Template', 'createDataTemplate')
  .addItem('Add Data to Template', 'addData')
  .addItem('Create Custom Table','createCustomTemplate')
  .addToUi();
}

function createDataTemplate(){
 
  var ss = SpreadsheetApp.getActive();
  var template = SpreadsheetApp.openById('1I8A1Gne1_md0Wiz144ZbEh6WhlTubeK691JJoEkUxLk').getSheets();
  for(var i = 0; i<template.length; i++){
    var name = template[i].getName();
    ss.setActiveSheet(template[i].copyTo(ss));
    ss.renameActiveSheet(name);
  }
  
}

function addData(){
 
  var id = '1Xy9zobHc8o9yAHSIRYHvrY7KjRDo88__wHfbMuCe06I';
  var docFile = DriveApp.getFileById(id);
  
  var folder = DriveApp.createFolder('Lesson Plan Test');
  var template = docFile.makeCopy(folder);
  
  var templated = DocumentApp.openById(template.getId());
  templated.getBody().replaceText("##NAME##", "John Doe");
//  var range = templated.findText("##NAME##").getElement().asText();
  //range.setText("COLLIN");
}

function createCustomTemplate(){
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName("Customize Table");
  var tableRange = findTableRange(sheet.getRange("A1:Z1").getDisplayValues());
  console.log(tableRange);
}

function findTableRange(row){
  for(var i = 0; i< row[0].length; i++){
    if(row[0][i].indexOf("Table Range") > -1){
     return row[0][i+1]; 
    }
  }
}

/*
switch(iterator){
case 0:
set date value
case 1:
set name value
etc.

}

*/
