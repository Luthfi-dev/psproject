import { useState, useEffect } from "react"
import Inputtext from "../../01-atoms/Forms/Inputtext";

const InputTagify = ({children, props, onChanged}) =>{
  const uniqeId = props?.id ? props.id : 'my-tagify';
  const whiteList = props?.whiteList ? props.whiteList : [];
  const maxTags = props?.maxTags ? props.maxTags : 10000;
  const maxItems = props?.maxItems ? props.maxItems : 20;
  const inlineSuggestion = props?.inlineSuggestion ? 'tagify__inline__suggestions':''
  const closeOnSelect = props?.closeOnSelect ? props.closeOnSelect : false;
  const defaultValue = props?.selectedTags ? props.selectedTags : '';
  const [tagify, setTagify] = useState()

  useEffect(()=>{
    initializeTagify()
  },[])

  useEffect(()=>{
    if(tagify){
      tagify.settings.whitelist = null;
      tagify.settings.whitelist = whiteList 
    }
  },[whiteList])

  useEffect(()=>{
    if(tagify){
      const tagifyValue = tagify.value;
      defaultValue.forEach((item)=>{
        const existingTag = tagifyValue.find(x => x.value === item.value);
        if(! existingTag){
          tagify.addTags(item.value)
        }
      })
    }
  },[defaultValue])

  const initializeTagify = () =>{
    var input = document.querySelector("#"+uniqeId);
    var initTagify = new Tagify(input, {
      whitelist: whiteList,
      maxTags: maxTags,
      dropdown: {
          maxItems: maxItems,
          classname: inlineSuggestion,
          closeOnSelect: closeOnSelect,
          enabled: 0,
      }
    })
    setTagify(initTagify)
  }

  const onChangeTagify = (value) =>{
    onChanged(value)
  }

  return(
    <Inputtext 
      props={{ 
        id: uniqeId
      }}  
      onChanged={(value)=>{onChangeTagify(value)}}/>
  )
}
export default InputTagify;