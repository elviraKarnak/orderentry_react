import { TbLayoutDashboardFilled } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { LuView } from "react-icons/lu";
import { MdOutlineViewInAr } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
// import { CiViewTable } from "react-icons/ci";
import { IoListSharp } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";

export const PageModuleData = {
  orderEntry: "MODULE_001",
  orderView: "MODULE_002",
  orderList: "MODULE_003",
  productView: "MODULE_004",
  stagingInventory: "MODULE_005",
  admin: "MODULE_006",
  accounting: "MODULE_007",
  reporting: "MODULE_008",
  farmPurchase: "MODULE_009",
};

export const menuData = {
  admin: [
    {
      menuName: "Dashboard",
      path: "/",
      icon: <TbLayoutDashboardFilled />,
      code: "",
    },
    {
      menuName: "Order Entry",
      path: "/order-entry",
      icon: <TfiWrite />,
      code: PageModuleData.orderEntry,
    },
    {
      menuName: "Order View",
      path: "/order-view",
      icon: <LuView />,
      code: PageModuleData.orderView,
    },
    {
      menuName: "Order List",
      path: "/buyer-dashboard",
      icon: <IoListSharp />,
      code: PageModuleData.orderList,
    },
    {
      menuName: "Product View",
      path: "/product-view",
      icon: <MdOutlineViewInAr />,
      code: PageModuleData.productView,
    },
    // {
    //   menuName: 'Product Entry',
    //   path: '/product-entry',
    // },
    {
      menuName: "Staging Inventory",
      path: "/staging-inventory",
      icon: <MdOutlineInventory2 />,
      code: PageModuleData.stagingInventory,
    },
    //    {menuName:'Product Entry',
    //    path:'/product-entry'
    //    },

    {
      menuName: "Admin",
      path: "/admin",
      icon: <GrUserAdmin />,
      code: PageModuleData.admin,
    },

    {
      menuName: "Accounting",
      path: "/",
      icon: <GiNotebook />,
      code: PageModuleData.accounting,
    },

    {
      menuName: "Reporting",
      path: "/",
      icon: <ReportGmailerrorredOutlinedIcon />,
      code: PageModuleData.reporting,
    },
    {
      menuName: "Farm Purchase",
      path: "/farm-purchase",
      icon: <AgricultureOutlinedIcon />,
      code: PageModuleData.farmPurchase,
    },
  ],

  farm: [
    {
      menuName: "Dashboard",
      path: "/",
      icon: <TbLayoutDashboardFilled />,
      code: "",
    },
    {
      menuName: "Farm Purchase",
      path: "/farm-purchase",
      icon: <AgricultureOutlinedIcon />,
      code: PageModuleData.farmPurchase,
    },
  ],
};

export const menueDataAdmin = [
  {
    menuName: "Dashboard",
    path: "/",
    icon: <TbLayoutDashboardFilled />,
    code: "",
  },
  {
    menuName: "Order Entry",
    path: "/order-entry",
    icon: <TfiWrite />,
    code: PageModuleData.orderEntry,
  },
  {
    menuName: "Order View",
    path: "/order-view",
    icon: <LuView />,
    code: PageModuleData.orderView,
  },
  {
    menuName: "Order List",
    path: "/buyer-dashboard",
    icon: <IoListSharp />,
    code: PageModuleData.orderList,
  },
  {
    menuName: "Product View",
    path: "/product-view",
    icon: <MdOutlineViewInAr />,
    code: PageModuleData.productView,
  },
  // {
  //   menuName: 'Product Entry',
  //   path: '/product-entry',
  // },
  {
    menuName: "Staging Inventory",
    path: "/staging-inventory",
    icon: <MdOutlineInventory2 />,
    code: PageModuleData.stagingInventory,
  },
  //    {menuName:'Product Entry',
  //    path:'/product-entry'
  //    },

  {
    menuName: "Admin",
    path: "/admin",
    icon: <GrUserAdmin />,
    code: PageModuleData.admin,
  },

  {
    menuName: "Accounting",
    path: "/",
    icon: <GiNotebook />,
    code: PageModuleData.accounting,
  },

  {
    menuName: "Reporting",
    path: "/",
    icon: <ReportGmailerrorredOutlinedIcon />,
    code: PageModuleData.reporting,
  },
  {
    menuName: "Farm Purchase",
    path: "/farm-purchase",
    icon: <AgricultureOutlinedIcon />,
    code: PageModuleData.farmPurchase,
  },
];

export const menueDataFarm = [
  {
    menuName: "Dashboard",
    path: "/",
    icon: <TbLayoutDashboardFilled />,
    code: "",
  },
  {
    menuName: "Farm Purchase",
    path: "/farm-purchase",
    icon: <AgricultureOutlinedIcon />,
    code: PageModuleData.farmPurchase,
  },
];

export const UserRole = {
  SUPER_ADMIN: 1,
  SALES: 2,
  BUYER: 3,
  FARM: 4,
  CUSTOMER: 5,
};

