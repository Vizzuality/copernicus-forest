import canada from 'assets/shapes/canada.svg';
import canadaActive from 'assets/shapes/canadaActive.svg';
import indonesia from 'assets/shapes/indonesia.svg';
import indonesiaActive from 'assets/shapes/indonesiaActive.svg';
import sweden from 'assets/shapes/sweden.svg';
import swedenActive from 'assets/shapes/swedenActive.svg';
import peru from 'assets/shapes/peru.svg';
import peruActive from 'assets/shapes/peruActive.svg';
import tanzania from 'assets/shapes/tanzania.svg';
import tanzaniaActive from 'assets/shapes/tanzaniaActive.svg';

export const COUNTRIES = [
  {
    iso: 'CAN',
    name: 'canada',
    svg: canada,
    svgActive: canadaActive
  },
  {
    iso: 'IDN',
    name: 'indonesia',
    svg: indonesia,
    svgActive: indonesiaActive
  },
  {
    iso: 'SWE',
    name: 'sweden',
    svg: sweden,
    svgActive: swedenActive
  },
  {
    iso: 'PER',
    name: 'peru',
    svg: peru,
    svgActive: peruActive
  },
  {
    iso: 'TZA',
    name: 'tanzania',
    svg: tanzania,
    svgActive: tanzaniaActive
  }
];

export const COUNTRIES_DEFAULT_VIEWPORTS = {
  CAN: { zoom: 2, latitude: 56.1351095, longitude: -106.3460756 },
  SWE: { zoom: 4, latitude: 62.295911, longitude: 17.861953 },
  IDN: { zoom: 3, latitude: -4.341701, longitude: 122.389996 },
  PER: { zoom: 4, latitude: -10.471441, longitude: -75.135125 },
  TZA: { zoom: 5, latitude: -5.790175, longitude: 36.718777 }
};

export const SPECIES_RAMP_COLORS = ['rgba(255, 255, 255, 0)', '#FFFFFF', '#7044FF']; // [min (transparent), mid, max]
export const TEMPERATURE_RAMP_COLORS = ['#FEF6B5', '#FFA679', '#E15383']; // [min, mid, max]
export const PERCIPITATION_RAMP_COLORS = ['#A6BDDB', '#3690C0', '#034E7B']; // [min, mid, max]
