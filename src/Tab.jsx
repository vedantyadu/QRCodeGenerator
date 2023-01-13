import { useContext } from "react"
import { AppContext } from "./App"

function showTab() {

    const appContext = useContext(AppContext)

    const handleChange = (e, ref, name) => {
        ref[name] = e.target.value
    }

    if (appContext.curTab == appContext.tabs[0]) {
        return (
            <>
                <input className="input" key="ssid" placeholder="SSID" onChange={(e) => {handleChange(e, appContext.values.current.wifi, "ssid")}}></input>
                <input className="input" key="password" type="password" placeholder="Password" onChange={(e) => {handleChange(e, appContext.values.current.wifi, "password")}}></input>
            </>
        )
    }
    else if (appContext.curTab == appContext.tabs[1]) {
        return (
            <>
                <input className="input" key="url" placeholder="URL" onChange={(e) => {handleChange(e, appContext.values.current.url, "url")}}></input>
            </>
        )
    }
}


function Tab() {
    const appContext = useContext(AppContext)
    const genQR = () => {
        if (appContext.curTab == appContext.tabs[0]) {
            const string = `WIFI:S:${appContext.values.current.wifi.ssid};T:WPA;P:${appContext.values.current.wifi.password};;`
            appContext.changeQr(string)
        }
        else if (appContext.curTab == appContext.tabs[1]) {
            const string = appContext.values.current.url.url
            appContext.changeQr(string)
        }
    }
    return (
        <>
            {showTab()}
            <button className="rounded-md w-full px-4 py-2 text-white mt-6 bg-gradient-to-r from-grad-start to-grad-end" onClick={genQR}>Generate</button>
        </>
    )
}


export default Tab
