import TypeButton from "./Typebutton" 
import { useContext } from "react"
import { AppContext } from "./App"

function Nav() {
    const appContext = useContext(AppContext)

    return (
        <div className="flex items-center text-base">
            {appContext.tabs.map((tab, i) => {
                return <TypeButton key={i} tab={tab}/>
            })}
        </div>
    )
}

export default Nav
