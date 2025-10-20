import { FC } from "react";
import './styles.scss'
import { useTranslation } from "react-i18next";
import { Content } from "antd/es/layout/layout";

export const AboutProject: FC = () => {
    const { t } = useTranslation();
    return <div className="about-project">
        <h1 className="about-project__title">{t('about_project')}</h1>
        <Content className="about-project__content">

            <p>{t('about_project_description.entry')}</p>
            <p>
                {t('about_project_description.project.text')}{" "}
                <strong>{t('about_project_description.project.strong')} </strong>
            </p>
            <p>{t('about_project_description.p3')} </p>
            <p>{t('about_project_description.p4')} </p>
            <h4 className="little-title">{t('performers_project')}</h4>
            <p>

                <ul>
                    <li> <strong>{t('project_manager')} </strong>M.M. Saidov </li>
                    <li>B. Abdullayev-Andijon viloyati</li>
                    <li>Z. Raxmonov-Fargʻona va Namangan viloyatlari</li>
                    <li>D. Normurodov -Toshkent viloyati va shahri</li>
                    <li>O. Mamirov - Sirdaryo viloyati</li>
                    <li>Sh. Pardayev -Jizzax viloyati</li>
                    <li>N. Alimov- Samarqand viloyati</li>
                    <li>A. Abduganiyev- Samarqand viloyati</li>
                    <li>X. Raxmanov- Samarqand viloyati</li>
                    <li>Gʻ. Maxammadiyev - Samarqand viloyati</li>
                    <li>S. Amonov-Qashqadaryo viloyati</li>
                    <li>D. Omonov- Qashqadaryo viloyati</li>
                    <li>O. Xamidov -Suoxondaryo viloyati</li>
                    <li>S. Mirzaaxmedov- Buxoro viloyati</li>
                    <li>I.Qandaxarov- Navoiy viloyati</li>
                    <li>B. Saʼdullayev -Xorazm viloyati</li>
                    <li>A. Tureniyazov- Qorqalpohiston Respublikasi</li>
                </ul>

            </p>
        </Content>
    </div>
}