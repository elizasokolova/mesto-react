import '../App.css';
import React, {useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from "./ImagePopup";
import api from "../Utils/Api";
import {CurrentUserContext} from "../Contexts/CurrentUserContext";

export default function App() {
    const [isEditPopupOpened, setIsEditPopupOpened] = React.useState(false);
    const [isAddCardPopupOpened, setIsAddCardPopupOpened] = React.useState(false);
    const [isChangeAvatarPopupOpened, setIsChangeAvatarPopupOpened] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    const [currentUser, setCurrentUser] = React.useState({
        name: '',
        about: ''
    });

    useEffect(() => {
       api.getCurrentUser()
           .then((user) => {
               setCurrentUser(user);
           })
           .catch(err => console.error(`Error: ${err}`));
    }, []);

    const closeAllPopups = () => {
        setIsEditPopupOpened(false);
        setIsAddCardPopupOpened(false);
        setIsChangeAvatarPopupOpened(false);
        setSelectedCard(null);
    };

    const handleEditAvatarClick = () => setIsChangeAvatarPopupOpened(true);
    const handleEditProfileClick = () => setIsEditPopupOpened(true);
    const handleAddPlaceClick = () => setIsAddCardPopupOpened(true);
    const handleCardClick = (card) => setSelectedCard(card);

    return (
        <>
        <CurrentUserContext.Provider value={currentUser}>
            <Header/>
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditButton={handleEditProfileClick}
                onAddButton={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer/>

            {/* Попап Редактировать профиль */}
            <EditProfilePopup
                isOpen={isEditPopupOpened}
                onClose={closeAllPopups} />

            {/* Попап Добавить новую карточку */}
            <PopupWithForm
                name="add"
                title="Новое место"
                onSave={closeAllPopups}
                saveButtonText="Создать"
                isOpen={isAddCardPopupOpened}
                onClose={closeAllPopups}
            >
                <input name="title" id="title" type="text" minLength="2" maxLength="30" required
                       placeholder="Название" className="popup__edit-area"/>
                <span className="popup__error" id="popup__title-error"></span>
                <input name="link" id="link" type="url" required placeholder="Ссылка на картинку"
                       className="popup__edit-area"/>
                <span className="popup__error" id="popup__link-error"></span>
            </PopupWithForm>

            {/* Попап Обновить аватарку */}
            <PopupWithForm
                name="change-avatar"
                title="Обновить аватар"
                onSave={closeAllPopups}
                saveButtonText="Сохранить"
                isOpen={isChangeAvatarPopupOpened}
                onClose={closeAllPopups}
            >
                <input name="avatar" id="avatar" type="url" required placeholder="Ссылка на аватар"
                       className="popup__edit-area"/>
                <span className="popup__error" id="popup__avatar-error"></span>
            </PopupWithForm>

            {/* Попап удаления карточки */}
            <PopupWithForm
                name={"delete-card"}
                title={"Вы уверены?"}
                saveButtonText={"Да"}
            />

            {/* Попап открытия полноразмерной карточки */}
            <ImagePopup
                isOpen={selectedCard !== null}
                card={selectedCard}
                onClose={closeAllPopups}
            />
        </CurrentUserContext.Provider>
        </>
    )
}