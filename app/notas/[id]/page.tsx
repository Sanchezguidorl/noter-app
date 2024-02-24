import ListNotes from "@/components/Pages/Notas/ListNotes";
import NoteContent from "@/components/Pages/Notas/NoteContent";
import GetNotesProvider from "@/contexts/GetNotesProvider";
interface ParamsInterface {
  params: {
    id: string;
  };
}
function Notes({ params }: ParamsInterface) {
  return (
    <GetNotesProvider>
      <ListNotes id={params.id}/>
      <NoteContent id={params.id} />
    </GetNotesProvider>
  );
}

export default Notes;
