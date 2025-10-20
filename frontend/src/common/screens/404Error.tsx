import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import image404 from '../../assets/images/404.png';
import './styles.scss'
import { useTranslation } from 'react-i18next';
export const ScreenError404: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className='board-404'>
            <div className="not-found-container">
                <p>{t('page_not_found_error')}</p>
                <img src={image404} alt="Cute 404" className="cute-404-image" />
            </div>
            <button className='not-found-btn' onClick={() => navigate(-1)}>{t('action_back')}</button>
        </div>
    );
};
