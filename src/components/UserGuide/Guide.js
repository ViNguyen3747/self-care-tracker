import React from "react";
import { Image } from "semantic-ui-react";
import Professional from "../images/categories/professional.svg";
import Physical from "../images/categories/physical.svg";
import Mental from "../images/categories/mental.svg";
import Pratical from "../images/categories/pratical.svg";
import Social from "../images/categories/social.svg";
import Spiritual from "../images/categories/spiritual.svg";
import Emotional from "../images/categories/emotional.svg";

const Categories = [
  {
    description:
      "Any activities and actions that support feeling balanced and fulfilled in your career",
    example: "Taking courses, attending conferences, working with a mentor,etc",
    image: Professional,
    name: "Professional",
  },
  {
    description:
      "Any activities you deliberately engage in to enhance your physical well-being",
    image: Physical,
    example: "taking a nap, taking fitness class, etc",
    name: "Physical",
  },
  {
    description:
      "Any actions you take to fulfill your core needs and reduce stress can be catalogued as practical self-care",
    example: "Organizing mail box, Meal prepping, laundry, etc",
    image: Pratical,
    name: "Pratical",
  },
  {
    description: "Any activities that nurture our relationships with others",
    image: Social,
    name: "Social",
    example: "Calling Mom, hanging out with friends, etc",
  },
  {
    description:
      "Any activities you engage in to connect with and nurture your soul.",
    image: Spiritual,
    name: "Spiritual",
    example: "Volunteering, Spending time in nature, Worshipping, etc",
  },
  {
    description:
      "Anything you do specifically to stimulate your mind and cultivate a healthy psyche",
    image: Mental,
    name: "Mental/Intellectual",
    example: "Listening to podcast, Reading a book, etc",
  },
  {
    description:
      "Any actions we take to connect with our emotions and process them in a healthy way",
    image: Emotional,
    name: "Emotional",
    example: "Journaling, Talking to therapist, Meditation, etc",
  },
];
export const Guide = () => {
  return (
    <div className="info-container">
      <div className="header" style={{ color: "rgb(252, 240, 227)" }}>
        Self-Care Category Guide
      </div>
      <div className="guide_wrapper">
        {Categories.map((g) => (
          <div className="guideCard" key={g.description}>
            <div className="Column1">
              <div className="title">{g.name}</div>
              <br />
              <div className="userGuideimage">
                <Image src={g.image} size="medium" centered alt={g.name} />
              </div>
            </div>
            <div className="Column2">
              <div className="Subtitle">{g.description}</div>
            </div>
            <div className="Column3">
              <div className="Subtitle">EX: {g.example}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
