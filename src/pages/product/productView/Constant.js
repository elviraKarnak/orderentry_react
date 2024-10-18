import moment from "moment";
import dayjs from "dayjs";
import { boxTypeOptions } from "../../../utils/Constant";

export const newRowData = {
  awb: '',
  vendor_name: '',

  product_name: '',
  farm_invoice: '',
  po: '',
  received_date: null,
  boxes: '',
  boxtype: '',
  unit_per_box: '',
  unit_per_bunch: '',
  cost_per_unit: '',
  sale_price: '',
  so: '',

  publish_date: null,

  sku: '',
  stock: '',
  real_price: '',
  cost_price: '',
  minqty: '',
  product_tags: [],
  source: '',

  pre_order: '',
  shop_by_branch: '',
  future_available_status: '',
  future_start_date: null,
  future_expire_date: null,
  

  cat_id: [],
  product_color: '',
  uom: '',


  fob_t_1_m: '',
  landed_t_1_m: '',

  fob_t_2_m: '',
  fob_t_2_qty: '',
  landed_t_2_m: '',
  landed_t_2_qty: '',

  fob_t_3_m: '',
  fob_t_3_qty: '',
  landed_t_3_m: '',
  landed_t_3_qty: '',

  shipping_model: ''
};

export const disableRows = {
  awb: false,
  vendor_name: false,

  product_name: false,
  farm_invoice: false,
  po: false,
  received_date: false,
  boxes: false,
  boxtype: false,
  box_unit: false,
  bunch_unit: false,
  cost_unit: false,
  sale_price: false,
  so: false,

  sku: false,
  real_stock: false,
  real_price: false,
  cost_price: false,
  minqty: false,
  product_tags: false,
  source: false,
  pre_order: false,
  cat_id: false,
  product_color: false,
  uom: false,
  feature_available_status: false,
  publish_date: false,
};

export const inputFields = [
  // {label: 'AWB', name: 'awb', type: 'text'},
  { label: 'Vendor Name', name: 'vendor_name', type: 'text' },
  { label: 'Farm Invoice#', name: 'farm_invoice', type: 'number' },
  { label: 'Date Received', name: 'received_date', type: 'date' },
  { label: 'Product Name', name: 'product_name', type: 'text' },
  // {label: 'PO#', name: 'po', type: 'number'},
  { label: 'SKU', name: 'sku', type: 'number' },

  { label: 'BOXES', name: 'boxes', type: 'number' },
  { label: 'Box Type', name: 'boxtype', type: 'select', options: boxTypeOptions },
  { label: 'Units/Box', name: 'unit_per_box', type: 'number' },
  { label: 'Units/Bunch', name: 'unit_per_bunch', type: 'number' },
  { label: 'Units/Cost', name: 'cost_per_unit', type: 'number' },
  { label: 'Sale Price', name: 'sale_price', type: 'number' },
  { label: 'SO#', name: 'so', type: 'number' },

  { label: 'Category', name: 'cat_id', type: 'multiple_select', options: [] },
  { label: 'Color', name: 'product_color', type: 'select', options: [] },


  {
    label: 'Shop By Branch', name: 'shop_by_branch', type: 'select', options: [
      { label: '', value: '' },
      { label: 'Yes', value: '1' },
      { label: 'No', value: '0' },
    ]
  },

  {
    label: 'Pre Order', name: 'pre_order', type: 'select', options: [
      { label: '', value: '' },
      { label: 'Yes', value: '1' },
      { label: 'No', value: '0' },
    ]
  },


  {
    label: 'Future Available', name: 'future_available_status', type: 'select', options: [
      { label: '', value: '' },
      { label: 'Yes', value: '1' },
      { label: 'No', value: '0' },
    ]
  },

  // { label: 'Publish Start Date', name: 'feature_1', type: 'date' },
  // { label: 'Publish Expire Date', name: 'feature_2', type: 'date' },
];

