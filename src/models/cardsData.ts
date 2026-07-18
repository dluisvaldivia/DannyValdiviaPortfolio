import bloomIcon from '../assets/bloom/BloomIcon.ico';
import bloomThumb from '../assets/bloom.png';
import tunebuddyThumb from '../assets/tunebuddy.png';
import theyogagameThumb from '../assets/theyogagame.png';
import expensevueThumb from '../assets/expensevue.png';
import bloomHome from '../assets/bloom/homescreen.jpg';
import bloomAdmin from '../assets/bloom/adminteambrowser.jpg';
import bloomFreelancerDash from '../assets/bloom/freelancer dashboard.jpg';
import bloomFreelancerHub from '../assets/bloom/freelancer hub.jpg';
import bloomScreen4 from '../assets/bloom/screen4.jpg';

export interface Card {
  id: number;
  title: string;
  link?: string;
  thumbnail?: string;
  logo?: string;
  screenshots?: string[];
  whatItDoes?: string;
  myRole?: string;
  features?: string[];
  techStack?: string[];
}

export const cardsData: Card[] = [
  {
    id: 1,
    title: "Bloom",
    link: "http://147.93.114.210:3001/",
    thumbnail: bloomThumb,
    logo: bloomIcon,
    screenshots: [bloomHome, bloomFreelancerDash, bloomFreelancerHub, bloomAdmin, bloomScreen4],
    whatItDoes: "TODO: Describe what Bloom does.",
    myRole: "TODO: Your role on the project.",
    features: [
      "TODO: Feature 1",
      "TODO: Feature 2",
      "TODO: Feature 3",
    ],
    techStack: ["TODO: Tech 1", "TODO: Tech 2"],
  },
  {
    id: 2,
    title: "The Yoga Game",
    link: "https://dluisvaldivia.github.io/theyogagame/",
    thumbnail: theyogagameThumb,
  },
  {
    id: 4,
    title: "ExpenseVue",
    link: "https://github.com/dluisvaldivia/ExpenseVue",
    thumbnail: expensevueThumb,
  },
  {
    id: 5,
    title: "TuneBuddy",
    link: "https://dluisvaldivia.github.io/TUNEBUDDY/",
    thumbnail: tunebuddyThumb,
  }
];
