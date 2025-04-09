export  type CustomFeed = { title: string; link: string };
export  type CustomItem = { title: string; pubDate: string; link: string };

export interface Torrrents {
  [key: string]: {
    title: string;
    link: string;
    pubDate: string;
  }
};

export interface Updates {
  movies?: Torrrents | {};
  series?: Torrrents | {};
}
