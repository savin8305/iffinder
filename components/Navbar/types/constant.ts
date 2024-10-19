export interface NavLeftData {
    title: string;
    description: string;
    textcolor: string;
    icon: string;
    link: string;
  }
  
  export interface NavRightData {
    title: string;
    image: string;
    link: string;
    alt: string;
  }
  
  export interface AboutData {
    category: string;
    data: {
      navleftdata: NavLeftData[];
      navrightdata: NavRightData[];
    };
  }
  export interface data {
    videoDataItem: VideoDataItem[];
    DataBankItem:DataBankItem[];
    supportItem: SupportItem[];
    SupportItem: SupportItem[];
    SupportMobile: SupportMobile;
    applications: Application[];
    navleftdata: NavLeftData[];
    navrightdata: NavRightData[];
  }
  // Define the type for individual machine items
  export interface Machine {
    name?: string; // Optional because some items may not have a name
    image: string;
    mimage: string;
    category: string;
  }
  
  // Define the type for sidebar links
  export interface SidebarLink {
    name: string;
    link: string;
    icon: string;
  }
  
  // Define the type for the overall product data structure
  export interface ProductData {
    category: string;
    data: {
      Machines: Machine[];
      SidebarLinks: SidebarLink[];
    };
  }
  
  export interface Application {
    id: string;
    name: string;
    description: string;
  }
  
  // Define the type for the overall application data structure
  export interface ApplicationData {
    category: string;
    data: {
      applications: Application[];
    };
  }
  
  // Define the type for individual support items
  export interface SupportItem {
    title: string;
    link: string;
    image: string;
  }
  
  // Define the type for mobile support information
  export interface SupportMobile {
    mobileFirst: string;
    mobileSecond: string;
  }
  
  // Define the type for the overall support data structure
  export interface SupportData {
    length: number;
    map(arg0: (item: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
    supportItem: SupportItem[];
    supportMobile: SupportMobile;
  }
  
  // Define the type for individual data bank items
  export interface DataBankItem {
    title: string;
    link: string;
    image: string;
    bgPic: string;
  }
  
  // Define the type for the overall resources data structure
  export interface ResourcesData {
    DataBankItem: DataBankItem[];
  }
  
  // Define the type for individual video data items
  export interface VideoDataItem {
    title: string;
    image: string;
    bgPic: string;
  }
  
  // Define the type for the overall video data structure
  export interface VideoData {
    category: string;
    data: {
      videoDataItem: VideoDataItem[];
    };
  }
  // Define the type for individual contact items
  export interface ContactItem {
    link: string;
  }
  
  // Define the type for the overall contact data structure
  export interface ContactData {
    category: string;
    data: {
      contact: ContactItem[];
    };
  }
  // Parent interface that includes all data types
  export interface NavbarData {
    navbar: Array<{
      data: data;
      aboutData: AboutData;
      productData: ProductData;
      applicationData: ApplicationData;
      supportData: SupportData;
      resourcesData: ResourcesData;
      videoData: VideoData;
      contactData: ContactData;
    }>;
  }