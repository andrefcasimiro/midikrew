// @flow
import { map } from "ramda"

export const breakpoints = {
  phone: 320,
  phoneWide: 480,
  tablet: 640,
  tabletWide: 880,
  laptop: 1024,
  desktop: 1440,
}

type MediaType = "max" | "min"

export const mq = (mediaType: MediaType) => map(
  value => mediaType === "max"
    ? `@media (max-width: ${value}px)`
    : `@media (min-width: ${value}px)`,
  breakpoints,
)
