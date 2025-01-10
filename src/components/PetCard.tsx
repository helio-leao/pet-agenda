import { Link } from "react-router-dom";
import { FaRegEdit, FaArrowRight } from "react-icons/fa";
import picturePlaceholder from "../assets/picture-placeholder.svg";
import Pet from "../types/Pet";
import { ageString } from "../utils/timeCalculations";

type PetCardProps = {
  pet: Pet;
};

export default function PetCard({ pet }: PetCardProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-md">
      <img
        src={pet.picture || picturePlaceholder}
        className="rounded-md object-cover min-h-20 min-w-20 h-20 w-20"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <p>{pet.name}</p>

          <div className="flex gap-4">
            <Link to={`/pets/${pet._id}/edit`}>
              <FaRegEdit />
            </Link>
            <Link to={`/pets/${pet._id}`}>
              <FaArrowRight />
            </Link>
          </div>
        </div>

        <p>
          {ageString(pet.birthdate)} (
          {Intl.DateTimeFormat("pt-BR").format(new Date(pet.birthdate))})
        </p>
      </div>
    </div>
  );
}
