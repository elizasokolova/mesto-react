import React from "react";
import api from "../Utils/Api";
import Card from './Card';

export default function Main(props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getInitialCards()
            .then(setCards)
            .catch(err => console.error(`Error: ${err}`));

        api.getCurrentUser()
            .then(user => {
                setUserName(user.name);
                setUserDescription(user.about);
                setUserAvatar(user.avatar);
            })
            .catch(err => console.error(`Error: ${err}`));
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__overlay">
                    <img src={userAvatar} alt="Аватарка" className="profile__avatar"/>
                    <button className="profile__avatar-button" onClick={props.onEditAvatar} type="button"
                            aria-label="Изменить аватар"></button>
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__author">{userName}</h1>
                        <button className="profile__edit-button" onClick={props.onEditButton} type="button"
                                aria-label="Редактировать"></button>
                    </div>
                    <p className="profile__status">{userDescription}</p>
                </div>
                <button className="profile__add-button" onClick={props.onAddButton} type="button"
                        aria-label="Добавить"></button>
            </section>

            <section className="photo-grid">
                {cards.map(card => (<Card key={card._id} card={card} onCardClick={props.onCardClick}/>))}
            </section>
        </main>
    )
}