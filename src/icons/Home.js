// @flow

import React, { Fragment } from 'react'

const path = (
  <Fragment>
    <rect
      x=".75"
      y=".75"
      width="24"
      height="24"
      rx="8"
      fill="none"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      fill="currentColor"
      transform="translate(4.75,4.75)"
      width="100%"
      height="100%"
      d="m2.75 6.3668v6.9665c0 0.32217 0.26117 0.58333 0.58333 0.58333h9.3333c0.32217 0 0.58333-0.26117 0.58333-0.58333v-6.9665l-5.25-4.0833zm-1.2105-0.95883 6-4.6667c0.27083-0.21065 0.65008-0.21065 0.92091 0l6 4.6667c0.18269 0.14209 0.28954 0.36057 0.28954 0.59201v7.3333c0 1.1506-0.93274 2.0833-2.0833 2.0833h-9.3333c-1.1506 0-2.0833-0.93274-2.0833-2.0833v-7.3333c0-0.23144 0.10685-0.44992 0.28954-0.59201zm5.2105 3.342v5.9167c0 0.41421-0.33579 0.75-0.75 0.75s-0.75-0.33579-0.75-0.75v-6.6667c0-0.41421 0.33579-0.75 0.75-0.75h4c0.41421 0 0.75 0.33579 0.75 0.75v6.6667c0 0.41421-0.33579 0.75-0.75 0.75-0.41421 0-0.75-0.33579-0.75-0.75v-5.9167z"
    />
  </Fragment>
)

export default ({ size, ...p }: { size: number }) => (
  <svg viewBox="0 0 25.5 25.5" height={size} width={size} {...p}>
    {path}
  </svg>
)
