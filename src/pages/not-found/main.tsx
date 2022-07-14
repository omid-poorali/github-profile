import Image404 from "assets/404.svg";
import Meteor from "assets/meteor.svg";
import Astronaut from "assets/astronaut.svg";
import Spaceship from "assets/spaceship.svg";

export const NotFound = () => {
    return (
        <div className="gui-404">
            <div className="mars"></div>
            <img src={Image404} alt="logo" className="logo" />
            <img src={Meteor} alt="meteor" className="meteor" />
            <p className="title">Oh no!!</p>
            <p className="subtitle">
                You’re either misspelling the URL <br /> or requesting a page that's no longer here.
            </p>
            <img src={Astronaut} alt="astronaut" className="astronaut" />
            <img src={Spaceship} alt="spaceship" className="spaceship" />
        </div>
    );
}