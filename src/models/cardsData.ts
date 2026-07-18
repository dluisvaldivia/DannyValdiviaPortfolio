import bloomThumb from '../assets/bloom.png';
import tunebuddyThumb from '../assets/tunebuddy.png';
import theyogagameThumb from '../assets/theyogagame.png';
import expensevueThumb from '../assets/expensevue.png';

export interface Card {
  id: number;
  title: string;
  link?: string;
  thumbnail?: string;
}

export const cardsData: Card[] = [
  {
    id: 1,
    title: "Bloom",
    link: "http://147.93.114.210:3001/",
    thumbnail: bloomThumb,
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
