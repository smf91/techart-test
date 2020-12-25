import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Radio, InputNumber, Col, Row } from 'antd'
import cls from './Calculate-Component.module.scss'
import store, { AppStateType } from '../redux/redux-store'
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
    cancelChanges: () => void
    setStepValue: () => void
    setTypeBuilding: (typeBuilding: number) => void
    setTypeBuildingTC: (typeBuilding: number) => void
    setNumbersOfFloors: (numbersOfFloorsValue: number) => void
    setNumbersOfFloorsTC: (numbersOfFloorsValue: number) => void
    setMaterialBuildingTC: (materialBuildingValue: number) => void
    setWallSizeTC: (wallSizeValue: Array<number>) => void
    calculateTC: () => void
}
type OwnPropsType = {
    setBuildingType?: (typeBuilding: number) => void
}

type PropsType = MapStateToPropsType & MapDispathPropsType & OwnPropsType

// ----------


const CalculateComponent: React.FC<PropsType> = ({ result, message, materialHouse, materialGarage, typeBuilding, setNumbersOfFloors, setMaterialBuildingTC,
    cancelChanges, setTypeBuildingTC, setNumbersOfFloorsTC, setWallSizeTC, calculateTC, ...props }) => {
    const swichStep = (stepValue: number): any => {
        switch (stepValue) {
            case 1:
                return Step1
            case 2:
                if (typeBuilding === 1) {
                    return Step2
                } else {
                    setNumbersOfFloorsTC(1)
                    break
                }
            case 3:
                return Step3
            case 4:
                return Step4
            case 5:
                return Step5
            // default:
            //     return Step1
        }
    }
    const nextStep = (): void => {
        props.setStepValue()
    }
    const SomeTag = swichStep(props.stepValue)
    return (
        <>
            <div className={cls.calculateBlock}>
                <div className={cls.titleBlock} >
                    <span>Калькулятор цены конструкции</span>
                </div>
                {
                    (props.stepValue === 0 || props.stepValue > 5)
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
                                <button onClick={nextStep}>Начать расчет</button>
                            </div>
                        </>
                        : <SomeTag setTypeBuildingTC={setTypeBuildingTC} cancelChanges={cancelChanges}
                            setNumbersOfFloorsTC={setNumbersOfFloorsTC} materialGarage={materialGarage}
                            materialHouse={materialHouse} setMaterialBuildingTC={setMaterialBuildingTC}
                            typeBuilding={typeBuilding} setWallSizeTC={setWallSizeTC} calculateTC={calculateTC}
                            message={message} result={result}
                        />
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
                <button onClick={() => { setTypeBuildingTC(value) }}>Далее</button>
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
                <button onClick={() => { setNumbersOfFloorsTC(value) }}>Далее</button>
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
                <button onClick={() => { setMaterialBuildingTC(value) }}>Далее</button>
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
                <button onClick={() => { setWallSizeTC([valueX, valueY]) }}>Рассчитать</button>
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
                <button onClick={cancelChanges}>Завершить</button>
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