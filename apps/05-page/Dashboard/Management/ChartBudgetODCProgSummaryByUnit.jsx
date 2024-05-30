import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";

const ChartBudgetODCProgSummaryByUnit = ({}) =>{
  useEffect(() => {
    createChart3()
  }, []);

  const createChart3 = () => {
    let root = am5.Root.new("odc_prog_summary_by_unit");
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
        category: "CSU",
        allocation: 15000000,
        expenses: 5000000
      },
      {
        category: "CBS",
        allocation: 19000000,
        expenses: 4300000
      },
      {
        category: "M&E",
        allocation: 12000000,
        expenses: 8000000
      },
      {
        category: "ICT4D",
        allocation: 14500000,
        expenses: 1200000
      },
      {
        category: "ASP",
        allocation: 19000000,
        expenses: 3000000
      },
      {
        category: "CAP/DEV",
        allocation: 9700000,
        expenses: 1150000
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
    createSeries("allocation", "Allocation", "#344e9a");
    createSeries("expenses", "Expenses", "#eb2b11");
    legend.data.setAll(chart.series.values);
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "zoomY"
    }));
    cursor.lineY.set("forceHidden", true);
    cursor.lineX.set("forceHidden", true);
    chart.appear(1000, 100);
  }

  return(
    <div id="odc_prog_summary_by_unit" style={{ width: "100%", height: "500px" }}></div>
  )
}
export default ChartBudgetODCProgSummaryByUnit