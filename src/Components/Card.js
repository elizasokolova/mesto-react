export default function Card(props) {
    const handleCardClick = () => props.onCardClick(props.card)
    return (
        <article className="card">
            <img className="card__image" onClick={handleCardClick} alt={`Фотография ${props.card.name}`}
                 src={props.card.link} data-default-src="<%=require('./Images/no-image.jpg')%>"/>
            <div className="card__block">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__container-like">
                    <button type="button" className="card__like-button" aria-label="Лайк"></button>
                    <span className="card__sum-like">{props.card.likes.length}</span>
                </div>
            </div>
            <button type="button" className="card__delete-button" aria-label="Удалить"></button>
        </article>
    );
}