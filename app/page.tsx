import Image from "next/image";
import "../styles/HomeLanding.css";
import ClipImg from "/public/clip-img.webp";
import StartLinkButton from "@/components/Buttons/StartLinkButton";

function Home() {
  return (
    <div id="HomeLanding" className="">
      <div className="min-h-96 flex flex-col justify-center bg-blur p-6 relative arise-animation">
        <h1 className=" text-center text-5xl font-bold text-clip-style uppercase flex flex-col">
          <strong className="mb-2">
            <i className="text-7xl">Noter</i>app{" "}
          </strong>
          Toma notas con estilo y facilidad
        </h1>
        <div className="absolute -top-10 -left-10 sm:-top-14 aspect-square w-40 sm:w-60 rotate-45 sm:-left-16">
          <Image src={ClipImg} alt="Clip de notas" />
        </div>
      </div>
      <section className="text-black uppercase text-sm sm:max-w-[800px] mx-auto px-6">
        <div className="my-10 w-full select-none hover:scale-110 transition-all duration-200">
          <div className="w-full sm:w-2/3 md:w-1/2 p-benefits relative arise-animation">
            <div className="absolute -top-2 aspect-square w-14 -left-5">
              <Image src={ClipImg} alt="Clip de notas" />
            </div>
            <p className=" overlay-p-note ">
              Explora la simplicidad de capturar y organizar tus ideas de manera
              ágil. Disfruta de una experiencia sin complicaciones al escribir y
              guarda al instante todos tus pensamientos. Simplifica tu proceso
              creativo y mantén tus ideas al alcance de tus manos de manera
              eficiente.
            </p>
          </div>
        </div>
        <div className="my-10 w-full select-none hover:scale-110 transition-all duration-200 flex justify-end">
          <div className="w-full sm:w-2/3 md:w-1/2 p-benefits relative arise-animation">
            <div className="absolute -top-2 aspect-square w-14 -left-5">
              <Image src={ClipImg} alt="Clip de notas" />
            </div>
            <p className=" overlay-p-note">
              Aumenta tu eficiencia y logra más al planificar y asignar fechas
              de vencimiento a tus tareas esenciales. Con nuestra aplicación,
              asegúrate de no dejar nada sin hacer y maximiza tu productividad.
              Programa tus actividades de manera intuitiva para mantener un
              control efectivo de tus responsabilidades diarias. ¡Haz que cada
              momento cuente y alcanza tus objetivos sin esfuerzo!
            </p>
          </div>
        </div>
        <div className="my-10 w-full select-none hover:scale-110 transition-all duration-200">
          <div className="w-full sm:w-2/3 md:w-1/2 p-benefits relative arise-animation">
            <div className="absolute -top-2 aspect-square w-14 -left-5">
              <Image src={ClipImg} alt="Clip de notas" />
            </div>
            <p className=" overlay-p-note">
              Optimiza tu organización personal al clasificar tus notas con
              nuestro sistema de libretas. Organiza tus ideas por temática para
              un acceso rápido y una experiencia sin complicaciones
            </p>
          </div>
        </div>
      </section>
      <StartLinkButton />
    </div>
  );
}

export default Home;
