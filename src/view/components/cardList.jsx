import React from "react";
import Card from "./card";
import { cardsData } from "../../models/cardsData";
import "../../styles/cardList.scss";

const CardsList = () => {
  return (
    <div className="cards-container">
      {cardsData.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          image={card.image}
          link={card.link}
        />
      ))}
    </div>
  );
};

export default CardsList;
