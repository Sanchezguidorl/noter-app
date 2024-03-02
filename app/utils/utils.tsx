import { Dispatch, SetStateAction } from "react";

export const readDate=(date:number)=>{
    const fullDate= new Date(date);
    const months= ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return `${fullDate.getDate()} ${months[fullDate.getMonth()]?.slice(0,3)}/${fullDate.getFullYear()}`
    }

 export function validateWhitespaceString(data:string, message:string) {
        if (/^\s*$/.test(data)) {
            throw new Error(message);
        }

        return;
    }