import {
  ComponentMeta,
  ComponentProps,
  PComponent,
  PropertyTree,
  SizeObject,
} from "@inductiveautomation/perspective-client";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export const COMPONENT_TYPE = "embr.chart.apex-charts";

interface ApexChartsProps {
  type: string;
  options: ApexOptions;
  series: unknown[];
  redraw: boolean;
}

export const ApexChartsComponent = (props: ComponentProps<ApexChartsProps>) => {
  return (
    <div {...props.emit()}>
      <ApexChart
        type={props.props.type as never}
        options={props.props.options}
        series={props.props.series as never}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export class ApexChartsComponentMeta implements ComponentMeta {
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
    return ApexChartsComponent as PComponent;
  }

  getPropsReducer(tree: PropertyTree): ApexChartsProps {
    return {
      type: tree.readString("type", "line"),
      options: tree.readObject("options", {}) as ApexOptions,
      series: tree.readArray("series", []),
      redraw: tree.readBoolean("redraw", false),
    };
  }
}
