import { useEffect, useState } from "react";
import nprogress from "nprogress";
import { post, get, put, deleting } from "../../../../utility/Service"
import cookie from "js-cookie"
import Calender from "../../../../helper/Calender";
import Currency from "../../../../helper/Currency"
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const ItemsRequested = ({appsData,callBack,updateBudgetInformation}) =>{
  const detail = appsData?.detail;
  const calender = new Calender();
  const currency = new Currency();
  const [Remarks, setRemark] = useState(detail?.kegiatan.remarks_activity);
  const [disableBtnUpdateAdditionalComment,setDisableBtnUpdateAdditionalComment]=useState(true);
  const [stateUpdate, setStateUpdate]=useState(false);
  const [listItems,setListItems]=useState([]);
  const [stateSaveItems, setStateSaveItems]=useState(false);
  const [itemsRequest, setItemsRequest]=useState(detail?.pr_items)
  const [onUpdateAdditionalComment, setOnUpdateAdditionalComment]=useState(false)
  const [statePR, setStatePR] = useState(detail?.pr_state);
  const [totalPrice, setTotalPrice]=useState(detail?.total_pr_price)


  const startUpdateItems = async () =>{
    if(listItems.length === 0){
      nprogress.start();
      const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/masteritems';
      await get({
        url:endpointUrl,
        token:cookie.get("fast_token")
      }).then((res)=>{
        nprogress.done();
        if(res.data && res.data.code === 200 ){
          if(res.data.data != null){
            setListItems(res.data.data.records)
            $("#listItemsPO").select2({
              width: 'resolve'
            })
            $(".datepicker").flatpickr({
              dateFormat: "d-m-Y",
              onChange: function(selectedDates, dateStr, instance) {
                setDisableBtnUpdateAdditionalComment(false)
              },
            });
          }
        }else{
          toastr.error(res.message,"Failed")
        }
      })
    }
  }

  const clearFormAddListItems = () =>{
    $("textarea[name='spesification']").val('');
    $("input[name='unitPrice']").val('')
    $("input[name='totalPrice']").val('')
    $("input[name='qty']").val('')
  }

  const addItems = async (e)=>{
    const idItems = $("#listItemsPO").val();
    const qty = $("input[name='qty']").val();
    const unitName = $("select[name='unitName']").val();
    const unitPrice  = $("input[name='unitPrice']").val().replaceAll(".",'');
    const spesification = $("textarea[name='spesification']").val();
    setStateSaveItems(true)
    nprogress.start();
    const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/items';
    await post({
      url:endpointUrl,
      params:{
        number:detail?.request_number,
        id_item:idItems,
        qty:qty,
        unit:unitName,
        unit_price:unitPrice,
        spesification:spesification
      },
      token:cookie.get("fast_token")
    }).then((res)=>{
      setStateSaveItems(false)
      nprogress.done();
      if(res.data && res.data.code === 200 ){
        var stringItemName = $("#listItemsPO option:selected").text();
        var newItems = [...itemsRequest,{
          id_items: res.data.data.inserted.item_id,
          item: stringItemName,
          detail_items: {
              unit_price: "Rp "+currency.rupiah(unitPrice),
              total_price: "Rp "+currency.rupiah(parseInt(qty)*parseInt(unitPrice)),
              id_detail: res.data.data.inserted.id,
              specification: spesification,
              po: "Yes",
              unit: unitName,
              qty: parseInt(qty)
          }
        }]
        setItemsRequest(newItems)
        var currentTotalPrice = parseInt(totalPrice.replaceAll(".",''));
        var totalUpPrice = parseInt(qty)*parseInt(unitPrice);
        var newTotal = currency.rupiah(currentTotalPrice+totalUpPrice)
        setTotalPrice(newTotal)
        toastr.success("Item added to list request","Successfully !")
        clearFormAddListItems();
      }else{
        toastr.error(res.data.message,"Failed")
      }
    })
  }

  const closeUpdateItems = () =>{
    $("#additionalComment")
    .val('')
    .focus();
    setDisableBtnUpdateAdditionalComment(false)
  }

  const deleteItems = async (items,index)=>{
    const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/items';
    nprogress.start();
    await deleting({
      url:endpointUrl,
      params:{
        id:items.detail_items.id_detail,
      },
      token:cookie.get("fast_token")
    })
    .then(async(res)=>{
      nprogress.done();
      setOnUpdateAdditionalComment(false)
      if(res.data && res.data.code === 200 ){
        var newItems = [...itemsRequest];
        newItems.splice(index, 1);
        setItemsRequest(newItems)
        var currentTotalPrice = parseInt(totalPrice.replaceAll(".",''));
        var deletedPrice = parseInt(items.detail_items.total_price.replaceAll("Rp","").replaceAll(".",""))
        var newTotal = currency.rupiah(currentTotalPrice-deletedPrice)
        setTotalPrice(newTotal)
        toastr.success("Item Deleted !","Successfully !")
      }else{
        toastr.error(res?.data?.message ? res.data.message:res.message,"Failed")
      }
    })
  }

  const checkUpdateAdditionalComment = (e) =>{
    if(e != Remarks){
      setDisableBtnUpdateAdditionalComment(false)
    }else{
      setDisableBtnUpdateAdditionalComment(true)
    }
  }

  const updateAdditionalComment = async () =>{
    const currentAdditionalComment = $("#additionalComment").val();
    setRemark(currentAdditionalComment)
    setDisableBtnUpdateAdditionalCommenxt(true)
    setOnUpdateAdditionalComment(true)
    nprogress.start();
    const endpointUrl = publicRuntimeConfig.HOST_API+'purchaserequest/update';
    const [dayPrepared, monthPrepared, yearPrepared] = $("#preparedDate").val().split('-');
    const [dayDelivery, monthDelivery, yearDelivery] = $("#deliveryDate").val().split('-');
    await put({
      url:endpointUrl,
      params:{
        number:detail?.request_number,
        additional_comment:currentAdditionalComment,
        prepared_date:yearPrepared+'-'+monthPrepared+'-'+dayPrepared,
        request_delivery_date:yearDelivery+'-'+monthDelivery+'-'+dayDelivery
      },
      token:cookie.get("fast_token")
    })
    .then(async(res)=>{
      nprogress.done();
      setOnUpdateAdditionalComment(false)
      if(res.data && res.data.code === 200 ){
        setDisableBtnUpdateAdditionalComment(true)
        Swal.fire({
          html:detail.pr_state === '0' ? "Updated Information Successfully !<br/> Submit Now ?":"Updated Information Successfully !<br/> Resubmit Now ?",
          icon:"warning",
          showCancelButton:!0,
          buttonsStyling:!1,
          confirmButtonText:detail.pr_state === '0' ? "Yes, Submit Now !":"Yes, Resubmit Now !",
          cancelButtonText:"No, Later",
          customClass:{
            confirmButton:"btn btn-primary",
            cancelButton:"btn btn-active-light"
          }
        })
        .then((t)=>{
          if(t.value){
            callBack(true)
          }
        })
      }else{
        setDisableBtnUpdateAdditionalComment(false)
        toastr.error(res?.data?.message ? res.data.message:res.message,"Failed")
      }
    })
  }

  const countTotal = () =>{
    const budgetEstimation = detail?.kegiatan?.budget_estimaton ? detail?.kegiatan?.budget_estimaton.replaceAll(".",''):0;
    const upAllowed = (20/100)*budgetEstimation;
    const totalAllowed = parseInt(budgetEstimation) + parseInt(upAllowed);
    const totalCashAdvance = detail?.total_expanse_price ? detail?.total_expanse_price.replaceAll(".",''):0; 
    const totalPircePR =  detail?.total_pr_price.replaceAll(".","")
    const remainingBudget = totalAllowed - parseInt(totalCashAdvance) - parseInt(totalPircePR);
    const qty = $("input[name='qty']").val();
    const price = $("input[name='unitPrice']").val();
    const cleanPrice = price ? price.replaceAll(".",""):0;
    const cleanQty = qty ? qty.replaceAll(".",''):0;
    const totalPrice = parseInt(cleanQty)*parseInt(cleanPrice);
    $("input[name='totalPrice']").val(currency.rupiah(totalPrice))
    if(totalPrice > remainingBudget && detail?.kegiatan?.jenis_data === '1'){
      swal.fire({
        title:"Over Budget",
        html:"Remaining Budget Rp "+currency.rupiah(remainingBudget)+"<br/>Kindly Create Budget Under Maximum Allowed, See More On Budget Section",
        icon:"warning",
        showCancelButton:!0,
        buttonsStyling:!1,
        confirmButtonText:"Ok",
        cancelButtonText:"See more",
        customClass:{
          confirmButton:"btn btn-primary",
          cancelButton:"btn btn-active-light-primary text-primary"
        }
      }).
      then((result)=>{
        $("input[name='unitPrice']").val('0')
        $("input[name='totalPrice']").val('0')
        if(! result.value){
          var scroll = new SmoothScroll();
          var sectionBudgetInformation = document.querySelector('#sectionBudgetInformation');
          scroll.animateScroll(sectionBudgetInformation);
        }
      })
    }
  }

  useEffect(() => {
    setStatePR(appsData.newStatePR)
  },[appsData.newStatePR])

  useEffect(() => {
    const editingTrueOn = ['0','1','3','5','6'];
    if(
      editingTrueOn.includes(statePR) && 
      (
        (detail.requestor.id_user.toString() === appsData.session.userId.toString()) ||
        appsData.session.isProgramAssistance.toString() === '1'
      )
    ){
      startUpdateItems()
      setStateUpdate(true)
    }else{
      setStateUpdate(false)
    }
  },[statePR])

  useEffect(()=>{
    var cleanTotalPrice = totalPrice.replaceAll(".",'')
    updateBudgetInformation(cleanTotalPrice)
  },[totalPrice])

  return(
    <>
    <div className="col-xl-12 mt-3">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title align-items-start flex-column">
            <span className="fw-bolder m-0">Items</span>
            <span className="text-muted mt-1 fw-bold fs-7">List all of items requested</span>
          </h3>
          <div className="card-toolbar">
            
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-light align-middle gs-9 gy-4 ">
              <thead>
                <tr className="fw-bold bg-lighten">
                  <th className="fs-7">No.</th>
                  <th className="fs-7" width={'450px'}>Description</th>
                  <th className="text-center fs-7" width={'100px'}>qty</th>
                  <th className="text-center fs-7" width={'120px'}>Units</th>
                  <th className="text-end min-w-150px fs-7">Unit Price(Est)</th>
                  <th className="text-end min-w-150px fs-7">Ext Price (Est)</th>
                  {
                    stateUpdate === true &&
                    <th></th>
                  }
                </tr>
              </thead>
              <tbody>
                {
                  itemsRequest.map((items,index)=>{
                    return(
                      <tr key={'_'+index+'items_pr'}>
                        <td>{index+1}.</td>
                        <td>
                          <small className="text-gray-800 fw-bolder text-hover-primary mb-1 fs-8">
                            {items.item}
                          </small>
                          <span className="text-muted fw-bold d-block fs-9 white-space" 
                            dangerouslySetInnerHTML={{ __html:items.detail_items.specification }}
                          >
                          </span>
                        </td>
                        <td className="text-center fs-7">{parseInt(items.detail_items.qty)}</td>
                        <td className="text-center fs-7">{items.detail_items.unit}</td>
                        <td className="fw-bolder text-gray-800 fs-7 text-end">{items.detail_items.unit_price}</td>
                        <td className="fw-bolder text-gray-800 fs-7 text-end">{items.detail_items.total_price}</td>
                        {
                          stateUpdate === true &&
                          <td className='align-middle text-end pe-0'>
                            <div className="d-flex justify-content-end flex-shrink-0">
                              <button className="btn btn-icon btn-active-danger btn-light-danger w-30px h-30px me-3" onClick={()=>{deleteItems(items,index)}}><i className="las la-trash fs-4"></i></button>
                            </div>
                          </td>
                        }
                      </tr>
                    )
                  })
                }
                {
                stateUpdate === true &&
                <tr>
                  <td colSpan={2} >
                    <select className="form-select form-select-solid" 
                    data-control="select2" id="listItemsPO"
                    data-kt-select2="true"
                    data-placeholder="Select a item"
                    >
                    <option></option>
                      {
                        listItems.map((items,index)=>{
                          return(
                            <option value={items.id} key={'_items_'+index+'_'+items.id}>{items.item}</option>
                          )
                        })
                      }
                    </select>
                    <textarea placeholder="Spesification..." name='spesification' className="form-control form-control-solid mt-2" rows={4}></textarea>
                    <button 
                      className="btn btn-primary mt-3 me-2"
                      onClick={(e)=>{addItems(e)}}
                      disabled={stateSaveItems}
                      data-kt-indicator={stateSaveItems===true ? 'on':''}
                    >
                      {
                        stateSaveItems === false ?
                        <>
                          <span className="indicator-label">
                            <i className='bi bi-clipboard-check'></i> Add To Items Request
                          </span>
                        </>
                        :
                        <>
                          <span className="indicator-progress">
                            Process... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </>
                      }
                    </button>
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
                  <td className='align-top' colSpan={2}>
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
                }
              </tbody>
              <tfoot className="bg-lighten">
                <tr className="bg-grey">
                  <th colSpan={5} className='text-end fw-bolder text-gray-800 fs-7'>Total Amount</th>
                  <th className="text-end fw-bolder text-gray-800 fs-7">Rp {totalPrice}</th>
                  {
                    stateUpdate === true &&
                    <th></th>
                  }
                </tr>
              </tfoot>
            </table>
          </div>
          <label className="form-label fw-bold mt-3 fs-6">Additional Comment</label>
          {
            stateUpdate === true ?
            <textarea 
              className="form-control form-control-solid" 
              rows={8} 
              id='additionalComment'
              onChange={(e)=>{checkUpdateAdditionalComment(e.target.value)}}
              defaultValue={Remarks}
              disabled={onUpdateAdditionalComment}
            >
            </textarea>
            :
            <textarea 
              className="form-control form-control-solid" 
              rows={8} 
              defaultValue={Remarks}
              disabled={stateUpdate === true ? false : true}
              readOnly={stateUpdate === true ? false : true}
            >
            </textarea>
          }
          <div className="row mb-5 mt-5">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 fv-row fv-plugins-icon-container">
                  <label className="form-label fw-bold mt-3 fs-6">Date Prepared</label>
                  <div className="position-relative d-flex align-items-center">
                    <span className="svg-icon svg-icon-2 position-absolute mx-4">
                      <i className="bi bi-calendar-date fs-4"></i>
                    </span>
                    <input className="form-control form-control-solid form-control-lg ps-12 datepicker" id="preparedDate" 
                      placeholder="Select a date" 
                      onKeyUp={()=>{checkDateCorrection()}}
                      defaultValue={detail?.pr_date_prepared ? calender.dateFormat(detail?.pr_date_prepared,'dd-mm-yyyy'):''} 
                      readOnly={stateUpdate === true ? false:true}
                    />
                  </div>
                </div>
                <div className="col-lg-6 fv-row fv-plugins-icon-container">
                  <label className="form-label fw-bold mt-3 fs-6">Request Delivery Date</label>
                  <div className="position-relative d-flex align-items-center">
                    <span className="svg-icon svg-icon-2 position-absolute mx-4">
                      <i className="bi bi-calendar-date fs-4"></i>
                    </span>
                    <input className="form-control form-control-solid form-control-lg ps-12 datepicker" id="deliveryDate"
                      placeholder="Select a date" 
                      onChange={()=>{checkDateCorrection()}}
                      defaultValue={detail?.pr_request_delivery_date ? calender.dateFormat(detail?.pr_request_delivery_date,"dd-mm-yyyy"):''} 
                      readOnly={stateUpdate === true ? false:true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            stateUpdate === true &&
            <>
            <button 
              className="btn btn-primary mt-3 me-2"
              onClick={(e)=>{updateAdditionalComment(e)}}
              disabled={disableBtnUpdateAdditionalComment}
              data-kt-indicator={onUpdateAdditionalComment===true ? 'on':''}
            >
              {
                onUpdateAdditionalComment === false ?
                <>
                  <span className="indicator-label">
                    <i className='bi bi-clipboard-check'></i> Update
                  </span>
                </>
                :
                <>
                  <span className="indicator-progress">
                    Updating... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </>
              }
            </button>
            <button className="btn  btn-light-danger mt-3" onClick={closeUpdateItems}>
              <i className="bi bi-x fs-2 "></i>
              Clear
            </button>
            </>
          }
        </div>
      </div>
    </div>
    </>
  )
}
export default ItemsRequested;