import React from "react";
import { ClassTable } from "./ClassTable.js";
import { defaultReportContext } from "../../context/index.js";
import { CardDecorator, createReportDecorator } from "../storybook/index.js";
import { createMetric } from "../../metrics/index.js";
import {
  longClassMetrics,
  simpleClassMetrics,
  simpleMetricGroup,
  simpleObjectives,
  categoricalClassMetrics,
  categoricalMultiObjective,
  categoricalSingleObjective,
  categoricalClassMetricsMixedTarget,
  categoricalMetricGroup,
  categoricalMetricGroupMixedTarget,
  NaNPercMetrics,
} from "../../testing/fixtures/metrics.js";
import { valueFormatter } from "../../helpers/valueFormatter.js";
import Translator from "../i18n/TranslatorAsync.js";

export default {
  component: ClassTable,
  title: "Components/Table/ClassTable",
  decorators: [CardDecorator, createReportDecorator(defaultReportContext)],
};

export const simple = () => {
  return (
    <Translator>
      <ClassTable
        rows={simpleClassMetrics}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
          },
        ]}
      />
    </Translator>
  );
};

export const number1digit = () => {
  return (
    <Translator>
      <ClassTable
        rows={simpleClassMetrics}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "number1dig",
          },
        ]}
      />
    </Translator>
  );
};

export const number2digit = () => {
  return (
    <Translator>
      <ClassTable
        rows={simpleClassMetrics}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "number2dig",
          },
        ]}
      />
    </Translator>
  );
};

export const numberThousands = () => {
  return (
    <Translator>
      <ClassTable
        rows={simpleClassMetrics.map((m) => ({
          ...m,
          value: m.value * 10_000_000,
        }))}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "number1dig",
          },
        ]}
      />
    </Translator>
  );
};

export const integer = () => {
  return (
    <Translator>
      <ClassTable
        rows={simpleClassMetrics.map((m) => ({
          ...m,
          value: m.value * 10,
        }))}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "integer",
          },
        ]}
      />
    </Translator>
  );
};

export const percent = () => {
  return (
    <Translator>
      <ClassTable
        rows={[
          createMetric({
            metricId: simpleMetricGroup.metricId,
            classId: "Plains",
            value: 0.123_45,
          }),
        ]}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "% Value",
          },
        ]}
      />
    </Translator>
  );
};

export const percent1Digit = () => {
  return (
    <Translator>
      <ClassTable
        rows={[
          createMetric({
            metricId: simpleMetricGroup.metricId,
            classId: "Plains",
            value: 0.123_45,
          }),
        ]}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent1dig",
            columnLabel: "% Value",
          },
        ]}
      />
    </Translator>
  );
};

export const percent2Digit = () => {
  return (
    <Translator>
      <ClassTable
        rows={[
          createMetric({
            metricId: simpleMetricGroup.metricId,
            classId: "Plains",
            value: 0.123_45,
          }),
        ]}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent2dig",
            columnLabel: "% Value",
          },
        ]}
      />
    </Translator>
  );
};

export const percentThousands = () => {
  return (
    <Translator>
      <ClassTable
        rows={[
          createMetric({
            metricId: simpleMetricGroup.metricId,
            classId: "Plains",
            value: 10_000.123_45,
          }),
        ]}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent2dig",
            columnLabel: "% Value",
          },
        ]}
      />
    </Translator>
  );
};

export const simpleLayerToggle = () => {
  return (
    <Translator>
      <ClassTable
        rows={simpleClassMetrics}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "% Value",
          },
          {
            type: "layerToggle",
          },
        ]}
      />
    </Translator>
  );
};

export const simpleGoal = () => {
  return (
    <Translator>
      <ClassTable
        rows={simpleClassMetrics}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
          },
          {
            type: "metricGoal",
            valueFormatter: "percent",
          },
        ]}
      />
    </Translator>
  );
};

export const simpleBoth = () => {
  return (
    <Translator>
      <ClassTable
        rows={simpleClassMetrics}
        metricGroup={simpleMetricGroup}
        objective={simpleObjectives}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "% Value",
          },
          {
            type: "metricGoal",
            valueFormatter: "percent",
          },
          {
            type: "layerToggle",
          },
        ]}
      />
    </Translator>
  );
};

export const categoricalData = () => {
  return (
    <Translator>
      <ClassTable
        rows={categoricalClassMetrics}
        metricGroup={categoricalMetricGroup}
        objective={categoricalSingleObjective}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "% Value",
          },
          {
            type: "metricGoal",
            valueFormatter: "percent",
          },
          {
            type: "layerToggle",
          },
        ]}
      />
    </Translator>
  );
};

export const tableWithNanValue = () => {
  return (
    <Translator>
      <ClassTable
        rows={NaNPercMetrics}
        metricGroup={categoricalMetricGroup}
        objective={categoricalSingleObjective}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "% Value",
          },
          {
            type: "metricGoal",
            valueFormatter: "percent",
          },
          {
            type: "layerToggle",
          },
        ]}
      />
    </Translator>
  );
};

