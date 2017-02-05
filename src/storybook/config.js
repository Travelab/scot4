import React from 'react'
import { whyDidYouUpdate } from 'why-did-you-update'

if (patchWhyDidYouUpdate) {

	// https://github.com/garbles/why-did-you-update
	whyDidYouUpdate(React, {
		//include: /^pure/,
		exclude: /(^(Provider)|\(.+\))/
	})
}

import 'entry-storybull'