import React from 'react';
import style from '../../pages/ActorPage/ActorPage.module.scss';

const PersonalInfoSection = ({ actors }) => {

  let age;
  if (actors) {
    const birthDate = new Date(actors.birthday);
    const currentDate = new Date();
    age = currentDate.getFullYear() - birthDate.getFullYear();
    const isBirthdayPassed = currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());

    if (!isBirthdayPassed) {
      age -= 1;
    }
  }

  return (
    <section className={style.left}>
      <img
        src={`https://image.tmdb.org/t/p/original${actors?.profile_path}`}
        alt={actors.name}/>
      <div className={style.personalInfo}>
        <h2>Personal Info</h2>
        <div>
          <h3>Known For</h3>
          <p>{actors.known_for_department}</p>
        </div>
        <div>
          <h3>Gender</h3>
          {actors.gender === 2 ? <p>Male</p> : <p>Female</p>}
        </div>
        <div>
          <h3>Birthday</h3>
          <p>{actors.birthday} ({age} years)</p>
        </div>
        <div>
          <h3>Place of Birth</h3>
          <p>{actors.place_of_birth}</p>
        </div>
        <div>
          <h3>Also Known As</h3>
          {actors.also_known_as.map((name, i) => <p key={i}>{name}</p>)}
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;