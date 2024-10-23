import { gameVariableAtom, gameVariableProps } from "@renderer/util/GameAtom";
import { useRecoilState } from "recoil";

export interface SkillProps{
    name: string,
    path: string,
    explanation: string,
    effect: () => void
}


export default function useSkill(){
    const [gameVariable, setGameVariable] = useRecoilState<gameVariableProps>(gameVariableAtom);
    const AdvancedFormula = (x: number) => 0.5*x*x + 2.5*x + 15;


    /*
    * IDEAS:
    * NO-miss streak
    */
    const skills : SkillProps[] = [
        {
            name: "No Poverty",
            path: "/sdgs/E-WEB-Goal-01.png",
            explanation: "Get score x 1.25",
            effect: () => { setGameVariable(p => ({...p, ScoreRatio: 125})) }, 
        }, {
            name: "Zero Hunger",
            path: "/sdgs/E-WEB-Goal-02.png",
            explanation: "",
            effect: () => {}, 
        }, {
            name: "Good Health and Well-being",
            path: "/sdgs/E-WEB-Goal-03.png",
            explanation: "Get less damage when Miss-typing",
            effect: () => { setGameVariable(p => ({...p, DamageRatio: 0.4})) }, 
        }, {
            name: "Quality Education",
            path: "/sdgs/E-WEB-Goal-04.png",
            explanation: "Need less EXP to level-up",
            effect: () => { setGameVariable(p => ({...p, ExpFormula: AdvancedFormula})) }, 
        }, {
            name: "Gender Equality",
            path: "/sdgs/E-WEB-Goal-05.png",
            explanation: "",
            effect: () => {}, 
        }, {
            name: "Clean Water and Sanitation",
            path: "/sdgs/E-WEB-Goal-06.png",
            explanation: "",
            effect: () => {}, 
        }, {
            name: "Affordable and Clean Energy",
            path: "/sdgs/E-WEB-Goal-07.png",
            explanation: "",
            effect: () => {}, 
        }, {
            name: "Descent Work and Economic Growth",
            path: "/sdgs/E-WEB-Goal-08.png",
            explanation: "Get EXP x 1.2",
            effect: () => { setGameVariable(p => ({...p, ExpRatio: 1.2})) }, 
        }, {
            name: "Industry, Innovation and Infrastructure",
            path: "/sdgs/E-WEB-Goal-09.png",
            explanation: "One more Candidate while level-up",
            effect: () => { setGameVariable(p => ({...p, MenuCount: 4})) }, 
        }, {
            name: "Reduced Inequalities",
            path: "/sdgs/E-WEB-Goal-10.png",
            explanation: "",
            effect: () => {}, 
        }, {
            name: "Sustainable Cities and Communities",
            path: "/sdgs/E-WEB-Goal-11.png",
            explanation: "",
            effect: () => {}, 
        }, {
            name: "Responsible Consumption and Production",
            path: "/sdgs/E-WEB-Goal-12.png",
            explanation: "",
            effect: () => {}, 
        }, {
            name: "Climate Action",
            path: "/sdgs/E-WEB-Goal-13.png",
            explanation: "",
            effect: () => {}, 
        }, {
            name: "Life below Water",
            path: "/sdgs/E-WEB-Goal-14.png",
            explanation: "",
            effect: () => {}, 
        }, {
            name: "Life on Land",
            path: "/sdgs/E-WEB-Goal-15.png",
            explanation: "",
            effect: () => {}, 
        }, {
            name: "Peace Justice and Institutions",
            path: "/sdgs/E-WEB-Goal-16.png",
            explanation: "Allow miss-typing shiled every 10 seconds",
            effect: () => {}, 
        }, {
            name: "Partnerships for The Goals",
            path: "/sdgs/E-WEB-Goal-17.png",
            explanation: "Add 30 seconds",
            effect: () => { setGameVariable(p => ({...p, AdditionalTime: 30})) }, 
        }, 
    ]


    return { skills }
}