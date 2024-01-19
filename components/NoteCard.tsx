import "../styles/NoteCard.css";

function NoteCard() {
  return (
    <div
      id="NoteCard"
      className=" bg-primary h-full max-h-full w-40 min-w-40 rounded-xl p-2 relative"
    >
      <p>Title</p>
      <div className="content-card overflow-y-hidden h-36">
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
          obcaecati sunt excepturi laboriosam ipsa quod facilis repellendus
          nobis illum, saepe consectetur recusandae officiis cupiditate deserunt
          libero molestias debitis ut nemo!
        </p>
      </div>
      <p className=" text-secondary-text absolute bottom-2">3 ene</p>
    </div>
  );
}

export default NoteCard;
