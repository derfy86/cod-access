import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from './ProgressBar';

import './styles.scss';

const Profile = ({
  email, pseudo, picturePath, progressByTheme, fetchProgressByTheme,
}) => {
  useEffect(() => {
    fetchProgressByTheme();
  }, []);

  return (
    <section className="profile">
      <h1 className="title-h1 center">Mon Profil</h1>
      <div className="wrapper">
        <div className="profile__content">
          <img className="profile__content__img" src={`${process.env.IMAGE}${picturePath}`} alt="" />
          <div className="profile__content__infos">
            <p className="profile__content__infos__pseudo">Pseudo : {pseudo}</p>
            <p className="profile__content__infos__email">Email : {email}</p>
          </div>
        </div>
        <div className="profile__progress">
          <h2 className="profile__progress__title  title-h2">Mes réparations validées</h2>
          <div className="profile__progress__scores">
            {
              progressByTheme.map((progress) => (
                <div key={progress.theme} className="profile__progress__scores__theme">
                  {
                    progress.progress === 100
                      ? <FontAwesomeIcon icon={faAward} className="profile__progress__scores__theme__icon" size="3x" color={progress.color} />
                      : <FontAwesomeIcon icon={faAward} color="#E5EBED" className="profile__progress__scores__theme__icon" size="3x" />
                  }
                  <div className="profile__progress__scores__theme__score">
                    <h3 className="profile__progress__scores__theme__score__title">{progress.theme}</h3>
                    <ProgressBar color={progress.color} percentage={`${progress.progress}%`} />
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
};

Profile.propTypes = {
  email: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  picturePath: PropTypes.string.isRequired,
  progressByTheme: PropTypes.array,
  fetchProgressByTheme: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  progressByTheme: [],
};

export default Profile;
