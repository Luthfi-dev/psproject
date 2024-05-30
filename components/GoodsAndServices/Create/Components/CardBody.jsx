import { useState, useEffect } from "react";
import Script from "next/script";
import nprogress from "nprogress";
import { post, get, put, deleting } from "../../../../utility/Service"
import cookie from "js-cookie"
import ProgramAssistance from "./ProgramAssistance";
import SupportingDoument from "./SupportingDocument";
import Calender from "../../../../helper/Calender";
import Currency from "../../../../helper/Currency";
import { Path } from "react-hook-form";

const CardBody = ({appsData}) =>{
  const calender = new Calender();
  const session = appsData.session;
  const currency = new Currency();
  const [description, setDescription] = useState();
  const [curAlertPosition, setCurAlertPosition] = useState();
  const [recordsProjects,setRecordsProjects] = useState([]);
  const [dataSourceFund,setDataSourceFund]=useState([]);
  const [masterTeams,setMasterTeams]=useState([]);
  const [masterLocation,setMasterLocation]=useState([]);
  const [masterDeliverable,setMasterDeliverable]=useState([]);
  const [masterItemsPO, setMasterItemsPO] = useState([]);
  const [itemsRequest, setItemsRequest] = useState([])
  const [additionalComment, setAdditionalComment] = useState();
  const [projectId, setProjectId] = useState(session.projectId);
  const [idLocation, setIdLocation] = useState();
  const [chargeCode, setChargeCode] = useState();
  const [teams,setTeams] = useState();
  const [addItemsState,setAddItemsState] = useState(false);
  const [idDeliverable, setIdDeliverable] = useState();
  const [idKeyFocus, setIdKeyFocus] = useState();
  const [deliverable, setDeliverable] = useState();
  const [tempDeliverable, setTempDeliverable] = useState();
  const [PRNumber, setPRNumber] = useState('')
  const [backgroundProposal, setBackgroundProposal] = useState();
  const [what, setWhat] = useState();
  const [why, setWhy] = useState();
  const [who, setWho] = useState();
  const [where, setWhere] = useState();
  const [startDate, setStartDate] = useState();
  const [untilDate, setUntilDate] = useState();
  const [updatePRState, setUpdatePRState] = useState();
  const [prepareDate, setPrepareDate] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [submittingState, setSubmittingState] = useState(false);
  const [spesification, setSpesification] = useState('')
  const [groupItem, setGroupItem] = useState('TRAVEL');
  var stepper, background, justification, onsubmit;
  appsData.PRNumber = PRNumber;

  useEffect(()=>{
    if(appsData.detail && appsData.detail.status === true){
      const data = appsData.detail.data;
      setDescription(data.description)
      setProjectId(data.project.project_id)
      setChargeCode(data.funding.fund_id)
      setDeliverable(data.deliverable.deliverable)
      setIdDeliverable(data.deliverable.id)
      setPRNumber(data.pr_number)
      setBackgroundProposal(data.background)
      setIdKeyFocus(data.key_focus.id)
      setIdLocation(data?.location?.id)
      setWhat(data.what)
      setWho(data.who)
      setWhy(data.why)
      setWhere(data.where)
      setStartDate(calender.dateFormat(data.date_start, 'dd-mm-yyyy'))
      setUntilDate(calender.dateFormat(data.date_end, 'dd-mm-yyyy'))
      setAdditionalComment(data.additional_comment)
      setItemsRequest(data.pr_items)
      if(data.pr_date_prepared != '0000-00-00'){
        setPrepareDate(calender.dateFormat(data.pr_date_prepared, 'dd-mm-yyyy'))
      }
      if(data.pr_request_delivery_date != '0000-00-00'){
        setDeliveryDate(calender.dateFormat(data.pr_request_delivery_date, 'dd-mm-yyyy'))
      }
    }
    if(! appsData.detail){
      setDescription('')
      setProjectId(session.projectId)
      setChargeCode(session.projectId === 8 ? 8 : '')
      setDeliverable('')
      setIdDeliverable('')
      setIdLocation('')
    }
    getDataMasterProject();
    getDataSourceFund(projectId)
    getMasterTeams()
    getMasterLocation(projectId)
    getMasterItemsPO();
    initializeStepper();
    initializeEditor();
    initializeDatePicker();
  },[])

  const updateComponentPR = () =>{
    const [prepareDate, prepareMonth, prepareYear] = $("#elPrepareDate").val().split('-');
    const [deliveryDate, deliveryMonth, deliveryYear] = $("#elDeliveryDate").val().split('-');
    const prepareDateFormatted  = prepareYear+'-'+prepareMonth+'-'+prepareDate;
    const deliveryDateFormatted = deliveryYear+'-'+deliveryMonth+'-'+deliveryDate;
    setPrepareDate(prepareDate+'-'+prepareMonth+'-'+prepareYear)
    setDeliveryDate(deliveryDate+'-'+deliveryMonth+'-'+deliveryYear)
    setCurAlertPosition('updatepr')
    setUpdatePRState('loading')
    put({
      url:'purchaserequest/update',
      token:cookie.get('fast_token'),
      params:{
        number: appsData.PRNumber,
        additional_comment:additionalComment,
        prepared_date: prepareDateFormatted,
        request_delivery_date: deliveryDateFormatted
      }
    }).then((res)=>{
      if(res?.data?.status === false){
        setUpdatePRState('error')
        return;
      }
      setCurAlertPosition('')
    }).catch((error)=>{
      setUpdatePRState('error')
    })
  }
  const getDataMasterProject = () =>{
    const filter = [];
    nprogress.start();
    const endpointUrl = process.env.HOST_API+'projects/data';
    post({
      url:endpointUrl,
      params:{
        page:1,
        limit:50,
        filter:filter
      },
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(res.data){
        if(res.data.code === 200){
          if(res.data.data === null || ! res.data.data.records.length > 0){
            toastr.error("Project kosong !","Failed");
            return
          }
          setRecordsProjects(res.data.data.records)
        }
      }
    })
  }
  const getDataSourceFund = (idProject)=>{
    nprogress.start();
    const endpointUrl = process.env.HOST_API+'sourcefund/'+idProject;
    get({
      url:endpointUrl,
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(res.data){
        if(res.data.code === 200){
          if(res.data.data === null || ! res.data.data.length > 0){
            setDataSourceFund([])
            toastr.error("Source Fund kosong !","Failed");
            return
          }
          setDataSourceFund(res.data.data)
        }
      }
    })
  }
  const getMasterTeams = ()=>{
    nprogress.start();
    const endpointUrl = process.env.HOST_API+'teams';
    get({
      url:endpointUrl,
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(res.data){
        if(res.data.code === 200){
          if(res.data.data === null || ! res.data.data.length > 0){
            setMasterTeams([])
            toastr.error("Data units & teams kosong !","Failed");
            return
          }
          var referTeamBySessionUnit = res.data.data[res.data.data.findIndex(x => x.id_unit === parseInt(session.unitsId))].id;
          setTeams(referTeamBySessionUnit);
          setMasterTeams(res.data.data)
          getMasterDeliverable(referTeamBySessionUnit)
        }
      }
    })
  }
  const getMasterLocation = (idProject)=>{
    nprogress.start();
    const endpointUrl = process.env.HOST_API+'projects/location/'+idProject;
    get({
      url:endpointUrl,
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(res.data){
        if(res.data.code === 200){
          if(res.data.data != null || res.data.data.length > 0){
            setMasterLocation(res.data.data)
          }else{
            setMasterLocation([])
          }
        }
      }
    })
  }
  const getMasterDeliverable = (idTeams)=>{
    nprogress.start();
    const endpointUrl = process.env.HOST_API+'deliverable/'+idTeams;
    get({
      url:endpointUrl,
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(res.data){
        if(res.data.code === 200){
          if(res.data.data === null || ! res.data.data.length > 0){
            setMasterDeliverable([])
            toastr.error("No deliverable found !","Failed");
            return;
          }
          setMasterDeliverable(res.data.data)
        }
      }
    })
  }
  const getMasterItemsPO = ()=>{
    nprogress.start();
    const endpointUrl = process.env.HOST_API+'purchaserequest/masteritems';
    get({
      url:endpointUrl,
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(res.status === 200 && res.data.code === 200){
        if(res.data.data.records === null || ! res.data.data.records.length > 0){
          setMasterItemsPO([])
          return;
        }
        setMasterItemsPO(res.data.data.records)
      }
    })
  }
  const changeProject = (idProject)=>{
    setProjectId(idProject)
    getDataSourceFund(idProject);
    getMasterLocation(idProject)
  }
  const changeTeams = (idTeams)=>{
    setTeams(idTeams);
    getMasterDeliverable(idTeams)
  }
  const changeSourceFund = (charge_code)=>{
    setChargeCode(charge_code);
  }
  const changeLocation = (idLocation)=>{
    setIdLocation(idLocation);
  }
  const initializeStepper = ()=>{
    const element = document.querySelector("#wizardGoodsandServices");
    const options = {startIndex: 1};
    stepper = new KTStepper(element,options);
    stepper.on("kt.stepper.previous", function (stepper) {
      stepper.goPrevious(); // go previous step
    });
    stepper.on("kt.stepper.changed", function (stepper) {
      const currentStepIndex = stepper.getCurrentStepIndex();
      var t, o, s = [];
      t = document.querySelector("#wizardGoodsandServices")
      o = t.querySelector('[data-kt-stepper-action="submit"]')
      s = t.querySelector('[data-kt-stepper-action="next"]')
      currentStepIndex === 3 ? (o.classList.remove("d-none"), o.classList.add("d-inline-block"), s.classList.add("d-none")) : (o.classList.add("d-none"), s.classList.remove("d-none"))
    });
    stepper.on("kt.stepper.next", function (stepper) {
      stepper.goNext(); // go next step
      const currentStepIndex = stepper.getCurrentStepIndex();

      if(currentStepIndex === 2){
        goToStepTwo();
      }

      if(currentStepIndex === 3){
        goToStepThree();
      }
    });
    const btnSubmit = document.querySelector('[data-kt-stepper-action="submit"]');
    btnSubmit.addEventListener('click', function(event) {
      const btnPrevious = document.querySelector('[data-kt-stepper-action="previous"')
      if(submittingState === false){
        const btnSubmitRequest = document.getElementById('btnSubmitRequest');
        btnSubmitRequest.setAttribute('data-kt-indicator', 'on');
        btnSubmitRequest.removeAttribute('disabled')

        btnPrevious.classList.add('d-none');
        setSubmittingState(true);
        post({
          url:'goodsandservices/'+appsData.PRNumber,
          token: cookie.get('fast_token')
        }).then((res)=>{
          btnPrevious.classList.remove('d-none');
          setSubmittingState(false)
          btnSubmitRequest.setAttribute('data-kt-indicator', 'off');
          btnSubmitRequest.removeAttribute('disabled')

          if((res.status === 200 && res.data.status === true)){
            swal.fire({
              title:'SUCCESS',
              text:res.data.message,
              icon:'success'
            }).then((confirm)=>{
              if(confirm.value){
                window.location.href= process.env.BASE_URL+process.env.BASE_PATH+'/goodsandservices'
              }
            })
            return;
          }

          swal.fire({
            title:'FAILED',
            text:res.data.message,
            icon:'error'
          })
          
        }).catch((error)=>{
          btnSubmitRequest.setAttribute('data-kt-indicator', 'off');
          btnSubmitRequest.removeAttribute('disabled')
          btnPrevious.classList.remove('d-none');
          setSubmittingState(false)

          swal.fire({
            title:'FAILED',
            text:error,
            icon:'error'
          })

        })
      }
    })
  }
  const initializeDatePicker = () =>{
    $(".datepicker").flatpickr({dateFormat: "d-m-Y"});
    $("#elPrepareDate,#elDeliveryDate").flatpickr({dateFormat: "d-m-Y",
      onChange: function(selectedDates, dateStr, instance) {
        updateComponentPR();
      }
    })
  }
  const goToStepTwo =  () => {
    const description = $("#description").val();
    const project = $("#project").val();
    const sourceFund = $("#source_fund").val();
    const teams = $("#teams").val();
    const idDeliverable = $("#id_deliverable").val();
    const idKeyFocus = $("#id_key_focus").val();
    const idLocation = $("#location").val();
    const PRNumber = $("#pr_number").val();

    if(! description){
      stepper.goFirst();
      const el = $("#description");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      el.focus();
      setCurAlertPosition('description')
      return;
    }

    if(! project || project==='Select'){
      stepper.goFirst();
      const el = $("#project");
      $('html, body').animate({
        scrollTop: el.offset().top-135
      }, 500);
      el.focus();
      setCurAlertPosition('project')
      return;
    }

    if(! sourceFund || sourceFund==='Select'){
      stepper.goFirst();
      const el = $("#source_fund");
      $('html, body').animate({
        scrollTop: el.offset().top-135
      }, 500);
      el.focus();
      setCurAlertPosition('source_fund')
      return;
    }

    if(! teams || teams==='Select'){
      stepper.goFirst();
      const el = $("#teams");
      $('html, body').animate({
        scrollTop: el.offset().top-135
      }, 500);
      el.focus();
      setCurAlertPosition('teams')
      return;
    }

    if(! idDeliverable){
      stepper.goFirst();
      const el = $("#section_deliverable");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      toastr.error("Please select deliverable !","Deliverable")
      return;
    }
    stepper.goFirst();
    if(PRNumber){
      stepper.goNext();
      return;
    }

    nprogress.start();
    const endpointURL = process.env.HOST_API + 'goodsandservices/init';
    post({
      url:endpointURL,
      params:{
        "description": description,
        "id_project": project,
        "id_charge_code": sourceFund,
        "id_teams": teams,
        "id_key_focus": idKeyFocus,
        "id_deliverable": idDeliverable,
        "id_location": idLocation,
      },
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(res.status === 200 && res.data && res.data.status === false){
        toastr.error(res.data.message,"Failed")
        return;
      }
      setPRNumber(res.data.data.pr_number);
      stepper.goNext();
    }).catch((err)=>{
      toastr.error("Gagal Menginisiasi Permintaan.","Error")
    })
  }
  const goToStepThree = () => {
    const description = $("#description").val();
    const project = $("#project").val();
    const sourceFund = $("#source_fund").val();
    const teams = $("#teams").val();
    const idDeliverable = $("#id_deliverable").val();
    const idKeyFocus = $("#id_key_focus").val();
    const idLocation = $("#location").val();
    const PRNumber = $("#pr_number").val();
    const what = $("#input_what").val();
    const why = $("#input_why").val();
    const where = $("#input_where").val();
    const who = $("#input_who").val();
    const [fromDate, fromMonth, fromYear] = $("#fromDate").val().split('-');
    const [untilDate, untilMonth, untilYear] = $("#untilDate").val().split('-');
    const fromDateFormatted  = fromYear+'-'+fromMonth+'-'+fromDate;
    const untilDateFormatted = untilYear+'-'+untilMonth+'-'+untilDate;

    setStartDate(fromDate+'-'+fromMonth+'-'+fromYear)
    setUntilDate(untilDate+'-'+untilMonth+'-'+untilYear)

    if(background.getLength() < 500){
      stepper.goTo(2);
      const el = $("#editor_background");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      background.focus();
      toastr.error("Please Fill This Section",'Background !')
      return;
    }

    if(! what){
      stepper.goTo(2);
      const el = $("#input_what");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      el.focus();
      setCurAlertPosition('what')
      return;
    }

    if(! why){
      stepper.goTo(2);
      const el = $("#input_why");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      el.focus();
      setCurAlertPosition('why')
      return;
    }

    if(! where){
      stepper.goTo(2);
      const el = $("#input_where");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      el.focus();
      setCurAlertPosition('where')
      return;
    }

    if(! who){
      stepper.goTo(2);
      const el = $("#input_who");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      el.focus();
      setCurAlertPosition('who')
      return;
    }

    if(! $("#fromDate").val()){
      stepper.goTo(2);
      const el = $("#fromDate");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      el.focus();
      setCurAlertPosition('fromDate')
      return;
    }

    if(! $("#untilDate").val()){
      stepper.goTo(2);
      const el = $("#untilDate");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      el.focus();
      setCurAlertPosition('untilDate')
      return;
    }

    const whenStartUnixFormat = new Date(fromDateFormatted)
    const nowDateUnixFormat = new Date()
    const availableDateUnixFormat = new Date(nowDateUnixFormat)
    availableDateUnixFormat.setDate(availableDateUnixFormat.getDate() + 4)
    if (whenStartUnixFormat < availableDateUnixFormat) {
      stepper.goTo(2);
      const el = $("#fromDate");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      el.focus();
      setCurAlertPosition('fromDate')
      toastr.error("Minimal 5 Day From Now !",'Warning !')
      return;
    }

    const whenEndUnixFormat = new Date(untilDateFormatted)
    if (whenEndUnixFormat < whenStartUnixFormat) {
      stepper.goTo(2);
      const el = $("#untilDate");
      $('html, body').animate({
        scrollTop: el.offset().top-120
      }, 500);
      el.focus();
      setCurAlertPosition('untilDate')
      toastr.error("Minimal Equal With Start Date",'Warning !')
      return;
    }

    nprogress.start();
    const endpointURL = process.env.HOST_API + 'goodsandservices/'+PRNumber;
    put({
      url:endpointURL,
      params:{
        "description": description,
        "id_project": project,
        "id_charge_code": sourceFund,
        "id_teams": teams,
        "id_key_focus": idKeyFocus,
        "id_deliverable": idDeliverable,
        "id_location": idLocation,
        "background": background.root.innerHTML,
        "what": what,
        "where": where,
        "why": why,
        "who": who,
        "justification": justification.root.innerHTML,
        "when_start": fromDateFormatted,
        "when_end": untilDateFormatted
      },
      token:cookie.get("fast_token")
    }).then((res)=>{
      nprogress.done();
      if(res.status === 200 && res.data && res.data.status === false){
        toastr.error(res.data.message,"Failed")
        return;
      }
      stepper.goTo(3);
    }).catch((err)=>{
      toastr.error(err,"Error")
    })
    
  }
  const initializeEditor = ()=>{
    const backgroundProposal = appsData.detail ? appsData.detail.data.background : '';
    const justificationTOR = appsData.detail ? appsData.detail.data.justification : '';
    background = new Quill('#editor_background', {
      modules: {
        toolbar: [
            [{
                header: [1, 2, false]
            }],
            ['bold', 'italic', 'underline']
        ]
      },
      placeholder: 'Typing background of proposal here...',
      theme: 'snow' // or 'bubble'
    });
    justification = new Quill('#editor_justification', {
      modules: {
        toolbar: [
          [{
            header: [1, 2, false]
          }],
          ['bold', 'italic', 'underline']
        ]
      },
      placeholder: 'Typing how and or justification proposal here...',
      theme: 'snow' // or 'bubble'
    });

    background.pasteHTML(backgroundProposal)
    justification.pasteHTML(justificationTOR)
  }
  const selectDeliverable = (e, index)=>{
    const newMasterDeliverable = masterDeliverable;
    if(tempDeliverable){
      newMasterDeliverable.push(tempDeliverable);
    }
    const reorderMasterDataDeliverable = newMasterDeliverable;
    setTempDeliverable(e);
    delete reorderMasterDataDeliverable[index];
    reorderMasterDataDeliverable.sort((a,b) => (a.deliverable > b.deliverable) ? 1 : ((b.deliverable > a.deliverable) ? -1 : 0))
    setMasterDeliverable(reorderMasterDataDeliverable);
    setDeliverable(e.deliverable)
    setIdKeyFocus(e.key_focus.id_key)
    setIdDeliverable(e.id)
  }
  const enbaleInputItemsRequest = ()=>{
    setAddItemsState(true);
  }
  const saveOtherItemPO = (e)=>{
    const groupItemName = groupItem.toString();
    const element = document.getElementById('add_other_item_submit');
    element.setAttribute('data-kt-indicator', 'on');
    element.setAttribute('disabled',true)
    nprogress.start();
    post({
      url:'purchaserequest/masteritems',
      token: cookie.get('fast_token'),
      params:{
        item: document.getElementsByName('item_name')[0].value,
        group_item: groupItemName
      }
    }).then((res)=>{
      nprogress.done();
      element.setAttribute('data-kt-indicator', 'off');
      element.removeAttribute('disabled')

      if(! res.status === 200){
        swal.fire({
          title:'FAILED',
          text:'Server error, please try again',
          icon:'error'
        })
        return;
      }

      if(! res.data.status === true){
        swal.fire({
          title:'FAILED',
          text:res.data.message,
          icon:'error'
        })
        return;
      }

      const  data = res.data.data.inserted;
      var newOption = new Option(data.item, data.id, false, true);
      $('#listItemsPO').append(newOption).trigger('change');
      $("#modalAddItemsPO").modal('hide')

    }).catch((error)=>{
      nprogress.done();
      element.setAttribute('data-kt-indicator', 'off');
      element.removeAttribute('disabled')
      swal.fire({
        text:error,
        icon:'error'
      })
    })
  }
  const addItemRequest = ()=>{
    nprogress.start();
    const qty = document.getElementsByName('qty')[0].value
    const price = document.getElementsByName('unitPrice')[0].value
    const unit = document.getElementsByName('unitName')[0].value
    const spesification = document.getElementsByName('spesification')[0].value
    const cleanPrice = price ? price.replaceAll(".",""):0;
    const itemID = $("#listItemsPO").select2('val')
    post({
      url:'purchaserequest/items',
      token: cookie.get('fast_token'),
      params:{
        number:appsData.PRNumber,
        id_item: itemID,
        qty:qty,
        unit_price:cleanPrice,
        unit:unit,
        spesification:spesification
      }
    }).then((res)=>{
      nprogress.done();

      if(! res.status === 200){
        swal.fire({
          title:'FAILED',
          text:'Server error, please try again',
          icon:'error'
        })
        return;
      }

      if(! res.data.status === true){
        swal.fire({
          title:'FAILED',
          text:res.data.message,
          icon:'error'
        })
        return;
      }
      const response = res.data.data.inserted;
      var stringItemName = $("#listItemsPO option:selected").text();
      var newItems = [...itemsRequest,{
        total_price: response.total_price,
        id_detail: response.id,
        purchase_code: response.df_code,
        specification: response.spec,
        po: "Yes",
        unit: response.unit,
        qty: response.qty,
        unit_price: response.total_price,
        detail_items: {
            id_items: response.item_id,
            item: stringItemName
        }
      }]
      setItemsRequest(newItems)
      clearFormAddListItems();
    }).catch((error)=>{
      nprogress.done();
      swal.fire({
        text:error,
        icon:'error'
      })
    })
  }
  const clearFormAddListItems = () =>{
    $("textarea[name='spesification']").val('');
    $("input[name='unitPrice']").val('')
    $("input[name='totalPrice']").val('')
    $("input[name='qty']").val('')
  }
  const deleteItemsRequest = (e,idDetailItem, index) =>{
    e.preventDefault();
    const endpointUrl = process.env.HOST_API+'purchaserequest/items';
    nprogress.start();
    deleting({
      url:endpointUrl,
      params:{
        id:idDetailItem,
      },
      token:cookie.get("fast_token")
    }).then(async(res)=>{
      nprogress.done();
      if(! res.status === 200){
        swal.fire({
          title:'FAILED',
          text:'Server error, please try again',
          icon:'error'
        })
        return;
      }

      if(! res.data.status === true){
        swal.fire({
          title:'FAILED',
          text:res.data.message,
          icon:'error'
        })
        return;
      }
      var newItems = [...itemsRequest];
      newItems.splice(index, 1);
      setItemsRequest(newItems)
    }).catch((error)=>{
      nprogress.done();
      swal.fire({
        text:error,
        icon:'error'
      })
    })
  }
  const changeGroupItem = (val)=>{
    setGroupItem(val)
  }
  const countTotal = () =>{
    const qty = document.getElementsByName('qty')[0].value
    const price = document.getElementsByName('unitPrice')[0].value
    const cleanPrice = price ? price.replaceAll(".",""):0;
    const cleanQty = qty ? qty.replaceAll(".",''):0;
    const totalPrice = parseInt(cleanQty)*parseInt(cleanPrice);
    document.getElementsByName('totalPrice')[0].setAttribute('value',currency.rupiah(totalPrice))
  }

  return (
    <>
      <div className="card-body py-10 ">
        <div className="stepper stepper-pills" id="wizardGoodsandServices">
          <div className="stepper-nav flex-center flex-wrap mb-10">
            <div className="stepper-item mx-2 my-4 current" data-kt-stepper-element="nav" data-kt-stepper-action="step">
              <div className="stepper-icon w-70px h-40px">
                <i className="stepper-check fas fa-check"></i>
                <span className="stepper-number">1</span>
              </div>
              <div className="stepper-label">
                <h3 className="stepper-title">
                  INITIALIZE REQUEST
                </h3>
                <div className="stepper-desc">
                  Basic Information
                </div>
              </div>
            </div>
            <div className="stepper-item mx-2 my-4" data-kt-stepper-element="nav" data-kt-stepper-action="step">
              <div className="stepper-line w-40px"></div>
              <div className="stepper-icon w-70px h-40px">
                <i className="stepper-check fas fa-check"></i>
                <span className="stepper-number">2</span>
              </div>
              <div className="stepper-label">
                <h3 className="stepper-title">
                  MINI PROPOSAL
                </h3>
                <div className="stepper-desc">
                  Description of Needs
                </div>
              </div>
            </div>
            <div className="stepper-item mx-2 my-4" data-kt-stepper-element="nav" data-kt-stepper-action="step">
              <div className="stepper-line w-40px"></div>
              <div className="stepper-icon w-70px h-40px">
                <i className="stepper-check fas fa-check"></i>
                <span className="stepper-number">3</span>
              </div>
              <div className="stepper-label">
                <h3 className="stepper-title">
                  REQUEST & SUPPORTING
                </h3>
                <div className="stepper-desc">
                  Items & Supporting Request
                </div>
              </div>
            </div>
          </div>
          <form className="form w-lg px-lg-20 mx-auto" noValidate="novalidate" id="formGoodsandServices">
            <div className="mb-7">
              <div className="flex-column current" data-kt-stepper-element="content">
                <div 
                  className="fw-bolder fs-3 rotate collapsible mb-10" 
                  data-bs-toggle="collapse" 
                  href="#proposal_section" 
                  role="button" aria-expanded="false" 
                  aria-controls="kt_proposal_detail"
                >
                  Fill the proposal form
                  <span className="ms-2 rotate-180">
                    <span className="svg-icon svg-icon-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black" />
                      </svg>
                    </span>
                  </span>
                </div>
                <div id="proposal_section" className="collapse show">
                  {
                    PRNumber&&
                    <div className="fv-row mb-10">
                      <label className="form-label">
                        <span className="required">PR Number</span>
                      </label>
                      <input type="text" id={'pr_number'} className="form-control form-control-solid" disabled={true} value={PRNumber}/>
                    </div>
                  }
                  <div className="fv-row mb-7">
                    <label className="form-label">
                      <span className="required">Goods & Services Request For</span>
                    </label>
                    <textarea 
                      className="form-control form-control-solid" 
                      rows={3} 
                      placeholder={'Write here...!'} 
                      id={'description'} 
                      value={ description }
                      onChange={(e)=>{setDescription(e.target.value)}}
                    ></textarea>
                    {
                      curAlertPosition === 'description'&&
                      <div class="fv-plugins-message-container invalid-feedback fs-11px">
                        * Please completed description
                      </div>
                    }
                  </div>
                  <div className="row mb-7">
                    <div className="col-md-4 fv-row fv-plugins-icon-container">
                      <label className="form-label">
                        <span className="required">Select Project</span>
                      </label>
                      <select 
                        name="projects" 
                        className="form-control form-control-solid" 
                        onChange={(e) => changeProject(e.target.value)}
                        value={projectId}
                        id={'project'}
                      >
                        {
                          recordsProjects.map((row,index)=>{
                            return(
                            <option 
                              value={row.project_id}
                              key={"pl"+index}
                            >
                              {row.project_name}
                            </option>
                            )
                          })
                        }
                      </select>
                      {
                        curAlertPosition === 'project'&&
                        <div class="fv-plugins-message-container invalid-feedback fs-11px">
                          * Please select project
                        </div>
                      }
                    </div>
                    <div className="col-md-4 fv-row fv-plugins-icon-container">
                      <label className="form-label">
                        <span className="required">Source Fund</span>
                      </label>
                      <select 
                        id={'source_fund'} 
                        name="sourcefund" 
                        className="form-control form-control-solid" 
                        value={chargeCode} 
                        onChange={(e)=>{changeSourceFund(e.target.value)}}
                      >
                        <option>Select</option>
                        {
                          dataSourceFund.map((fund,index)=>{
                            return(
                            <option 
                              key={"fund"+index}
                              value={fund.fund_id}
                            >
                              {fund.source_fund+' ['+fund.charge_code+']'}
                            </option>
                            )
                          })
                        }
                      </select>
                      {
                        curAlertPosition === 'source_fund'&&
                        <div class="fv-plugins-message-container invalid-feedback fs-11px">
                          * Please select source fund
                        </div>
                      }
                    </div>
                    <div className="col-md-4 fv-row fv-plugins-icon-container">
                      <label className="form-label">Location of Activity</label>
                      <select 
                        name="location" 
                        id="location"
                        className="form-control form-control-solid"
                        value={ idLocation }
                        onChange={(e)=>{changeLocation(e.target.value)}}
                      >
                        <option value="">Select</option>
                        {
                          masterLocation.map((location,index)=>{
                            return(
                            <option 
                              key={"location"+index}
                              value={location.id}
                            >
                              {location.kabupaten ? location.provinsi+' - '+location.kabupaten:location.provinsi}
                            </option>
                            )
                          })
                        }
                      </select>
                    </div>
                  </div>
                  <div className="fv-row mb-7">
                    <label className="form-label">
                      <span className="required">Group & Teams</span>
                    </label>
                    <select 
                      name="teams" 
                      id="teams"
                      className="form-control form-control-solid" 
                      value={teams}
                      onChange={(e)=>{changeTeams(e.target.value)}}
                    >
                      <option>Select</option>
                      {
                        masterTeams.map((teams,index)=>{
                          return(
                          <option 
                            key={"teams"+index}
                            value={teams.id}
                          >
                            {teams.name}
                          </option>
                          )
                        })
                      }
                    </select>
                    {
                      curAlertPosition === 'teams'&&
                      <div class="fv-plugins-message-container invalid-feedback fs-11px">
                        * Please select group & teams.
                      </div>
                    }
                  </div>
                </div>
                <div 
                  className="fw-bolder fs-3 rotate collapsible mb-5 mt-0" 
                  data-bs-toggle="collapse" 
                  href="#deliverable_section" 
                  role="button" aria-expanded="false" 
                  aria-controls="kt_deliverable_detail"
                  id={"section_deliverable"}
                >
                  Select releted deliverable <span className="required"></span>
                  <span className="ms-2 rotate-180">
                    <span className="svg-icon svg-icon-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="black" />
                      </svg>
                    </span>
                  </span>
                </div>
                <div id="deliverable_section" className="fade show ">
                  <input type="hidden" name="id_deliverable" id={"id_deliverable"} value={idDeliverable} />
                  <input type="hidden" name="id_key_focus" id={"id_key_focus"} value={idKeyFocus} />
                  <div className="row mb-7">
                    <div className="table-responsive " 
                      data-kt-scroll-height={"auto"}
                    >
                      {
                        deliverable &&
                        <>
                          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-1">
                            <tbody>
                              <tr>
                                <td className="w-25px">
                                  <span className="form-check form-check-success form-check-solid">
                                    <input checked={true} className="form-check-input me-0" value={idDeliverable} name="deliverable" type="checkbox" />
                                  </span>
                                </td>
                                <td className="text-success">
                                  {deliverable}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="separator separator-dashed"></div>
                        </>
                      }
                      <div className="hover-scroll-y h-400px">
                        <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                          <tbody>
                          {
                            masterDeliverable.map((items,index)=>{
                              return(
                                <tr key={"deliverable"+index}>
                                  <td className="w-25px">
                                    <span className="form-check form-check-custom form-check-solid">
                                      <input 
                                        className="form-check-input me-0" 
                                        type="radio" 
                                        name="deliverable" 
                                        value={items.id} 
                                        checked={false}
                                        onChange={(e)=>{selectDeliverable(items,index);}}
                                      />
                                    </span>
                                  </td>
                                  <td className="text-gray-700">{items.deliverable}</td>
                                </tr>
                              )
                            })
                          }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-column" data-kt-stepper-element="content">
                <div className="min-h-500px">
                  <div className="col-md-12 fv-row fv-plugins-icon-container ">
                    <div id="editor_background" name="editor_background" className=" mb-10 form-control-solid min-h-200px"></div>
                  </div>
                  <div className="fv-row mb-7">
                    <label className="form-label">
                      <span className="required">What</span>
                    </label>
                    <textarea 
                      className="form-control form-control-solid" 
                      rows={5} 
                      placeholder={'Typing about what...'} 
                      id={'input_what'} 
                      value={ what }
                      onChange={(e)=>{setWhat(e.target.value)}}
                    ></textarea>
                    {
                      curAlertPosition === 'what'&&
                      <div class="fv-plugins-message-container invalid-feedback fs-11px">
                        * Please fill this section
                      </div>
                    }
                  </div>
                  <div className="fv-row mb-7">
                    <label className="form-label">
                      <span className="required">Why</span>
                    </label>
                    <textarea 
                      className="form-control form-control-solid" 
                      rows={5} 
                      placeholder={'Typing about why'}
                      id={'input_why'} 
                      value={ why }
                      onChange={(e)=>{setWhy(e.target.value)}}
                    ></textarea>
                    {
                      curAlertPosition === 'why'&&
                      <div class="fv-plugins-message-container invalid-feedback fs-11px">
                        * Please fill this section
                      </div>
                    }
                  </div>
                  <div className="fv-row mb-7">
                    <label className="form-label">
                      <span className="required">Where</span>
                    </label>
                    <textarea 
                      className="form-control form-control-solid" 
                      rows={5} 
                      placeholder={'Typing about where'}
                      id={'input_where'} 
                      value={ where }
                      onChange={(e)=>{setWhere(e.target.value)}}
                    ></textarea>
                    {
                      curAlertPosition === 'where'&&
                      <div class="fv-plugins-message-container invalid-feedback fs-11px">
                        * Please fill this section
                      </div>
                    }
                  </div>
                  <div className="fv-row mb-7">
                    <label className="form-label">
                      <span className="required">Who</span>
                    </label>
                    <textarea 
                      className="form-control form-control-solid" 
                      rows={5} 
                      placeholder={'Typing about who'}
                      id={'input_who'} 
                      value={ who }
                      onChange={(e)=>{setWho(e.target.value)}}
                    ></textarea>
                    {
                      curAlertPosition === 'who'&&
                      <div class="fv-plugins-message-container invalid-feedback fs-11px">
                        * Please fill this section
                      </div>
                    }
                  </div>
                  <div className="row mb-7">
                    <div className="col-md-6 fv-row fv-plugins-icon-container">
                      <label className="form-label">
                        <span className="required">When From</span>
                      </label>
                      <div className="position-relative d-flex align-items-center">
                        <span className="svg-icon svg-icon-2 position-absolute mx-4">
                          <i className="bi bi-calendar-date fs-4"></i>
                        </span>
                        <input className="form-control form-control-solid form-control-lg ps-12 datepicker" id="fromDate"
                          placeholder="Select Date" 
                          value={startDate}
                        />
                      </div>
                      {
                        curAlertPosition === 'fromDate'&&
                        <div class="fv-plugins-message-container invalid-feedback fs-11px">
                          * Please select a date
                        </div>
                      }
                    </div>
                    <div className="col-md-6 fv-row fv-plugins-icon-container">
                      <label className="form-label">
                        <span className="required">Until To</span>
                      </label>
                      <div className="position-relative d-flex align-items-center">
                        <span className="svg-icon svg-icon-2 position-absolute mx-4">
                          <i className="bi bi-calendar-date fs-4"></i>
                        </span>
                        <input className="form-control form-control-solid form-control-lg ps-12 datepicker" id="untilDate" 
                          placeholder="Select Date" 
                          value={untilDate}
                        />
                      </div>
                      {
                        curAlertPosition === 'untilDate'&&
                        <div class="fv-plugins-message-container invalid-feedback fs-11px">
                          * Please select a date
                        </div>
                      }
                    </div>
                  </div>
                  <div className="col-md-12 fv-row fv-plugins-icon-container ">
                    <div id="editor_justification" name="editor_justification" className=" mb-10 form-control-solid min-h-200px"></div>
                  </div>
                </div>
              </div>
              <div className="flex-column" data-kt-stepper-element="content">
                <div className="card card-flush shadow-sm px-0 py-5 mb-10">
                  <div className="fv-row px-5">
                    {
                      addItemsState === false &&
                      <span className="btn btn-primary me-2 btn-sm mb-5"
                        onClick={(e)=>{enbaleInputItemsRequest(true)}} 
                      >
                        <span className="indicator-label">
                          <i className="lni lni-add-files"></i> Add Items Request
                        </span>
                      </span>
                    }
                  </div>
                  <div className="table-responsive">
                    <table className="table table-row-dashed table-row-light align-middle gs-9 gy-4 ">
                      <thead>
                        <tr className="fw-bold bg-lighten">
                          <th className="fs-7">No.</th>
                          <th className="fs-7" width={'450px'}>Description</th>
                          <th className="text-center fs-7" width={'150px'}>qty</th>
                          <th className="text-center fs-7" width={'180px'}>Units</th>
                          <th className="text-end min-w-150px fs-7">Unit Price(Est)</th>
                          <th className="text-end min-w-150px fs-7">Ext Price (Est)</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        { 
                        addItemsState === true &&
                          <>
                          <tr className="no-border">
                            <td colSpan={2} className={'me-1'}>
                              <select className="form-select form-select-solid" 
                              data-control="select2" id="listItemsPO"
                              data-kt-select2="true"
                              data-placeholder="Select a item"
                              >
                                <option></option>
                                <option>+ Add Other Items</option>
                                {
                                  masterItemsPO.map((items, index)=>{
                                    return(
                                      <option key={'items_po_'+index} value={items.id}> {items.item} </option>
                                    )
                                  })
                                }
                              </select>
                            </td>
                            <td className='align-top'>
                              <input type={'number'} 
                                className='form-control form-control-solid mw-80px' 
                                name="qty"
                                min='1' 
                                defaultValue='1' 
                                placeholder="Qty"
                                onChange={()=>{countTotal()}}
                              />
                            </td>
                            <td className='align-top'>
                              <select name="unitName" id='unitName' className="form-control form-control-solid">
                                <option value="dozen">dozen</option>
                                <option value="pck">pck</option>
                                <option value="pcs">pcs</option>
                                <option value="Person">Person</option>
                                <option value="time">time</option>
                                <option value="unit">unit</option>									
                              </select>
                            </td>
                            <td className='align-top'>
                              <input 
                                type={'text'} 
                                name='unitPrice' 
                                onChange={()=>{countTotal()}}
                                className='form-control form-control-solid currency' 
                                placeholder="Unit Price(Est)"
                              />
                            </td>
                            <td className='align-top me-1' colSpan={2}>
                              <input 
                                type={'text'} 
                                className='form-control form-control-solid' 
                                name="totalPrice"
                                readOnly={true} 
                                placeholder='Ext Price (Est)'
                                onChange={()=>{countTotal()}}
                              />
                            </td>
                          </tr>
                          <tr >
                            <td colSpan={7} className={'pt-0'}>
                              <textarea placeholder="Spesification..." name='spesification' className="form-control form-control-solid mt-0" rows={3} value={spesification} onChange={(e)=>{setSpesification(e.target.value)}}></textarea>
                              <span 
                                className="btn btn-primary mt-3 me-2 btn-sm"
                                onClick={()=>{addItemRequest()}}
                              >
                                <span className="indicator-label">
                                  <i className='bi bi-clipboard-check'></i> Save
                                </span>
                              </span>
                              <span 
                                className="btn btn-danger mt-3 me-2 btn-sm" 
                                onClick={(e)=>{setAddItemsState(false)}}
                              >
                                <span className="indicator-label">
                                  <i className="lni lni-cross-circle"></i> Cancel
                                </span>
                              </span>
                            </td>
                          </tr>
                          </>
                        }
                        {
                          itemsRequest.map((item,index)=>{
                            return(
                              <tr key={'itemsx_'+index}>
                                <td>{index+1}</td>
                                <td>
                                  <small className="text-gray-800 fw-bolder text-hover-primary mb-1 fs-8">
                                    {item.detail_items.item}
                                  </small>
                                  <span className="text-muted fw-bold d-block fs-9 white-space" 
                                    dangerouslySetInnerHTML={{ __html:item.specification }}
                                  >
                                  </span>
                                </td>
                                <td className="text-center fs-7">{parseInt(item.qty)}</td>
                                <td className="text-center fs-7">{item.unit}</td>
                                <td className="fw-bolder text-gray-800 fs-7 text-end">{item.unit_price}</td>
                                <td className="fw-bolder text-gray-800 fs-7 text-end">{item.total_price}</td>
                                <td>
                                  <div className="d-flex justify-content-end flex-shrink-0">
                                    <button className="btn btn-icon btn-active-danger btn-light-danger w-30px h-30px me-3" onClick={(e)=>{deleteItemsRequest(e,item.id_detail,index)}}><i className="las la-trash fs-4"></i></button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                      <tfoot className="bg-lighten">
                        <tr className="bg-grey">
                          <th colSpan={5} className='text-end fw-bolder text-gray-800 fs-7'>Total Amount</th>
                          <th className="text-end fw-bolder text-gray-800 fs-7">Rp 25.000.000</th>
                          <th></th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="col-12 px-3">
                    <textarea 
                      placeholder="Additional comment..." 
                      name='additional_comment' 
                      className="form-control form-control-solid" 
                      rows={3} 
                      value={additionalComment} 
                      onChange={(e)=>{setAdditionalComment(e.target.value)}}
                      onBlur={()=>{updateComponentPR()}}
                    ></textarea>
                    {
                      curAlertPosition === 'updatepr' && updatePRState === 'loading' &&
                      <div class="fv-plugins-message-container text-success fs-8 opacity-80 fst-italic">
                        <i className={'fa fa-spin fa-spinner fs-8 text-success'}/> Update additional comment, date prepared & request delivery date
                      </div>
                    }
                    {
                      curAlertPosition === 'updatepr' && updatePRState === 'error' &&
                      <div class="fv-plugins-message-container text-danger fs-8 opacity-80 fst-italic">
                        Failed update additional comment , date prepared & request delivery date
                      </div>
                    }
                  </div>
                  <div className="col-12 px-3 mt-5">
                    <div className="row">
                      <div className="col-lg-6 fv-row fv-plugins-icon-container">
                        <label className="form-label fw-bold mt-3 fs-6">Date Prepared</label>
                        <div className="position-relative d-flex align-items-center">
                          <span className="svg-icon svg-icon-2 position-absolute mx-4">
                            <i className="bi bi-calendar-date fs-4"></i>
                          </span>
                          <input 
                            className="form-control form-control-solid form-control-lg ps-12 datepicker" id="elPrepareDate" 
                            placeholder="Select a date" 
                            value={prepareDate}
                            onChange={()=>{updateComponentPR()}}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 fv-row fv-plugins-icon-container">
                        <label className="form-label fw-bold mt-3 fs-6">Request Delivery Date</label>
                        <div className="position-relative d-flex align-items-center">
                          <span className="svg-icon svg-icon-2 position-absolute mx-4">
                            <i className="bi bi-calendar-date fs-4"></i>
                          </span>
                          <input 
                            className="form-control form-control-solid form-control-lg ps-12 datepicker" id="elDeliveryDate"
                            value={deliveryDate}
                            placeholder="Select a date" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-7 mt-0">
                  <div className="col-12">
                    <div className="card card-flush shadow-sm px-5 py-5">
                      <ProgramAssistance appsData={appsData}/>
                    </div>
                  </div>
                  <div className="col-12 mt-15">
                    <div className="card card-flush shadow-sm px-5 py-5 ">
                      <SupportingDoument appsData={appsData}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-stack">
              <div className="me-2">
                <button type="button" className="btn btn-lg btn-light btn-active-light-primary" data-kt-stepper-action="previous">
                  <span class="svg-icon svg-icon-4 me-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="6" y="11" width="13" height="2" rx="1" fill="black"></rect>
                      <path d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z" fill="black"></path>
                    </svg>
                  </span>
                  Back
                </button>
              </div>
              <div>
                <button type="button" className="btn btn-lg btn-primary " id='btnSubmitRequest' data-kt-stepper-action="submit">
                  <span className="indicator-label">
                    Submit Request
                    <span class="svg-icon svg-icon-3 ms-2 me-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black"></rect>
                        <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black"></path>
                      </svg>
                    </span>
                  </span>
                  <span className="indicator-progress">
                    Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
                <button type="button" className="btn btn-primary btn-lg" data-kt-stepper-action="next">
                  Continue
                  <span class="svg-icon svg-icon-3 ms-2 me-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect opacity="0.5" x="18" y="13" width="13" height="2" rx="1" transform="rotate(-180 18 13)" fill="black"></rect>
                      <path d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z" fill="black"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="modal fade"  id="modalAddItemsPO">
        <div className="modal-dialog  mw-650px ">
          <div className="modal-content">
            <div className="modal-body px-10 px-lg-15 pt-10 pb-15">
              <div className="mb-13 text-center">
                <h1 className="mb-3">Add Other Items</h1>
                <div className="text-muted fw-bold fs-5">If item not found, add as new items.</div>
              </div>
              <div className="d-flex flex-column mb-8 fv-row">
                <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                  <span className="required">Item Name</span>
                </label>
                <input type="text" className="form-control form-control-solid" placeholder="Enter Item Name..." name="item_name" />
              </div>
              <div className="d-flex flex-column mb-8 fv-row">
                <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                  <span className="required">Group Item</span>
                </label>
                <select 
                  className="form-control form-control-solid" 
                  name="group_item" 
                  value={groupItem} 
                  onChange={(e)=>{changeGroupItem(e.target.value)}}
                >
                  <option value="TRAVEL">TRAVEL</option>
                  <option value="MEETING COSTS">MEETING COSTS</option>
                  <option value="WORKSHOP PARTICIPANT COSTS">WORKSHOP PARTICIPANT COSTS</option>
                  <option value="OTHER WORKSHOP EXPENSES">OTHER WORKSHOP EXPENSES</option>
                </select>
              </div>
              <div className="text-center">
                <button type="reset" data-bs-dismiss="modal" className="btn btn-light me-3">Cancel</button>
                <button 
                  type="submit" 
                  id="add_other_item_submit" 
                  className="btn btn-primary" 
                  onClick={(e)=>{saveOtherItemPO()}}
                >
                  <span className="indicator-label">Save</span>
                  <span className="indicator-progress">Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script 
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        $("#listItemsPO").select2({width: 'resolve'})
        $('#listItemsPO').on('select2:select', function (e) {
          const data = e.params.data;
          if(data.id === '+ Add Other Items'){
            $("#modalAddItemsPO").modal('show')
          }
        });
        `
      }}/>
    </>
  )
}
export default CardBody;