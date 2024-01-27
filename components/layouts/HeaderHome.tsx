import "../../styles/Header.css";

function Header() {
  const getMoment = () => {
    const dateTime = new Date().getHours();

    if (dateTime > 5 && dateTime < 12) {
      return "Buen día";
    } else if (dateTime > 12 && dateTime < 19) {
      return "Buenas tardes";
    } else {
      return "Buenas noches";
    }
  };

  const getDateFormated = () => {
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    const days = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];

    const dateTime = new Date();
    const day = days[dateTime.getDay()];
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();

    return `${day}, ${dateTime.getDay()} de ${month} de ${year}`;
  };

  return (
    <header id="Header" className=" h-96 w-full">
      <div className="flex justify-between px-8 py-4 font-light italic">
        <p>¡{getMoment().toUpperCase()}!</p>
        <i>{getDateFormated().toUpperCase()}</i>
      </div>
    </header>
  );
}

export default Header;
