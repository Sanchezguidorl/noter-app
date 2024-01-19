import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

function NavCompact() {
  return (
    <div className=" sm:hidden px-2 py-4 h-full bg-base relative">
      <div className="flex flex-col gap-3 items-center">
        <SearchIcon className="w-4 h-4" />
        <div className="relative">
          <AddIcon className="w-6 h-6 bg-primary-buttons  rounded-full" />
          <ul className="absolute top-0 left-full p-2  pl-4 z-30 bg-base rounded-md min-w-24 max-w-40 text-xs text-primary-buttons ">
            <li className="text-nowrap text-ellipsis overflow-hidden">
              Agregar nueva nota
            </li>
            <li className="text-nowrap text-ellipsis overflow-hidden">
              Agregar nueva tarea
            </li>
          </ul>
        </div>
        <HomeIcon className="w-4 h-4"/>

        <div className="relative">
        <CollectionsBookmarkIcon className="w-4 h-4" />
          <ul className="absolute top-0 left-full p-2  pl-4 z-30 bg-base rounded-md min-w-24 max-w-40 text-xs text-primary-buttons ">
            <li className="text-nowrap text-ellipsis overflow-hidden">
              Agregar nueva nota
            </li>
            <li className="text-nowrap text-ellipsis overflow-hidden">
              Agregar nueva tarea
            </li>
          </ul>
        </div>

        <div className="relative">
        <DescriptionIcon className="w-4 h-4" />
          <ul className="absolute top-0 left-full p-2  pl-4 z-30 bg-base rounded-md min-w-24 max-w-40 text-xs text-primary-buttons ">
            <li className="text-nowrap text-ellipsis overflow-hidden">
              Agregar nueva nota
            </li>
            <li className="text-nowrap text-ellipsis overflow-hidden">
              Agregar nueva tarea
            </li>
          </ul>
        </div>
        <DeleteIcon className="w-4 h-4" />
      </div>
    </div>
  );
}

export default NavCompact;
