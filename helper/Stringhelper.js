function StringHelper(){
  this.initialProfile = (word,lengthInitial=1)=>{
    if(lengthInitial===1){
      var initialWord = word.substring(0,1);
      return initialWord;
    }else{
      var word = word ? word:'';
      var splitWord = word.split(" ");
      var initialWord = '';
      if(splitWord.length > 1){
        initialWord = splitWord[0].substring(0,1);
        initialWord += splitWord[1].substring(0,1);
        return initialWord;
      }else{
        initialWord = word.substring(0,2);
      }
      return initialWord;
    }
  }
  this.getExtentionIcon = (mimeType) => {
    if(['image/jpeg', 'image/png'].includes(mimeType)){
      return 'jpg.png'
    }else{
      return 'pdf.png'
    }
  }
}
module.exports = StringHelper;