import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Radio, InputNumber, Col, Row } from 'antd'
import cls from './Calculate-Component.module.scss'
import { AppStateType } from '../redux/redux-store'
import {
    cancelChanges, setStepValue, setTypeBuilding, setTypeBuildingTC, setNumbersOfFloorsTC,
    setMaterialBuildingTC, setNumbersOfFloors, setWallSizeTC, calculateTC
} from '../redux/calculate-reducer'

//-----TYPE BLOCK
type MapStateToPropsType = {
    stepValue: number
    message: string | null
    result: string | null
    typeBuilding: number | null
    materialHouse: Array<object>
    materialGarage: Array<object>
}
type MapDispathPropsType = {
    setStepValue: (stepValue: number) => void
    setTypeBuilding: (typeBuilding: number) => void
    setNumbersOfFloors: (numbersOfFloorsValue: number) => void
    cancelChanges: () => void
    setTypeBuildingTC: (typeBuilding: number, stepValue: number) => void
    setNumbersOfFloorsTC: (numbersOfFloorsValue: number, stepValue: number) => void
    setMaterialBuildingTC: (materialBuildingValue: number, stepValue: number) => void
    setWallSizeTC: (wallSizeValue: Array<number>, stepValue: number) => void
    calculateTC: () => void
}
type OwnPropsType = {
    setBuildingType?: (typeBuilding: number) => void
}

type PropsType = MapStateToPropsType & MapDispathPropsType & OwnPropsType

// ----------
const CalculateComponent: React.FC<PropsType> = ({ setStepValue, stepValue, result, message, materialHouse,
                                                materialGarage, typeBuilding, setNumbersOfFloors, setMaterialBuildingTC,
                                                cancelChanges, setTypeBuildingTC, setNumbersOfFloorsTC, setWallSizeTC,
                                                calculateTC,setTypeBuilding, ...props }) => {

    const swichStep = (stepValue: number): any => {
    let steps = [0, Step1, Step2, Step3, Step4, Step5]
        if (typeBuilding === 2 && stepValue === 2) {
            setStepValue(3)
            stepValue++} 
            return steps[stepValue]
        }

    const SomeTag = swichStep(stepValue)
    return (
        <>
            <div className={cls.calculateBlock}>
                <div className={cls.titleBlock} >
                    <span>Калькулятор цены конструкции</span>
                </div>
                {
                    (stepValue === 0)
                        ? <>
                            {
                                (message && result)
                                    ? <div className={cls.contentBlock}>
                                        <span>{result}</span>
                                        <div className={cls.formBlock}>
                                            {message}
                                        </div>
                                    </div>
                                    : <div>  </div>
                            }
                            <div className={cls.buttonBlock}>
                                <button onClick={()=>{setStepValue(1)}}>Начать расчет</button>
                            </div>
                        </>
                        : <SomeTag stepValue={stepValue} setTypeBuildingTC={setTypeBuildingTC} cancelChanges={cancelChanges}
                            setNumbersOfFloorsTC={setNumbersOfFloorsTC} materialGarage={materialGarage}
                            materialHouse={materialHouse} setMaterialBuildingTC={setMaterialBuildingTC}
                            typeBuilding={typeBuilding} setWallSizeTC={setWallSizeTC} calculateTC={calculateTC}
                            message={message} result={result} setNumbersOfFloors={setNumbersOfFloors} 
                            setTypeBuilding={setTypeBuilding} setStepValue={setStepValue}/>
                }
            </div>
        </>
    )
}

const Step1: React.FC<PropsType> = ({ cancelChanges, setTypeBuildingTC, ...props }) => {
    const [value, setValue] = React.useState(1);
    const onChange = (e: any) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    }
    return (
        <>
            <div className={cls.contentBlock}>
                <div className={cls.contentTitle}>
                    <span>Шаг </span>
                    <br />
                    <span>Выберите тип здания</span>
                </div>
                <div className={cls.formBlock}>
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={1}>Жилой дом</Radio>
                        <Radio value={2}>Гараж</Radio>
                    </Radio.Group>
                </div>
            </div>
            <div className={cls.button2Block}>
                <button onClick={cancelChanges}>Отменить</button>
                <button onClick={() => { setTypeBuildingTC(value , 2) }}>Далее</button>
            </div>
        </>
    )
}

