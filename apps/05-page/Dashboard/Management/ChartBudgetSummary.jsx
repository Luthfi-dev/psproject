import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";

const ChartBudgetSummary = ({})=>{
  useEffect(() => {
    createChart()
  }, []);

  const createChart = () => {
    let root = am5.Root.new("chartdiv");
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
      amount: 60000,
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
      am5.color("#a41e0d"),
      am5.color("#283250")
    ]);
    series.appear(1500, 100);

    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);
    series.data.setAll(data);
    chart.children.unshift(am5.Label.new(root, {
      html: `<div class="d-flex flex-column flex-center">
        <span class="fs-4x fw-bolder px-0 py-0 mx-0 my-0" style='color:#283250'>40%</span>
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
    <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
  )
}
export default ChartBudgetSummary