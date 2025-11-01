import { FC } from 'react';
import image1 from '../../assets/images/image-1.jpg';
import image2 from '../../assets/images/image-2.jpg';
import image3 from '../../assets/images/image-3.jpg';
import image4 from '../../assets/images/image-4.jpg';
import image5 from '../../assets/images/image-5.jpg';
import image6 from '../../assets/images/image-6.jpg';
import image7 from '../../assets/images/image-7.jpg';
import './styles.scss';

import useMouseOppositeEffect from '../../common/hooks/useMouseOppositeEffect';

export const HomeImages: FC = () => {
    const sytle = useMouseOppositeEffect(10);
    const sytle1 = useMouseOppositeEffect(20);
    const sytle2 = useMouseOppositeEffect(30);
    const sytle3 = useMouseOppositeEffect(35);
    return (
        <div className="home-images">
            <div className="home-image">
                <img style={sytle} src={image7} alt="home-image-4" />
            </div>
            <div className="home-image">
                <img style={sytle1} src={image1} alt="home-image-1" />
            </div>
            <div className="home-image">
                <img style={sytle2} src={image2} alt="home-image-2" />
            </div>
            <div className="home-image">
                <img style={sytle3} src={image6} alt="home-image-3" />
            </div>
            <div className="home-image">
                <img style={sytle} src={image5} alt="home-image-4" />
            </div>
            <div className="home-image">
                <img style={sytle1} src={image4} alt="home-image-4" />
            </div>
            <div className="home-image">
                <img style={sytle3} src={image3} alt="home-image-4" />
            </div>

        </div>
    )
}