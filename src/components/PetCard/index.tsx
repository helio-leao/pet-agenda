import { Link } from "react-router-dom";

export default function PetCard({ pet }: { pet: any }) {
  return (
    <div
      key={pet._id}
      style={{
        display: "flex",
        gap: 10,
        padding: 10,
        borderWidth: 1,
        borderStyle: "solid",
      }}
    >
      <img
        src={pet.picture}
        style={{ objectFit: "cover" }}
        height="80px"
        width="80px"
      />
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>{pet.name}</p>

          <div style={{ display: "flex", gap: 10 }}>
            <Link to={`/pet/${pet._id}`}>Details</Link>
            <Link to={`/edit-pet/${pet._id}`}>Edit</Link>
          </div>
        </div>

        <p>{pet.type}</p>
        <p>{pet.breed}</p>
        <p>{pet.birthdate}</p>
      </div>
    </div>
  );
}
