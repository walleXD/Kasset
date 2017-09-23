import { createAction } from 'redux-actions'
import { createAliasedAction } from 'electron-redux'

// import { __completedBoot } from './settings'
import { openDialog } from '../../main/lib/utils'

export const __openDialog = createAction(
  'library/OPEN_DIALOG',
  () => async () => {
    try {
      const file = await openDialog()
      if (file) console.log('file: ', file)
    } catch (e) {
      return null
    }
  }
)

export const _openDialog = createAliasedAction(
  'library/OPEN_DIALOG',
  () => __openDialog()
)

export default (state = {}, {type, payload}) => {
  switch (type) {
    case 'library/OPEN_DIALOG':
      return state
    default:
      return state
  }
}
