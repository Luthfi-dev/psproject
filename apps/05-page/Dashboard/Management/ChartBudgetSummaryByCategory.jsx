import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";

const ChartBudgetSummaryByCategory = ({}) =>{
  useEffect(() => {
    createChart3()
  }, []);

  const createChart3 = () => {
    let root = am5.Root.new("chartdiv2");
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      layout: root.verticalLayout
    }));
    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }))
    let data = [
      {
        category: "01-Personnel",
        allocation: 10000000,
        expenses: 5000000
      },
      {
        category: "02-Consultants",
        allocation: 25000000,
        expenses: 5000000
      },
      {
        category: "03-Fringe Benefit",
        allocation: 32000000,
        expenses: 16000000
      },
      {
        category: "04-Travel & Transport",
        allocation: 18000000,
        expenses: 9800000
      },
      {
        category: "05-ODC - Office Ops Cost",
        allocation: 76000000,
        expenses: 45000000
      },
      {
        category: "ODC - Program Activities",
        allocation: 9000000,
        expenses: 1450000
      },
      {
        category: "Contractual-SubAward",
        allocation: 45000000,
        expenses: 17600000
      }
    ];
    let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererY.new(root, {
        inversed: true,
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
      })
    }));
    yAxis.data.setAll(data);
    let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {
        strokeOpacity: 0.1
      }),
      min: 0
    }));
    function createSeries(field, name, color) {
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        clustered: false,
        fill: am5.color(color),
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: field,
        categoryYField: "category",
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "vertical",
          labelText: "[bold]{name}\n{valueX}[/]"
        })
      }));

      
      series.columns.template.setAll({
        height: am5.p100,
        width: am5.percent(100),
        strokeOpacity: 0,
        cornerRadiusBR: 2,
        cornerRadiusTR: 2,
      });

      series.data.setAll(data);
      series.appear();
    }
    createSeries("allocation", "Allocation", "#283250");
    createSeries("expenses", "Expenses", "#a41e0d");
    legend.data.setAll(chart.series.values);
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomY"
    }));
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);
    chart.appear(1000, 100);
  }

  return(
    <div id="chartdiv2" style={{ width: "100%", height: "500px" }}></div>
  )
}
export default ChartBudgetSummaryByCategory