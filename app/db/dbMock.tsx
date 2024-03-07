import { ReactNode } from "react"

 export interface NoteInNotebookI{
    
      title:string,noteId:string
    
  }

export interface NoteI{
  title: string, id: string,date:number, content:string, userId:string
}

 export interface NotebookDataI{
     title: string, id:string, notes:NoteInNotebookI[]
  }

  export interface NotebookDropDownMenuI{
    itemCategoryName:string,
    icon:ReactNode
  }
  
  export interface TasksI{
    id:string, toDo:string, limitDate:number, done:boolean , userId:string
  }

  export interface NotebookI{
    title:string, notes:{id:string, title:string}[], id:string, userId:string
  }

  export interface UserCreateAndLoginFormInputs {
    email: string;
    password: string;
  }