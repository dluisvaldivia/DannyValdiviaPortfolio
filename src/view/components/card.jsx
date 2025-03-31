import React from "react";
import "../../styles/_card.scss";

export default function Card({ title, description, image, link }) {
    return (
        <article className="card" tabIndex="0" aria-labelledby={`card-title-${title}`}>
            {image && <img src={image} alt={`${title} thumbnail`} className="card__image" />}
            <div className="card__content">
                <h2 id={`card-title-${title}`} className="card__title">{title}</h2>
                <p className="card__description">{description}</p>
                {link && (
                    <a href={link} className="card__link" aria-label={`follow link to ${title}`}>
                        Visit {title}
                    </a>
                )}
            </div>
        </article>
    );
}
