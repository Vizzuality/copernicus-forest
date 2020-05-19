import indonesia from 'assets/shapes/indonesia.svg';
import indonesiaActive from 'assets/shapes/indonesiaActive.svg';
import sweden from 'assets/shapes/sweden.svg';
import swedenActive from 'assets/shapes/swedenActive.svg';

export const COUNTRIES = [
  {
    iso: 'SWE',
    name: 'sweden',
    svg: sweden,
    svgActive: swedenActive
  },
  {
    iso: 'IDN',
    name: 'indonesia',
    svg: indonesia,
    svgActive: indonesiaActive
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

export const MAPBOX_STYLE_DEFAULT = 'mapbox://styles/copernicus-forests/ck3eh5kj049be1cobcp1uh4vn';

export const DEFAULT_LAYER_OPACITY = 60;

export const FOOTER_MENU = [
  {
    title: 'Contact us',
    link: '/contact-us',
    fullUrl: 'https://climate.copernicus.eu/contact-us'
  },
  {
    title: 'Cookies',
    link: '/cookies',
    fullUrl: 'https://climate.copernicus.eu/cookies'
  },
  {
    title: 'Data Protection Officer',
    link: '/data-protection-officer',
    fullUrl: 'https://climate.copernicus.eu/data-protection-officer'
  },
  {
    title: 'Data licence',
    link:
      'https://climate.copernicus.eu/sites/default/files/2018-04/20170117_Copernicus_License_V1.0.pdf',
    fullUrl:
      'https://climate.copernicus.eu/sites/default/files/2018-04/20170117_Copernicus_License_V1.0.pdf'
  },
  {
    title: 'Disclaimer & Privacy',
    link: '/disclaimer-and-privacy',
    fullUrl: 'https://climate.copernicus.eu/disclaimer-and-privacy'
  }
];

export const FOOTER_SOCIAL_LINKS = [
  {
    class: 'twitter',
    icon: '#icon-twitter',
    link: 'https://twitter.com/CopernicusECMWF'
  },
  {
    class: 'instagram',
    icon: '#icon-instagram',
    link: 'https://www.instagram.com/copernicusecmwf/'
  },
  {
    class: 'slideshare',
    icon: '#icon-slideshare',
    link: 'https://www.slideshare.net/CopernicusECMWF'
  }
];

export const HEADER_MENU_FIRST = [
  {
    title: 'News',
    link: '/news',
    fullUrl: 'https://climate.copernicus.eu/news'
  },
  {
    title: 'Events',
    link: '/events',
    fullUrl: 'https://climate.copernicus.eu/events'
  },
  {
    title: 'Press',
    link: '/press-releases',
    fullUrl: 'https://climate.copernicus.eu/press-releases'
  },
  {
    title: 'Trends',
    link: '/complete-list-tenders-issued-c3s',
    fullUrl: 'https://climate.copernicus.eu/complete-list-tenders-issued-c3s'
  },
  {
    title: 'Help & Support',
    link: '/help-support',
    fullUrl: 'https://climate.copernicus.eu/help-support'
  }
];

export const HEADER_MENU_SECOND = [
  {
    title: 'What we do',
    link: '/what-we-do',
    fullUrl: 'https://climate.copernicus.eu/what-we-do'
  },
  {
    title: 'Data',
    fullUrl: 'http://cds.climate.copernicus.eu/'
  }
];

export const DISTRIBUTIONS = {
  CURRENT: 'current',
  OBSERVED: 'observed',
  MODELED: 'modeled'
};
