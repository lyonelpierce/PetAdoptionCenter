import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { IconCalendar } from "@tabler/icons-react";

const PetCard = ({ pet, onOpenModal }) => {
  const handleClick = () => {
    onOpenModal(pet); // Call the onOpenModal callback with the pet object
  };

  return (
    <Card sx={{ flex: 1, borderRadius: 2 }}>
      <div className="flex flex-col h-full relative">
        <CardMedia
          component="img"
          image={`https://petadoptioncenter-production.up.railway.app/images/${pet.image}`}
          alt={pet.name}
          className="h-60"
        />
        <CardContent className="h-auto mb-10">
          <li className="flex flex-col justify-between h-full">
            <h1 className="text-xl font-medium flex justify-between">
              {pet.name}
              <div className="flex items-center">
                {pet.age}yr
                <IconCalendar />
              </div>
            </h1>
            <div>
              {pet.breed.name} {pet.type.name}
            </div>
            <div>{pet.genre}</div>
            <div className="flex-1">{pet.description}</div>
          </li>
        </CardContent>
        {pet.status && (
          <button
            onClick={handleClick}
            className="w-full h-12 bg-yellow-400 font-medium hover:bg-yellow-500 absolute bottom-0"
          >
            Adopt {pet.name}
          </button>
        )}
      </div>
    </Card>
  );
};

export default PetCard;
