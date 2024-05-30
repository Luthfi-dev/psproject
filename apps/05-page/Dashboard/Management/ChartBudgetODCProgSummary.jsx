import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";

const ChartBudgetODCProgSummary = ({})=>{
  useEffect(() => {
    createChart()
  }, []);

  const createChart = () => {
    let root = am5.Root.new("chartdiv_summary_odc_prog");
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    let chart = root.container.children.push( 
      am5percent.PieChart.new(root, {
        layout: root.verticalHorizontal,
        innerRadius: am5.percent(65)
      }) 
    ) ;

    // Define data
    let data = [{
      category: "Spending",
      amount: 40000,
    }, {
      category: "Remaining",
      amount: 10000,
    }];

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "amount",
        categoryField: "category"
      })
    );
    series.get("colors").set("colors", [
      am5.color("#eb2b11"),
      am5.color("#344e9a")
    ]);
    series.appear(1500, 100);

    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);
    series.data.setAll(data);
    chart.children.unshift(am5.Label.new(root, {
      html: `<div class="d-flex flex-column flex-center">
        <span class="fs-4x fw-bolder px-0 py-0 mx-0 my-0" style='color:#283250'>80%</span>
        <span class="fs-6 fw-bold text-gray-400">Spending Achieved</span>
      </div>
      `,
      x: am5.percent(50 - 23),
      y: am5.percent(50 - 15),
      paddingTop: 0,
      paddingBottom: 0
    }));
  }
  return (
    <div id="chartdiv_summary_odc_prog" style={{ width: "100%", height: "400px" }}></div>
  )
}
export default ChartBudgetODCProgSummary