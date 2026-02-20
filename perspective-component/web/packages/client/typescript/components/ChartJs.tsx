import {
  ComponentMeta,
  ComponentProps,
  PComponent,
  PropertyTree,
  SizeObject,
} from "@inductiveautomation/perspective-client";
import {
  Chart as ChartJsCore,
  ChartData,
  ChartOptions,
  ChartType,
  registerables,
} from "chart.js";
import {
  BoxAndWiskers,
  BoxPlotController,
  Violin,
  ViolinController,
} from "@sgratzl/chartjs-chart-boxplot";
import { Chart } from "react-chartjs-2";

ChartJsCore.register(...registerables);
ChartJsCore.register(BoxPlotController, ViolinController, BoxAndWiskers, Violin);

export const COMPONENT_TYPE = "embr.chart.chart-js";

interface ChartJsProps {
  type: ChartType;
  options: ChartOptions;
  data: ChartData;
  redraw: boolean;
}

export const ChartJsComponent = (props: ComponentProps<ChartJsProps>) => {
  return (
    <div {...props.emit()}>
      <Chart
        type={props.props.type}
        options={props.props.options}
        data={props.props.data}
        redraw={props.props.redraw}
      />
    </div>
  );
};

export class ChartJsComponentMeta implements ComponentMeta {
  getComponentType(): string {
    return COMPONENT_TYPE;
  }

  getDefaultSize(): SizeObject {
    return {
      width: 300,
      height: 300,
    };
  }

  getViewComponent(): PComponent {
    return ChartJsComponent as PComponent;
  }

  getPropsReducer(tree: PropertyTree): ChartJsProps {
    return {
      type: tree.readString("type", "bar") as ChartType,
      options: tree.readObject("options", {}) as ChartOptions,
      data: tree.readObject("data", {}) as ChartData,
      redraw: tree.readBoolean("redraw", false),
    };
  }
}
