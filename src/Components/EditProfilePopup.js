import React, {useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from "../Contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup ({isOpen, onClose}) {

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            saveButtonText="Сохранить"
            onSave={onClose}
            isOpen={isOpen}
            onClose={onClose}
        >
            <input name="name" id="name" type="text" minLength="2" maxLength="40" required
                   placeholder="Имя" className="popup__edit-area"/>
            <span className="popup__error" id="popup__name-error"></span>
            <input name="about" id="about" type="text" minLength="2" maxLength="200" required
                   placeholder="Описание" className="popup__edit-area"/>
            <span className="popup__error" id="popup__about-error"></span>
        </PopupWithForm>
    )
}