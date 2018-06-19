function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Lesson Planning Tool')
  .addItem('Create Data Template', 'createDataTemplate')
  .addItem('Add Data to Template', 'addData')
  .addToUi();
}

function createDataTemplate(){
 
  var ss = SpreadsheetApp.getActive();
  var template = SpreadsheetApp.openById('1I8A1Gne1_md0Wiz144ZbEh6WhlTubeK691JJoEkUxLk').getSheets()[0];
  var name = template.getName();
  ss.setActiveSheet(template.copyTo(ss));
  ss.renameActiveSheet(name);
  
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

/*
switch(iterator){
case 0:
set date value
case 1:
set name value
etc.

}

*/