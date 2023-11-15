import { TodoType } from "../types"
import { CheckedSvg } from "./svg/checked-svg"
import { TrashSvg } from "./svg/trash-svg"
import { UncheckedSvg } from "./svg/unchecked-svg"

export const Todo = ({ description, done }: TodoType) => {
    return (
        <div id="task" className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent">
            <div className="inline-flex items-center space-x-2">
                <div>
                    {done ? <CheckedSvg /> : <UncheckedSvg />}
                </div>
                <div className={done ? "text-slate-500 line-through" : ""}>{description}</div>
            </div>
            <div>
                <TrashSvg />
            </div>
        </div>
    )
}