export const SatagingInventoryData = [
  {
    id: 1,
    awb: "145-90165084",
    farm: "Anniroses Farms",
    po: "23765",
    arrival: "07/03/24",
    boxes: "15",
    total: "$115.00",
    status: "received",
  },
  {
    id: 2,
    awb: "145-87654321",
    farm: "Green Valley Farms",
    po: "12345",
    arrival: "07/05/24",
    boxes: "10",
    total: "$150.00",
    status: "pending",
  },
  {
    id: 3,
    awb: "145-12345678",
    farm: "Sunshine Orchards",
    po: "67890",
    arrival: "07/07/24",
    boxes: "12",
    total: "$125.00",
    status: "received",
  },
  {
    id: 4,
    awb: "145-23456789",
    farm: "Blue Sky Fields",
    po: "98765",
    arrival: "07/09/24",
    boxes: "8",
    total: "$85.00",
    status: "pending",
  },
  {
    id: 5,
    awb: "145-34567890",
    farm: "Happy Harvest Farms",
    po: "54321",
    arrival: "07/11/24",
    boxes: "20",
    total: "$175.00",
    status: "received",
  },
  {
    id: 6,
    awb: "145-45678901",
    farm: "Golden Acres",
    po: "34567",
    arrival: "07/13/24",
    boxes: "18",
    total: "$160.00",
    status: "pending",
  },
  {
    id: 7,
    awb: "145-56789012",
    farm: "Silver Meadow",
    po: "76543",
    arrival: "07/15/24",
    boxes: "14",
    total: "$135.00",
    status: "received",
  },
  {
    id: 8,
    awb: "145-67890123",
    farm: "Emerald Farms",
    po: "45678",
    arrival: "07/17/24",
    boxes: "9",
    total: "$90.00",
    status: "pending",
  },
  {
    id: 9,
    awb: "145-78901234",
    farm: "Lakeside Orchards",
    po: "87654",
    arrival: "07/19/24",
    boxes: "16",
    total: "$145.00",
    status: "received",
  },
  {
    id: 10,
    awb: "145-89012345",
    farm: "Mountain Peak Farms",
    po: "65432",
    arrival: "07/21/24",
    boxes: "7",
    total: "$75.00",
    status: "pending",
  },
  {
    id: 11,
    awb: "145-90123456",
    farm: "Riverbend Farms",
    po: "56789",
    arrival: "07/23/24",
    boxes: "13",
    total: "$130.00",
    status: "received",
  },
  {
    id: 12,
    awb: "145-01234567",
    farm: "Sunny Fields",
    po: "98712",
    arrival: "07/25/24",
    boxes: "11",
    total: "$120.00",
    status: "pending",
  },
  {
    id: 13,
    awb: "145-12349876",
    farm: "Harvest Moon Farms",
    po: "31245",
    arrival: "07/27/24",
    boxes: "6",
    total: "$65.00",
    status: "received",
  },
  {
    id: 14,
    awb: "145-23457689",
    farm: "Green Pastures",
    po: "74125",
    arrival: "07/29/24",
    boxes: "19",
    total: "$155.00",
    status: "pending",
  },
  {
    id: 15,
    awb: "145-34568790",
    farm: "Blue Horizon Farms",
    po: "96325",
    arrival: "07/31/24",
    boxes: "5",
    total: "$50.00",
    status: "received",
  },
];

export const SatagingInventoryDefaultStatus = [
  { label: "Pending", value: "pending" },
  { label: "Received", value: "received" },
  { label: "Transfer", value: "transferred" },
];

export const boxTypeOptions = [
  { value: "", label: "" },
  { value: "FB", label: "FB - Full Box" },
  { value: "BX", label: "BX - Box" },
  { value: "HB", label: "HB - Half Box" },
  { value: "QB", label: "QB - 1/4 Box" },
  { value: "EB", label: "EB - 1/8 Box" },
  { value: "CS", label: "CS - Cases" },
  { value: "BD", label: "BD - Bundles" },
  { value: "ST", label: "ST - Stem" },
  { value: "BU", label: "BU - Bunch" },
  { value: "EA", label: "EA - Each" },
  { value: "TR", label: "TR - Tray" },
  { value: "BQ", label: "BQ - Bouquet" },
  { value: "WP", label: "WP - Wet Pack" },
  { value: "HA", label: "HA - Hamper" },
  { value: "KG", label: "KG - Kilogram" },
  { value: "LB", label: "LB - Pounds" },
];

export const UserStatus = [
  { value: "active", label: "Active" },
  { value: "in-active", label: "Inactive" },
];

export const FARM_PURCHASE_STATUS = [
  { value: "new_order", label: "New Order", disabled: true },
  { value: "accepted", label: "Accepted", disabled: false },
  { value: "canceled", label: "Canceled", disabled: false },
];

export const CUSTOMER_SERVICE_REPRESENTATIVE_LIST = [
  { value: "None", label: "None" },
  { value: "Angelique Crespo", label: "Angelique Crespo" },
  { value: "Anthony Vergara", label: "Anthony Vergara" },
  { value: "Antonio Crespo", label: "Antonio Crespo" },
  { value: "Brian Benjamin", label: "Brian Benjamin" },
  { value: "Daniel Crespo", label: "Daniel Crespo" },
  { value: "Grace Perdomo", label: "Grace Perdomo" },
  { value: "JORGE ZALEM", label: "JORGE ZALEM" },
  { value: "Jon Negron", label: "Jon Negron" },
  { value: "Karin Siegers", label: "Karin Siegers" },
  { value: "Nikki Newman", label: "Nikki Newman" },
];
