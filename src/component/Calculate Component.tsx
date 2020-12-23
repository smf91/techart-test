import React, { useState } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import { Radio } from 'antd'
import cls from './Calculate-Component.module.scss'
import {AppStateType} from '../redux/redux-store'
import {cancelChanges} from '../redux/calculate-reducer'



//-----TYPE BLOCK
type MapStateToPropsType = {
    // users: Array <any>,
    // pageSize: number,
    // totalUsersCount: number
    // currentPage: number,
    // isFetching: boolean,
    // followingInProgress: Array<number>
}
type MapDispathPropsType= {
    cancelChanges: ()=> void
    // getUsersTC: (currentPage: number, pageSize: number) => void,
    // onPageChangetTC: (currentPage: number, pageSize: number) => void,
    // followTC:(userID: number)=> void,
    // unfollowTC:(userID: number)=> void      
}
type OwnPropsType={}

type PropsType = MapStateToPropsType & MapDispathPropsType & OwnPropsType

// ----------


const CalculateComponent: React.FC<PropsType>  = ({cancelChanges, ...props }) => {
    const [stepValue, setStepValue] = useState(1)

    const swichStep = (stepValue: number): any => {
        switch (stepValue) {
            case 1:
                return Step1
            case 2:
                return Step2
            case 3:
                return Step3
            case 4:
                return Step4
            case 5:
                return Step5
            // default:
            //     return Step2
        }
    }

    const SomeTag = swichStep(stepValue)
    return (
        <>
            <div className={cls.calculateBlock}>
                <div className={cls.titleBlock}>
                    <span>Калькулятор цены конструкции</span>
                </div>
                {
                    (stepValue === 0 || stepValue > 5)
                        ? <>
                            <span>результат</span>
                            <div className={cls.formBlock}>
                                ssssssss
                            </div>
                            <div className={cls.buttonBlock}>
                                <button>Начать расчет</button>
                            </div>
                        </>
                        : <SomeTag cancelChanges={cancelChanges} />
                }
            </div>
        </>
    )
}

const Step1 = () => {

    const [value, setValue] = React.useState(1);

    const onChange = (e : any) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    return (
        <>
            <span></span>
            <div className={cls.formBlock}>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Жилой дом</Radio>
                    <Radio value={2}>Гараж</Radio>
                </Radio.Group>
            </div>
            <div className={cls.buttonBlock}>
                <button>Отменить</button>
                <button>Далее</button>
            </div>
        </>
    )
}

const Step2 = () => {
    return (
        <>
            <div className={cls.formBlock}>
                123
            </div>
            <div className={cls.buttonBlock}>
                <button>Начать расчет</button>
            </div>
        </>
    )
}

const Step3 = () => {
    return (
        <>
            <div className={cls.formBlock}>
                123
            </div>
            <div className={cls.buttonBlock}>
                <button>Начать расчет</button>
            </div>
        </>
    )
}
const Step4 = () => {
    return (
        <>
            <div className={cls.formBlock}>
                123
            </div>
            <div className={cls.buttonBlock}>
                <button>Начать расчет</button>
            </div>
        </>
    )
}

const Step5 = () => {
    return (
        <>
            <div className={cls.formBlock}>
                123
            </div>
            <div className={cls.buttonBlock}>
                <button>Начать расчет</button>
            </div>
        </>
    )
}


const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {

    }
}

export default compose(
    connect<MapStateToPropsType, MapDispathPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, {
        cancelChanges
    })
)
    (CalculateComponent)