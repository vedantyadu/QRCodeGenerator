import { useContext } from "react"
import { AppContext } from "./App"

function TypeButton(props) {
    const appContext = useContext(AppContext)

    return (
        <div className="relative mr-1 group">
            <button
                className={`h-8 px-6 ${props.tab == appContext.curTab? "bg-gradient-to-r from-grad-start to-grad-end text-transparent bg-clip-text": "text-grey-400"}`}
                onClick={() => {appContext.changeTab(props.tab)}}
            >
                {props.tab}
            </button>
            <span className={`absolute -bottom-1 left-0 w-full h-1 scale-x-0 rounded-full group-hover:scale-x-100 transition-all ${props.tab == appContext.curTab? "scale-x-100 bg-gradient-to-r from-grad-start to-grad-end": "scale-x-0 bg-grey-400"}`}></span>
        </div>

    )
}

export default TypeButton