export const valueFormatAndLabel = () => {
  return (
    <Translator>
      <ClassTable
        rows={categoricalClassMetrics}
        metricGroup={categoricalMetricGroup}
        objective={categoricalMultiObjective}
        columnConfig={[
          {
            type: "class",
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: (val: string | number) =>
              (typeof val === "string" ? Number.parseFloat(val) : val) * 1000,
            valueLabel: "ideas",
          },
        ]}
      />
    </Translator>
  );
};

export const chartWithSeparateSortableValueColumn = () => {
  return (
    <Translator>
      <ClassTable
        rows={categoricalClassMetrics}
        metricGroup={categoricalMetricGroup}
        objective={categoricalSingleObjective}
        columnConfig={[
          {
            type: "class",
            width: 30,
          },
          {
            type: "metricValue",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            width: 15,
            colStyle: { textAlign: "right" },
            columnLabel: "%",
          },
          {
            type: "metricChart",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "Found Within plan",
            chartOptions: {
              showTitle: false,
            },
            width: 55,
          },
        ]}
      />
    </Translator>
  );
};

export const chartWithIntegratedValueAndTargetPass = () => {
  return (
    <Translator>
      <ClassTable
        rows={categoricalClassMetrics}
        metricGroup={categoricalMetricGroup}
        objective={categoricalSingleObjective}
        columnConfig={[
          {
            type: "class",
            width: 30,
          },
          {
            type: "metricChart",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "Found Within plan",
            chartOptions: {
              showTitle: true,
            },
            width: 55,
          },
        ]}
      />
    </Translator>
  );
};

export const chartWithNanValue = () => {
  return (
    <Translator>
      <p>
        Bays and Coast data class in this story has a NaN value. This use case
        happens when no features for a data class overlap with a given
        geography. In this scenario a NaN metric value is produced by
        toPercentMetric(), because the denominator value is zero. ClassTable
        picks up on this and displays more information to the user()
      </p>
      <ClassTable
        rows={NaNPercMetrics}
        metricGroup={categoricalMetricGroup}
        objective={categoricalSingleObjective}
        columnConfig={[
          {
            type: "class",
            width: 30,
          },
          {
            type: "metricChart",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "Found Within plan",
            chartOptions: {
              showTitle: true,
            },
            width: 55,
          },
        ]}
      />
    </Translator>
  );
};

export const chartWithObjective = () => {
  return (
    <Translator>
      <ClassTable
        rows={categoricalClassMetrics}
        metricGroup={categoricalMetricGroup}
        objective={categoricalSingleObjective}
        columnConfig={[
          {
            type: "class",
            width: 30,
          },
          {
            type: "metricChart",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "Found Within Plan",
            chartOptions: {
              showTitle: true,
              targetLabelStyle: "tight",
            },
            width: 55,
          },
        ]}
      />
    </Translator>
  );
};

export const chartWithMixedTarget = () => {
  return (
    <Translator>
      <ClassTable
        rows={categoricalClassMetricsMixedTarget}
        metricGroup={categoricalMetricGroupMixedTarget}
        objective={categoricalSingleObjective}
        columnConfig={[
          {
            type: "class",
            width: 45,
          },
          {
            type: "metricChart",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "Found Within Plan",
            chartOptions: {
              showTitle: true,
              targetLabelPosition: "bottom",
              targetLabelStyle: "tight",
            },
            width: 40,
            targetValueFormatter: (value: number, row: number) => {
              if (row === 0) {
                return (value: number) =>
                  `${valueFormatter(value / 100, "percent0dig")} Target`;
              } else {
                return (value: number) =>
                  `${valueFormatter(value / 100, "percent0dig")}`;
              }
            },
          },
          {
            type: "layerToggle",
            width: 15,
          },
        ]}
      />
    </Translator>
  );
};

export const chartWithSeparateTargetColumn = () => {
  return (
    <Translator>
      <ClassTable
        rows={categoricalClassMetricsMixedTarget}
        metricGroup={categoricalMetricGroupMixedTarget}
        objective={categoricalSingleObjective}
        columnConfig={[
          {
            type: "class",
            width: 30,
          },
          {
            type: "metricChart",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "Found Within Plan",
            chartOptions: {
              showTitle: true,
              targetLabelPosition: "bottom",
              targetLabelStyle: "tight",
              showTargetLabel: false,
            },
            width: 55,
          },
          {
            type: "metricGoal",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            width: 15,
            colStyle: { textAlign: "right" },
            columnLabel: "Target",
          },
        ]}
      />
    </Translator>
  );
};

export const chartWithWideTitle = () => {
  return (
    <Translator>
      <ClassTable
        rows={longClassMetrics}
        metricGroup={categoricalMetricGroup}
        objective={categoricalSingleObjective}
        columnConfig={[
          {
            type: "class",
            width: 30,
          },
          {
            type: "metricChart",
            metricId: simpleMetricGroup.metricId,
            valueFormatter: "percent",
            columnLabel: "Found Within Plan",
            chartOptions: {
              showTitle: true,
              titleWidth: 50,
              targetLabelStyle: "tight",
            },
            width: 55,
          },
        ]}
      />
    </Translator>
  );
};
