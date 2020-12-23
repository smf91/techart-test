// import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-state'
import { calculateAPI } from '../api/api'

const SET_TYPE_BUILDING = "SET_TYPE_BUILDING"
const SET_NUMBERS_OF_FLOORS = "SET_NUMBERS_OF_FLOORS"
const SET_WALL_SIZE = "SET_WALL_SIZE"
const SET_MATERIAL_BUILDING = "SET_MATERIAL_BUILDING"
const CANCEL_CHANGES = "CANCEL_CHANGES"

export type InitialStateType = {
    typeBuilding: string | null
    numbersOfFloors: number | null
    wallSize: Array<number> | null
    materialBuilding: string | null
    material: Array<object>

}

let initialState: InitialStateType = {
    typeBuilding: null,
    numbersOfFloors: null,
    materialBuilding: null,
    wallSize: null,
    material: [{ 1: "кирпич" }, { 2: "шлакоблок" }, { 3: "деревянный брус" }, { 4: "металл" }, { 5: "сендвич-панели" }]
}

const calculateReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_TYPE_BUILDING:
            return {
                ...state, typeBuilding: action.typeBuildingValue
            }
        case SET_NUMBERS_OF_FLOORS:
            return {
                ...state, numbersOfFloors: action.numbersOfFloorsValue
            }
        default:
            return state
    }
}
// --------------------------------
type ActionsTypes = SetNumbersOfFloorsActionType | SetNumbersOfFloorsActionType | SetWallSizeActionType
    | SetMaterialBuildingActionType | CancelChangesActionType
// --------------------------------
type SetTypeBuildingActionType = {
    type: typeof SET_TYPE_BUILDING,
    typeBuildingValue: string
}
export const setTypeBuilding = (typeBuildingValue: string): SetTypeBuildingActionType => ({ type: SET_TYPE_BUILDING, typeBuildingValue })

type SetNumbersOfFloorsActionType = {
    type: typeof SET_NUMBERS_OF_FLOORS,
    numbersOfFloorsValue: number
}
export const setNumbersOfFloors = (numbersOfFloorsValue: number): SetNumbersOfFloorsActionType => ({ type: SET_NUMBERS_OF_FLOORS, numbersOfFloorsValue })

type SetWallSizeActionType = {
    type: typeof SET_WALL_SIZE,
    WallSizeValue: number
}
export const setWallSize = (WallSizeValue: number): SetWallSizeActionType => ({ type: SET_WALL_SIZE, WallSizeValue })

type SetMaterialBuildingActionType = {
    type: typeof SET_MATERIAL_BUILDING,
    materialBuildingValue: string
}
export const setMaterialBuilding = (materialBuildingValue: string): SetMaterialBuildingActionType => ({ type: SET_MATERIAL_BUILDING, materialBuildingValue })

type CancelChangesActionType = {
    type: typeof CANCEL_CHANGES,
}
export const cancelChanges = (): CancelChangesActionType => ({ type: CANCEL_CHANGES })
// --------------------------------
// Thunk creater
// type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const calculateTC = (): ThunkType => async (dispatch: any) => {
    let data = await calculateAPI.calculate(initialState.typeBuilding, initialState.numbersOfFloors, initialState.materialBuilding, initialState.wallSize)
    if (data.resultCode === 0) {
        // сетаем статус в наш глобальный стейт
        // dispatch(setUserStatus(status))
        alert('thunk api')
    }
}

export default calculateReducer