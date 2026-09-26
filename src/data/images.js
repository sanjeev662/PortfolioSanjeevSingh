/**
 * Image registry — the ONE module in src/data/ allowed to import image files.
 *
 * Every other data module stores its image as a plain STRING key: the file's
 * path under Components/Assets, without the extension. That keeps the data
 * files plain JavaScript, which matters because the chatbot's server function
 * (api/chat.js) imports them, and Node cannot load a `.webp` import.
 * Components resolve the keys here. If you add an image key to a data file,
 * add it to IMAGE_MAP too.
 *
 *   import { getImage } from "../../../data";
 *   <LazyImage src={getImage(project.image)} ... />
 */

import toletImg from "../Components/Assets/Projects/to-let-mern-app.webp";
import routefinderImg from "../Components/Assets/Projects/routefinder-app.webp";
import amazonImg from "../Components/Assets/Projects/amazon-app.webp";
import chatImg from "../Components/Assets/Projects/chat-app.webp";
import blogImg from "../Components/Assets/Projects/blog-app.webp";
import todoImg from "../Components/Assets/Projects/todo-app.webp";
import newsImg from "../Components/Assets/Projects/news-app.webp";
import weatherImg from "../Components/Assets/Projects/weather-app.webp";
import feedbackImg from "../Components/Assets/Projects/feedback-app.webp";
import heritageImg from "../Components/Assets/Projects/heritage-app.webp";
import shoppingImg from "../Components/Assets/Projects/shopping-app.webp";
import thankuImg from "../Components/Assets/Projects/thanku-app.webp";

import namekartImg from "../Components/Assets/Certificates/namekart_intern.webp";
import rydeuImg from "../Components/Assets/Certificates/rydeu_intern.webp";
import icpcImg from "../Components/Assets/Certificates/icpc.webp";
import iitkMlImg from "../Components/Assets/Certificates/iitk_ml.webp";
import udemyImg from "../Components/Assets/Certificates/udemy.webp";
import isroImg from "../Components/Assets/Certificates/isro.webp";
import riseImg from "../Components/Assets/Certificates/rise.webp";
import sparkImg from "../Components/Assets/Certificates/spark.webp";
import multigradImg from "../Components/Assets/Certificates/multigrad.webp";
import unicompilerImg from "../Components/Assets/Certificates/unicompiler.webp";
import tcsImg from "../Components/Assets/Certificates/tcs.webp";
import nitMijoramImg from "../Components/Assets/Certificates/nit_mijoram.webp";
import codechefImg from "../Components/Assets/Certificates/codechef.webp";
import hackerrankImg from "../Components/Assets/Certificates/hackerrank_java.webp";
import uietImg from "../Components/Assets/Certificates/uiet.webp";

export const IMAGE_MAP = {
  "Projects/to-let-mern-app": toletImg,
  "Projects/routefinder-app": routefinderImg,
  "Projects/amazon-app": amazonImg,
  "Projects/chat-app": chatImg,
  "Projects/blog-app": blogImg,
  "Projects/todo-app": todoImg,
  "Projects/news-app": newsImg,
  "Projects/weather-app": weatherImg,
  "Projects/feedback-app": feedbackImg,
  "Projects/heritage-app": heritageImg,
  "Projects/shopping-app": shoppingImg,
  "Projects/thanku-app": thankuImg,

  "Certificates/namekart_intern": namekartImg,
  "Certificates/rydeu_intern": rydeuImg,
  "Certificates/icpc": icpcImg,
  "Certificates/iitk_ml": iitkMlImg,
  "Certificates/udemy": udemyImg,
  "Certificates/isro": isroImg,
  "Certificates/rise": riseImg,
  "Certificates/spark": sparkImg,
  "Certificates/multigrad": multigradImg,
  "Certificates/unicompiler": unicompilerImg,
  "Certificates/tcs": tcsImg,
  "Certificates/nit_mijoram": nitMijoramImg,
  "Certificates/codechef": codechefImg,
  "Certificates/hackerrank_java": hackerrankImg,
  "Certificates/uiet": uietImg,
};

/** Resolve an image key to its bundled URL. Unknown keys return undefined. */
export function getImage(key) {
  return IMAGE_MAP[key];
}
