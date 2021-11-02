import { Component } from "preact"

type libassOptionsUrl = {
  video?: Element | Component,
  canvas?: Element,
  subUrl: string,
  workerUrl: string,
  fonts?: string[],
  availableFonts?: object,
  timeOffset?: number,
  onReady?: () => void,
  onError?: (error: object) => void,
  debug?: boolean,
  lossyRender?: boolean,
}
type libassOptionsContent = {
  video?: Element | Component,
  canvas?: Element,
  subContent: string,
  workerUrl: string,
  legacyWorkerUrl?: string,
  fonts?: string[],
  availableFonts?: object,
  timeOffset?: number,
  onReady?: () => void,
  onError?: (error: object) => void,
  debug?: boolean,
  lossyRender?: boolean,
}
export type libassOptions = libassOptionsUrl | libassOptionsContent