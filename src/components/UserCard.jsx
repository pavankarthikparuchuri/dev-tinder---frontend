const UserCard = ({ userData }) => {
  console.log(userData);
  const { about, firstName, lastName, photoUrl, age, gender } = userData;
  return (
    <div className="card bg-base-300 w-96 shadow-lg">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <span>{age + " , " + gender}</span>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
