import React, { Suspense, useState, useEffect } from "react";
import {
  SeaSketchReportingMessageEvent,
  SeaSketchReportingVisibleLayersChangeEvent,
  SeaSketchReportingToggleLayerVisibilityEvent,
  SeaSketchReportingToggleLanguageEvent,
} from "../types/service.js";

import { SketchProperties } from "../types/sketch.js";
import { ReportContext } from "../context/index.js";
import {
  seaSketchReportingMessageEventType,
  seaSketchReportingVisibleLayersChangeEvent,
  seaSketchReportingLanguageChangeEvent,
} from "../helpers/service.js";
import { ReportTextDirection } from "./i18n/ReportTextDirection.js";

const searchParams = new URLSearchParams(window.location.search);
const service = searchParams.get("service");
const frameId = searchParams.get("frameId") || window.name;

export interface ReportContextState {
  clientName: string;
  sketchProperties: SketchProperties;
  geometryUri: string;
  /* List of ids for layers which are visible in the table of contents */
  visibleLayers: string[];
  language: string;
  toggleLayerVisibility: (layerId: string) => void;
}

export interface AppProps {
  reports: Record<string, React.LazyExoticComponent<() => React.JSX.Element>>;
}

export const App = ({ reports }: AppProps) => {
  if (!service) {
    throw new Error("App must be loaded with `service` query string parameter");
  }

  // Maintain report context in app state
  const [reportContext, setReportContext] = useState<ReportContextState | null>(
    null,
  );
  const [initialized, setInitialized] = useState(false);

  /**
   * Event handler for messages from the parent window
   * @param event - postMessage event
   */
  const onMessage = (event: MessageEvent) => {
    try {
      if (
        event.data &&
        event.data.type === seaSketchReportingMessageEventType
      ) {
        const message: SeaSketchReportingMessageEvent = event.data;
        setReportContext({
          sketchProperties: message.sketchProperties,
          geometryUri: message.geometryUri,
          clientName: message.client,
          visibleLayers: message.visibleLayers || [],
          language: message.language || "en",
          /**
           * Send a message to the parent window to toggle the visibility of a layer
           * @param layerId - id of the layer to toggle
           */
          toggleLayerVisibility: (layerId: string) => {
            setReportContext((prev) => {
              if (prev) {
                const wasToggled = prev.visibleLayers.includes(layerId);
                let target: Window = window;
                if (window.parent) {
                  target = window.parent;
                }
                target.postMessage(
                  {
                    type: "SeaSketchReportingToggleLayerVisibilityEvent",
                    layerId,
                    on: !wasToggled,
                  } as SeaSketchReportingToggleLayerVisibilityEvent,
                  "*",
                );
                return {
                  ...prev,
                  visibleLayers: wasToggled
                    ? prev.visibleLayers.filter((id) => id !== layerId)
                    : [...prev.visibleLayers, layerId],
                };
              } else {
                return null;
              }
            });
          },
        });
      } else if (
        event.data &&
        event.data.type === seaSketchReportingVisibleLayersChangeEvent
      ) {
        const message: SeaSketchReportingVisibleLayersChangeEvent = event.data;
        // Update visible layers in context
        // Don't update context unless report is already initialized with SeaSketchReportingMessageEvent
        if (reportContext) {
          setReportContext((prev) => {
            if (prev) {
              return { ...prev, visibleLayers: message.visibleLayers };
            } else {
              return null;
            }
          });
        }
      } else if (
        event.data &&
        event.data.type === seaSketchReportingLanguageChangeEvent
      ) {
        const message: SeaSketchReportingToggleLanguageEvent = event.data;
        // Update language in context
        // Don't update context unless report is already initialized with SeaSketchReportingMessageEvent
        if (reportContext) {
          setReportContext((prev) => {
            if (prev) {
              return { ...prev, language: message.language };
            } else {
              return null;
            }
          });
        }
      }
    } catch (error) {
      // Do nothing. Might not even be related to SeaSketch reporting
      console.error(error);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "x" && window.parent) {
      window.parent.postMessage(
        { type: "SeaSketchReportingKeydownEvent", key: "x" },
        "*",
      );
    }
  };

  useEffect(() => {
    // default to self for debugging
    let target: Window = window;
    if (window.parent) {
      target = window.parent;
    }
    window.addEventListener("message", onMessage);
    window.addEventListener("keydown", onKeyDown);
    if (!initialized) {
      target.postMessage({ type: "SeaSketchReportingInitEvent", frameId }, "*");
      setInitialized(true);
    }
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [initialized, reportContext]);

  if (reportContext) {
    const Report = reports[reportContext.clientName];
    return (
      <ReportContext.Provider
        value={{
          ...reportContext,
          projectUrl: service,
        }}
      >
        <ReportTextDirection>
          <Suspense fallback={<div>Loading...</div>}>
            <Report />
          </Suspense>
        </ReportTextDirection>
      </ReportContext.Provider>
    );
  } else {
    return <div />;
  }
};

export default App;
