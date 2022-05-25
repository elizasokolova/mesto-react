import React from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar}) {

    const [avatar, setAvatar] = React.useState('');
    const onAvatarChange = (event) => setAvatar(event.target.value);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatar,
        });
        setAvatar(''); /* Сбрасываем поле ввода */
    }

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            onSubmit={handleSubmit}
            saveButtonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}>

            <input name="avatar" id="avatar" onChange={onAvatarChange} value={avatar} type="url" required placeholder="Ссылка на аватар"
                   className="popup__edit-area"/>
            <span className="popup__error" id="popup__avatar-error"></span>
        </PopupWithForm>
    )
}