export default function PopupWithForm (props) {
    return (
        <div className={`popup ${props.isOpen && "popup_opened" }`} id={`popup-${props.name}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть"></button>
                <h2 className="popup__edit">{props.title}</h2>
                <form name={`popup_form-${props.name}`} className="popup__form" id="popup_form-edit">
                    {props.children}
                    <button className="popup__save-button" type="submit" onClick={props.onSave} aria-label="Сохранить">{props.saveButtonText}</button>
                </form>
            </div>
        </div>
    )
}