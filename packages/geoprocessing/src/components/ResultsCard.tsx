import React, { ReactNode } from "react";
import Card, { CardProps } from "./Card";
import { useFunction } from "../hooks/useFunction";
import styled from "styled-components";
import Skeleton from "./Skeleton";
import { ProgressBar, ProgressBarWrapper } from "./ProgressBar";
import { ErrorBoundary } from "react-error-boundary";

export interface ResultsCardProps<T> extends CardProps {
  functionName: string;
  children: (results: T) => ReactNode;
  skeleton?: ReactNode;
}

const DefaultSkeleton = () => (
  <div>
    <Skeleton />
    <Skeleton />
    <Skeleton />
    <Skeleton style={{ width: "25%" }} />
  </div>
);

// styled-components are needed here to use the ::before pseudo selector
const ErrorIndicator = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 18px;
  line-height: 1em;
  background-color: #ea4848;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  color: white;
  text-align: center;
  margin-right: 8px;
  ::before {
    position: relative;
    bottom: -1px;
    content: "!";
  }
`;

export const EstimateLabel = styled.div`
  height: 20px;
  margin-top: 5px;
  padding-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  font-style: italic;
  width: 100%;
  text-align: center;
  display: none;
`;

function ErrorFallback({ error }) {
  return (
    <Card>
      <p role="alert">
        <ErrorIndicator />
        {error}
      </p>
    </Card>
  );
}

function ResultsCard<T>({
  functionName,
  skeleton,
  children,
  ...otherProps
}: ResultsCardProps<T>) {
  if (!functionName) {
    throw new Error("No function specified for ResultsCard");
  }
  let { task, loading, error } = useFunction(functionName);
  let taskEstimate = 5;
  if (task && task.estimate) {
    taskEstimate = Math.round(task.estimate / 1000);
  }

  let showLabel = false;
  if (task && task.estimate) {
    showLabel = true;
  }
  if (!loading && !task?.data) {
    error = task?.error;
  }
  if (!loading && task && !task.data) {
    error = "Report run completed, but no results returned";
  }

  let card: JSX.Element;
  if (error) {
    card = (
      <Card {...otherProps}>
        <p role="alert">
          <ErrorIndicator />
          {error}
        </p>
      </Card>
    );
  } else if (loading) {
    card = (
      <Card {...otherProps}>
        {skeleton || <DefaultSkeleton />}
        <ProgressBarWrapper>
          <ProgressBar duration={taskEstimate} />
        </ProgressBarWrapper>
      </Card>
    );
  } else if (task && task.data) {
    card = (
      <Card {...otherProps}>
        <>{children(task.data as T)}</>
      </Card>
    );
  } else {
    throw new Error("Unexpected report result, please try again");
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{card}</ErrorBoundary>
  );
}

export default ResultsCard;
