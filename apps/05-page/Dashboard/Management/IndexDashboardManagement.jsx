import dynamic from 'next/dynamic';
import Select2 from "../../../01-atoms/Forms/Select2";
import { useState } from 'react';
const IndexDashboardManagement = ({}) =>{
  const [groups, setGroups] = useState('a');
  const ChartBudgetSummary = dynamic(() => import('./ChartBudgetSummary'), { ssr: false });
  const ChartBudgetSummaryByCategory = dynamic(() => import('./ChartBudgetSummaryByCategory'), { ssr: false });
  const ChartBudgetODCProgSummary = dynamic(() => import('./ChartBudgetODCProgSummary'), { ssr: false });
  const ChartBudgetODCProgSummaryByUnit = dynamic(() => import('./ChartBudgetODCProgSummaryByUnit'), { ssr: false });
  const ChartSummaryExpensesUnit = dynamic(() => import('./ChartSummaryExpensesUnit'), { ssr: false });
  const ChartSummaryExpensesUnitByDeliverable = dynamic(() => import('./ChartSummaryExpensesUnitByDeliverable'), { ssr: false });
  return(<>
    <div className="row">
      <div className="col-lg-12">
        <div className="card card-flush h-lg-100  rounded-1 pt-1">
          <div className="card-header">
            <h3 class="card-title align-items-start flex-column">
              <span class="fw-bolder text-dark">Visualization Summary</span>
              <span class="text-muted mt-1 fw-bold fs-7">Summary BVA & ODC-Program</span>
            </h3>
          </div>
          <div className="card-body pt-5">
            <div className="row">
              <div className="d-flex">
                <div className="col-9">
                  <div className="d-flex justify-content-start">
                    <div className="col-2 me-1">
                      <Select2
                        props={{
                          id: 'option_filter_fiscal_year',
                          addClass: 'border rounded-1 border-secondary',
                          hideSearch: true,
                          placeholder: 'FY',
                          defaultValue: 2023,
                          options:[
                            {
                              id: 2023,
                              text: '2023'
                            }
                          ]
                        }}
                        onChanged={()=>{}}
                      />
                    </div>
                    <div className="col-4 me-1">
                      <Select2
                        props={{
                          id: 'option_filter_project',
                          addClass: 'border rounded-1 border-secondary',
                          hideSearch: true,
                          placeholder: 'Select Project',
                          defaultValue:1,
                          options:[
                            {
                              id: 1,
                              text: 'EpiC'
                            }
                          ]
                        }}
                      />
                    </div>
                    <div className="col-6 me-1">
                      <Select2
                        props={{
                          id: 'option_filter_source_fund',
                          addClass: 'border rounded-1 border-secondary',
                          hideSearch: true,
                          placeholder: 'Select Source Fund',
                          defaultValue:1,
                          options:[
                            {
                              id: 1,
                              text: 'ROP'
                            }
                          ]
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="d-flex justify-content-end">
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link btn btn-lg btn-color-muted btn-active btn-active-dark fw-bolder px-4 me-1 active" data-bs-toggle="tab" href='#content_chart_bva' onClick={()=>{setGroups('a')}}>BVA</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link btn btn-lg btn-color-muted btn-active btn-active-success fw-bolder px-4 me-1" data-bs-toggle="tab" href='#content_chart_odc' onClick={()=>{setGroups('b')}}>ODC-PROG</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            {
              groups === 'a'&&
              <div className="row">
                <div className="col-lg-4">
                  <ChartBudgetSummary/>
                </div>
                <div className="col-lg-8">
                  <ChartBudgetSummaryByCategory/>
                </div>
              </div>
            }
            {
              groups === 'b'&&
              <div className="row">
                <div className="col-lg-4">
                  <ChartBudgetODCProgSummary/>
                </div>
                <div className="col-lg-8">
                  <ChartBudgetODCProgSummaryByUnit/>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-10">
      <div className="col-lg-12">
        <div className="card card-flush h-lg-100  rounded-1 pt-1">
          <div className="card-header">
            <h3 class="card-title align-items-start flex-column">
              <span class="fw-bolder text-dark">Unit Expenses</span>
              <span class="text-muted mt-1 fw-bold fs-7">Visualization by Workplan / Quartal</span>
            </h3>
          </div>
          <div className="card-body pt-5 bg-white" data-kt-sticky="true"
            data-kt-sticky-name="docs-sticky-summary"
            data-kt-sticky-offset="{default: false, xl: '850px'}"
            data-kt-sticky-width="{lg: '100%', xl: '80%'}"
            data-kt-sticky-left="auto"
            data-kt-sticky-top="0px"
            data-kt-sticky-animation="false"
            data-kt-sticky-zindex="999">
            <div className="row">
              <div className="d-flex">
                <div className="col-9">
                  <div className="d-flex justify-content-start">
                    <div className="col-2 me-1">
                      <Select2
                        props={{
                          id: 'option_filter_fiscal_year',
                          addClass: 'border rounded-1 border-secondary',
                          hideSearch: true,
                          placeholder: 'FY',
                          defaultValue: 2023,
                          options:[
                            {
                              id: 2023,
                              text: '2023'
                            }
                          ]
                        }}
                        onChanged={()=>{}}
                      />
                    </div>
                    <div className="col-4 me-1">
                      <Select2
                        props={{
                          id: 'option_filter_project',
                          addClass: 'border rounded-1 border-secondary',
                          hideSearch: true,
                          placeholder: 'Select Project',
                          defaultValue:1,
                          options:[
                            {
                              id: 1,
                              text: 'EpiC'
                            }
                          ]
                        }}
                      />
                    </div>
                    <div className="col-6 me-1">
                      <Select2
                        props={{
                          id: 'option_filter_source_fund',
                          addClass: 'border rounded-1 border-secondary',
                          hideSearch: true,
                          placeholder: 'Select Source Fund',
                          defaultValue:1,
                          options:[
                            {
                              id: 1,
                              text: 'ROP'
                            }
                          ]
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="d-flex justify-content-end">
                    <ul className="nav">
                      <li className="nav-item">
                        <a className="nav-link btn btn-lg btn-color-muted btn-active btn-active-danger fw-bolder px-4 me-1 active" data-bs-toggle="tab" onClick={()=>{setGroups('a')}}>DELIVERABLE</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link btn btn-lg btn-color-muted btn-active btn-active-success fw-bolder px-4 me-1" data-bs-toggle="tab" onClick={()=>{setGroups('b')}}>QUARTAL</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row mb-5">
              <div className="col-lg-4 col-lg-4 d-flex flex-row-fluid flex-center" style={{ ["background-color"]: "#1844c4" }}>
                <ChartSummaryExpensesUnit props={{id: 'csu', label: 'CSU'}}/>
              </div>
              <div className="col-lg-8">
                <ChartSummaryExpensesUnitByDeliverable props={{id: 'csu', label: 'CAP/DEV'}}/>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-lg-4 col-lg-4 d-flex flex-row-fluid flex-center" style={{ ["background-color"]: "#344e9a" }}>
                <ChartSummaryExpensesUnit props={{id: 'cbs', label: 'CBS'}}/>
              </div>
              <div className="col-lg-8">
                <ChartSummaryExpensesUnitByDeliverable props={{id: 'cbs', label: 'CAP/DEV'}}/>
              </div>
            </div>
            
            <div className="row mb-5">
              <div className="col-lg-4 col-lg-4 d-flex flex-row-fluid flex-center" style={{ ["background-color"]: "#1844c4" }}>
                <ChartSummaryExpensesUnit props={{id: 'mne', label: 'M&E'}}/>
              </div>
              <div className="col-lg-8">
                <ChartSummaryExpensesUnitByDeliverable props={{id: 'mne', label: 'CAP/DEV'}}/>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-lg-4 col-lg-4 d-flex flex-row-fluid flex-center" style={{ ["background-color"]: "#344e9a" }}>
                <ChartSummaryExpensesUnit props={{id: 'ict', label: 'ICT4D'}}/>
              </div>
              <div className="col-lg-8">
                <ChartSummaryExpensesUnitByDeliverable props={{id: 'ict', label: 'CAP/DEV'}}/>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-lg-4 d-flex flex-row-fluid flex-center" style={{ ["background-color"]: "#1844c4" }}>
                <ChartSummaryExpensesUnit props={{id: 'asp', label: 'ASP'}}/>
              </div>
              <div className="col-lg-8">
              <ChartSummaryExpensesUnitByDeliverable props={{id: 'asp', label: 'CAP/DEV'}}/>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 d-flex flex-row-fluid flex-center" style={{ ["background-color"]: "#344e9a" }}>
                <ChartSummaryExpensesUnit props={{id: 'cap', label: 'CAP/DEV'}}/>
              </div>
              <div className="col-lg-8">
                <ChartSummaryExpensesUnitByDeliverable props={{id: 'cap', label: 'CAP/DEV'}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
export default IndexDashboardManagement