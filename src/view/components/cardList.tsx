
import { useTranslation } from 'react-i18next';
import Card from "./card";
import { cardsData } from "../../models/cardsData";

const CardsList = () => {
  const { t } = useTranslation();
  return (
    <div className="cards-container">
      {cardsData.map((card) => (
        <Card
          key={card.id}
          title={t(`cards.${card.id}.title`)}
          description={t(`cards.${card.id}.description`)}
          link={card.link}
          image={card.thumbnail}
          status={t(`cards.${card.id}.status`, { defaultValue: '' }) || undefined}
        />
      ))}
    </div>
  );
};

export default CardsList;
