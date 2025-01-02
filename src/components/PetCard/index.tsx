import { Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

export default function PetCard({ pet }: { pet: any }) {
  return (
    <div key={pet._id} className="flex gap-4 p-4 border rounded-md">
      <img
        src={pet.picture}
        className="rounded-md object-cover min-h-20 min-w-20 h-20 w-20"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <p>{pet.name}</p>

          <div className="flex gap-4">
            <Link to={`/pet/${pet._id}`}>
              <IoIosInformationCircleOutline />
            </Link>
            <Link to={`/edit-pet/${pet._id}`}>
              <FaRegEdit />
            </Link>
          </div>
        </div>

        <p>{pet.type}</p>
        <p>{pet.breed}</p>
        <p>{Intl.DateTimeFormat("pt-BR").format(new Date(pet.birthdate))}</p>
      </div>
    </div>
  );
}
