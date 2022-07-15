import Image404 from "assets/404.svg";
import Meteor from "assets/meteor.svg";
import Astronaut from "assets/astronaut.svg";
import Spaceship from "assets/spaceship.svg";

export const NotFound = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-page-mars"></div>
            <img src={Image404} alt="logo" className="not-found-page-logo" />
            <img src={Meteor} alt="meteor" className="not-found-page-meteor" />
            <p className="not-found-page-title">Oh no!!</p>
            <p className="not-found-page-subtitle">
                You’re either misspelling the URL <br /> or requesting a page that's no longer here.
            </p>
            <img src={Astronaut} alt="astronaut" className="not-found-page-astronaut" />
            <img src={Spaceship} alt="spaceship" className="not-found-page-spaceship" />
        </div>
    );
}