export interface PortfolioSection {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface PortfolioItem {
  id: string;
  title: string;
  icon: string;
  desktopSlot: number;
  window: {
    defaultWidth: number;
    defaultHeight: number;
    minWidth: number;
    minHeight: number;
  };
  content: {
    header: {
      title: string;
      subtitle: string;
      tags: string[];
    };
    sections: PortfolioSection[];
  };
}

export interface PortfolioData {
  items: PortfolioItem[];
}