export const editFields = [
  { label: 'Regular Price', name: 'real_price', type: 'number' },
  { label: 'Sale Price', name: 'sale_price', type: 'number' },
  { label: 'Cost Price', name: 'cost_price', type: 'number' },

  // { label: 'AWB', name: 'awb', type: 'text' },
  { label: 'Vendor Name', name: 'vendor_name', type: 'text' },
  { label: 'Product Name', name: 'product_name', type: 'text' },
  { label: 'Farm Invoice#', name: 'farm_invoice', type: 'number' },
  // { label: 'PO#', name: 'po', type: 'number' },
  { label: 'Date Received', name: 'received_date', type: 'date' },
  { label: 'SKU', name: 'sku', type: 'number' },

  { label: 'BOXES', name: 'boxes', type: 'number' },
  { label: 'Box Type', name: 'boxtype', type: 'select', options: boxTypeOptions},
  { label: 'Units/Box', name: 'unit_per_box', type: 'number' },
  { label: 'Units/Bunch', name: 'unit_per_bunch', type: 'number' },
  { label: 'Units/Cost', name: 'cost_per_unit', type: 'number' },
  { label: 'SO#', name: 'so', type: 'number' },

  { label: 'Publish Date', name: 'publish_date', type: 'dateTime' },

  { label: 'Stock', name: 'stock', type: 'number' },
  { label: 'Min Qty', name: 'minqty', type: 'number' },

  { label: 'Source', name: 'source', type: 'text' },

  { label: 'Category', name: 'cat_id', type: 'multiple_select' },
  { label: 'Color', name: 'product_color', type: 'select' },

  { label: 'UOM', name: 'uom', type: 'select', options: [{ label: '', value: '' }, { label: "ST", value: "ST" }] },


  { label: 'Tags', name: 'product_tags', type: 'autocomplete' },

  {
    label: 'Shipping Model', name: 'shipping_model', type: 'select', options: [
      { label: '', value: '' },
      { label: "landed", value: "Landed" },
      { label: "fob", value: "Fob" },
    ]
  },

  {
    label: 'Shop By Branch', name: 'shop_by_branch', type: 'select', options: [
      { label: '', value: '' },
      { label: 'Yes', value: '1' },
      { label: 'No', value: '0' },
    ]
  },

  {
    label: 'Pre Order', name: 'pre_order', type: 'select', options: [
      { label: '', value: '' },
      { label: 'Yes', value: '1' },
      { label: 'No', value: '0' },
    ]
  },

  // //////////// margin //////////////////
  { label: 'Margin Manager', type: 'label_p' },
  { label: 'Tier 1', type: 'label_h5' },

  { label: 'FOB Margin', name: 'fob_t_1_m', type: 'number' },

  { label: 'Landed Margin', name: 'landed_t_1_m', type: 'number' },


  { label: 'Tier 2', type: 'label_h5' },

  { label: 'FOB Min Qty', name: 'fob_t_2_qty', type: 'number' },
  { label: 'FOB Margin', name: 'fob_t_2_m', type: 'number' },

  { label: 'Landed Min Qty', name: 'landed_t_2_qty', type: 'number' },
  { label: 'Landed Margin', name: 'landed_t_2_m', type: 'number' },

  { label: 'Tier 3', type: 'label_h5' },

  { label: 'FOB Min Qty', name: 'fob_t_3_qty', type: 'number' },
  { label: 'FOB Margin', name: 'fob_t_3_m', type: 'number' },

  { label: 'Landed Min Qty', name: 'landed_t_3_qty', type: 'number' },
  { label: 'Landed Margin', name: 'landed_t_3_m', type: 'number' },
  // //////////// margin //////////////////


  { label: 'Future Product Available', type: 'label_p' },

  {
    label: 'future Available', name: 'future_available_status', type: 'select', options: [
      { label: '', value: '' },
      { label: 'Yes', value: '1' },
      { label: 'No', value: '0' },
    ]
  },

];
