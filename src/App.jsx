import { QRCodeSVG } from "qrcode.react"
import { useState, createContext, useRef, useCallback, useEffect } from "react"
import Nav from "./Nav"
import Tab from "./Tab"
import Github from "./assets/Github"

const tabs = ["Wifi", "URL"]
export const AppContext = createContext(null)
let interval = null

function randomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function App() {
  const [curTab, changeTab] = useState(tabs[0])
  const [qr, changeQr] = useState("")
  const [fakeQr, changeFakeQr] = useState(randomString(15))
  const values = useRef({wifi: {ssid: "", password: ""}, url: {url: ""}})
  const svgRef = useRef(null);

  useEffect(() => {
    if (qr == "") {
      interval = setInterval(() => {
        changeFakeQr(randomString(15))
      }, 1000)
    }
    else {
      clearInterval(interval)
    }
  }, [qr])

  const downloadSVG = () => {
    // Create Image
    const img = new Image()

    // Convert svg node to xml string
    var xml = new XMLSerializer().serializeToString(svgRef.current.firstChild)
    console.log(xml)
    var svg64 = btoa(xml)
    var b64Start = 'data:image/svg+xml;base64,'
    var image64 = b64Start + svg64

    // Load svg to image
    img.src = image64
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.height = img.height
      canvas.width = img.width
      const canvasCtx = canvas.getContext('2d')
      canvasCtx.drawImage(img, 0, 0)
      var link = document.createElement('a')
      link.download = 'qrcode.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }
  
  return (
    <AppContext.Provider value={{curTab, changeTab, tabs, changeQr, values, svgRef}}>
      <div className="rounded-3xl md:w-full md:min-h-full overflow-y-auto w-[900px] md:rounded-none bg-gradient-to-r from-grey-700 to-grey-800 p-10 grid grid-rows-[auto_1fr_auto] md:grid-rows-[repeat(2,_auto)_1fr] md:grid-cols-1 grid-cols-2 gap-y-10">
          <div className="md:col-span-1 col-span-2">
            <Nav/>
          </div>
          <div className="flex flex-col md:pr-0 md:border-0 pr-10 border-r-2 border-grey-600">
            <Tab/>
          </div>
          <div className="flex flex-col items-center md:pl-0 md:border-0 pl-10 border-l-2 border-grey-600">
            <div ref={svgRef} className="w-3/6 mr-0 md:mt-20">
              <QRCodeSVG className="w-full h-auto rounded-md" bgColor="#101216" fgColor={qr==""?"#24252B":"#6F7175"} value={qr==""?fakeQr:qr} size={512}/>
            </div>
            <p className={`text-grey-400 mt-10`}>{qr==""?"Generate a QR code": "Your QR code"}</p>
            <button onClick={downloadSVG} className={`${qr==""?"invisible":""} w-4/6 mt-10 rounded-md px-8 py-1 border-2 border-grey-400 bg-grey-900 text-grey-400 md:mt-20`}>Download</button>
          </div>
          <a href="https://github.com/vedantyadu" className="flex justify-center items-center md:col-span-1 col-span-2 mt-20"><Github cls="w-6"/></a>
      </div>
    </AppContext.Provider>
  )
}

export default App
