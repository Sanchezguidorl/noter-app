import DialogOptions from "./layouts/DialogOptions";
import "../styles/BlogNotes.css";

function BlogNotes() {
  return (
    <div
      id="BlogNotes"
      className="h-80 w-full sm:w-1/3 bg-interactive rounded-xl p-4"
    >
      <div className="relative">
        <p>BLOG DE NOTAS</p>
        <div className="absolute right-2 top-0">
          <DialogOptions />
        </div>
      </div>
      <div className=" h-60">
        <textarea
          name=""
          id=""
          className=" bg-interactive font-light text-xs h-full pt-2 w-full text-secondary-text"
          placeholder="Escribe un texto"
        ></textarea>
      </div>
    </div>
  );
}

export default BlogNotes;
