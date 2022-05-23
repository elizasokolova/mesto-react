import React from "react";
import Card from './Card';
import {CurrentUserContext} from "../Contexts/CurrentUserContext";
import api from "../Utils/Api";

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [cards, setCards] = React.useState([]);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(user => user._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => setCards((oldCards) =>
                oldCards.map((oldCard) => oldCard._id === newCard._id ? newCard : oldCard)
            ))
            .catch(err => console.error(`Error: ${err}`));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => setCards((oldCards) => oldCards.filter((oldCard) => oldCard._id !== card._id)))
            .catch(err => console.error(`Error: ${err}`));
    }

    React.useEffect(() => {
        api.getInitialCards()
            .then(setCards)
            .catch(err => console.error(`Error: ${err}`));
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__overlay">
                    <img src={currentUser.avatar} alt="Аватарка" className="profile__avatar"/>
                    <button className="profile__avatar-button" onClick={props.onEditAvatar} type="button"
                            aria-label="Изменить аватар"></button>
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__author">{currentUser.name}</h1>
                        <button className="profile__edit-button" onClick={props.onEditButton} type="button"
                                aria-label="Редактировать"></button>
                    </div>
                    <p className="profile__status">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" onClick={props.onAddButton} type="button"
                        aria-label="Добавить"></button>
            </section>

            <section className="photo-grid">
                {cards.map(card => (<Card key={card._id}
                                          card={card}
                                          onCardClick={props.onCardClick}
                                          onCardDelete={handleCardDelete}
                                          onCardLike={handleCardLike} />))}
            </section>
        </main>
    )
}