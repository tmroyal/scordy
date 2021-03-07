export default class PersistenceEngine {
  constructor(Blockly, workspace){
    this.blocklyWorkspace = workspace;
    this.defaultScore ='<xml><block type="scor_tempo" deletable="false" movable="false"></block></xml>'; 
    this.workspace = workspace;
    this.Blockly = Blockly;
    this.hasChanged = false;

    // load previously stored sketch, or set to default
    var xml_text = window.localStorage.getItem('currentScript');

    if (!xml_text){
      xml_text = this.defaultScore;
    }

    this.setWorkspace(xml_text);
  }

  /**
   * sets workspace using xml text
   * shows error if parse fails
   *   
   * @param xml_text 
   */
  setWorkspace(xml_text){
    let xml;
    try {
      xml = this.Blockly.Xml.textToDom(xml_text);
      this.workspace.clear();
      this.Blockly.Xml.domToWorkspace(xml, this.workspace);
      this.persistLocalstore();
    } catch {
      alert('Invalid sketch detected');
    }
  }

  /** sets status of sketch to unchanged */
  setUnchanged(){
    this.hasChanged = false;
  }

  /**
   * sets status of sketch to changed and persists to localStorage
   */
  setChanged(){
    this.hasChanged = true;
    this.persistLocalstore();
  }

  /**
   * Persist to localstorage
   */
  persistLocalstore(){
    var xml = this.Blockly.Xml.workspaceToDom(this.workspace);
    var xml_text = this.Blockly.Xml.domToText(xml);
    window.localStorage.setItem('currentScript', xml_text);
  }
  
  /**
   * Attaches events to buttons to allow saving
   * 
   * @param {string} newFileId - id of element to create new file
   * @param {string} openFileId  - id of element to open file
   * @param {string} saveFileId  - id of element to save file
   * @param {string} fileInput  - id of file input element
   */
  attach(newFileId, openFileId, saveFileId, fileInput){
    document.getElementById(newFileId).addEventListener('click',()=>{
      this.requestNew();
    });

    document.getElementById(openFileId).addEventListener('click',()=>{
      this.requestOpen();
    });

    document.getElementById(saveFileId).addEventListener('click',()=>{
      this.requestSave();
    });

    this.fileInput = document.getElementById(fileInput);

    this.fileInput.addEventListener('change',(event)=>{
      this.loadFile(event);
    });
  }

  /**
   * Confirm open or save if file has changed
   */
  confirm(){
    // return if this hasn't changed or if user confirms
    return !this.hasChanged || confirm("Are you sure? Changes will be lost.");
  }

  /**
   * event for file input change  
   * @param event 
   */

  loadFile(event){
    if (event.target.files[0] == null){
      return;
    } 

    const reader = new FileReader();
    reader.onload = ()=>{
      this.setWorkspace(reader.result);
    }
    reader.readAsText(event.target.files[0]);

    // no matter what, clear file input
    event.target.value = null;
  }

  /**
   * after confirmation, create new file
   */
  requestNew(){
    if (this.confirm()){
      this.setWorkspace(this.defaultScore);
      this.setUnchanged();
    }
  }

  /**
   * after confirmation, open new file
   */
  requestOpen(){
    if (this.confirm()){
      document.getElementById("fileInput").click(); // if user accpets, load file is triggered
    }
  }

  /**
   * Save file if dialog is accepted. Utilized download capabilities.
   */
  requestSave(){
    var xml = this.Blockly.Xml.workspaceToDom(this.workspace);
    var xml_text = this.Blockly.Xml.domToText(xml);
    const file = new Blob([xml_text], {type: 'text/plain'});

    const a = document.createElement('a');

    a.href = URL.createObjectURL(file);
    a.download = "Untitled.xml";
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
  }
}