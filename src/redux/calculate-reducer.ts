import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store'
import { calculateAPI } from '../api/api'

const SET_TYPE_BUILDING = "SET_TYPE_BUILDING"
const SET_NUMBERS_OF_FLOORS = "SET_NUMBERS_OF_FLOORS"
const SET_WALL_SIZE = "SET_WALL_SIZE"
const SET_MATERIAL_BUILDING = "SET_MATERIAL_BUILDING"
const SET_RESULT = "SET_RESULT"
const CANCEL_CHANGES = "CANCEL_CHANGES"
const SET_STEP_VALUE = "SET_STEP_VALUE"
const SET_RESULT_AND_MESSAGE_VALUE = "SET_RESULT_AND_MESSAGE_VALUE"

export type InitialStateType = {
    typeBuilding: number | null
    numbersOfFloors: number
    materialBuilding: number | null
    result: string | null
    message: string | null
    stepValue: number
    // resultError: boolean
    wallSize: Array<number> | null
    materialHouse: Array<materialItem>
    materialGarage: Array<materialItem>
}
type materialItem = {
    label: string
    value: number
}

let initialState: InitialStateType = {
    typeBuilding: null,
    numbersOfFloors: 1,
    materialBuilding: null,
    wallSize: null,
    result: null,
    stepValue: 0,
    message: null,
    materialHouse: [
        { label: "кирпич", value: 1 },
        { label: "шлакоблок", value: 2 },
        { label: "деревянный брус", value: 3 },
    ],
    materialGarage: [
        { label: "шлакоблок", value: 2 },
        { label: "металл", value: 4 },
        { label: "сендвич-панели", value: 5 }
    ]
}

const calculateReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case CANCEL_CHANGES:
            return {
                ...state,
                typeBuilding: null,
                numbersOfFloors: 1,
                materialBuilding: null,
                wallSize: null,
                result: null,
                stepValue: 0,
            }
        case SET_STEP_VALUE:
            return {
                ...state, stepValue: action.stepValue 
            }
        case SET_TYPE_BUILDING:
            return {
                ...state, typeBuilding: action.typeBuildingValue
            }
        case SET_NUMBERS_OF_FLOORS:
            return {
                ...state, numbersOfFloors: action.numbersOfFloorsValue
            }
        case SET_MATERIAL_BUILDING:
            return {
                ...state, materialBuilding: action.materialBuildingValue
            }
        case SET_WALL_SIZE:
            return {
                ...state, wallSize: action.wallSizeValue
            }
        case SET_RESULT_AND_MESSAGE_VALUE:
            return {
                ...state, 
                message: action.messageValue,
                result : action.resultValue
            }
        default:
            return state
    }
}
// --------------------------------
type ActionsTypes = SetNumbersOfFloorsActionType |  SetWallSizeActionType | setStepValueActionType | SetTypeBuildingActionType
    | SetMaterialBuildingActionType | CancelChangesActionType | SetResultActionType | setResultAndMessageActionType
// --------------------------------
type SetTypeBuildingActionType = {
    type: typeof SET_TYPE_BUILDING,
    typeBuildingValue: number
}
export const setTypeBuilding = (typeBuildingValue: number): SetTypeBuildingActionType => ({ type: SET_TYPE_BUILDING, typeBuildingValue })

type SetNumbersOfFloorsActionType = {
    type: typeof SET_NUMBERS_OF_FLOORS,
    numbersOfFloorsValue: number
}
export const setNumbersOfFloors = (numbersOfFloorsValue: number): SetNumbersOfFloorsActionType => ({ type: SET_NUMBERS_OF_FLOORS, numbersOfFloorsValue })

type SetWallSizeActionType = {
    type: typeof SET_WALL_SIZE,
    wallSizeValue: Array<number>
}
export const setWallSize = (wallSizeValue: Array<number>): SetWallSizeActionType => ({ type: SET_WALL_SIZE, wallSizeValue })

type SetMaterialBuildingActionType = {
    type: typeof SET_MATERIAL_BUILDING,
    materialBuildingValue: number
}
export const setMaterialBuilding = (materialBuildingValue: number): SetMaterialBuildingActionType => ({ type: SET_MATERIAL_BUILDING, materialBuildingValue })

type SetResultActionType = {
    type: typeof SET_RESULT,
    result: string
}
export const setResult = (result: string): SetResultActionType => ({ type: SET_RESULT, result })

type CancelChangesActionType = {
    type: typeof CANCEL_CHANGES,
}
export const cancelChanges = (): CancelChangesActionType => ({ type: CANCEL_CHANGES })

type setStepValueActionType = {
    type: typeof SET_STEP_VALUE,
    stepValue: number
}
export const setStepValue = (stepValue: number): setStepValueActionType => ({ type: SET_STEP_VALUE, stepValue })

type setResultAndMessageActionType = {
    type: typeof SET_RESULT_AND_MESSAGE_VALUE,
    messageValue: string
    resultValue: string
}
export const setResultAndMessage = (messageValue: string, resultValue: string): setResultAndMessageActionType => ({ type: SET_RESULT_AND_MESSAGE_VALUE, messageValue, resultValue })

// --------------------------------
// Thunk creater
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const calculateTC = (): ThunkType => async (dispatch: any, getState) => {
    let state = getState()
    let data = await calculateAPI.calculate(state.calculate.typeBuilding, state.calculate.numbersOfFloors, state.calculate.materialBuilding, state.calculate.wallSize)
    if (data.resultCode === 0) {
        alert('thunk api')
    } else {
        dispatch(setResultAndMessage(data.message, data.result))
    }
}

export const setTypeBuildingTC = (typeBuildingValue: number, stepValue: number): ThunkType => {
    return async (dispatch: any) => {
        dispatch(setStepValue(stepValue))
        dispatch(setTypeBuilding(typeBuildingValue))
    }
}
export const setNumbersOfFloorsTC = (numbersOfFloorsValue: number, stepValue: number): ThunkType => {
    return async (dispatch: any) => {
        dispatch(setStepValue(stepValue))
        dispatch(setNumbersOfFloors(numbersOfFloorsValue))
    }
}
export const setMaterialBuildingTC = (materialBuildingValue: number, stepValue: number): ThunkType => {
    return async (dispatch: any) => {
        dispatch(setStepValue(stepValue))
        dispatch(setMaterialBuilding(materialBuildingValue))
    }
}
export const setWallSizeTC = (wallSizeValue: Array<number>, stepValue: number): ThunkType => {
    return async (dispatch: any) => {
        dispatch(setStepValue(stepValue))
        dispatch(setWallSize(wallSizeValue))
        dispatch(calculateTC())
    }
}

export default calculateReducer