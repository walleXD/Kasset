import { app, BrowserWindow } from 'electron'
import windowStateKeeper from 'electron-window-state'
import { forwardToRenderer } from 'electron-redux'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer'

import store from './lib/store'

const isDev = process.env.NODE_ENV !== 'production'

let mainWindow
let storybookWindow // eslint-disable-line no-unused-vars
let initialBoot = true

forwardToRenderer(store)

const createMainWindow = async () => {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  })

  if (initialBoot && isDev) {
    await installExtension([ REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS ])
    await require('devtron').install()
    initialBoot = false
  }

  const win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height
  })

  mainWindowState.manage(win)

  const url = isDev
    ? 'http://localhost:9080'
    : `file://${__dirname}/index.html`

  if (isDev) win.webContents.openDevTools()

  win.loadURL(url)

  win.on('closed', () => {
    mainWindow = null
  })

  return win
}

const createStorybookWindow = () => {
  const storybookWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800,
    file: 'storybook-window-state.json',
    path: app.getPath('userData')
  })

  const win = new BrowserWindow({
    x: storybookWindowState.x,
    y: storybookWindowState.y,
    width: storybookWindowState.width,
    height: storybookWindowState.height
  })

  storybookWindowState.manage(win)

  const url = 'http://localhost:9009'

  win.loadURL(url)

  win.on('closed', () => {
    storybookWindow = null
  })

  return win
}

app.on('window-all-closed', () => {
  // On macOS it is common for applications to stay open
  // until the user explicitly quits
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it is common to re-create a window
  // even after all windows have been closed
  if (mainWindow === null) mainWindow = createMainWindow()
  if (storybookWindow === null) storybookWindow = createStorybookWindow()
})

// Create main BrowserWindow when electron is ready
app.on('ready', () => {
  if (isDev) storybookWindow = createStorybookWindow()
  mainWindow = createMainWindow()
})
