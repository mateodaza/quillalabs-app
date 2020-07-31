import { autorun, toJS, set } from 'mobx'
import store from "store"

export default function Autosave(_this, name) {
	let firstRun = true
	// will run on change
	autorun(() => {
		// on load check if there's an existing store on localStorage and extend the store
		if (firstRun) {
			const existingStore = store.get(name)
			if (existingStore) {
				set(_this, existingStore)
			}
		}

		// from then on serialize and save to localStorage
		store.set(name, toJS(_this))
	})

	firstRun = false
}