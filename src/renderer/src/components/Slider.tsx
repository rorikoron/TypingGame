import style from '@renderer/style/Slider.module.scss';
import { useEffect, useState } from 'react';

interface SliderProps{
    limit: number,
    value: number,
    color: string
}

export const Slider : React.FC<SliderProps> = ({ limit, value, color }) => {
    const ratio = value / limit * 100;


    return(
        <>
            <label className={`${style.label}`}>{value}/{limit}</label>
            <input type="range" min="0" max={limit} value={value} className={`${style.slider}`}
            style={{ background: `linear-gradient(90deg, ${color} ${ratio}%, transparent ${ratio}%`}}/>
        </>
    )
}   
