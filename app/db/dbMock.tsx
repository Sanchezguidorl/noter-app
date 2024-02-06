
import DescriptionIcon from '@mui/icons-material/Description';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { ReactNode } from 'react';
export const  dbMockNotes= {
    linkAdd: "notas",
    icon:'' ,
    listItems: [
      { title: "What is Lorem Ipsum?", itemId: "id1",date:'12/10/2024', content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
      { title: "Why do we use it?", itemId: "id2",date:'12/10/2024', content:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." },
      { title: "Where does it come from?", itemId: "id3",date:'12/10/2024', content:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of " },
      { title: "Where can I get some?", itemId: "id4",date:'12/10/2024', content:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc." },
      { title: "Where does it come Nota", itemId: "id5",date:'12/10/2024', content:"Donec quam quam, rutrum quis mauris vitae, congue lobortis arcu. Vestibulum eget bibendum nisl. Vestibulum a lacus vel odio blandit laoreet et nec quam. Duis cursus, diam vitae tempor sodales, nunc enim cursus ligula, vel aliquet enim magna sed eros. Nullam sed diam metus. Maecenas blandit porttitor mi, nec eleifend metus vestibulum nec. Cras quis luctus ipsum. Ut ac lobortis quam, eget fermentum orci. Nulla consequat dui ac bibendum viverra. Maecenas eu est mattis, consequat turpis sed, finibus ligula. Integer elementum velit at neque lobortis, non vehicula tortor feugiat. Morbi semper, justo ut porta semper, ligula justo luctus justo, et ultrices sapien lorem non turpis. Donec eleifend, est quis dapibus vestibulum, sapien tellus efficitur nulla, ac blandit eros enim consequat nibh. In luctus lorem ante, et viverra orci elementum in. Sed eu nunc vel erat pulvinar elementum. Duis in varius nisi." },
    ],
  };
;


 export interface NoteInNotebookI{
    
      title:string,noteId:string
    
  }

export interface NoteI{
  title: string, id: string,date:string, content:string
}
  
 export interface NotesDataI{
    
      icon:ReactNode,listItems:NoteI[]
    
  }


 export interface NotebookDataI{
     title: string, id:string, notes:NoteInNotebookI[]
  }

  export interface NotebookDropDownMenuI{
    itemCategoryName:string,
    listItems:NotebookDataI[],
    icon:ReactNode
  }
  