const Step2: React.FC<PropsType> = ({ cancelChanges, setNumbersOfFloorsTC, typeBuilding, ...props }) => {
    const [value, setValue] = React.useState(1);
    const onChange = (e: any) => {
        setValue(e);
    }
    return (
        <>
            <div className={cls.contentBlock}>
                <div className={cls.contentTitle}>
                    <span>Шаг </span>
                    <br />
                    <span>Выберите количество этажей</span>
                </div>
                <div className={cls.formBlock}>
                    <InputNumber min={1} max={99} defaultValue={1} onChange={onChange} />
                </div>
            </div>
            <div className={cls.button2Block}>
                <button onClick={cancelChanges}>Отменить</button>
                <button onClick={() => { setNumbersOfFloorsTC(value, 3) }}>Далее</button>
            </div>
        </>
    )
}

const Step3: React.FC<PropsType> = ({ setMaterialBuildingTC, cancelChanges, materialGarage, materialHouse, typeBuilding, ...props }) => {
    const options: Array<object> = (typeBuilding === 1) ? materialHouse : materialGarage
    const [value, setValue] = React.useState(0);
    const onChange = (e: any) => {
        setValue(e.target.value);
    }
    return (
        <>
            <div className={cls.contentBlock}>
                <div className={cls.contentTitle}>
                    <span>Шаг </span>
                    <br />
                    <span>Выберите материал</span>
                </div>
                <div className={cls.formBlock}>
                    <Radio.Group onChange={onChange} size="large">
                        <Row>
                            {options.map((element: any) => {
                                return (
                                    <Col key={element.value}>
                                        <Radio.Button value={element.value}>{element.label}</Radio.Button>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Radio.Group>
                </div>
            </div>
            <div className={cls.button2Block}>
                <button onClick={cancelChanges}>Отменить</button>
                <button onClick={() => { setMaterialBuildingTC(value, 4) }}>Далее</button>
            </div>
        </>
    )
}

const Step4: React.FC<PropsType> = ({ setWallSizeTC, cancelChanges, ...props }) => {
    const [valueX, setValueX] = React.useState(1);
    const onChangeX = (e: any) => {
        setValueX(e);
    }
    const [valueY, setValueY] = React.useState(1);
    const onChangeY = (e: any) => {
        setValueY(e);
    }
    return (
        <>
            <div className={cls.contentBlock}>
                <div className={cls.contentTitle}>
                    <span>Шаг </span>
                    <br />
                    <span>Выберите размер стены</span>
                </div>
                <div className={cls.formBlock}>
                    <span>длинна</span>
                    <InputNumber min={1} max={99} defaultValue={1} onChange={onChangeX} />
                    <span>высота</span>
                    <InputNumber min={1} max={99} defaultValue={1} onChange={onChangeY} />
                </div>
            </div>
            <div className={cls.button2Block}>
                <button onClick={cancelChanges}>Отменить</button>
                <button onClick={() => { setWallSizeTC([valueX, valueY], 5) }}>Рассчитать</button>
            </div>
        </>
    )
}

const Step5: React.FC<PropsType> = ({ message, result, cancelChanges, ...props }) => {
    return (
        <>
            <div className={cls.contentBlock}>
                <div className={cls.contentTitle}>
                    <span>{result}</span>
                </div>
                <div className={cls.formBlock}>
                    <span>{message}</span>
                </div>
            </div>
            <div className={cls.buttonBlock}>
                <button onClick={cancelChanges}>Новый расчет</button>
            </div>
        </>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        stepValue: state.calculate.stepValue,
        message: state.calculate.message,
        result: state.calculate.result,
        typeBuilding: state.calculate.typeBuilding,
        materialHouse: state.calculate.materialHouse,
        materialGarage: state.calculate.materialGarage
    }
}
// -----------------------------------------------------------------------------
export default compose(
    connect<MapStateToPropsType, MapDispathPropsType, OwnPropsType, AppStateType>
        (mapStateToProps, {
            cancelChanges,
            setStepValue,
            setTypeBuilding,
            setTypeBuildingTC,
            setNumbersOfFloorsTC,
            setMaterialBuildingTC,
            setNumbersOfFloors,
            setWallSizeTC,
            calculateTC
        })
)
    (CalculateComponent)